import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { getReviews } from "@/lib/data";
import { articleJsonLd, breadcrumbJsonLd, createMetadata, jsonLd, sportsEventJsonLd, truncateSeo, webPageJsonLd } from "@/lib/seo";
import {
  getDirection,
  getEventStartDate,
  getMatchDateLabel,
  getMatchTimeLabel,
  getMatchTitle,
  getStageLabel,
  getWorldCupFixturePath,
  getWorldCupMatch,
  getWorldCupMatches,
  getWorldCupPrediction,
  worldCupBasePath
} from "@/lib/world-cup";

type FixtureParams = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getWorldCupMatches().map((match) => ({ id: match.id }));
}

export async function generateMetadata({ params }: FixtureParams): Promise<Metadata> {
  const { id } = await params;
  const match = getWorldCupMatch(id);
  if (!match) {
    return createMetadata({
      title: "世界杯2026比赛详情",
      description: "世界杯2026比赛详情。",
      path: `${worldCupBasePath}/fixtures/${id}`,
      noIndex: true
    });
  }

  const title = `${getMatchTitle(match)}比赛时间与赛前分析`;
  const description = truncateSeo(`${match.home_team} vs ${match.away_team}世界杯2026比赛时间：${getMatchDateLabel(match)} ${getMatchTimeLabel(match)}，赛事阶段：${getStageLabel(match)}。`);

  return createMetadata({
    title,
    description,
    path: getWorldCupFixturePath(match),
    type: "article"
  });
}

export default async function WorldCupFixturePage({ params }: FixtureParams) {
  const { id } = await params;
  const match = getWorldCupMatch(id);
  if (!match) notFound();

  const prediction = getWorldCupPrediction(match);
  const review = prediction ? getReviews().find((item) => item.prediction?.id === prediction.id) : undefined;
  const path = getWorldCupFixturePath(match);
  const title = `${getMatchTitle(match)}比赛时间与赛前分析`;
  const description = truncateSeo(`${match.home_team} vs ${match.away_team}世界杯2026比赛时间：${getMatchDateLabel(match)} ${getMatchTimeLabel(match)}，赛事阶段：${getStageLabel(match)}。`);
  const direction = getDirection(prediction);

  return (
    <article className="mx-auto max-w-5xl space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: title, description, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            sportsEventJsonLd({
              name: `${match.home_team} vs ${match.away_team}`,
              path,
              startDate: getEventStartDate(match),
              competition: match.competition,
              homeTeam: match.home_team,
              awayTeam: match.away_team
            })
          )
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbJsonLd([
              { name: "首页", path: "/" },
              { name: "世界杯2026", path: worldCupBasePath },
              { name: `${match.home_team} vs ${match.away_team}`, path }
            ])
          )
        }}
      />
      {prediction ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(
              articleJsonLd({
                title: `${getMatchTitle(match)}赛前分析`,
                description: truncateSeo(`${match.home_team} vs ${match.away_team}赛前分析：${prediction.recommendation}`),
                path: `/predictions/${prediction.id}`,
                publishedAt: prediction.published_at
              })
            )
          }}
        />
      ) : null}

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge>{match.competition}</Badge>
          <Badge>{getStageLabel(match)}</Badge>
          {prediction ? <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP观点" : "赛前观点"}</Badge> : null}
        </div>
        <h1 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">{match.home_team} vs {match.away_team}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64">
          世界杯2026{getStageLabel(match)}比赛页，整理比赛时间、对阵信息、赛前观点入口和赛后复盘入口。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <InfoBlock label="比赛时间" value={`${getMatchDateLabel(match)} ${getMatchTimeLabel(match)}`} />
        <InfoBlock label="赛事阶段" value={getStageLabel(match)} />
        <InfoBlock label="比赛状态" value={match.status === "finished" ? "已结束" : match.status === "live" ? "进行中" : "未开始"} />
      </section>

      {direction ? (
        <section className="rounded-lg border border-turf/25 bg-turf/10 p-5">
          <div className="text-sm font-semibold text-turf">参考方向</div>
          <div className="mt-2 text-2xl font-semibold leading-snug text-white">{direction}</div>
          <Link href={`/predictions/${prediction?.id}`} className="mt-4 inline-flex rounded-md border border-turf/30 px-4 py-2 text-sm text-turf hover:bg-turf/10">
            查看完整赛前分析
          </Link>
        </section>
      ) : (
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold text-white">赛前分析入口</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            本场比赛的赛前观点尚未发布。比赛临近时，可在今日情报页查看已更新的重点比赛分析。
          </p>
          <Link href="/today" className="mt-4 inline-flex rounded-md border border-white/15 px-4 py-2 text-sm text-white/78 hover:border-turf/30 hover:text-turf">
            查看今日赛前观点
          </Link>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-3">
        <ContentCard title="比赛看点">
          先确认比赛时间、阶段和对阵，再结合球队状态、赛程强度、阵容消息和数据变化阅读赛前观点。
        </ContentCard>
        <ContentCard title="赛前阅读">
          已发布观点会标注参考方向，并在详情页展开完整分析，方便赛前快速判断本场比赛的重点变量。
        </ContentCard>
        <ContentCard title="赛后回看">
          比赛结束后，如已完成复盘，会记录原参考方向、比赛结果和主要偏差，方便长期回看。
        </ContentCard>
      </section>

      {review ? (
        <section className="rounded-lg border border-gold/25 bg-gold/10 p-5">
          <h2 className="text-lg font-semibold text-white">赛后复盘</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">本场已有赛后复盘记录，可回看原参考方向与实际赛果差异。</p>
          <Link href={`/reviews/${review.review.id}`} className="mt-4 inline-flex rounded-md border border-gold/35 px-4 py-2 text-sm text-gold hover:bg-gold/10">
            查看赛后复盘
          </Link>
        </section>
      ) : null}

      <section className="flex flex-wrap gap-2">
        <Link href={`${worldCupBasePath}/schedule`} className="rounded-md border border-white/15 px-3 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">世界杯完整赛程</Link>
        <Link href={`${worldCupBasePath}/groups`} className="rounded-md border border-white/15 px-3 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">世界杯小组赛</Link>
        <Link href={`${worldCupBasePath}/knockout`} className="rounded-md border border-white/15 px-3 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">世界杯淘汰赛</Link>
      </section>

      <SeoTopicLinks />
    </article>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs text-white/45">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function ContentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-white/62">{children}</p>
    </div>
  );
}
