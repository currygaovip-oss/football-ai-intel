import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, UsersRound } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { absoluteUrl, breadcrumbJsonLd, createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import {
  getDirection,
  getMatchDateTimeLabel,
  getStageLabel,
  getTeamMatches,
  getTeamPath,
  getTeamSquadPath,
  getWorldCupFixturePath,
  getWorldCupPrediction,
  getWorldCupTeamEntries,
  getWorldCupTeamEntry,
  worldCupBasePath
} from "@/lib/world-cup";

type TeamParams = { params: Promise<{ team: string }> };

export function generateStaticParams() {
  return getWorldCupTeamEntries().map((team) => ({ team: team.slug }));
}

export async function generateMetadata({ params }: TeamParams): Promise<Metadata> {
  const { team } = await params;
  const teamEntry = getWorldCupTeamEntry(team);
  if (!teamEntry) return createMetadata({ title: "世界杯2026球队赛程", description: "世界杯2026球队赛程。", path: `${worldCupBasePath}/teams/${team}`, noIndex: true });
  return createMetadata({
    title: `${teamEntry.name}世界杯2026赛程、比赛时间与赛前观点`,
    description: `${teamEntry.name}世界杯2026赛程、比赛时间、对阵、核心球员和赛前观点，小组赛与淘汰赛重点一并整理。`,
    path: getTeamPath(teamEntry.slug)
  });
}

export default async function WorldCupTeamPage({ params }: TeamParams) {
  const { team } = await params;
  const teamEntry = getWorldCupTeamEntry(team);
  if (!teamEntry) notFound();

  const matches = getTeamMatches(teamEntry.slug);
  const predictions = getAllPredictions();
  const path = getTeamPath(teamEntry.slug);
  const firstMatch = matches[0];
  const firstPrediction = firstMatch ? getWorldCupPrediction(firstMatch, predictions) : undefined;
  const firstDirection = getDirection(firstPrediction);
  const firstOpponent = firstMatch ? (firstMatch.home_team === teamEntry.name ? firstMatch.away_team : firstMatch.home_team) : "";
  const predictionCount = matches.filter((match) => getWorldCupPrediction(match, predictions)).length;

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: `${teamEntry.name}世界杯2026赛程`, description: teamEntry.summary, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            name: teamEntry.name,
            sport: "Football",
            url: absoluteUrl(path),
            memberOf: {
              "@type": "SportsOrganization",
              name: "FIFA World Cup 2026"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: `${teamEntry.name}世界杯2026赛程`, path, items: matches.map((match) => ({ name: `${match.home_team} vs ${match.away_team}`, path: `${worldCupBasePath}/fixtures/${match.id}` })) }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: `${teamEntry.name}世界杯2026赛程在哪里看？`, answer: `${teamEntry.name}世界杯赛程包含比赛时间、对手和赛事阶段。` },
            { question: `${teamEntry.name}比赛有赛前观点吗？`, answer: predictionCount > 0 ? `${teamEntry.name}已有${predictionCount}场比赛整理赛前观点。` : "赛前重点关注首发、伤停、球队状态和赛程压力。" },
            { question: `${teamEntry.name}世界杯赛前看什么？`, answer: "重点关注开球时间、对手、首发结构和关键球员状态。" }
          ]))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbJsonLd([
              { name: "首页", path: "/" },
              { name: "世界杯2026", path: worldCupBasePath },
              { name: "球队赛程", path: `${worldCupBasePath}/teams` },
              { name: teamEntry.name, path }
            ])
          )
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-turf">
            <UsersRound size={15} /> 球队赛程
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{teamEntry.name}世界杯2026赛程</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          {teamEntry.summary}
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        <Info label="世界杯赛程" value={`${matches.length} 场`} />
        <Info label="关注区域" value={teamEntry.region} />
        <Info label="赛前观点" value={predictionCount > 0 ? `${predictionCount} 场` : "临场关注"} />
        <Info label="常见搜索" value={teamEntry.searchFocus[0]} />
      </section>

      {firstMatch ? (
        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Link
            href={getWorldCupFixturePath(firstMatch)}
            className="rounded-lg border border-turf/20 bg-turf/[0.075] p-5 transition hover:-translate-y-0.5 hover:border-turf/40"
          >
            <div className="text-xs font-semibold tracking-[0.18em] text-turf">下一场比赛</div>
            <h2 className="mt-3 text-2xl font-semibold text-white">{teamEntry.name} vs {firstOpponent}</h2>
            <div className="mt-3 grid gap-3 text-sm text-white/62 sm:grid-cols-2">
              <span>{getMatchDateTimeLabel(firstMatch)}</span>
              <span>{getStageLabel(firstMatch)}</span>
            </div>
            <div className="mt-4 text-sm text-turf">查看这场比赛</div>
          </Link>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-xl font-semibold text-white">{teamEntry.name}赛前看点</h2>
            {firstDirection ? (
              <div className="mt-3 rounded-md border border-turf/25 bg-turf/10 px-3 py-2">
                <div className="text-xs text-turf">参考方向</div>
                <div className="mt-1 text-lg font-semibold text-white">{firstDirection}</div>
              </div>
            ) : null}
            <p className="mt-3 text-sm leading-7 text-white/62">
              {teamEntry.profile ?? `${teamEntry.name}的世界杯赛程、核心球员状态和比赛节奏值得持续关注。`}
            </p>
          </div>
        </section>
      ) : null}

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-xl font-semibold text-white">{teamEntry.name}赛前关注</h2>
        <p className="mt-3 text-sm leading-7 text-white/62">
          小组赛对手、开球时间、比赛阶段、核心球员状态和阵容结构，会直接影响赛前判断。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[`${teamEntry.name}世界杯赛程`, `${teamEntry.name}比赛时间`, `${teamEntry.name}赛前分析`].map((keyword) => (
            <span key={keyword} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55">{keyword}</span>
          ))}
        </div>
      </section>

      {teamEntry.profile || teamEntry.style || teamEntry.history ? (
        <section className="grid gap-3 lg:grid-cols-3">
          {teamEntry.profile ? <InfoPanel title={`${teamEntry.name}球队看点`}>{teamEntry.profile}</InfoPanel> : null}
          {teamEntry.style ? <InfoPanel title="赛前重点">{teamEntry.style}</InfoPanel> : null}
          {teamEntry.history ? <InfoPanel title="世界杯关注度">{teamEntry.history}</InfoPanel> : null}
        </section>
      ) : null}

      {teamEntry.players?.length ? (
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-turf">
                <ShieldCheck size={14} /> 阵容观察
              </div>
              <h2 className="mt-2 text-xl font-semibold text-white">{teamEntry.name}重点球员</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/56">
                {teamEntry.squadStatus}
              </p>
            </div>
            <Link href={getTeamSquadPath(teamEntry.slug)} className="text-sm text-turf hover:text-white">
              查看阵容名单
            </Link>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {teamEntry.players.slice(0, 4).map((player) => (
              <div key={player.slug} className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-turf">{player.position}</div>
                <h3 className="mt-2 text-lg font-semibold text-white">{player.name}</h3>
                <p className="mt-2 text-xs leading-5 text-white/50">{player.note}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-turf">赛程</div>
            <h2 className="mt-1 text-2xl font-semibold text-white">{teamEntry.name}世界杯赛程</h2>
          </div>
          <Link href={`${worldCupBasePath}/teams`} className="text-sm text-turf hover:text-white">全部球队</Link>
        </div>
        {matches.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {matches.map((match) => <WorldCupMatchCard key={match.id} match={match} prediction={getWorldCupPrediction(match, predictions)} />)}
          </div>
        ) : (
          <div className="rounded-lg border border-white/10 bg-black/20 p-6 text-sm leading-7 text-white/58">
            {teamEntry.name}赛程以国际足联公布安排为准。
          </div>
        )}
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

function InfoPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/58">{children}</p>
    </div>
  );
}
