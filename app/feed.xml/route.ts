import { NextResponse } from "next/server";
import { getAllPredictions, getReviews } from "@/lib/data";
import { seoTopics } from "@/lib/seo-topics";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";
import { getWorldCupFixturePath, getWorldCupMatches, getWorldCupTeamEntries, getTeamPath, worldCupBasePath } from "@/lib/world-cup";

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
  const predictions = getAllPredictions().slice(0, 20).map((prediction) => ({
    title: `${prediction.matchup}赛前分析`,
    description: `${prediction.matchup}，参考方向：${prediction.recommendation}`,
    path: `/predictions/${prediction.id}`,
    date: prediction.published_at
  }));

  const reviews = getReviews().slice(0, 12).map(({ review, prediction }) => ({
    title: `${prediction?.matchup ?? "足球赛事"}赛后复盘`,
    description: `复盘结果：${review.match_result}。原参考方向：${prediction?.recommendation ?? "赛前观点"}`,
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

  const fixtures = getWorldCupMatches().slice(0, 20).map((match) => ({
    title: `${match.home_team} vs ${match.away_team}`,
    description: `${match.kickoff_time}，${match.stage}。`,
    path: getWorldCupFixturePath(match)
  }));

  const items: FeedItem[] = [
    { title: "2026世界杯赛程", description: "2026世界杯赛程、比赛时间、球队资料和赛前观点。", path: worldCupBasePath },
    { title: "2026世界杯北京时间", description: "按北京时间整理2026世界杯揭幕战、决赛、小组赛和淘汰赛开球安排。", path: `${worldCupBasePath}/china-time` },
    ...predictions,
    ...reviews,
    ...topics,
    ...teams,
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
    `<lastBuildDate>${new Date("2026-05-27T00:00:00+07:00").toUTCString()}</lastBuildDate>`,
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
