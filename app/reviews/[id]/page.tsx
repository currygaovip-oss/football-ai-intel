import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { getReviewDetail } from "@/lib/data";
import { getOriginalDirection, getReviewSummary, getReviewToneClass, getReviewVerdictMeta } from "@/lib/review-display";
import { articleJsonLd, breadcrumbJsonLd, createMetadata, jsonLd, truncateSeo } from "@/lib/seo";

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
  const verdict = getReviewVerdictMeta(review);
  const title = `${compactMatchup(prediction?.matchup ?? "足球赛事")}赛后复盘：赛前分析结果记录`;
  const description = truncateSeo(`足球赛后复盘：${prediction?.matchup ?? "足球赛事"}，赛果为${review.match_result}，复盘结论为${verdict.label}。`);

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
  const originalDirection = getOriginalDirection(prediction);
  const verdict = getReviewVerdictMeta(review);
  const summary = getReviewSummary(review, prediction);
  const matchupKeyword = compactMatchup(prediction?.matchup ?? "足球赛事");
  const pageTitle = `${matchupKeyword}赛后复盘`;
  const description = truncateSeo(`足球赛后复盘：${prediction?.matchup ?? "足球赛事"}，赛果为${review.match_result}，复盘结论为${verdict.label}。`);

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
          <Badge tone={verdict.tone}>{verdict.label}</Badge>
          <span className="text-sm text-white/45">{review.reviewed_at}</span>
        </div>
        <h1 className="text-3xl font-semibold sm:text-5xl">{prediction?.matchup ?? "赛后复盘详情"}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          复盘记录保留赛前参考方向、最终赛果和主要偏差，用于回看赛前判断与实际走势的差异。
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/45">赛前参考</div>
            <div className="mt-2 text-xl font-semibold leading-snug text-white">{originalDirection}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/45">最终赛果</div>
            <div className="mt-2 text-xl font-semibold leading-snug text-gold">{review.match_result}</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/45">复盘结论</div>
            <div className={`mt-2 text-xl font-semibold ${getReviewToneClass(verdict.tone)}`}>
              {verdict.label}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/45">主要偏差</div>
            <div className="mt-2 text-sm leading-6 text-white/68">{summary}</div>
          </div>
        </div>

        {prediction ? (
          <Link href={`/predictions/${prediction.id}`} className="mt-4 inline-flex rounded-md border border-white/15 px-4 py-2 text-sm text-white/78 hover:border-turf/35 hover:text-turf">
            查看原赛前分析
          </Link>
        ) : null}
        <section className="mt-8 space-y-4 text-base leading-8 text-white/72">
          {review.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
        <div className="mt-8 rounded-lg border border-turf/20 bg-turf/5 p-4 text-sm leading-6 text-white/65">
          复盘会同时记录符合预期和出现偏差的场次，用长期样本回看赛前判断和实际比赛走势。
        </div>
        <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-6 text-white/45">
          免责声明：本内容仅作足球交流、数据研究和赛前阅读参考，不构成任何结果承诺。
        </p>
      </div>
    </article>
  );
}

function compactMatchup(matchup: string) {
  return matchup.replace(/\s+vs\s+/i, "vs").replace(/\s+/g, "");
}
