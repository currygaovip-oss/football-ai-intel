import type { Metadata } from "next";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { createMetadata, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getWorldCupKnockoutMatches, getWorldCupPrediction, getWorldCupStageGroups, worldCupBasePath } from "@/lib/world-cup";

const pageDescription = "世界杯2026淘汰赛赛程整理32强赛、16强赛、1/4决赛、半决赛、季军赛和决赛比赛时间。";

export const metadata: Metadata = createMetadata({
  title: "世界杯2026淘汰赛赛程：32强赛至决赛时间",
  description: pageDescription,
  path: `${worldCupBasePath}/knockout`
});

export default function WorldCupKnockoutPage() {
  const matches = getWorldCupKnockoutMatches();
  const predictions = getAllPredictions();
  const stageGroups = getWorldCupStageGroups(matches);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "世界杯2026淘汰赛赛程", description: pageDescription, path: `${worldCupBasePath}/knockout` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: "世界杯2026淘汰赛赛程",
              path: `${worldCupBasePath}/knockout`,
              items: matches.map((match) => ({
                name: `${match.home_team} vs ${match.away_team}`,
                path: `${worldCupBasePath}/fixtures/${match.id}`
              }))
            })
          )
        }}
      />

      <section className="border-b border-white/10 pb-5">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">Knockout Stage</div>
        <h1 className="mt-2 text-3xl font-semibold text-white">世界杯2026淘汰赛赛程</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">
          从32强赛到决赛，集中查看淘汰赛阶段比赛时间、对阵信息和赛前观点。
        </p>
      </section>

      <div className="space-y-5">
        {stageGroups.map(([stage, groupMatches]) => (
          <section key={stage} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{stage}</h2>
              <span className="text-xs text-white/45">{groupMatches.length} 场比赛</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {groupMatches.map((match) => <WorldCupMatchCard key={match.id} match={match} prediction={getWorldCupPrediction(match, predictions)} />)}
            </div>
          </section>
        ))}
      </div>

      <SeoTopicLinks />
    </div>
  );
}
