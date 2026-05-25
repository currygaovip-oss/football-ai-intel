import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, UsersRound } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getTeamPath, getTeamSquadPath, getWorldCupTeamEntries, getWorldCupTeamEntry } from "@/lib/world-cup";

type SquadParams = { params: Promise<{ team: string }> };

export function generateStaticParams() {
  return getWorldCupTeamEntries().filter((team) => team.players?.length).map((team) => ({ team: team.slug }));
}

export async function generateMetadata({ params }: SquadParams): Promise<Metadata> {
  const { team } = await params;
  const teamEntry = getWorldCupTeamEntry(team);
  if (!teamEntry) return createMetadata({ title: "世界杯2026球队阵容观察", description: "世界杯2026球队阵容观察。", path: `/world-cup-2026/teams/${team}/squad`, noIndex: true });

  return createMetadata({
    title: `${teamEntry.name}世界杯2026阵容观察与重点球员`,
    description: `查看${teamEntry.name}世界杯2026阵容观察、重点球员、赛前关注点和球队信息。最终名单以官方公布为准。`,
    path: getTeamSquadPath(teamEntry.slug)
  });
}

export default async function WorldCupTeamSquadPage({ params }: SquadParams) {
  const { team } = await params;
  const teamEntry = getWorldCupTeamEntry(team);
  if (!teamEntry) notFound();

  const players = teamEntry.players ?? [];
  const path = getTeamSquadPath(teamEntry.slug);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: `${teamEntry.name}世界杯2026阵容观察`, description: `${teamEntry.name}重点球员、阵容动态和赛前观察。`, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: `${teamEntry.name}重点球员观察`, path, items: players.map((player) => ({ name: `${teamEntry.name}${player.name}`, path })) }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: `${teamEntry.name}世界杯2026名单公布了吗？`, answer: "2026世界杯最终名单以官方公布为准。绿茵智报整理重点球员和阵容观察方向。" },
            { question: `${teamEntry.name}阵容页适合看什么？`, answer: "适合查看球队信息、重点球员、阵容动态和赛前观察重点。" },
            { question: `${teamEntry.name}赛前观点在哪里看？`, answer: "重点比赛的赛前观点展示在球队赛程和今日情报中。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <UsersRound size={15} /> Squad Watch
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{teamEntry.name}世界杯2026阵容观察</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          {teamEntry.squadStatus ?? "2026世界杯最终名单以官方公布为准。绿茵智报整理关注球员和阵容观察方向。"}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={getTeamPath(teamEntry.slug)} className="rounded-md bg-turf px-4 py-2.5 text-sm font-semibold text-pitch-950">
            返回球队赛程
          </Link>
          <Link href="/today" className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/78 hover:border-turf/30 hover:text-turf">
            今日赛前观点
          </Link>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        {teamEntry.profile ? <InfoPanel title={`${teamEntry.name}球队信息`}>{teamEntry.profile}</InfoPanel> : null}
        {teamEntry.style ? <InfoPanel title="阵容观察重点">{teamEntry.style}</InfoPanel> : null}
        {teamEntry.history ? <InfoPanel title="世界杯关注度">{teamEntry.history}</InfoPanel> : null}
      </section>

      <section>
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
            <ShieldCheck size={14} /> Players
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">{teamEntry.name}重点球员</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-white/56">
            以下为赛前关注度较高的球员观察，不等同于2026世界杯最终参赛名单。
          </p>
        </div>

        {players.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {players.map((player) => (
              <article key={player.slug} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <div className="text-xs text-turf">{player.position}</div>
                <h3 className="mt-2 text-xl font-semibold text-white">{player.name}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{player.note}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-white/10 bg-black/20 p-6 text-sm leading-7 text-white/58">
            当前重点关注{teamEntry.name}球队信息、阵容变化和赛前观察。
          </div>
        )}
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-5">
        <h2 className="text-xl font-semibold text-white">名单更新说明</h2>
        <p className="mt-3 text-sm leading-7 text-white/58">
          世界杯最终参赛名单以各队官方公布为准。绿茵智报整理高关注球员、阵容变化和赛前观察，帮助赛前快速了解球队轮廓。
        </p>
      </section>

      <SeoTopicLinks />
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
