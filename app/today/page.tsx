import type { Metadata } from "next";
import Link from "next/link";
import { BrainCircuit, Clock, Sparkles, Target } from "lucide-react";
import { Badge } from "@/components/badge";
import { SectionHeading } from "@/components/section-heading";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { getModelDirectory, getTodayPredictions, type AiModel, type Prediction } from "@/lib/data";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";

const todayDescription = "今日足球赛前分析、比赛时间、对阵信息和参考方向；覆盖世界杯、五大联赛、中超和焦点赛事。";

export const metadata: Metadata = createMetadata({
  title: "今日足球赛前分析：比赛观点与参考方向",
  description: todayDescription,
  path: "/today"
});

export default function TodayPage() {
  const predictions = getTodayPredictions();
  const models = getModelDirectory();
  const freeCount = predictions.filter(({ prediction }) => prediction.visibility === "free").length;
  const vipCount = predictions.length - freeCount;

  return (
    <div className="space-y-5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "今日足球赛前分析", description: todayDescription, path: "/today" })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: "今日足球赛前观点列表",
              path: "/today",
              items: predictions.map(({ prediction }) => ({
                name: `${prediction.matchup}赛前分析`,
                path: `/predictions/${prediction.id}`
              }))
            })
          )
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            faqJsonLd([
              {
                question: "今日足球赛前分析怎么看？",
                answer: "今日情报包含比赛对阵、开球时间和核心参考方向；详情页提供球队状态、赛程强度和数据变化。"
              },
              {
                question: "参考方向和赛前分析有什么区别？",
                answer: "参考方向是对本场比赛的简要结论，赛前分析则解释这个方向来自哪些比赛变量。"
              },
              {
                question: "今日情报覆盖哪些赛事？",
                answer: "今日情报重点覆盖世界杯、五大联赛、中超、杯赛和当天焦点足球赛事。"
              }
            ])
          )
        }}
      />
      <div className="flex flex-col gap-3 border-b border-white/10 pb-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionHeading title="今日赛前观点" eyebrow="Pre-match" level={1} />
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
            汇总今日重点比赛、开球时间、参考方向和完整赛前分析。
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-white/58">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">观点 {predictions.length}</span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">免费 {freeCount}</span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">VIP {vipCount}</span>
        </div>
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">观点列表</h2>
          <Link href="/reviews" className="text-sm text-white/55 hover:text-turf">查看历史复盘</Link>
        </div>
        <div className="grid gap-3">
          {predictions.map(({ prediction, model }) => <DirectionCard key={prediction.id} prediction={prediction} model={model} />)}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white"><BrainCircuit size={16} className="text-turf" /> AI 分析席位</h2>
          <p className="mt-2 text-sm leading-6 text-white/58">
            不同席位负责观察不同维度，例如指数结构、球队状态、进球趋势和阵容赛程。这部分是赛前观点的来源说明。
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/52">
            {models.slice(0, 5).map((model) => <span key={model.id} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1">{model.name}</span>)}
          </div>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function DirectionCard({ prediction, model }: { prediction: Prediction; model?: AiModel }) {
  const direction = extractDirection(prediction.recommendation);
  const reason = prediction.body[0]?.replace(/\n/g, " ").slice(0, 78);

  return (
    <Link
      href={`/predictions/${prediction.id}`}
      className="block rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:border-turf/40"
      data-analytics-event="click_prediction"
      data-analytics-area="today_list"
      data-analytics-label={prediction.matchup}
    >
      <div className="grid gap-3 lg:grid-cols-[1.05fr_1.1fr_auto] lg:items-center">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP" : "免费"}</Badge>
            <Badge>{prediction.competition}</Badge>
          </div>
          <h3 className="text-lg font-semibold text-white">{prediction.matchup}</h3>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/52">
            <span className="inline-flex items-center gap-1.5"><Clock size={14} />{prediction.kickoff_time_text}</span>
            <span>{prediction.published_at}</span>
          </div>
        </div>

        <div className="rounded-lg border border-turf/25 bg-turf/10 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-turf">
            <Target size={15} /> 核心参考方向
          </div>
          <div className="mt-2 text-lg font-semibold leading-snug text-white">{direction}</div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/50">查看分析</span>
        </div>
      </div>

      {reason ? (
        <p className="mt-3 flex items-start gap-2 border-t border-white/10 pt-3 text-sm leading-6 text-white/58">
          <Sparkles className="mt-1 shrink-0 text-turf" size={14} />
          <span>{reason}{reason.length >= 78 ? "..." : ""}</span>
          {model ? <span className="ml-auto hidden shrink-0 text-xs text-white/40 md:inline">分析席位：{model.name}</span> : null}
        </p>
      ) : null}
    </Link>
  );
}

function extractDirection(recommendation: string) {
  return recommendation.replace(/^模型倾向：/, "").replace(/^参考方向：/, "");
}
