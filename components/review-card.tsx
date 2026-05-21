import Link from "next/link";
import { Badge } from "@/components/badge";
import type { Prediction, Review } from "@/lib/data";

const statusText = { hit: "命中", miss: "未命中", half: "部分符合" };
const tone = { hit: "green", miss: "red", half: "gold" } as const;

export function ReviewCard({ review, prediction }: { review: Review; prediction?: Prediction }) {
  return (
    <Link href={`/reviews/${review.id}`} className="glass block rounded-lg p-5 transition hover:-translate-y-0.5 hover:border-gold/40">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge tone={tone[review.result_status]}>{statusText[review.result_status]}</Badge>
        <Badge tone="white">复盘评分 {review.score}</Badge>
        <span className="ml-auto text-xs text-white/45">{review.reviewed_at}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{prediction?.matchup ?? "赛后复盘"}</h3>
      <p className="mt-2 text-sm text-white/62">赛果：{review.match_result}</p>
      <p className="mt-3 text-sm text-white/72">原模型倾向：{prediction?.recommendation}</p>
    </Link>
  );
}
