import type { Metadata } from "next";
import { FootballSchedulePage } from "@/app/football-schedule/schedule-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "本周足球赛程：比赛时间、重点对阵与赛前分析",
  description: "本周足球赛程、比赛时间、重点对阵和赛前分析。",
  path: "/football-schedule/week"
});

export default function WeekFootballSchedulePage() {
  return <FootballSchedulePage range="week" path="/football-schedule/week" />;
}
