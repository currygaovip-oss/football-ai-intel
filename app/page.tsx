import Link from "next/link";
import { Activity, BarChart3, BrainCircuit, CalendarDays, Database, ShieldCheck, Sparkles } from "lucide-react";
import { ModelCard } from "@/components/model-card";
import { PredictionCard } from "@/components/prediction-card";
import { ReviewCard } from "@/components/review-card";
import { SectionHeading } from "@/components/section-heading";
import { SocialCta } from "@/components/social-cta";
import { getHomeData } from "@/lib/data";

export default function HomePage() {
  const { aiModels, hotEvents, matches, modelCount, predictions, reviews } = getHomeData();
  const stats = [
    { label: "今日观点", value: predictions.length, Icon: Activity },
    { label: "数据信号", value: 6, Icon: Database },
    { label: "世界杯赛程", value: matches.length, Icon: CalendarDays },
    { label: "AI模型", value: modelCount, Icon: BarChart3 }
  ];
  const principles = [
    "历史样本 + 指数变化",
    "阵容赛程同步校验",
    "赛后复盘校准模型"
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-turf/30 bg-turf/10 px-3 py-1 text-xs text-turf">
              <BrainCircuit size={15} /> 中文足球 AI 赛前情报官
            </div>
            <h1 className="mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl">
              AI 读取历史比赛与指数信号，给出赛前参考方向。
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-white/58">
              模型综合球队状态、赛程强度、阵容消息、历史交锋、进球趋势和指数变化，输出可追踪的倾向与风险等级。
            </p>
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
          <SectionHeading title="最新 AI 赛前观点" eyebrow="AI Intelligence" href="/today" />
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
        <SectionHeading title="世界杯赛程" eyebrow="Matches" href="/schedule" />
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
      </section>

      <section>
        <SectionHeading title="AI模型观察席" eyebrow="Model Matrix" href="/models" />
        <div className="mb-4 rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/62">
          <Sparkles className="mr-2 inline text-turf" size={16} />
          模型席位不是统一署名，而是不同分析职责：综合赛前、指数结构、进球趋势、阵容伤停、冷门风险和赛后校准各自分工。
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {aiModels.map((model) => <ModelCard key={model.id} model={model} compact />)}
        </div>
      </section>

      <section>
        <SectionHeading title="热门赛事" eyebrow="Hot" href="/hot" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {hotEvents.slice(0, 6).map((event) => (
            <div key={event.id} className="glass rounded-lg p-5">
              <div className="text-xs text-gold">{event.competition} · {event.kickoff_time_text}</div>
              <h3 className="mt-2 text-lg font-semibold">{event.matchup}</h3>
              <p className="mt-2 text-sm leading-6 text-white/62">{event.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
