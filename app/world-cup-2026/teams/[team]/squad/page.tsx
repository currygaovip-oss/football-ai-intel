import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, UsersRound } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getPlayerPath, getTeamPath, getTeamSquadPath, getWorldCupTeamEntries, getWorldCupTeamEntry } from "@/lib/world-cup";

type SquadParams = { params: Promise<{ team: string }> };

export function generateStaticParams() {
  return getWorldCupTeamEntries().filter((team) => team.players?.length).map((team) => ({ team: team.slug }));
}

export async function generateMetadata({ params }: SquadParams): Promise<Metadata> {
  const { team } = await params;
  const teamEntry = getWorldCupTeamEntry(team);
  if (!teamEntry) return createMetadata({ title: "世界杯2026球队阵容名单", description: "世界杯2026球队阵容名单。", path: `/world-cup-2026/teams/${team}/squad`, noIndex: true });

  return createMetadata({
    title: `${teamEntry.name}世界杯2026阵容名单与重点球员`,
    description: `${teamEntry.name}世界杯2026阵容名单、重点球员、球队看点和赛前观点。最终名单以官方公布为准。`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: `${teamEntry.name}世界杯2026阵容名单`, description: `${teamEntry.name}重点球员、阵容动态和赛前看点。`, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: `${teamEntry.name}重点球员`, path, items: players.map((player) => ({ name: `${teamEntry.name}${player.name}`, path })) }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: `${teamEntry.name}世界杯2026名单公布了吗？`, answer: "最终名单以球队官方公布为准。" },
            { question: `${teamEntry.name}阵容名单看什么？`, answer: "重点看核心球员、位置结构、首发竞争和比赛节奏。" },
            { question: `${teamEntry.name}赛前观点在哪里看？`, answer: "重点比赛的赛前观点展示在球队赛程和今日情报中。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-turf">
            <UsersRound size={15} /> 阵容名单
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{teamEntry.name}世界杯2026阵容名单</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          {teamEntry.squadStatus ?? "最终名单以球队官方公布为准。赛前重点看核心球员状态、位置结构和首发竞争。"}
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
        {teamEntry.profile ? <InfoPanel title={`${teamEntry.name}球队看点`}>{teamEntry.profile}</InfoPanel> : null}
        {teamEntry.style ? <InfoPanel title="阵容重点">{teamEntry.style}</InfoPanel> : null}
        {teamEntry.history ? <InfoPanel title="世界杯关注度">{teamEntry.history}</InfoPanel> : null}
      </section>

      <section>
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
            <ShieldCheck size={14} /> 重点球员
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-white">{teamEntry.name}重点球员</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-white/56">
            最终名单以球队官方公布为准。赛前重点看核心球员状态、位置结构和首发竞争。
          </p>
        </div>

        {players.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {players.map((player) => (
              <article key={player.slug} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
                {player.photoUrl ? (
                  <Link href={getPlayerPath(player.slug)} className="block">
                    <div className="aspect-[3/4] overflow-hidden bg-turf/10">
                      <img
                        src={player.photoUrl}
                        alt={`${player.name}世界杯2026看点`}
                        className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
                        style={{ objectPosition: player.photoPosition ?? "center 18%" }}
                        loading="lazy"
                      />
                    </div>
                  </Link>
                ) : null}
                <div className="p-5">
                  <div className="text-xs text-turf">{player.position}</div>
                  <Link href={getPlayerPath(player.slug)} className="mt-2 block">
                    <h3 className="text-xl font-semibold text-white hover:text-turf">{player.name}</h3>
                  </Link>
                  <p className="mt-3 text-sm leading-7 text-white/58">{player.note}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-white/10 bg-black/20 p-6 text-sm leading-7 text-white/58">
            {teamEntry.name}最终名单以球队官方公布为准。
          </div>
        )}
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-5">
        <h2 className="text-xl font-semibold text-white">名单说明</h2>
        <p className="mt-3 text-sm leading-7 text-white/58">
          世界杯最终参赛名单以各队官方公布为准。看球前可重点关注首发变化、核心球员状态和位置分工。
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
