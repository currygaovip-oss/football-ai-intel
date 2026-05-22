import type { Metadata } from "next";
import Link from "next/link";
import { Activity, BarChart3, BrainCircuit, CalendarDays, Database, ShieldCheck, Sparkles } from "lucide-react";
import { ModelCard } from "@/components/model-card";
import { PredictionCard } from "@/components/prediction-card";
import { ReviewCard } from "@/components/review-card";
import { SectionHeading } from "@/components/section-heading";
import { SocialCta } from "@/components/social-cta";
import { getHomeData } from "@/lib/data";
import { createMetadata, jsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "今日足球赛程、赛前分析与赛后复盘",
  description: "绿茵智报整理今日足球赛程、世界杯赛程、比赛时间、赛前分析、模型倾向和赛后复盘，帮助中文足球用户快速阅读重点赛事。",
  path: "/"
});

export default function HomePage() {
  const { aiModels, matches, modelCount, predictions, reviews } = getHomeData();
  const stats = [
    { label: "赛前观点", value: predictions.length, Icon: Activity },
    { label: "数据信号", value: 6, Icon: Database },
    { label: "世界杯赛程", value: matches.length, Icon: CalendarDays },
    { label: "AI分析师", value: modelCount, Icon: BarChart3 }
  ];
  const principles = [
    "历史样本 + 指数变化",
    "阵容赛程同步校验",
    "赛后复盘校准模型"
  ];

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteJsonLd()) }} />
      <section className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-turf/30 bg-turf/10 px-3 py-1 text-xs text-turf">
              <BrainCircuit size={15} /> 今日足球赛程 · 赛前分析 · 赛后复盘
            </div>
            <h1 className="mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl">
              今日足球赛程、赛前分析与模型倾向。
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-white/58">
              绿茵智报围绕世界杯、五大联赛和焦点赛事，整理比赛时间、对阵信息、赛前观点、风险等级和赛后复盘；AI 模型用于辅助读取球队状态、历史交锋和数据变化。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/schedule" className="rounded-md border border-turf/30 bg-turf/10 px-3 py-2 text-xs text-turf hover:bg-turf/15">
                查看今日足球赛程
              </Link>
              <Link href="/today" className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/75 hover:border-turf/30 hover:text-turf">
                阅读赛前分析
              </Link>
              <Link href="/reviews" className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/75 hover:border-turf/30 hover:text-turf">
                查看赛后复盘
              </Link>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto xl:min-w-[520px] xl:justify-end">
            {stats.map(({ label, value, Icon }) => (
              <div key={label} className="flex min-w-[118px] items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                <Icon className="shrink-0 text-turf" size={15} />
                <div>
                  <div className="text-[11px] text-white/45">{label}</div>
                  <div className="text-lg font-semibold leading-tight">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.75fr]">
        <div>
          <SectionHeading title="今日足球赛前分析" eyebrow="Pre-match Analysis" href="/today" />
          <div className="grid gap-4">
            {predictions.slice(0, 4).map(({ prediction, model }) => <PredictionCard key={prediction.id} prediction={prediction} model={model} compact />)}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {principles.map((principle) => (
              <span key={principle} className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/62">
                <ShieldCheck size={14} className="text-turf" />
                {principle}
              </span>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div>
            <SectionHeading title="最新赛后复盘" eyebrow="Reviews" href="/reviews" />
            <div className="grid gap-4">
              {reviews.slice(0, 2).map(({ review, prediction }) => <ReviewCard key={review.id} review={review} prediction={prediction} />)}
            </div>
          </div>
          <SocialCta />
        </aside>
      </section>

      <section>
        <SectionHeading title="世界杯赛程与比赛时间" eyebrow="Matches" href="/schedule" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {matches.slice(0, 8).map((match) => (
            <div key={match.id} className="glass rounded-lg p-5">
              <div className="mb-3 text-xs text-turf">{match.competition} · {match.stage}</div>
              <div className="text-lg font-semibold">{match.home_team} vs {match.away_team}</div>
              <div className="mt-3 text-sm text-white/58">{match.kickoff_time}</div>
              {match.status === "finished" ? <div className="mt-3 text-2xl font-semibold text-gold">{match.home_score}-{match.away_score}</div> : null}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/62">
          赛程页用于查看今日足球赛程、明日赛程、世界杯小组赛和淘汰赛安排；有赛前观点的比赛可继续进入详情页阅读模型倾向与风险提示。
        </div>
      </section>

      <section>
        <SectionHeading title="AI分析师矩阵" eyebrow="Analyst Matrix" href="/models" />
        <div className="mb-4 rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/62">
          <Sparkles className="mr-2 inline text-turf" size={16} />
          不是单一模型统一输出，而是多模型分析席位分工：基本面、指数结构、进球趋势、阵容赛程、热度风险各自校验。
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {aiModels.map((model) => <ModelCard key={model.id} model={model} compact />)}
        </div>
      </section>
    </div>
  );
}
