import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Target } from "lucide-react";
import { Badge } from "@/components/badge";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { getTodayPredictions } from "@/lib/data";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";

const description = "足球赛前分析、今日比赛观点、参考方向和完整分析，覆盖世界杯、五大联赛、杯赛和焦点赛事。";

export const metadata: Metadata = createMetadata({
  title: "足球赛前分析：今日观点、参考方向与比赛解读",
  description,
  path: "/predictions"
});

export default function PredictionsPage() {
  const predictions = getTodayPredictions();

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "足球赛前分析", description, path: "/predictions" })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: "足球赛前分析列表", path: "/predictions", items: predictions.map(({ prediction }) => ({ name: `${prediction.matchup}赛前分析`, path: `/predictions/${prediction.id}` })) }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: "足球赛前分析看什么？", answer: "重点看比赛对阵、开球时间、参考方向和完整赛前分析。" },
            { question: "赛前分析和赛后复盘有什么关系？", answer: "赛前分析记录比赛前的观点，赛后复盘回看原参考方向与实际走势的差异。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">Predictions</div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">足球赛前分析</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          今日比赛观点提供比赛时间、参考方向和完整分析。
        </p>
      </section>

      <section className="grid gap-3">
        {predictions.map(({ prediction, model }) => {
          const direction = prediction.recommendation.replace(/^模型倾向：/, "").replace(/^参考方向：/, "");
          return (
            <Link key={prediction.id} href={`/predictions/${prediction.id}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-turf/35">
              <div className="grid gap-3 lg:grid-cols-[1fr_0.9fr_auto] lg:items-center">
                <div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP" : "免费"}</Badge>
                    <Badge>{prediction.competition}</Badge>
                  </div>
                  <h2 className="text-xl font-semibold text-white">{prediction.matchup}</h2>
                  <p className="mt-2 flex flex-wrap gap-3 text-xs text-white/48">
                    <span className="inline-flex items-center gap-1.5"><Clock size={13} />{prediction.kickoff_time_text}</span>
                    {model ? <span>{model.name}</span> : null}
                  </p>
                </div>
                <div className="rounded-md border border-turf/25 bg-turf/10 px-3 py-2">
                  <div className="flex items-center gap-1.5 text-xs text-turf"><Target size={13} /> 参考方向</div>
                  <div className="mt-1 text-lg font-semibold text-white">{direction}</div>
                </div>
                <span className="text-sm text-turf">查看完整分析</span>
              </div>
            </Link>
          );
        })}
      </section>

      <SeoTopicLinks />
    </div>
  );
}
