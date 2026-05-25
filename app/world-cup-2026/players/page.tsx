import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, UsersRound } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getPlayerPath, getWorldCupPlayerEntries, worldCupBasePath } from "@/lib/world-cup";

const pageDescription = "2026世界杯重点球员、球队赛程、阵容位置和赛前看点，覆盖梅西、姆巴佩、C罗、贝林厄姆、维尼修斯等热门球员。";

export const metadata: Metadata = createMetadata({
  title: "2026世界杯球员名单与重点球员看点",
  description: pageDescription,
  path: `${worldCupBasePath}/players`
});

export default function WorldCupPlayersPage() {
  const players = getWorldCupPlayerEntries();

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "2026世界杯球员名单与重点球员看点", description: pageDescription, path: `${worldCupBasePath}/players` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({
            name: "2026世界杯重点球员看点",
            path: `${worldCupBasePath}/players`,
            items: players.map((player) => ({ name: `${player.name}世界杯2026看点`, path: getPlayerPath(player.slug) }))
          }))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <UsersRound size={15} /> Players
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">2026世界杯重点球员</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          梅西、姆巴佩、C罗、贝林厄姆、维尼修斯等热门球员，是世界杯赛前搜索和比赛讨论的核心。赛前重点关注所属球队、场上位置、比赛时间和关键对阵。
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {players.map((player) => (
          <article key={player.slug} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition hover:border-turf/35">
            {player.photoUrl ? (
              <Link href={getPlayerPath(player.slug)} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-turf/10">
                  <img src={player.photoUrl} alt={`${player.name}世界杯2026看点`} className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10">
                    <span className="rounded-full border border-turf/30 bg-black/35 px-2.5 py-1 text-xs text-turf">{player.teamName}</span>
                  </div>
                </div>
              </Link>
            ) : null}
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-turf/20 bg-turf/10 px-2.5 py-1 text-xs text-turf">{player.teamName}</span>
                <span className="text-xs text-white/42">{player.position}</span>
              </div>
            <Link href={getPlayerPath(player.slug)} className="mt-3 block">
              <h2 className="text-lg font-semibold text-white hover:text-turf">{player.name}世界杯看点</h2>
            </Link>
            <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/50">{player.note}</p>
            {player.photoCredit ? (
              <p className="mt-3 text-[11px] leading-4 text-white/32">图片：{player.photoCredit}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <Link href={getPlayerPath(player.slug)} className="text-turf hover:text-white">球员看点</Link>
              <Link href={player.teamPath} className="text-turf hover:text-white">球队赛程</Link>
            </div>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-turf">
          <ShieldCheck size={14} /> Note
        </div>
        <h2 className="mt-2 text-xl font-semibold text-white">名单与出场说明</h2>
        <p className="mt-3 text-sm leading-7 text-white/58">
          最终名单、首发阵容和出场时间以各队官方信息为准。赛前重点看球员状态、战术角色和比赛对手。
        </p>
      </section>

      <SeoTopicLinks />
    </div>
  );
}
