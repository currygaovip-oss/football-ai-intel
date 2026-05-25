import type { Metadata } from "next";
import Link from "next/link";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { createMetadata, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getWorldCupDateGroups, getWorldCupMatches, getWorldCupPrediction, worldCupBasePath } from "@/lib/world-cup";

const pageDescription = "世界杯2026完整赛程，覆盖小组赛、淘汰赛、比赛时间、对阵信息和赛前观点。";

export const metadata: Metadata = createMetadata({
  title: "世界杯2026完整赛程：小组赛、淘汰赛与比赛时间",
  description: pageDescription,
  path: `${worldCupBasePath}/schedule`
});

export default function WorldCupSchedulePage() {
  const matches = getWorldCupMatches();
  const predictions = getAllPredictions();
  const dateGroups = getWorldCupDateGroups(matches);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "世界杯2026完整赛程", description: pageDescription, path: `${worldCupBasePath}/schedule` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: "世界杯2026完整赛程",
              path: `${worldCupBasePath}/schedule`,
              items: matches.map((match) => ({
                name: `${match.home_team} vs ${match.away_team}`,
                path: `${worldCupBasePath}/fixtures/${match.id}`
              }))
            })
          )
        }}
      />

      <section className="border-b border-white/10 pb-5">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">World Cup Schedule</div>
        <h1 className="mt-2 text-3xl font-semibold text-white">世界杯2026完整赛程</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">
          按比赛日看世界杯2026赛程、比赛时间和对阵信息。重点场次提供赛前观点。
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <Link href={`${worldCupBasePath}/host-countries`} className="rounded-md border border-white/15 px-3 py-2 text-white/72 hover:border-turf/30 hover:text-turf">美加墨世界杯</Link>
          <Link href={`${worldCupBasePath}/host-cities`} className="rounded-md border border-white/15 px-3 py-2 text-white/72 hover:border-turf/30 hover:text-turf">举办城市</Link>
          <Link href={`${worldCupBasePath}/groups`} className="rounded-md border border-white/15 px-3 py-2 text-white/72 hover:border-turf/30 hover:text-turf">小组赛</Link>
          <Link href={`${worldCupBasePath}/knockout`} className="rounded-md border border-white/15 px-3 py-2 text-white/72 hover:border-turf/30 hover:text-turf">淘汰赛</Link>
          <Link href={`${worldCupBasePath}/teams`} className="rounded-md border border-white/15 px-3 py-2 text-white/72 hover:border-turf/30 hover:text-turf">球队赛程</Link>
          <Link href="/today" className="rounded-md border border-white/15 px-3 py-2 text-white/72 hover:border-turf/30 hover:text-turf">赛前观点</Link>
        </div>
      </section>

      <div className="space-y-5">
        {dateGroups.map(([date, groupMatches]) => (
          <section key={date} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">{date}</h2>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55">{groupMatches.length} 场</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {groupMatches.map((match) => <WorldCupMatchCard key={match.id} match={match} prediction={getWorldCupPrediction(match, predictions)} />)}
            </div>
          </section>
        ))}
      </div>

      <SeoTopicLinks />
    </div>
  );
}
