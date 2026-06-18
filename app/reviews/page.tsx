import type { Metadata } from "next";
import Link from "next/link";
import { ReviewCard } from "@/components/review-card";
import { SectionHeading } from "@/components/section-heading";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { getAllPredictions, getAllReviews, getReviews } from "@/lib/data";
import { formatBeijingTimeText } from "@/lib/prediction-display";
import { getMonthlyReviewStats, getRecentReviewStats, getReviewToneClass, groupReviewsByVerdict, reviewVerdictInfo, reviewVerdictOrder } from "@/lib/review-display";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";

const reviewsDescription = "足球赛后复盘记录，包含赛前观点、比赛赛果、命中分类、偏差归因和历史表现。";

export const revalidate = 300;

export const metadata: Metadata = createMetadata({
  title: "足球赛后复盘记录：赛前分析结果与模型表现",
  description: reviewsDescription,
  path: "/reviews"
});

export default function ReviewsPage() {
  const reviews = getReviews();
  const allReviews = getAllReviews();
  const predictions = getAllPredictions();
  const reviewedPredictionIds = new Set(allReviews.map((review) => review.prediction_id));
  const pendingReviews = predictions.filter((prediction) => !reviewedPredictionIds.has(prediction.id)).slice(0, 6);
  const monthlyStats = getMonthlyReviewStats(reviews.map(({ review }) => review));
  const recentStats = getRecentReviewStats(reviews.map(({ review }) => review), 10);
  const groupedReviews = groupReviewsByVerdict(reviews);
  const latestReviews = reviews.slice(0, 4);
  const recentLabel = recentStats.total ? `近${recentStats.total}条复盘` : "近期复盘";

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "足球赛后复盘记录", description: reviewsDescription, path: "/reviews" })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: "足球赛后复盘列表",
              path: "/reviews",
              items: reviews.slice(0, 20).map(({ review, prediction }) => ({
                name: `${prediction?.matchup ?? "足球赛事"}赛后复盘`,
                path: `/reviews/${review.id}`
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
                question: "赛后复盘记录什么？",
                answer: "记录已完成复盘的赛前观点，包括原参考方向、比赛结果、命中分类和主要偏差。"
              },
              {
                question: "为什么有些观点还没有复盘？",
                answer: "比赛结束后核对赛果、比赛走势和关键偏差，再进入已完成复盘列表。"
              },
              {
                question: "复盘结论怎么理解？",
                answer: "复盘结论按预测命中、半命中和未命中归类，方便回看赛前判断与实际走势的差异。"
              }
            ])
          )
        }}
      />
      <SectionHeading title="历史复盘记录" eyebrow="Review Archive" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        最近一个月复盘按结果归类，直接区分预测命中、半命中和未命中，同时保留赛前参考方向、最终赛果和主要偏差。
      </p>

      <div className="grid gap-3 md:grid-cols-4">
        {reviewVerdictOrder().map((verdictKey) => {
          const info = reviewVerdictInfo(verdictKey);
          return (
            <div key={verdictKey} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs text-white/45">最近一个月{info.title}</div>
              <div className={`mt-2 text-3xl font-semibold ${getReviewToneClass(info.tone)}`}>
                {monthlyStats[verdictKey]}
              </div>
              <p className="mt-2 text-xs leading-5 text-white/48">最近一个月{info.description}</p>
            </div>
          );
        })}
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="text-xs text-white/45">{recentLabel}表现</div>
          <div className="mt-2 text-sm leading-6 text-white/76">
            命中 {recentStats.hit}｜半命中 {recentStats.half}｜未命中 {recentStats.miss}
          </div>
          <p className="mt-2 text-xs leading-5 text-white/48">按最近完成复盘的场次统计。</p>
        </div>
      </div>

      {latestReviews.length > 0 ? (
        <section>
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">最新复盘</h2>
              <p className="mt-1 text-sm text-white/50">按完成时间展示最近归档的赛后复盘。</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/58">
              最近 {latestReviews.length} 场
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {latestReviews.map(({ review, prediction }) => <ReviewCard key={`latest-${review.id}`} review={review} prediction={prediction} />)}
          </div>
        </section>
      ) : null}

      {reviewVerdictOrder().map((verdictKey) => {
        const info = reviewVerdictInfo(verdictKey);
        const items = groupedReviews[verdictKey];
        if (!items.length) return null;

        return (
          <section key={verdictKey}>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">{info.title}</h2>
                <p className="mt-1 text-sm text-white/50">{info.description}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/58">{items.length} 场</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map(({ review, prediction }) => <ReviewCard key={review.id} review={review} prediction={prediction} />)}
            </div>
          </section>
        );
      })}

      {pendingReviews.length > 0 ? (
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-semibold text-white">待复盘观点</h2>
          <p className="mt-2 text-sm leading-6 text-white/58">已记录赛前参考方向，比赛结果确认后归档到历史复盘。</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {pendingReviews.map((prediction) => (
              <Link key={prediction.id} href={`/predictions/${prediction.id}`} className="rounded-lg border border-white/10 bg-black/20 p-4 transition hover:border-turf/30">
                <div className="text-xs text-turf">{prediction.competition}</div>
                <div className="mt-1 font-semibold text-white">{prediction.matchup}</div>
                <div className="mt-2 text-sm text-white/58">{formatBeijingTimeText(prediction.kickoff_time_text)}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <SeoTopicLinks />
    </div>
  );
}
