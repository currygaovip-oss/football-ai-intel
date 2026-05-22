import type { Metadata } from "next";
import { ReviewCard } from "@/components/review-card";
import { SectionHeading } from "@/components/section-heading";
import { getReviews } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "赛后复盘记录",
  description: "绿茵智报独立记录足球 AI 赛前观点的赛后复盘、命中情况、偏差归因和模型表现评分。",
  path: "/reviews"
});

export default function ReviewsPage() {
  const reviews = getReviews();
  const hitCount = reviews.filter(({ review }) => review.result_status === "hit").length;
  const halfCount = reviews.filter(({ review }) => review.result_status === "half").length;
  const averageScore = reviews.length ? (reviews.reduce((sum, { review }) => sum + review.score, 0) / reviews.length).toFixed(1) : "0";

  return (
    <div>
      <SectionHeading title="赛后复盘" eyebrow="Trust Record" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        复盘板块独立记录模型观点的命中、偏差和评分。长期来看，这里比单场观点更重要。
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
