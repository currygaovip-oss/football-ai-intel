import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronRight, Globe2, MapPin, Trophy } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getWorldCupGroupMatches, getWorldCupKnockoutMatches, getWorldCupMatches, getWorldCupPrediction, worldCupBasePath } from "@/lib/world-cup";

const pageDescription = "世界杯2026专题整理美加墨世界杯赛程、举办国家、举办城市、揭幕战、决赛、比赛时间和赛前分析入口。";

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
                question: "世界杯2026专题可以看什么？",
                answer: "可以查看世界杯2026赛程、比赛时间、小组赛、淘汰赛、单场比赛页和赛前分析入口。"
              },
              {
                question: "单场比赛页有什么用？",
                answer: "单场比赛页会整理对阵、开球时间、赛事阶段、赛前观点入口和赛后复盘入口。"
              },
              {
                question: "世界杯赛前分析什么时候更新？",
                answer: "重点比赛会随赛前信息确认后更新，已发布观点会在比赛页和今日情报页显示入口。"
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
          绿茵智报整理美加墨世界杯比赛时间、小组赛、淘汰赛、举办城市、揭幕战、决赛和赛前分析入口。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`${worldCupBasePath}/schedule`} className="rounded-md bg-turf px-4 py-2.5 text-sm font-semibold text-pitch-950">
            查看世界杯赛程
          </Link>
          <Link href={`${worldCupBasePath}/host-cities`} className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/78 hover:border-turf/30 hover:text-turf">
            举办城市
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
          查看美国、加拿大、墨西哥三个举办国家。
        </TopicCard>
        <TopicCard icon={<MapPin size={18} />} title="举办城市" href={`${worldCupBasePath}/host-cities`}>
          16个举办城市与球场信息集中查看。
        </TopicCard>
        <TopicCard icon={<Trophy size={18} />} title="揭幕战" href={`${worldCupBasePath}/opening-match`}>
          查看揭幕战时间、城市和比赛入口。
        </TopicCard>
        <TopicCard icon={<Trophy size={18} />} title="决赛" href={`${worldCupBasePath}/final`}>
          查看决赛时间、城市和淘汰赛入口。
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
          按 A 组到 L 组整理比赛时间和对阵，适合赛前快速确认小组赛比赛日。
        </InfoCard>
        <InfoCard title="世界杯淘汰赛" href={`${worldCupBasePath}/knockout`}>
          32强赛、16强赛、1/4决赛、半决赛、季军赛和决赛集中查看。
        </InfoCard>
        <InfoCard title="全部比赛入口" href={`${worldCupBasePath}/matches`}>
          按赛程顺序查看全部比赛，适合搜索具体对阵和比赛时间。
        </InfoCard>
        <InfoCard title="球队赛程" href={`${worldCupBasePath}/teams`}>
          按球队查看世界杯比赛时间、对阵信息和赛前分析入口。
        </InfoCard>
        <InfoCard title="单场赛前分析" href="/predictions">
          已发布观点的比赛会显示参考方向，详情页可继续阅读赛前分析正文。
        </InfoCard>
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
      <span className="mt-4 inline-flex items-center gap-1 text-sm text-turf">继续查看 <ChevronRight size={14} /></span>
    </Link>
  );
}
