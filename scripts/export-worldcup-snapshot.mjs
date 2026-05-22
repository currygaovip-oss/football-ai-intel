import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const projectRoot = process.cwd();
const dbPath =
  process.env.WORLDCUP_BOT_DB_PATH ||
  path.resolve(projectRoot, "..", "worldcup_bot", "worldcup_bot.db");
const outputPath = path.resolve(projectRoot, "data", "worldcup-content.json");

const modelCycle = ["alpha-pitch", "odds-mind", "goal-net", "squad-lens", "heat-guard"];
const assistantCycle = ["odds-mind", "goal-net", "squad-lens", "heat-guard", "alpha-pitch"];

const predictionSql = `
  select
    p.*,
    m.match_no,
    m.stage,
    m.group_name,
    m.kickoff_at,
    m.home_score,
    m.away_score,
    m.status,
    ht.name as home_team,
    at.name as away_team
  from predictions p
  left join matches m on p.match_id = m.id
  left join teams ht on m.home_team_id = ht.id
  left join teams at on m.away_team_id = at.id
  where p.is_published = 1
  order by coalesce(p.published_at, p.created_at) desc, p.id desc
`;

const matchSql = `
  select
    m.id,
    m.match_no,
    m.stage,
    m.group_name,
    m.kickoff_at,
    m.home_score,
    m.away_score,
    m.status,
    ht.name as home_team,
    at.name as away_team
  from matches m
  join teams ht on m.home_team_id = ht.id
  join teams at on m.away_team_id = at.id
  order by m.kickoff_at asc
`;

function rowToPrediction(row) {
  const model_id = modelCycle[row.id % modelCycle.length];
  const assistant_model_ids = assistantCycle.filter((id) => id !== model_id).slice(0, 2);
  const matchup = cleanMatchup(row.event_matchup) || cleanMatchup(formatMatchup(row)) || "待确认对阵";
  const title = cleanTitle(row.title) || matchup;
  const competition = cleanCompetition(row.event_name, row.body, row.stage);
  const kickoff = formatPredictionKickoff(row);

  return {
    id: `tg-p${row.id}`,
    match_id: row.match_id ? `tg-m${row.match_id}` : undefined,
    model_id,
    assistant_model_ids,
    title,
    competition,
    kickoff_time_text: kickoff,
    matchup,
    visibility: row.visibility === "vip" ? "vip" : "free",
    recommendation: formatRecommendation(row),
    risk_level: inferRiskLevel(row.risk_note || row.body || ""),
    body: cleanPredictionBody(row.body, { title, competition, kickoff, matchup }),
    published_at: formatDisplayTime(row.published_at || row.created_at)
  };
}

function rowToReview(row) {
  const result = cleanText(row.review_result);
  const body = cleanReviewBody(row.review_body);
  const statusSource = result && !/已复盘|复盘完成/.test(result) ? result : body.join(" ");

  if (!result && body.length === 0) return [];

  return [
    {
      id: `tg-r${row.id}`,
      prediction_id: `tg-p${row.id}`,
      match_result: formatMatchResult(row, result),
      result_status: inferReviewStatus(statusSource),
      score: Number(row.review_score ?? defaultReviewScore(statusSource)),
      body: body.length > 0 ? body : [`复盘结果：${result || "已复盘"}。后续会继续观察同类样本的模型表现。`],
      reviewed_at: formatDisplayTime(row.reviewed_at || row.published_at || row.created_at)
    }
  ];
}

function rowToMatch(row) {
  return {
    id: `tg-m${row.id}`,
    competition: "世界杯",
    kickoff_time: formatDisplayTime(row.kickoff_at),
    home_team: cleanText(row.home_team) || "待定",
    away_team: cleanText(row.away_team) || "待定",
    home_score: row.home_score ?? undefined,
    away_score: row.away_score ?? undefined,
    status: normalizeMatchStatus(row.status),
    stage: [cleanText(row.stage), row.group_name ? `${cleanText(row.group_name)}组` : ""].filter(Boolean).join(" · ") || "赛程"
  };
}

function cleanPredictionBody(value, context) {
  const skip = new Set(
    [context.title, context.competition, context.kickoff, context.matchup, "今日赛前观点", "AI赛前观点"]
      .map(cleanLoose)
      .filter(Boolean)
  );

  const lines = String(value || "")
    .split(/\n+/)
    .map(cleanText)
    .filter(Boolean)
    .filter((line) => !skip.has(cleanLoose(line)))
    .filter((line) => !/^\d{4}-\d{2}-\d{2}/.test(line))
    .filter((line) => !/投资|博彩|投注|重要声明/.test(line))
    .filter((line) => !["参考方向", "进球思路"].includes(cleanText(line).replace(/[：:]/g, "")))
    .filter((line, index, array) => array.indexOf(line) === index);

  return lines.length > 0 ? lines : ["暂无完整正文，建议结合参考方向和风险提示阅读。"];
}

function cleanReviewBody(value) {
  return String(value || "")
    .split(/\n+/)
    .map(cleanText)
    .filter(Boolean)
    .filter((line) => !/投资|博彩|投注|重要声明/.test(line))
    .filter((line, index, array) => array.indexOf(line) === index);
}

function cleanCompetition(eventName, body, stage) {
  const event = cleanText(eventName);
  if (event && event.length <= 30 && !/今日|观点|基本面|目前|状态/.test(event)) return event;

  const bodyLine = String(body || "")
    .split(/\n+/)
    .map(cleanText)
    .find((line) => line && line.length <= 30 && !/今日|观点|^\d{4}-/.test(line));
  return bodyLine || cleanText(stage) || "足球赛事";
}

function cleanTitle(value) {
  return cleanText(value).replace(/^今日赛前观点\s*/, "").replace(/^AI赛前观点\s*/, "").trim();
}

function cleanMatchup(value) {
  return cleanText(value).replace(/\s+VS\s+/gi, " vs ").replace(/\s+V\s+/gi, " vs ");
}

function formatMatchup(row) {
  if (row.home_team && row.away_team) return `${row.home_team} vs ${row.away_team}`;
  return "";
}

function formatPredictionKickoff(row) {
  return cleanText(row.event_time_text) || formatDisplayTime(row.kickoff_at);
}

function formatRecommendation(row) {
  const pick = cleanText(row.pick);
  if (pick) return pick.startsWith("模型倾向") || pick.startsWith("参考方向") ? pick : `模型倾向：${pick}`;

  const bodyPick = extractSectionValue(row.body, "参考方向");
  if (bodyPick) return `模型倾向：${bodyPick}`;

  const goalLine = cleanText(row.goal_line_view);
  if (goalLine) return `进球思路：${goalLine}`;

  const bodyGoalLine = extractSectionValue(row.body, "进球思路");
  if (bodyGoalLine) return `进球思路：${bodyGoalLine}`;

  const score = cleanText(row.score_reference);
  if (score) return `比分参考：${score}`;

  return "模型倾向：请结合正文分析和风险提示综合阅读。";
}

function formatMatchResult(row, fallback) {
  if (row.home_team && row.away_team && row.home_score != null && row.away_score != null) {
    return `${cleanText(row.home_team)} ${row.home_score}-${row.away_score} ${cleanText(row.away_team)}`;
  }
  return fallback || cleanMatchup(row.event_matchup) || "赛果待补充";
}

function inferRiskLevel(text) {
  const value = cleanText(text);
  if (/高|谨慎|波动|冷门|不确定|风险较大/.test(value)) return "高";
  if (/低|稳健|较稳/.test(value)) return "低";
  return "中";
}

function inferReviewStatus(result) {
  if (/未命中|未能命中|方向未|未能守住|错|黑|失误/.test(result)) return "miss";
  if (/命中|顺利打出|符合/.test(result)) return "hit";
  if (/半|部分|走|平/.test(result)) return "half";
  return "hit";
}

function defaultReviewScore(result) {
  const status = inferReviewStatus(result);
  if (status === "miss") return 4;
  if (status === "half") return 6;
  return 8;
}

function normalizeMatchStatus(status) {
  if (status === "live" || status === "finished") return status;
  return "scheduled";
}

function formatDisplayTime(value) {
  if (!value) return "时间待定";
  const normalized = value.replace("T", " ");
  const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})/);
  if (match) return `${match[2]}/${match[3]} ${match[4]}:${match[5]}`;
  return cleanText(value);
}

function cleanText(value) {
  return String(value || "")
    .replace(/[\uD83C][\uDDE6-\uDDFF]{2}/g, "")
    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
    .replace(/[\u2600-\u27BF]/g, "")
    .replace(/\uFE0F/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanLoose(value) {
  return cleanText(value).replace(/[：:，,。.\s]/g, "").toLowerCase();
}

function extractSectionValue(body, label) {
  const lines = String(body || "").split(/\n+/).map(cleanText).filter(Boolean);
  const index = lines.findIndex((line) => cleanLoose(line) === cleanLoose(label));
  if (index < 0) return "";
  return lines.slice(index + 1).find((line) => line && !line.endsWith("：") && !line.endsWith(":")) || "";
}

if (!existsSync(dbPath)) {
  console.error(`World Cup bot database not found: ${dbPath}`);
  process.exit(1);
}

const database = new DatabaseSync(dbPath, { readOnly: true });

try {
  const predictionRows = database.prepare(predictionSql).all();
  const matchRows = database.prepare(matchSql).all();
  const predictions = predictionRows.map(rowToPrediction);
  const reviews = predictionRows.flatMap(rowToReview);
  const payload = {
    source: "worldcup_bot_snapshot",
    counts: {
      matches: matchRows.length,
      predictions: predictions.length,
      reviews: reviews.length
    },
    matches: matchRows.map(rowToMatch),
    predictions,
    reviews
  };

  mkdirSync(path.dirname(outputPath), { recursive: true });
  if (snapshotContentUnchanged(payload)) {
    console.log(`Snapshot unchanged: ${outputPath}`);
  } else {
    writeFileSync(outputPath, `${JSON.stringify({ exported_at: new Date().toISOString(), ...payload }, null, 2)}\n`, "utf8");
    console.log(`Exported ${payload.counts.predictions} predictions, ${payload.counts.reviews} reviews, ${payload.counts.matches} matches.`);
    console.log(`Snapshot written to ${outputPath}`);
  }
} finally {
  database.close();
}

function snapshotContentUnchanged(nextPayload) {
  if (!existsSync(outputPath)) return false;
  try {
    const currentPayload = JSON.parse(readFileSync(outputPath, "utf8"));
    delete currentPayload.exported_at;
    return stableJson(currentPayload) === stableJson(nextPayload);
  } catch {
    return false;
  }
}

function stableJson(value) {
  return JSON.stringify(value);
}
