import type { Metadata } from "next";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { createMetadata, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getWorldCupMatches, getWorldCupPrediction, worldCupBasePath } from "@/lib/world-cup";

const description = "世界杯2026全部比赛，覆盖小组赛、淘汰赛、比赛时间、对阵双方和赛前观点。";

export const metadata: Metadata = createMetadata({
  title: "世界杯2026全部比赛：赛程、对阵与比赛时间",
  description,
  path: `${worldCupBasePath}/matches`
});

export default function WorldCupMatchesPage() {
  const matches = getWorldCupMatches();
  const predictions = getAllPredictions();

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "世界杯2026全部比赛", description, path: `${worldCupBasePath}/matches` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: "世界杯2026全部比赛", path: `${worldCupBasePath}/matches`, items: matches.map((match) => ({ name: `${match.home_team} vs ${match.away_team}`, path: `${worldCupBasePath}/fixtures/${match.id}` })) }))
        }}
      />

      <section className="border-b border-white/10 pb-5">
        <div className="text-xs font-semibold tracking-[0.18em] text-turf">全部比赛</div>
        <h1 className="mt-2 text-3xl font-semibold text-white">世界杯2026全部比赛</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">按比赛时间浏览全部对阵，有赛前观点的场次会直接标出参考方向。</p>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {matches.map((match) => <WorldCupMatchCard key={match.id} match={match} prediction={getWorldCupPrediction(match, predictions)} />)}
      </section>

      <SeoTopicLinks />
    </div>
  );
}
