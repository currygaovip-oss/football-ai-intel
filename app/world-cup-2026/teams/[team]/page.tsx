import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, UsersRound } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getTeamMatches, getTeamPath, getTeamSquadPath, getWorldCupPrediction, getWorldCupTeamEntries, getWorldCupTeamEntry, worldCupBasePath } from "@/lib/world-cup";

type TeamParams = { params: Promise<{ team: string }> };

export function generateStaticParams() {
  return getWorldCupTeamEntries().map((team) => ({ team: team.slug }));
}

export async function generateMetadata({ params }: TeamParams): Promise<Metadata> {
  const { team } = await params;
  const teamEntry = getWorldCupTeamEntry(team);
  if (!teamEntry) return createMetadata({ title: "世界杯2026球队赛程", description: "世界杯2026球队赛程。", path: `${worldCupBasePath}/teams/${team}`, noIndex: true });
  return createMetadata({
    title: `${teamEntry.name}世界杯2026赛程、比赛时间与赛前分析`,
    description: `查看${teamEntry.name}世界杯2026赛程、比赛时间、对阵信息和赛前分析。${teamEntry.summary}`,
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

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: `${teamEntry.name}世界杯2026赛程`, description: `查看${teamEntry.name}世界杯2026赛程、比赛时间和赛前分析。`, path })) }} />
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
            { question: `${teamEntry.name}世界杯2026赛程在哪里看？`, answer: `${teamEntry.name}赛程整理世界杯2026比赛时间、对阵和赛前分析。` },
            { question: `${teamEntry.name}比赛有赛前分析吗？`, answer: "重点场次可查看参考方向和完整分析；其他比赛可先查看赛程与对阵信息。" },
            { question: `${teamEntry.name}世界杯比赛会更新赛前观点吗？`, answer: "重点比赛会根据赛前信息整理参考方向与完整分析。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <UsersRound size={15} /> Team Schedule
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{teamEntry.name}世界杯2026赛程</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          {teamEntry.summary} 重点场次包含参考方向和完整赛前分析。
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <Info label="已收录比赛" value={`${matches.length} 场`} />
        <Info label="关注区域" value={teamEntry.region} />
        <Info label="常见搜索" value={teamEntry.searchFocus[0]} />
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-xl font-semibold text-white">{teamEntry.name}赛程与赛前观点</h2>
        <p className="mt-3 text-sm leading-7 text-white/62">
          {teamEntry.name}赛程包含开球时间、赛事阶段和对阵信息；重点场次提供参考方向和完整赛前分析。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[`${teamEntry.name}世界杯赛程`, `${teamEntry.name}比赛时间`, `${teamEntry.name}赛前分析`].map((keyword) => (
            <span key={keyword} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55">{keyword}</span>
          ))}
        </div>
      </section>

      {teamEntry.profile || teamEntry.style || teamEntry.history ? (
        <section className="grid gap-3 lg:grid-cols-3">
          {teamEntry.profile ? <InfoPanel title={`${teamEntry.name}球队信息`}>{teamEntry.profile}</InfoPanel> : null}
          {teamEntry.style ? <InfoPanel title="赛前观察重点">{teamEntry.style}</InfoPanel> : null}
          {teamEntry.history ? <InfoPanel title="世界杯关注度">{teamEntry.history}</InfoPanel> : null}
        </section>
      ) : null}

      {teamEntry.players?.length ? (
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-turf">
                <ShieldCheck size={14} /> Squad Watch
              </div>
              <h2 className="mt-2 text-xl font-semibold text-white">{teamEntry.name}重点球员观察</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-white/56">
                {teamEntry.squadStatus}
              </p>
            </div>
            <Link href={getTeamSquadPath(teamEntry.slug)} className="text-sm text-turf hover:text-white">
              查看阵容观察
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
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">Fixtures</div>
            <h2 className="mt-1 text-2xl font-semibold text-white">{teamEntry.name}比赛列表</h2>
          </div>
          <Link href={`${worldCupBasePath}/teams`} className="text-sm text-turf hover:text-white">全部球队</Link>
        </div>
        {matches.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {matches.map((match) => <WorldCupMatchCard key={match.id} match={match} prediction={getWorldCupPrediction(match, predictions)} />)}
          </div>
        ) : (
          <div className="rounded-lg border border-white/10 bg-black/20 p-6 text-sm leading-7 text-white/58">
            {teamEntry.name}赛程以官方比赛安排为准，可查看比赛时间、对阵信息和赛前分析。
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
