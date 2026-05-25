import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { getReviews } from "@/lib/data";
import { articleJsonLd, breadcrumbJsonLd, createMetadata, faqJsonLd, jsonLd, sportsEventJsonLd, truncateSeo, webPageJsonLd } from "@/lib/seo";
import { ticketBasePath } from "@/lib/world-cup-tickets";
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

  const title = `${getMatchTitle(match)}比赛时间、赛程与赛前分析`;
  const description = truncateSeo(`${match.home_team} vs ${match.away_team}世界杯2026比赛时间：${getMatchDateLabel(match)} ${getMatchTimeLabel(match)}，赛事阶段：${getStageLabel(match)}，包含赛程信息、赛前观点和参考方向。`);

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
  const title = `${getMatchTitle(match)}比赛时间、赛程与赛前分析`;
  const description = truncateSeo(`${match.home_team} vs ${match.away_team}世界杯2026比赛时间：${getMatchDateLabel(match)} ${getMatchTimeLabel(match)}，赛事阶段：${getStageLabel(match)}，包含赛程信息、赛前观点和参考方向。`);
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: `${match.home_team} vs ${match.away_team}什么时候比赛？`, answer: `本场比赛时间为北京时间${getMatchDateLabel(match)} ${getMatchTimeLabel(match)}。` },
            { question: `${match.home_team} vs ${match.away_team}属于哪个阶段？`, answer: `本场属于世界杯2026${getStageLabel(match)}。` },
            { question: `${match.home_team} vs ${match.away_team}有赛前分析吗？`, answer: prediction ? "本场已有赛前观点，包含完整分析和参考方向。" : "本场赛程信息已确认，重点关注比赛时间、赛事阶段和对阵信息。" }
          ]))
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
          世界杯2026{getStageLabel(match)}赛程信息，包含开球时间、对阵双方和比赛阶段。重点场次提供参考方向和赛前分析。
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
          <h2 className="text-lg font-semibold text-white">赛前分析</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            本场赛程信息已确认，重点关注开球时间、对阵和赛事阶段。
          </p>
          <Link href="/today" className="mt-4 inline-flex rounded-md border border-white/15 px-4 py-2 text-sm text-white/78 hover:border-turf/30 hover:text-turf">
            查看今日情报
          </Link>
        </section>
      )}

      <section className="grid gap-4 lg:grid-cols-3">
        <ContentCard title="比赛看点">
          开球时间、赛事阶段和对阵双方，是赛前判断的第一层信息。
        </ContentCard>
        <ContentCard title="赛前阅读">
          重点场次提供参考方向、球队状态、历史交锋、赛程强度和数据变化。
        </ContentCard>
        <ContentCard title="赛后回看">
          复盘记录原参考方向、实际赛果和主要偏差，便于回看判断质量。
        </ContentCard>
        <ContentCard title="门票与观赛">
          计划现场观赛时，先核对官方票务链接、举办城市、球场信息和入场要求，再结合赛程确认比赛安排。
        </ContentCard>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-xl font-semibold text-white">相关搜索</h2>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-white/58">{match.home_team}vs{match.away_team}比赛时间</span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-white/58">{match.home_team}vs{match.away_team}赛前分析</span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-white/58">{getStageLabel(match)}赛程</span>
        </div>
      </section>

      {review ? (
        <section className="rounded-lg border border-gold/25 bg-gold/10 p-5">
          <h2 className="text-lg font-semibold text-white">赛后复盘</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">这场比赛已有赛后复盘记录，可回看原参考方向与实际赛果差异。</p>
          <Link href={`/reviews/${review.review.id}`} className="mt-4 inline-flex rounded-md border border-gold/35 px-4 py-2 text-sm text-gold hover:bg-gold/10">
            查看赛后复盘
          </Link>
        </section>
      ) : null}

      <section className="flex flex-wrap gap-2">
        <Link href={`${worldCupBasePath}/schedule`} className="rounded-md border border-white/15 px-3 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">世界杯完整赛程</Link>
        <Link href={`${worldCupBasePath}/host-cities`} className="rounded-md border border-white/15 px-3 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">举办城市</Link>
        <Link href={ticketBasePath} className="rounded-md border border-gold/30 px-3 py-2 text-sm text-gold hover:bg-gold/10">世界杯门票信息</Link>
        <Link href={`${worldCupBasePath}/teams`} className="rounded-md border border-white/15 px-3 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">球队赛程</Link>
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
