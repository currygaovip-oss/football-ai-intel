import type { Metadata } from "next";
import Link from "next/link";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getNamedWorldCupTeams, getTeamMatches, getTeamPath, worldCupBasePath } from "@/lib/world-cup";

const description = "查看世界杯2026球队赛程入口，按球队进入比赛时间、对阵信息和赛前分析页面。";

export const metadata: Metadata = createMetadata({
  title: "世界杯2026球队赛程：各队比赛时间与对阵",
  description,
  path: `${worldCupBasePath}/teams`
});

export default function WorldCupTeamsPage() {
  const teams = getNamedWorldCupTeams();

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "世界杯2026球队赛程", description, path: `${worldCupBasePath}/teams` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: "世界杯2026球队赛程", path: `${worldCupBasePath}/teams`, items: teams.map((team) => ({ name: `${team}世界杯2026赛程`, path: getTeamPath(team) })) }))
        }}
      />

      <section className="border-b border-white/10 pb-5">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">Teams</div>
        <h1 className="mt-2 text-3xl font-semibold text-white">世界杯2026球队赛程</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">按球队查看世界杯2026比赛时间、对阵和赛前分析入口。</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {teams.map((team) => (
          <Link key={team} href={getTeamPath(team)} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-turf/35">
            <h2 className="text-base font-semibold text-white">{team}</h2>
            <p className="mt-2 text-sm text-white/50">{getTeamMatches(team).length} 场已收录比赛</p>
          </Link>
        ))}
      </section>

      <SeoTopicLinks />
    </div>
  );
}
