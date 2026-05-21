import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const sourceDb = "/Users/a111/Documents/New project/worldcup_bot/worldcup_bot.db";
const outputFile = path.join(process.cwd(), "lib", "content-data.ts");

const db = new DatabaseSync(sourceDb);

const modelIds = [
  "alpha-pitch",
  "odds-mind",
  "goal-net",
  "tacti-core",
  "upset-x",
  "line-shift",
  "heat-guard",
  "squad-lens",
  "review-core",
  "score-cast"
];

const predictions = db
  .prepare(
    `select p.*,
      ht.name as home,
      at.name as away,
      m.stage,
      m.group_name,
      m.kickoff_at,
      m.home_score,
      m.away_score,
      m.status
    from predictions p
    left join matches m on m.id = p.match_id
    left join teams ht on ht.id = m.home_team_id
    left join teams at on at.id = m.away_team_id
    where p.is_published = 1
    order by datetime(p.published_at) desc, p.id desc`
  )
  .all();

const hotEvents = db
  .prepare(
    `select id, title, competition, kickoff_text, matchup, body, created_at
    from hot_events
    where is_published = 1
    order by datetime(created_at) desc
    limit 12`
  )
  .all();

const matches = db
  .prepare(
    `select m.id, m.match_no, m.stage, m.group_name, m.kickoff_at, m.city, m.venue,
      ht.name as home, at.name as away, m.home_score, m.away_score, m.status, m.is_featured
    from matches m
    join teams ht on ht.id = m.home_team_id
    join teams at on at.id = m.away_team_id
    order by datetime(m.kickoff_at)
    limit 36`
  )
  .all();

function cleanText(value) {
  return String(value || "")
    .replace(/[\uD800-\uDFFF]/g, "")
    .replace(/\uFE0F/g, "")
    .replace(/[\u2600-\u27BF]/g, "")
    .replace(/\b个人看好/g, "模型倾向")
    .replace(/个人看好/g, "模型倾向")
    .replace(/若追求更高赔付，可考虑[^。]+。?/g, "")
    .replace(/串投/g, "组合观察")
    .replace(/盘口/g, "指数")
    .replace(/穿盘/g, "方向符合")
    .replace(/受让方向顺利打出/g, "参考方向符合")
    .replace(/顺利打出/g, "顺利符合")
    .replace(/不方向符合/g, "优势有限")
    .replace(/#\S+/g, "")
    .replace(/博彩或投注建议/g, "任何结果承诺或行动建议")
    .replace(/投资、博彩或投注建议/g, "投资、博彩或行动建议")
    .replace(/仅供参考和娱乐交流使用/g, "仅供足球交流参考")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function cleanTitle(value) {
  return cleanText(value).replace(/^今日赛前观点\s*/, "").trim();
}

function cleanMatchup(value) {
  return cleanText(value).replace(/\s+VS\s+/i, " vs ").trim();
}

function splitParagraphs(body) {
  return cleanText(body)
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !/^(今日赛前观点|AI赛前观点|赛后复盘)$/.test(part))
    .filter((part) => !/^\d{4}-\d{2}-\d{2}/.test(part))
    .filter((part) => !/^[\u4e00-\u9fa5A-Za-z\s]+VS[\u4e00-\u9fa5A-Za-z\s]+$/.test(part))
    .filter((part) => !/^[\u4e00-\u9fa5A-Za-z\s]+\n\d{4}-\d{2}-\d{2}/.test(part))
    .filter((part) => !/^重要声明/.test(part))
    .filter((part) => !/^以上内容仅/.test(part))
    .slice(0, 9);
}

function summarizeHotBody(body) {
  const text = cleanText(body);
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  const wanted = lines.filter((line) => /^(看点|观点)[:：]/.test(line));
  return (wanted.length ? wanted : lines.slice(-2)).join(" ");
}

function extractCompetition(row) {
  const eventName = cleanText(row.event_name);
  if (eventName && eventName.length <= 24 && !eventName.includes("今日赛前观点")) return eventName;
  const lines = cleanText(row.body).split("\n").map((line) => line.trim()).filter(Boolean);
  const candidate = lines.find((line) => /联|杯|附加赛|决赛|英超|中超|荷甲|葡超/.test(line) && !line.includes("VS") && line.length <= 28);
  if (candidate) return candidate;
  const title = cleanText(row.title);
  if (title.includes("英超")) return "英超";
  if (title.includes("中超")) return "中超";
  if (title.includes("荷甲")) return "荷甲";
  return "足球赛事";
}

function extractRecommendation(row) {
  const pick = cleanText(row.pick);
  if (pick) return `模型倾向：${pick}`;
  const body = cleanText(row.body);
  const match = body.match(/参考方向\s*[:：]\s*([\s\S]*?)(?:\n\n|风险提示|重要声明|$)/);
  if (match?.[1]) {
    return `模型倾向：${match[1].replace(/\n/g, "，").replace(/，+/g, "，").trim()}`;
  }
  const conclusion = body.match(/结论\s*[:：]\s*([\s\S]*?)(?:\n\n|参考方向|风险提示|重要声明|$)/);
  if (conclusion?.[1]) {
    return `模型倾向：${conclusion[1].replace(/\n/g, "，").slice(0, 80).trim()}`;
  }
  return "模型倾向：等待临场首发与最新信息确认";
}

function riskLevel(row) {
  const body = cleanText(row.body);
  if (/伤病|场地|客场|附加赛|变量|保级|体能|决赛|不确定/.test(body)) return "中";
  return "低";
}

function publishedAt(value) {
  if (!value) return "已发布";
  const date = new Date(String(value).replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return "已发布";
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function reviewStatus(value) {
  const text = cleanText(value);
  if (/未命中|未中|偏差/.test(text)) return "miss";
  if (/部分|走水|一半/.test(text)) return "half";
  return "hit";
}

function scoreFromReview(row) {
  if (row.review_score) return Number(row.review_score);
  const body = cleanText(row.review_body);
  const match = body.match(/评分[:：]\s*(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 6;
}

function mapModelId(row, index) {
  const text = `${row.title} ${row.body}`;
  if (/指数|让|受让|\+|-|方向/.test(text)) return "odds-mind";
  if (/进球|大\d|小\d|低进球|比分/.test(text)) return "goal-net";
  if (/伤停|阵容|主力|门将/.test(text)) return "squad-lens";
  if (/冷|爆冷|主场反弹/.test(text)) return "upset-x";
  return modelIds[index % modelIds.length];
}

const mappedPredictions = predictions.map((row, index) => ({
  id: `tg-p${row.id}`,
  match_id: undefined,
  model_id: mapModelId(row, index),
  assistant_model_ids: ["squad-lens", "heat-guard"].filter((id) => id !== mapModelId(row, index)).slice(0, 2),
  title: cleanTitle(row.title),
  competition: extractCompetition(row),
  kickoff_time_text: cleanText(row.event_time_text || row.kickoff_at || "时间待确认"),
  matchup: cleanMatchup(row.event_matchup || [row.home, row.away].filter(Boolean).join(" vs ")),
  visibility: row.visibility === "vip" ? "vip" : "free",
  recommendation: extractRecommendation(row),
  risk_level: riskLevel(row),
  body: splitParagraphs(row.body),
  published_at: publishedAt(row.published_at)
}));

const mappedReviews = predictions
  .filter((row) => cleanText(row.review_body))
  .map((row) => ({
    id: `tg-r${row.id}`,
    prediction_id: `tg-p${row.id}`,
    match_result: cleanText(row.review_body).split("\n").find((line) => /\d+\s*-\s*\d+/.test(line)) || cleanMatchup(row.event_matchup),
    result_status: reviewStatus(`${row.review_result} ${row.review_body}`),
    score: scoreFromReview(row),
    body: splitParagraphs(row.review_body),
    reviewed_at: publishedAt(row.reviewed_at)
  }));

const mappedMatches = matches.map((row) => ({
  id: `wc-${row.match_no}`,
  competition: `世界杯 ${row.stage}`,
  kickoff_time: `${String(row.kickoff_at).slice(5, 16).replace("-", "/")} 北京时间`,
  home_team: cleanText(row.home),
  away_team: cleanText(row.away),
  home_score: row.home_score ?? undefined,
  away_score: row.away_score ?? undefined,
  status: row.status,
  stage: `${row.stage}${row.group_name ? ` ${row.group_name}组` : ""}`
}));

const mappedHotEvents = hotEvents.map((row) => ({
  id: `tg-h${row.id}`,
  title: cleanTitle(row.title),
  competition: cleanText(row.competition),
  kickoff_time_text: cleanText(row.kickoff_text),
  matchup: cleanMatchup(row.matchup),
  body: summarizeHotBody(row.body),
  published_at: publishedAt(row.created_at)
}));

const file = `import { aiModels, type HotEvent, type Match, type Prediction, type Review } from "@/lib/mock-data";

export { aiModels };

export const matches: Match[] = ${JSON.stringify(mappedMatches, null, 2)};

export const predictions: Prediction[] = ${JSON.stringify(mappedPredictions, null, 2)};

export const reviews: Review[] = ${JSON.stringify(mappedReviews, null, 2)};

export const hotEvents: HotEvent[] = ${JSON.stringify(mappedHotEvents, null, 2)};
`;

mkdirSync(path.dirname(outputFile), { recursive: true });
writeFileSync(outputFile, file);
console.log(`Exported ${mappedPredictions.length} predictions, ${mappedReviews.length} reviews, ${mappedMatches.length} matches, ${mappedHotEvents.length} hot events.`);
