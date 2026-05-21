import { ReviewCard } from "@/components/review-card";
import { SectionHeading } from "@/components/section-heading";
import { getReviews } from "@/lib/data";

export default function ReviewsPage() {
  const reviews = getReviews();

  return (
    <div>
      <SectionHeading title="赛后复盘" eyebrow="Trust Record" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        复盘板块独立记录模型观点的命中、偏差和评分。长期来看，这里比单场观点更重要。
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map(({ review, prediction }) => <ReviewCard key={review.id} review={review} prediction={prediction} />)}
      </div>
    </div>
  );
}
