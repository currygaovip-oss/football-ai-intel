import type { Metadata } from "next";
import { FootballSchedulePage } from "@/app/football-schedule/schedule-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "今日足球赛程：比赛时间、对阵与赛前分析",
  description: "查看今日足球赛程、比赛时间、对阵信息和赛前分析；重点场次包含参考方向。",
  path: "/football-schedule/today"
});

export default function TodayFootballSchedulePage() {
  return <FootballSchedulePage range="today" path="/football-schedule/today" />;
}
