import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { getReviewDetail } from "@/lib/data";

const statusText = { hit: "命中", miss: "未命中", half: "部分符合" };
const tone = { hit: "green", miss: "red", half: "gold" } as const;

export default async function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = getReviewDetail(id);
  if (!detail) notFound();
  const { prediction, review } = detail;

  return (
    <article className="mx-auto max-w-4xl">
      <div className="glass rounded-lg p-6 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge tone={tone[review.result_status]}>{statusText[review.result_status]}</Badge>
          <Badge tone="white">复盘评分 {review.score}</Badge>
          <span className="text-sm text-white/45">{review.reviewed_at}</span>
        </div>
        <h1 className="text-3xl font-semibold sm:text-5xl">{prediction?.matchup ?? "赛后复盘详情"}</h1>
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="text-sm text-white/58">比赛结果</div>
          <div className="mt-1 text-2xl font-semibold text-gold">{review.match_result}</div>
          <div className="mt-4 text-sm text-white/68">原预测方向：{prediction?.recommendation}</div>
        </div>
        <section className="mt-8 space-y-4 text-base leading-8 text-white/72">
          {review.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
        <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-6 text-white/45">
          免责声明：复盘用于记录模型表现与改进方向，仅供足球交流参考。
        </p>
      </div>
    </article>
  );
}
