import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronRight, Globe2, MapPin, Ticket, Trophy } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getTeamPath, getWorldCupGroupMatches, getWorldCupKnockoutMatches, getWorldCupMatches, getWorldCupPrediction, getWorldCupTeamEntries, hostCities, worldCupBasePath } from "@/lib/world-cup";

const pageDescription = "2026美加墨世界杯赛程、举办国家、举办城市、揭幕战、决赛、比赛时间和赛前观点。";

export const metadata: Metadata = createMetadata({
  title: "2026世界杯赛程、美加墨举办城市与赛前分析",
  description: pageDescription,
  path: worldCupBasePath
});

export default function WorldCup2026Page() {
  const matches = getWorldCupMatches();
  const groupMatches = getWorldCupGroupMatches();
  const knockoutMatches = getWorldCupKnockoutMatches();
  const predictions = getAllPredictions();
  const featuredMatches = matches.slice(0, 6);
  const featuredTeams = getWorldCupTeamEntries().slice(0, 10);
  const featuredCities = hostCities.filter((city) => city.highlight).concat(hostCities.filter((city) => !city.highlight).slice(0, 4));

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "2026世界杯赛程、美加墨举办城市与赛前分析", description: pageDescription, path: worldCupBasePath })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: "世界杯2026重点赛程",
              path: worldCupBasePath,
              items: featuredMatches.map((match) => ({
                name: `${match.home_team} vs ${match.away_team}`,
                path: `${worldCupBasePath}/fixtures/${match.id}`
              }))
            })
          )
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            faqJsonLd([
              {
                question: "世界杯2026有哪些重点信息？",
                answer: "世界杯2026赛程、比赛时间、小组赛、淘汰赛、举办城市、单场比赛和赛前观点。"
              },
              {
                question: "单场比赛看什么？",
                answer: "单场比赛包含对阵、开球时间、赛事阶段、赛前观点和赛后复盘。"
              },
              {
                question: "世界杯赛前分析什么时候更新？",
                answer: "重点比赛会在开赛前给出参考方向，并同步到今日情报。"
              }
            ])
          )
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <Trophy size={15} /> World Cup 2026
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">2026世界杯赛程与美加墨举办城市</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64">
          看美加墨世界杯比赛时间、小组赛、淘汰赛、举办城市、揭幕战、决赛和赛前观点。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`${worldCupBasePath}/schedule`} className="rounded-md bg-turf px-4 py-2.5 text-sm font-semibold text-pitch-950">
            查看世界杯赛程
          </Link>
          <Link href={`${worldCupBasePath}/host-cities`} className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/78 hover:border-turf/30 hover:text-turf">
            举办城市
          </Link>
          <Link href={`${worldCupBasePath}/tickets`} className="rounded-md border border-gold/30 px-4 py-2.5 text-sm text-gold hover:bg-gold/10">
            门票信息
          </Link>
          <Link href="/today" className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/78 hover:border-turf/30 hover:text-turf">
            今日赛前观点
          </Link>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        <StatCard label="已收录比赛" value={matches.length} href={`${worldCupBasePath}/schedule`} />
        <StatCard label="小组赛" value={groupMatches.length} href={`${worldCupBasePath}/groups`} />
        <StatCard label="淘汰赛" value={knockoutMatches.length} href={`${worldCupBasePath}/knockout`} />
        <StatCard label="赛前观点" value={predictions.length} href="/today" />
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        <TopicCard icon={<Globe2 size={18} />} title="美加墨世界杯" href={`${worldCupBasePath}/host-countries`}>
          美国、加拿大、墨西哥三国联合举办。
        </TopicCard>
        <TopicCard icon={<MapPin size={18} />} title="举办城市" href={`${worldCupBasePath}/host-cities`}>
          16个举办城市、球场与比赛分布。
        </TopicCard>
        <TopicCard icon={<Ticket size={18} />} title="门票信息" href={`${worldCupBasePath}/tickets`}>
          官方票务链接、城市观赛和购票前提醒。
        </TopicCard>
        <TopicCard icon={<Trophy size={18} />} title="揭幕战" href={`${worldCupBasePath}/opening-match`}>
          揭幕战时间、城市和比赛信息。
        </TopicCard>
        <TopicCard icon={<Trophy size={18} />} title="决赛" href={`${worldCupBasePath}/final`}>
          决赛时间、城市和淘汰赛安排。
        </TopicCard>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-turf">Fixtures</div>
            <h2 className="text-2xl font-semibold text-white">世界杯重点赛程</h2>
          </div>
          <Link href={`${worldCupBasePath}/schedule`} className="text-sm text-turf hover:text-white">查看完整赛程</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredMatches.map((match) => <WorldCupMatchCard key={match.id} match={match} prediction={getWorldCupPrediction(match, predictions)} />)}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InfoCard title="世界杯小组赛" href={`${worldCupBasePath}/groups`}>
          A 组到 L 组比赛时间、对阵和比赛日。
        </InfoCard>
        <InfoCard title="世界杯淘汰赛" href={`${worldCupBasePath}/knockout`}>
          32强赛、16强赛、1/4决赛、半决赛、季军赛和决赛。
        </InfoCard>
        <InfoCard title="全部比赛" href={`${worldCupBasePath}/matches`}>
          按赛程顺序看全部比赛、具体对阵和开球时间。
        </InfoCard>
        <InfoCard title="球队赛程" href={`${worldCupBasePath}/teams`}>
          按球队看世界杯比赛时间、对阵信息和赛前观点。
        </InfoCard>
        <InfoCard title="重点球员" href={`${worldCupBasePath}/players`}>
          热门球队核心球员、阵容位置和赛前看点。
        </InfoCard>
        <InfoCard title="单场赛前分析" href="/predictions">
          重点比赛的参考方向与完整分析。
        </InfoCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">热门球队赛程</h2>
            <Link href={`${worldCupBasePath}/teams`} className="text-sm text-turf">全部球队</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {featuredTeams.map((team) => (
              <Link key={team.slug} href={getTeamPath(team.slug)} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/68 hover:border-turf/30 hover:text-turf">
                {team.name}世界杯赛程
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">美加墨举办城市</h2>
            <Link href={`${worldCupBasePath}/host-cities`} className="text-sm text-turf">全部城市</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {featuredCities.map((city) => (
              <Link key={city.slug} href={`${worldCupBasePath}/cities/${city.slug}`} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/68 hover:border-turf/30 hover:text-turf">
                {city.name}世界杯赛程
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function TopicCard({ icon, title, href, children }: { icon: React.ReactNode; title: string; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-turf/35">
      <div className="text-turf">{icon}</div>
      <h2 className="mt-3 text-base font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/58">{children}</p>
    </Link>
  );
}

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-turf/35">
      <CalendarDays className="text-turf" size={17} />
      <div className="mt-3 text-xs text-white/45">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
    </Link>
  );
}

function InfoCard({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-turf/35">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-white/62">{children}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm text-turf">查看详情 <ChevronRight size={14} /></span>
    </Link>
  );
}
