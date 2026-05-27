import type { Metadata } from "next";
import Link from "next/link";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getTeamMatches, getTeamPath, getTeamSquadPath, getWorldCupTeamEntries, worldCupBasePath } from "@/lib/world-cup";

const description = "2026世界杯球队赛程，覆盖阿根廷、巴西、法国、英格兰、葡萄牙、美国、墨西哥、加拿大等热门球队的比赛时间、对阵和赛前观点。";

export const metadata: Metadata = createMetadata({
  title: "2026世界杯球队赛程：阿根廷、巴西、法国等球队比赛时间",
  description,
  path: `${worldCupBasePath}/teams`
});

export default function WorldCupTeamsPage() {
  const teams = getWorldCupTeamEntries();

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "世界杯2026球队赛程", description, path: `${worldCupBasePath}/teams` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: "世界杯2026球队赛程", path: `${worldCupBasePath}/teams`, items: teams.map((team) => ({ name: `${team.name}世界杯2026赛程`, path: getTeamPath(team.slug) })) }))
        }}
      />

      <section className="border-b border-white/10 pb-5">
        <div className="text-xs font-semibold tracking-[0.18em] text-turf">球队</div>
        <h1 className="mt-2 text-3xl font-semibold text-white">2026世界杯球队赛程</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">
          按球队查看世界杯比赛时间、对手、阵容名单和重点球员，适合赛前快速确认球队路径。
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {teams.map((team) => (
          <div key={team.slug} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-turf/35">
            <div className="mb-2 text-xs text-turf">{team.region}</div>
            <Link href={getTeamPath(team.slug)} className="block">
              <h2 className="text-base font-semibold text-white hover:text-turf">{team.name}世界杯赛程</h2>
            </Link>
            <p className="mt-2 text-sm text-white/50">{getTeamMatches(team.slug).length} 场世界杯比赛</p>
            <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/45">{team.searchFocus.join(" / ")}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs">
              <Link href={getTeamPath(team.slug)} className="text-turf hover:text-white">球队赛程</Link>
              {team.players?.length ? <Link href={getTeamSquadPath(team.slug)} className="text-turf hover:text-white">阵容名单</Link> : null}
            </div>
          </div>
        ))}
      </section>

      <SeoTopicLinks />
    </div>
  );
}
