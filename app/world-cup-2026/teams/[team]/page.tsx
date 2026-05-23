import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UsersRound } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { createMetadata, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getNamedWorldCupTeams, getTeamMatches, getTeamPath, getWorldCupPrediction, worldCupBasePath } from "@/lib/world-cup";

type TeamParams = { params: Promise<{ team: string }> };

export function generateStaticParams() {
  return getNamedWorldCupTeams().map((team) => ({ team }));
}

export async function generateMetadata({ params }: TeamParams): Promise<Metadata> {
  const { team } = await params;
  const decodedTeam = decodeURIComponent(team);
  const teams = getNamedWorldCupTeams();
  if (!teams.includes(decodedTeam)) return createMetadata({ title: "世界杯2026球队赛程", description: "世界杯2026球队赛程。", path: `${worldCupBasePath}/teams/${team}`, noIndex: true });
  return createMetadata({
    title: `${decodedTeam}世界杯2026赛程与比赛时间`,
    description: `查看${decodedTeam}世界杯2026赛程、比赛时间、对阵信息和赛前分析入口。`,
    path: getTeamPath(decodedTeam)
  });
}

export default async function WorldCupTeamPage({ params }: TeamParams) {
  const { team } = await params;
  const decodedTeam = decodeURIComponent(team);
  const teams = getNamedWorldCupTeams();
  if (!teams.includes(decodedTeam)) notFound();

  const matches = getTeamMatches(decodedTeam);
  const predictions = getAllPredictions();
  const path = getTeamPath(decodedTeam);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: `${decodedTeam}世界杯2026赛程`, description: `查看${decodedTeam}世界杯2026赛程、比赛时间和赛前分析入口。`, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: `${decodedTeam}世界杯2026赛程`, path, items: matches.map((match) => ({ name: `${match.home_team} vs ${match.away_team}`, path: `${worldCupBasePath}/fixtures/${match.id}` })) }))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <UsersRound size={15} /> Team Schedule
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{decodedTeam}世界杯2026赛程</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          查看{decodedTeam}在世界杯2026的比赛时间、对阵信息和赛前分析入口。已发布观点的比赛会显示参考方向。
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <Info label="已收录比赛" value={`${matches.length} 场`} />
        <Info label="赛事" value="世界杯2026" />
        <Info label="内容入口" value="赛程 / 分析 / 复盘" />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">Fixtures</div>
            <h2 className="mt-1 text-2xl font-semibold text-white">{decodedTeam}比赛列表</h2>
          </div>
          <Link href={`${worldCupBasePath}/teams`} className="text-sm text-turf hover:text-white">全部球队</Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {matches.map((match) => <WorldCupMatchCard key={match.id} match={match} prediction={getWorldCupPrediction(match, predictions)} />)}
        </div>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs text-white/45">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}
