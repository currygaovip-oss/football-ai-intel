import { NextResponse } from "next/server";
import { getAllPredictions, getDataSourceInfo, getReviews } from "@/lib/data";
import { getPredictionDirectionDisplay } from "@/lib/prediction-display";
import { seoTopics } from "@/lib/seo-topics";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";
import { getReadableKickoff } from "@/lib/football-schedule";
import { getCityTicketPath } from "@/lib/world-cup-tickets";
import { getHostCityPath, getPlayerPath, getWorldCupFixturePath, getWorldCupMatches, getWorldCupPlayerEntries, getWorldCupTeamEntries, hostCities, getTeamPath, worldCupBasePath } from "@/lib/world-cup";

export const dynamic = "force-static";

type FeedItem = {
  title: string;
  description: string;
  path: string;
  date?: string;
};

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absolute(path: string) {
  return new URL(path, siteUrl).toString();
}

function pubDate(value?: string) {
  if (!value) return new Date("2026-05-27T00:00:00+07:00").toUTCString();
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? new Date("2026-05-27T00:00:00+07:00").toUTCString() : new Date(parsed).toUTCString();
}

function itemXml(item: FeedItem) {
  const link = absolute(item.path);
  return [
    "<item>",
    `<title>${xmlEscape(item.title)}</title>`,
    `<link>${xmlEscape(link)}</link>`,
    `<guid isPermaLink="true">${xmlEscape(link)}</guid>`,
    `<description>${xmlEscape(item.description)}</description>`,
    `<pubDate>${pubDate(item.date)}</pubDate>`,
    "</item>"
  ].join("");
}

export function GET() {
  const dataSource = getDataSourceInfo();
  const predictions = getAllPredictions().slice(0, 20).map((prediction) => ({
    title: `${prediction.matchup}赛前分析`,
    description: `${prediction.matchup}，参考方向：${getPredictionDirectionDisplay(prediction).recommendation}`,
    path: `/predictions/${prediction.id}`,
    date: prediction.published_at
  }));

  const reviews = getReviews().slice(0, 12).map(({ review, prediction }) => ({
    title: `${prediction?.matchup ?? "足球赛事"}赛后复盘`,
    description: `复盘结果：${review.match_result}。原参考方向：${prediction ? getPredictionDirectionDisplay(prediction).recommendation : "赛前观点"}`,
    path: `/reviews/${review.id}`,
    date: review.reviewed_at
  }));

  const topics = seoTopics.slice(0, 16).map((topic) => ({
    title: topic.title,
    description: topic.description,
    path: `/topics/${topic.slug}`
  }));

  const teams = getWorldCupTeamEntries().slice(0, 16).map((team) => ({
    title: `${team.name}世界杯2026赛程`,
    description: team.summary,
    path: getTeamPath(team.slug)
  }));

  const cities = hostCities.slice(0, 16).map((city) => ({
    title: `${city.name}世界杯赛程与球场信息`,
    description: `${city.name}赛区球场为${city.stadium}，可查看城市赛程、门票提醒和观赛信息。`,
    path: getHostCityPath(city.slug)
  }));

  const cityTickets = hostCities.filter((city) => city.highlight).map((city) => ({
    title: `${city.name}世界杯门票信息`,
    description: `${city.name}赛区官方门票信息、球场、城市赛程和观赛提醒。`,
    path: getCityTicketPath(city.slug)
  }));

  const players = getWorldCupPlayerEntries().slice(0, 16).map((player) => ({
    title: `${player.name}世界杯2026看点`,
    description: `${player.name}、${player.teamName}赛程、阵容位置和赛前关注点。`,
    path: getPlayerPath(player.slug)
  }));

  const fixtures = getWorldCupMatches().slice(0, 20).map((match) => ({
    title: `${match.home_team} vs ${match.away_team}`,
    description: `${getReadableKickoff(match)}，${match.stage}。`,
    path: getWorldCupFixturePath(match)
  }));

  const items: FeedItem[] = [
    { title: "2026世界杯赛程", description: "2026世界杯赛程、比赛时间、球队资料和赛前观点。", path: worldCupBasePath },
    { title: "世界杯2026内容导航", description: "按赛程、球队、城市、门票、球员和比赛整理世界杯重点入口。", path: `${worldCupBasePath}/index` },
    { title: "2026世界杯北京时间", description: "按北京时间整理2026世界杯揭幕战、决赛、小组赛和淘汰赛开球安排。", path: `${worldCupBasePath}/china-time` },
    { title: "2026世界杯抽签分组", description: "A组到L组球队、同组对手、小组赛顺序和淘汰赛路径。", path: "/topics/world-cup-2026-draw" },
    { title: "2026世界杯赛制规则", description: "48队、12个小组、104场比赛和32强淘汰赛。", path: "/topics/world-cup-2026-format" },
    { title: "2026世界杯举办球场", description: "美加墨举办城市、球场信息、比赛分布和观赛核对。", path: "/topics/world-cup-2026-stadiums" },
    { title: "2026世界杯在哪里举办", description: "美国、加拿大、墨西哥联合举办，覆盖16座举办城市。", path: "/topics/world-cup-2026-where" },
    { title: "2026世界杯什么时候开始", description: "揭幕战为北京时间6月12日03:00，墨西哥对阵南非。", path: "/topics/world-cup-2026-start-date" },
    { title: "2026世界杯时差与北京时间", description: "按北京时间、举办城市和比赛日确认开球安排。", path: "/topics/world-cup-2026-time-difference" },
    { title: "2026世界杯亚洲球队赛程", description: "日本、韩国等亚洲球队赛程、分组和赛前观察。", path: "/topics/world-cup-2026-asian-teams" },
    ...predictions,
    ...reviews,
    ...topics,
    ...teams,
    ...cities,
    ...cityTickets,
    ...players,
    ...fixtures
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>${xmlEscape(siteName)}</title>`,
    `<link>${xmlEscape(siteUrl)}</link>`,
    `<description>${xmlEscape(siteDescription)}</description>`,
    "<language>zh-CN</language>",
    `<lastBuildDate>${pubDate(dataSource.exportedAt)}</lastBuildDate>`,
    ...items.map(itemXml),
    "</channel>",
    "</rss>"
  ].join("");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
