import type { Metadata } from "next";
import Link from "next/link";
import { Activity, BarChart3, CalendarDays, Clock, Database, ShieldCheck, Sparkles, Target } from "lucide-react";
import { Badge } from "@/components/badge";
import { ModelCard } from "@/components/model-card";
import { SectionHeading } from "@/components/section-heading";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { SocialCta } from "@/components/social-cta";
import { getHomeData, type AiModel, type Prediction } from "@/lib/data";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd, websiteJsonLd } from "@/lib/seo";

const homeDescription = "绿茵智报整理今日足球赛程、世界杯赛程、比赛时间、赛前分析、参考方向和赛后复盘，帮助中文足球用户快速阅读重点赛事。";

export const metadata: Metadata = createMetadata({
  title: "今日足球赛程、赛前分析与赛后复盘",
  description: homeDescription,
  path: "/"
});

export default function HomePage() {
  const { aiModels, matches, modelCount, predictions, reviews } = getHomeData();
  const stats = [
    { label: "赛前观点", value: predictions.length, Icon: Activity },
    { label: "数据信号", value: 6, Icon: Database },
    { label: "世界杯赛程", value: matches.length, Icon: CalendarDays },
    { label: "分析席位", value: modelCount, Icon: BarChart3 }
  ];
  const principles = [
    "历史样本 + 指数变化",
    "阵容赛程同步观察",
    "赛后复盘回看偏差"
  ];
  const topPredictions = predictions.slice(0, 5);
  const latestReviews = reviews.slice(0, 2);

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "今日足球赛程、赛前分析与赛后复盘", description: homeDescription, path: "/" })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: "今日足球赛前分析",
              path: "/today",
              items: predictions.slice(0, 6).map(({ prediction }) => ({
                name: `${prediction.matchup}赛前分析`,
                path: `/predictions/${prediction.id}`
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
                question: "绿茵智报主要提供什么足球内容？",
                answer: "绿茵智报整理今日足球赛程、世界杯赛程、赛前分析、参考方向和赛后复盘，方便中文足球用户快速阅读重点赛事。"
              },
              {
                question: "赛前分析适合怎么阅读？",
                answer: "可以先看比赛时间、对阵和参考方向，再进入详情页阅读球队状态、历史交锋、进球趋势和数据变化等分析。"
              },
              {
                question: "赛后复盘有什么作用？",
                answer: "赛后复盘用于记录原参考方向、比赛结果和主要偏差，方便回看赛前判断与实际走势的差异。"
              }
            ])
          )
        }}
      />
      <section className="grid gap-5 xl:grid-cols-[1.45fr_0.75fr]">
        <div className="rounded-lg border border-turf/20 bg-turf/[0.055] p-4 sm:p-5">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">Pre-match Notes</div>
              <h1 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                今日已发布赛前观点
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
                今日重点比赛已整理对阵、时间、参考方向和完整分析，更多赛前更新会同步到 Telegram 群。
              </p>
            </div>
            <Link
              href="/today"
              className="inline-flex shrink-0 rounded-md bg-turf px-4 py-2.5 text-sm font-semibold text-pitch-950"
              data-analytics-event="click_today"
              data-analytics-area="home_hero"
              data-analytics-label="查看全部赛前观点"
            >
              查看全部赛前观点
            </Link>
          </div>

          <div className="mt-4 grid gap-3">
            {topPredictions.map(({ prediction, model }) => <HeroDirectionCard key={prediction.id} prediction={prediction} model={model} />)}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {principles.map((principle) => (
              <span key={principle} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/62">
                <ShieldCheck size={14} className="text-turf" />
                {principle}
              </span>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <SocialCta />
          <div className="grid grid-cols-2 gap-2">
            {stats.map(({ label, value, Icon }) => (
              <Link
                key={label}
                href={label === "世界杯赛程" ? "/world-cup-2026" : label === "赛前观点" ? "/today" : "/about"}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-3 transition hover:border-turf/30"
                data-analytics-event="click_home_stat"
                data-analytics-area="home_stats"
                data-analytics-label={label}
              >
                <Icon className="text-turf" size={16} />
                <div className="mt-2 text-[11px] text-white/45">{label}</div>
                <div className="mt-1 text-xl font-semibold leading-tight">{value}</div>
              </Link>
            ))}
          </div>
          {latestReviews.length > 0 ? (
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-semibold text-white">最新复盘</h2>
                <Link href="/reviews" className="text-xs text-turf">查看全部</Link>
              </div>
              <div className="mt-3 grid gap-2">
                {latestReviews.map(({ review, prediction }) => (
                  <Link
                    key={review.id}
                    href={`/reviews/${review.id}`}
                    className="rounded-md border border-white/10 bg-white/[0.04] p-3 transition hover:border-turf/30"
                    data-analytics-event="click_review"
                    data-analytics-area="home_latest_reviews"
                    data-analytics-label={prediction?.matchup ?? "最新复盘"}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="text-turf">{review.result_status === "hit" ? "命中" : review.result_status === "half" ? "部分符合" : "未命中"}</span>
                      <span className="text-white/40">评分 {review.score}</span>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">{prediction?.matchup}</div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </section>

      {predictions.length > 5 ? (
        <section>
          <SectionHeading title="更多赛前分析" eyebrow="Pre-match Analysis" href="/today" />
          <div className="grid gap-3 md:grid-cols-2">
            {predictions.slice(5, 9).map(({ prediction, model }) => <HomeDirectionCard key={prediction.id} prediction={prediction} model={model} />)}
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeading title="世界杯赛程与比赛时间" eyebrow="Matches" href="/world-cup-2026/schedule" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {matches.slice(0, 8).map((match) => (
            <div key={match.id} className="glass rounded-lg p-5">
              <div className="mb-3 text-xs text-turf">{match.competition} · {match.stage}</div>
              <div className="text-lg font-semibold">{match.home_team} vs {match.away_team}</div>
              <div className="mt-3 text-sm text-white/58">{match.kickoff_time}</div>
              {match.status === "finished" ? <div className="mt-3 text-2xl font-semibold text-gold">{match.home_score}-{match.away_score}</div> : null}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/62">
          赛程页可查看今日足球赛程、明日赛程、世界杯小组赛和淘汰赛安排；有赛前观点的比赛可继续进入详情页阅读参考方向与详细分析。
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <Link href="/football-schedule/today" className="rounded-md border border-white/15 px-3 py-2 text-white/68 hover:border-turf/30 hover:text-turf">今日足球赛程</Link>
          <Link href="/world-cup-2026/host-cities" className="rounded-md border border-white/15 px-3 py-2 text-white/68 hover:border-turf/30 hover:text-turf">世界杯举办城市</Link>
          <Link href="/world-cup-2026/teams" className="rounded-md border border-white/15 px-3 py-2 text-white/68 hover:border-turf/30 hover:text-turf">球队赛程</Link>
        </div>
      </section>

      <section>
        <SectionHeading title="AI分析席位" eyebrow="Analyst Seats" href="/today" />
        <div className="mb-4 rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/62">
          <Sparkles className="mr-2 inline text-turf" size={16} />
          不同分析席位关注不同比赛变量：基本面、指数结构、进球趋势、阵容赛程和热度变化各自提供参考。
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {aiModels.map((model) => <ModelCard key={model.id} model={model} compact />)}
        </div>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function HeroDirectionCard({ prediction, model }: { prediction: Prediction; model?: AiModel }) {
  const direction = prediction.recommendation.replace(/^模型倾向：/, "").replace(/^参考方向：/, "");

  return (
    <Link
      href={`/predictions/${prediction.id}`}
      className="block rounded-lg border border-white/10 bg-black/20 p-3 transition hover:-translate-y-0.5 hover:border-turf/40"
      data-analytics-event="click_prediction"
      data-analytics-area="home_top_predictions"
      data-analytics-label={prediction.matchup}
    >
      <div className="grid gap-3 md:grid-cols-[1fr_0.86fr_auto] md:items-center">
        <div>
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP" : "免费"}</Badge>
            <Badge>{prediction.competition}</Badge>
          </div>
          <h2 className="text-base font-semibold leading-snug text-white sm:text-lg">{prediction.matchup}</h2>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/48">
            <span className="inline-flex items-center gap-1.5"><Clock size={13} />{prediction.kickoff_time_text}</span>
            {model ? <span>{model.name}</span> : null}
          </div>
        </div>

        <div className="rounded-md border border-turf/25 bg-turf/10 px-3 py-2">
          <div className="flex items-center gap-1.5 text-[11px] text-turf">
            <Target size={13} /> 参考方向
          </div>
          <div className="mt-1 text-base font-semibold leading-snug text-white">{direction}</div>
        </div>

        <span className="inline-flex justify-center rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/55 md:justify-start">
          查看分析
        </span>
      </div>
    </Link>
  );
}

function HomeDirectionCard({ prediction, model }: { prediction: Prediction; model?: AiModel }) {
  const direction = prediction.recommendation.replace(/^模型倾向：/, "").replace(/^参考方向：/, "");

  return (
    <Link
      href={`/predictions/${prediction.id}`}
      className="block rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:border-turf/40"
      data-analytics-event="click_prediction"
      data-analytics-area="home_more_predictions"
      data-analytics-label={prediction.matchup}
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_1.08fr_auto] lg:items-center">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP" : "免费"}</Badge>
            <Badge>{prediction.competition}</Badge>
          </div>
          <h3 className="text-lg font-semibold leading-snug text-white">{prediction.matchup}</h3>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/52">
            <span className="inline-flex items-center gap-1.5"><Clock size={14} />{prediction.kickoff_time_text}</span>
            {model ? <span>来源：{model.name}</span> : null}
          </div>
        </div>

        <div className="rounded-lg border border-turf/25 bg-turf/10 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-turf">
            <Target size={15} /> 参考方向
          </div>
          <div className="mt-2 text-lg font-semibold leading-snug text-white">{direction}</div>
        </div>

        <div className="lg:text-right">
          <span className="inline-flex rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/50">查看分析</span>
        </div>
      </div>
    </Link>
  );
}
