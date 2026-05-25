import type { Metadata } from "next";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { getWorldCupGroups, worldCupBasePath } from "@/lib/world-cup";

export const metadata: Metadata = createMetadata({
  title: "世界杯2026分组图：A组到L组中文赛程",
  description: "查看世界杯2026小组赛分组、比赛时间和赛前分析，适合转发收藏。",
  path: `${worldCupBasePath}/share/groups`
});

export default function WorldCupGroupsSharePage() {
  const groups = getWorldCupGroups();

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-gold/25 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_34rem),linear-gradient(135deg,rgba(6,17,13,0.96),rgba(2,4,3,0.96))] p-6 sm:p-8">
        <div className="flex items-center gap-3 text-gold">
          <Trophy size={22} />
          <span className="text-xs font-semibold uppercase tracking-[0.24em]">Groups</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-white sm:text-5xl">世界杯2026分组赛程</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">A组到L组小组赛集中查看，适合收藏和转发。</p>

        <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-4">
          {groups.map(([group, matches]) => (
            <Link key={group} href={`${worldCupBasePath}/groups`} className="rounded-md border border-white/10 bg-black/20 p-3 hover:border-gold/35">
              <div className="text-lg font-semibold text-white">{group}</div>
              <div className="mt-1 text-xs text-white/46">{matches.length} 场比赛</div>
              <div className="mt-3 text-xs leading-5 text-white/52">{matches.slice(0, 2).map((match) => `${match.home_team} vs ${match.away_team}`).join(" / ")}</div>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link href={`${worldCupBasePath}/groups`} className="rounded-md bg-turf px-4 py-2 text-sm font-semibold text-pitch-950">查看小组赛</Link>
        <Link href={`${worldCupBasePath}/schedule`} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">完整赛程</Link>
      </div>
    </div>
  );
}
