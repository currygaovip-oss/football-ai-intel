import type { Metadata } from "next";
import { ReviewCard } from "@/components/review-card";
import { SectionHeading } from "@/components/section-heading";
import { getReviews } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "足球赛后复盘记录：赛前分析结果与模型表现",
  description: "查看足球赛后复盘记录，包含赛前分析结果、比赛赛果、偏差归因、复盘评分和模型表现，用于长期观察比赛观点质量。",
  path: "/reviews"
});

export default function ReviewsPage() {
  const reviews = getReviews();
  const hitCount = reviews.filter(({ review }) => review.result_status === "hit").length;
  const halfCount = reviews.filter(({ review }) => review.result_status === "half").length;
  const averageScore = reviews.length ? (reviews.reduce((sum, { review }) => sum + review.score, 0) / reviews.length).toFixed(1) : "0";

  return (
    <div>
      <SectionHeading title="足球赛后复盘" eyebrow="Trust Record" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        复盘板块独立记录赛前分析的结果、偏差和评分。用户可以通过赛后复盘观察模型倾向是否稳定，也能回看原始赛前观点和比赛结果。
      </p>
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <div className="glass rounded-lg p-4">
          <div className="text-xs text-white/45">已复盘</div>
          <div className="mt-2 text-2xl font-semibold">{reviews.length}</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-xs text-white/45">命中 / 部分符合</div>
          <div className="mt-2 text-2xl font-semibold text-turf">{hitCount}<span className="text-white/35"> / </span>{halfCount}</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-xs text-white/45">平均复盘评分</div>
          <div className="mt-2 text-2xl font-semibold text-gold">{averageScore}</div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map(({ review, prediction }) => <ReviewCard key={review.id} review={review} prediction={prediction} />)}
      </div>
    </div>
  );
}
