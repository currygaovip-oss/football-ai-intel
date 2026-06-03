import Link from "next/link";
import { Badge } from "@/components/badge";
import type { Prediction, Review } from "@/lib/data";
import { getOriginalDirection, getReviewSummary, getReviewToneClass, getReviewVerdictMeta } from "@/lib/review-display";

export function ReviewCard({ review, prediction }: { review: Review; prediction?: Prediction }) {
  const originalDirection = getOriginalDirection(prediction);
  const verdict = getReviewVerdictMeta(review);
  const summary = getReviewSummary(review, prediction);

  return (
    <Link
      href={`/reviews/${review.id}`}
      className="glass block rounded-lg p-5 transition hover:-translate-y-0.5 hover:border-gold/40"
      data-analytics-event="click_review"
      data-analytics-area="review_card"
      data-analytics-label={prediction?.matchup ?? "赛后复盘"}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge tone={verdict.tone}>{verdict.label}</Badge>
        <span className="ml-auto text-xs text-white/45">{review.reviewed_at}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{prediction?.matchup ?? "赛后复盘"}</h3>
      <div className="mt-3 grid gap-2 text-sm text-white/64 sm:grid-cols-2">
        <p>赛果：<span className="text-white/82">{review.match_result}</span></p>
        <p>赛前参考：<span className="text-white/82">{originalDirection}</span></p>
      </div>
      <p className={`mt-3 rounded-md border px-3 py-2 text-sm leading-6 text-white/68 ${getReviewToneClass(verdict.tone, "border")}`}>
        {summary}
      </p>
    </Link>
  );
}
