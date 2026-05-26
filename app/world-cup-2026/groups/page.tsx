import type { Metadata } from "next";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { createMetadata, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getWorldCupGroups, getWorldCupPrediction, worldCupBasePath } from "@/lib/world-cup";

const pageDescription = "世界杯2026小组赛赛程，A 组到 L 组比赛时间、对阵双方和赛前观点。";

export const metadata: Metadata = createMetadata({
  title: "世界杯2026小组赛赛程：A组到L组比赛时间",
  description: pageDescription,
  path: `${worldCupBasePath}/groups`
});

export default function WorldCupGroupsPage() {
  const groups = getWorldCupGroups();
  const predictions = getAllPredictions();
  const allMatches = groups.flatMap(([, matches]) => matches);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "世界杯2026小组赛赛程", description: pageDescription, path: `${worldCupBasePath}/groups` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: "世界杯2026小组赛赛程",
              path: `${worldCupBasePath}/groups`,
              items: allMatches.map((match) => ({
                name: `${match.home_team} vs ${match.away_team}`,
                path: `${worldCupBasePath}/fixtures/${match.id}`
              }))
            })
          )
        }}
      />

      <section className="border-b border-white/10 pb-5">
        <div className="text-xs font-semibold tracking-[0.18em] text-turf">小组赛</div>
        <h1 className="mt-2 text-3xl font-semibold text-white">世界杯2026小组赛赛程</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">
          按小组查看比赛时间和对阵关系，有赛前观点的场次会标出参考方向与分析正文。
        </p>
      </section>

      <div className="grid gap-5">
        {groups.map(([group, matches]) => (
          <section key={group} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{group}</h2>
              <span className="text-xs text-white/45">{matches.length} 场比赛</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {matches.map((match) => <WorldCupMatchCard key={match.id} match={match} prediction={getWorldCupPrediction(match, predictions)} />)}
            </div>
          </section>
        ))}
      </div>

      <SeoTopicLinks />
    </div>
  );
}
