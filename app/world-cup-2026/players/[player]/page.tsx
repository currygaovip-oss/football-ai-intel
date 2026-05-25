import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ShieldCheck, UsersRound } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getPlayerPath, getTeamMatches, getWorldCupPlayerEntries, getWorldCupPlayerEntry, getWorldCupPrediction, worldCupBasePath } from "@/lib/world-cup";

type PlayerParams = { params: Promise<{ player: string }> };

export function generateStaticParams() {
  return getWorldCupPlayerEntries().map((player) => ({ player: player.slug }));
}

export async function generateMetadata({ params }: PlayerParams): Promise<Metadata> {
  const { player } = await params;
  const playerEntry = getWorldCupPlayerEntry(player);
  if (!playerEntry) {
    return createMetadata({
      title: "2026世界杯重点球员看点",
      description: "2026世界杯重点球员看点。",
      path: `${worldCupBasePath}/players/${player}`,
      noIndex: true
    });
  }

  return createMetadata({
    title: `${playerEntry.name}世界杯2026赛程、${playerEntry.teamName}比赛与球员看点`,
    description: `${playerEntry.name}世界杯2026比赛时间、${playerEntry.teamName}赛程、阵容位置和赛前看点。最终名单以官方公布为准。`,
    path: getPlayerPath(playerEntry.slug)
  });
}

export default async function WorldCupPlayerPage({ params }: PlayerParams) {
  const { player } = await params;
  const playerEntry = getWorldCupPlayerEntry(player);
  if (!playerEntry) notFound();

  const path = getPlayerPath(playerEntry.slug);
  const matches = getTeamMatches(playerEntry.teamSlug);
  const predictions = getAllPredictions();
  const featuredMatches = matches.slice(0, 4);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: `${playerEntry.name}世界杯2026看点`, description: `${playerEntry.name}、${playerEntry.teamName}赛程、阵容位置和赛前看点。`, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({
            name: `${playerEntry.teamName}世界杯2026赛程`,
            path,
            items: featuredMatches.map((match) => ({ name: `${match.home_team} vs ${match.away_team}`, path: `${worldCupBasePath}/fixtures/${match.id}` }))
          }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: `${playerEntry.name}会参加2026世界杯吗？`, answer: `最终参赛名单以${playerEntry.teamName}官方公布为准。` },
            { question: `${playerEntry.name}世界杯比赛在哪里看？`, answer: `${playerEntry.teamName}世界杯赛程包含比赛时间、对阵和赛前观点。` },
            { question: `${playerEntry.name}赛前看什么？`, answer: playerEntry.note }
          ]))
        }}
      />

      <section className="grid gap-5 rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
            <UsersRound size={15} /> Player
          </div>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{playerEntry.name}世界杯2026看点</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
            {playerEntry.name}牵动{playerEntry.teamName}比赛热度。赛前重点关注对手、开球时间、出场角色和球队进攻分工。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={playerEntry.teamPath} className="rounded-md bg-turf px-4 py-2.5 text-sm font-semibold text-pitch-950">
              {playerEntry.teamName}赛程
            </Link>
            <Link href={playerEntry.squadPath} className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/78 hover:border-turf/30 hover:text-turf">
              阵容名单
            </Link>
            <Link href="/today" className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/78 hover:border-turf/30 hover:text-turf">
              今日赛前观点
            </Link>
          </div>
        </div>
        {playerEntry.photoUrl ? (
          <figure className="overflow-hidden rounded-lg border border-white/10 bg-black/25">
            <img src={playerEntry.photoUrl} alt={`${playerEntry.name}世界杯2026看点`} className="h-full min-h-[260px] w-full object-cover" />
            {playerEntry.photoCredit ? (
              <figcaption className="border-t border-white/10 px-4 py-2 text-[11px] leading-4 text-white/38">
                图片：{playerEntry.photoSourceUrl ? <a href={playerEntry.photoSourceUrl} target="_blank" rel="noreferrer" className="hover:text-turf">{playerEntry.photoCredit}</a> : playerEntry.photoCredit}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <Info label="所属球队" value={playerEntry.teamName} />
        <Info label="场上位置" value={playerEntry.position} />
        <Info label="关注区域" value={playerEntry.teamRegion} />
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        <InfoPanel title={`${playerEntry.name}比赛看点`}>
          {playerEntry.note}
        </InfoPanel>
        <InfoPanel title={`${playerEntry.teamName}球队看点`}>
          {playerEntry.teamSummary}
        </InfoPanel>
        <InfoPanel title="赛前重点">
          看开球时间、对手强弱、首发位置和出场时间。最终名单与首发阵容以球队官方信息为准。
        </InfoPanel>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
              <CalendarDays size={14} /> Fixtures
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-white">{playerEntry.teamName}世界杯比赛</h2>
          </div>
          <Link href={playerEntry.teamPath} className="text-sm text-turf hover:text-white">全部比赛</Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {featuredMatches.map((match) => <WorldCupMatchCard key={match.id} match={match} prediction={getWorldCupPrediction(match, predictions)} />)}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-turf">
          <ShieldCheck size={14} /> Related Search
        </div>
        <h2 className="mt-2 text-xl font-semibold text-white">相关搜索</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            `${playerEntry.name}世界杯2026`,
            `${playerEntry.name}比赛时间`,
            `${playerEntry.teamName}世界杯阵容`,
            `${playerEntry.teamName}世界杯赛程`
          ].map((keyword) => (
            <span key={keyword} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/58">{keyword}</span>
          ))}
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

function InfoPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/58">{children}</p>
    </div>
  );
}
