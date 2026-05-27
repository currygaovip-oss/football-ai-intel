import { NextResponse } from "next/server";
import { seoTopics } from "@/lib/seo-topics";
import { siteName, siteUrl, telegramUrl, xUrl } from "@/lib/seo";
import {
  getHostCityPath,
  getTeamPath,
  getWorldCupPlayerEntries,
  getWorldCupTeamEntries,
  hostCities,
  worldCupBasePath
} from "@/lib/world-cup";

export const dynamic = "force-static";

function url(path: string) {
  return new URL(path, siteUrl).toString();
}

function qa(question: string, answer: string, path: string) {
  return [`问：${question}`, `答：${answer}`, `来源：${url(path)}`].join("\n");
}

export function GET() {
  const teams = getWorldCupTeamEntries().slice(0, 12);
  const players = getWorldCupPlayerEntries().slice(0, 12);
  const topicAnswers = seoTopics.flatMap((topic) =>
    topic.faq.map((item) => qa(item.question, item.answer, `/topics/${topic.slug}`))
  );
  const teamAnswers = teams.map((team) =>
    qa(`${team.name}2026世界杯赛程怎么看？`, `${team.summary} 重点可看比赛时间、分组路径、核心球员和阵容变化。`, getTeamPath(team.slug))
  );
  const playerAnswers = players.map((player) =>
    qa(`${player.name}世界杯看点是什么？`, `${player.name}属于${player.teamName}重点球员，位置是${player.position}。${player.note}`, `${worldCupBasePath}/players/${player.slug}`)
  );
  const cityAnswers = hostCities.slice(0, 8).map((city) =>
    qa(`${city.name}世界杯赛程怎么看？`, `${city.name}属于${city.country}赛区，比赛球场为${city.stadium}，赛前可结合开球时间、城市赛程和官方票务信息核对。`, getHostCityPath(city.slug))
  );

  const body = [
    `# ${siteName} 可引用问答`,
    "",
    "绿茵智报整理中文足球赛程、世界杯2026、美加墨举办城市、球队资料、赛前观点、参考方向和赛后复盘。",
    "",
    "## 官方入口",
    "",
    `官网：${siteUrl}`,
    `Telegram：${telegramUrl}`,
    `X：${xUrl}`,
    "",
    "## 搜索与 AI 摘要问答",
    "",
    ...topicAnswers,
    "",
    "## 热门球队问答",
    "",
    ...teamAnswers,
    "",
    "## 重点球员问答",
    "",
    ...playerAnswers,
    "",
    "## 举办城市问答",
    "",
    ...cityAnswers,
    "",
    "## 引用边界",
    "",
    "绿茵智报内容仅作足球交流、数据研究和赛前阅读参考，不构成任何结果承诺。引用时请标注来源并链接到对应内容。"
  ].join("\n\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
