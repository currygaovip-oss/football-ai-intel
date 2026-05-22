import type { Metadata } from "next";
import Link from "next/link";
import { ReviewCard } from "@/components/review-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllPredictions, getAllReviews, getReviews } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "足球赛后复盘记录：赛前分析结果与模型表现",
  description: "查看足球赛后复盘记录，包含赛前分析结果、比赛赛果、偏差归因、复盘评分和模型表现，用于长期观察比赛观点质量。",
  path: "/reviews"
});

export default function ReviewsPage() {
  const reviews = getReviews();
  const allReviews = getAllReviews();
  const predictions = getAllPredictions();
  const reviewedPredictionIds = new Set(allReviews.map((review) => review.prediction_id));
  const pendingReviews = predictions.filter((prediction) => !reviewedPredictionIds.has(prediction.id)).slice(0, 6);
  const hitCount = reviews.filter(({ review }) => review.result_status === "hit").length;
  const halfCount = reviews.filter(({ review }) => review.result_status === "half").length;
  const averageScore = reviews.length ? (reviews.reduce((sum, { review }) => sum + review.score, 0) / reviews.length).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <SectionHeading title="历史复盘记录" eyebrow="Review Archive" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        这里记录已经完成复盘的赛前观点，不代表今日新增数量。用户可以回看原参考方向、比赛结果、符合情况和主要偏差。
      </p>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="text-xs text-white/45">历史复盘</div>
          <div className="mt-2 text-2xl font-semibold">{reviews.length}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="text-xs text-white/45">命中 / 部分符合</div>
          <div className="mt-2 text-2xl font-semibold text-turf">{hitCount}<span className="text-white/35"> / </span>{halfCount}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="text-xs text-white/45">平均复盘评分</div>
          <div className="mt-2 text-2xl font-semibold text-gold">{averageScore}</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="text-xs text-white/45">待复盘观点</div>
          <div className="mt-2 text-2xl font-semibold text-white">{pendingReviews.length}</div>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-white">已完成复盘</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map(({ review, prediction }) => <ReviewCard key={review.id} review={review} prediction={prediction} />)}
        </div>
      </section>

      {pendingReviews.length > 0 ? (
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-xl font-semibold text-white">待复盘观点</h2>
          <p className="mt-2 text-sm leading-6 text-white/58">这些赛前观点已经发布，比赛结束并整理完成后会补充复盘记录。</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {pendingReviews.map((prediction) => (
              <Link key={prediction.id} href={`/predictions/${prediction.id}`} className="rounded-lg border border-white/10 bg-black/20 p-4 transition hover:border-turf/30">
                <div className="text-xs text-turf">{prediction.competition}</div>
                <div className="mt-1 font-semibold text-white">{prediction.matchup}</div>
                <div className="mt-2 text-sm text-white/58">{prediction.kickoff_time_text}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
