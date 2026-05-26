import type { Metadata } from "next";
import { FootballSchedulePage } from "@/app/football-schedule/schedule-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "明日足球赛程：比赛时间、对阵与赛前分析",
  description: "查看明日足球赛程、比赛时间、对阵双方和赛前分析，提前关注焦点比赛。",
  path: "/football-schedule/tomorrow"
});

export default function TomorrowFootballSchedulePage() {
  return <FootballSchedulePage range="tomorrow" path="/football-schedule/tomorrow" />;
}
