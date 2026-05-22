import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { getReviewDetail } from "@/lib/data";
import { articleJsonLd, breadcrumbJsonLd, createMetadata, jsonLd, truncateSeo } from "@/lib/seo";

const statusText = { hit: "命中", miss: "未命中", half: "部分符合" };
const tone = { hit: "green", miss: "red", half: "gold" } as const;

type ReviewParams = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: ReviewParams): Promise<Metadata> {
  const { id } = await params;
  const detail = getReviewDetail(id);
  if (!detail) {
    return createMetadata({
      title: "赛后复盘详情",
      description: "绿茵智报足球 AI 赛后复盘详情。",
      path: `/reviews/${id}`,
      noIndex: true
    });
  }

  const { prediction, review } = detail;
  const title = `${prediction?.matchup ?? "足球赛事"} 赛后复盘`;
  const description = truncateSeo(`比赛结果：${review.match_result}。复盘状态：${statusText[review.result_status]}，评分：${review.score}。`);

  return createMetadata({
    title,
    description,
    path: `/reviews/${review.id}`,
    type: "article"
  });
}

export default async function ReviewDetailPage({ params }: ReviewParams) {
  const { id } = await params;
  const detail = getReviewDetail(id);
  if (!detail) notFound();
  const { prediction, review } = detail;
  const originalDirection = prediction?.recommendation.replace(/^模型倾向：|^参考方向：/, "");
  const pageTitle = `${prediction?.matchup ?? "足球赛事"} 赛后复盘`;
  const description = truncateSeo(`比赛结果：${review.match_result}。复盘状态：${statusText[review.result_status]}，评分：${review.score}。`);

  return (
    <article className="mx-auto max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            articleJsonLd({
              title: pageTitle,
              description,
              path: `/reviews/${review.id}`,
              publishedAt: review.reviewed_at
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
              { name: "赛后复盘", path: "/reviews" },
              { name: prediction?.matchup ?? "复盘详情", path: `/reviews/${review.id}` }
            ])
          )
        }}
      />
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
          <div className="mt-4 text-sm text-white/68">原预测方向：{originalDirection}</div>
        </div>
        <section className="mt-8 space-y-4 text-base leading-8 text-white/72">
          {review.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
        <div className="mt-8 rounded-lg border border-turf/20 bg-turf/5 p-4 text-sm leading-6 text-white/65">
          我们不只展示符合预期的观点，也会记录偏差和未符合预期的场次。模型表现会通过长期样本持续校准，命中的会记录，偏差的也会复盘。
        </div>
        <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-6 text-white/45">
          免责声明：本内容仅用于足球交流、数据研究和赛前阅读参考，不构成任何结果承诺或行动建议。
        </p>
      </div>
    </article>
  );
}
