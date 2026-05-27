import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Trophy } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { getAllPredictions } from "@/lib/data";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import {
  getFinalMatch,
  getMatchDateTimeLabel,
  getOpeningMatch,
  getWorldCupMatches,
  getWorldCupPrediction,
  worldCupBasePath
} from "@/lib/world-cup";

const pagePath = `${worldCupBasePath}/china-time`;
const pageTitle = "2026世界杯北京时间";
const pageDescription = "按北京时间整理2026世界杯揭幕战、决赛、小组赛和淘汰赛开球安排，适合中文球迷赛前确认比赛时间。";

export const metadata: Metadata = createMetadata({
  title: "2026世界杯北京时间：揭幕战、决赛与比赛日",
  description: pageDescription,
  path: pagePath
});

export default function WorldCupChinaTimePage() {
  const matches = getWorldCupMatches();
  const predictions = getAllPredictions();
  const openingMatch = getOpeningMatch();
  const finalMatch = getFinalMatch() ?? matches[matches.length - 1];
  const featuredMatches = matches.slice(0, 9);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: pageTitle, description: pageDescription, path: pagePath })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: "2026世界杯北京时间重点比赛",
              path: pagePath,
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
                question: "2026世界杯北京时间怎么看？",
                answer: "绿茵智报按北京时间整理开球安排，重点覆盖揭幕战、决赛、小组赛和淘汰赛。"
              },
              {
                question: "2026世界杯揭幕战北京时间是什么时候？",
                answer: "北京时间6月12日03:00，墨西哥对阵南非。"
              },
              {
                question: "2026世界杯决赛北京时间是什么时候？",
                answer: "北京时间7月20日03:00，地点为纽约/新泽西大都会人寿体育场。"
              }
            ])
          )
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-turf">
          <Clock3 size={15} /> 北京时间
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">2026世界杯北京时间</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64">
          按北京时间查看美加墨世界杯开球安排。中文球迷重点关注揭幕战、决赛、小组赛比赛日和淘汰赛关键节点。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`${worldCupBasePath}/schedule`} className="rounded-md bg-turf px-4 py-2.5 text-sm font-semibold text-pitch-950">
            完整赛程
          </Link>
          <Link href={`${worldCupBasePath}/opening-match`} className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/78 hover:border-turf/30 hover:text-turf">
            揭幕战
          </Link>
          <Link href={`${worldCupBasePath}/final`} className="rounded-md border border-gold/30 px-4 py-2.5 text-sm text-gold hover:bg-gold/10">
            决赛时间
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <TimeCard title="揭幕战" match={openingMatch} href={`${worldCupBasePath}/opening-match`} />
        <TimeCard title="决赛" match={finalMatch} href={`${worldCupBasePath}/final`} />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="mb-1 text-xs font-semibold tracking-[0.18em] text-turf">MATCH TIME</div>
            <h2 className="text-2xl font-semibold text-white">北京时间重点赛程</h2>
          </div>
          <Link href={`${worldCupBasePath}/schedule`} className="text-sm text-turf hover:text-white">全部赛程</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredMatches.map((match) => (
            <WorldCupMatchCard key={match.id} match={match} prediction={getWorldCupPrediction(match, predictions)} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InfoCard title="中国球迷重点时段">
          美加墨世界杯与中国存在时差，凌晨、上午和中午时段的比赛需要提前确认开球时间。
        </InfoCard>
        <InfoCard title="小组赛比赛日">
          小组赛密集展开，同组对手、末轮形势和休息时间会影响赛前判断。
        </InfoCard>
        <InfoCard title="淘汰赛关键节点">
          32强赛之后进入单场决胜阶段，晋级路径、阵容状态和赛前观点更值得关注。
        </InfoCard>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function TimeCard({ title, match, href }: { title: string; match: ReturnType<typeof getOpeningMatch>; href: string }) {
  return (
    <Link href={href} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-turf/35">
      <div className="text-xs font-semibold tracking-[0.2em] text-turf">{title}</div>
      <h2 className="mt-3 text-2xl font-semibold text-white">{match.home_team} vs {match.away_team}</h2>
      <div className="mt-3 inline-flex items-center gap-2 text-sm text-white/62">
        <Trophy size={15} className="text-gold" />
        {match.stage}
      </div>
      <div className="mt-2 inline-flex items-center gap-2 text-sm text-white/62">
        <Clock3 size={15} className="text-turf" />
        {getMatchDateTimeLabel(match)}
      </div>
    </Link>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/62">{children}</p>
    </div>
  );
}
