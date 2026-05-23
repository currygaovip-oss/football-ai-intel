import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { getWorldCupMatches, worldCupBasePath } from "@/lib/world-cup";

export const metadata: Metadata = createMetadata({
  title: "世界杯2026赛程图：中文赛程分享页",
  description: "适合转发的世界杯2026中文赛程入口，查看比赛时间、重点对阵和赛前分析。",
  path: `${worldCupBasePath}/share/schedule`
});

export default function WorldCupScheduleSharePage() {
  const matches = getWorldCupMatches().slice(0, 12);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-turf/25 bg-[radial-gradient(circle_at_top,rgba(0,214,163,0.18),transparent_34rem),linear-gradient(135deg,rgba(6,17,13,0.96),rgba(2,4,3,0.96))] p-6 sm:p-8">
        <div className="flex items-center gap-3 text-turf">
          <CalendarDays size={22} />
          <span className="text-xs font-semibold uppercase tracking-[0.24em]">Share Card</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">世界杯2026中文赛程图</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">适合转发给朋友的赛程入口。点击比赛可继续查看时间、对阵和赛前分析。</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {matches.map((match) => (
            <Link key={match.id} href={`${worldCupBasePath}/fixtures/${match.id}`} className="rounded-md border border-white/10 bg-black/20 p-3 hover:border-turf/35">
              <div className="text-xs text-turf">{match.kickoff_time}</div>
              <div className="mt-1 font-semibold text-white">{match.home_team} vs {match.away_team}</div>
              <div className="mt-1 text-xs text-white/42">{match.stage}</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link href={`${worldCupBasePath}/schedule`} className="rounded-md bg-turf px-4 py-2 text-sm font-semibold text-pitch-950">查看完整赛程</Link>
        <Link href="/today" className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">今日赛前分析</Link>
      </div>
    </div>
  );
}
