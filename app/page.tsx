import Link from "next/link";
import { Activity, BarChart3, BrainCircuit, CalendarDays, CheckCircle2 } from "lucide-react";
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
    { label: "已复盘记录", value: reviews.length, Icon: CheckCircle2 },
    { label: "重点赛事", value: matches.length, Icon: CalendarDays },
    { label: "AI模型", value: modelCount, Icon: BarChart3 }
  ];

  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass overflow-hidden rounded-lg p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-turf/30 bg-turf/10 px-3 py-1 text-sm text-turf">
            <BrainCircuit size={16} /> 中文足球 AI 赛前情报官
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-balance sm:text-6xl">
            赛前观点、模型倾向与赛后复盘，放在同一个长期记录里。
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/66">
            绿茵智报面向关注世界杯、五大联赛和焦点杯赛的中文用户。我们用结构化数据、AI 观点和复盘评分，把每一场赛前判断沉淀成可追踪的模型表现。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/today" className="rounded-md bg-turf px-5 py-3 text-center text-sm font-semibold text-pitch-950">
              查看今日情报
            </Link>
            <Link href="/reviews" className="rounded-md border border-white/15 px-5 py-3 text-center text-sm text-white/82">
              查看赛后复盘
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="glass rounded-lg p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/56">{label}</span>
                <Icon className="text-turf" size={20} />
              </div>
              <div className="mt-3 text-3xl font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="今日重点赛事" eyebrow="Matches" href="/schedule" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {matches.map((match) => (
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
        <SectionHeading title="最新 AI 赛前观点" eyebrow="AI Intelligence" href="/today" />
        <div className="grid gap-4 lg:grid-cols-3">
          {predictions.map(({ prediction, model }) => <PredictionCard key={prediction.id} prediction={prediction} model={model} />)}
        </div>
      </section>

      <section>
        <SectionHeading title="AI模型观察席" eyebrow="Model Matrix" href="/models" />
        <div className="grid gap-4 lg:grid-cols-3">
          {aiModels.map((model) => <ModelCard key={model.id} model={model} compact />)}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <SectionHeading title="最新赛后复盘" eyebrow="Reviews" href="/reviews" />
          <div className="grid gap-4">
            {reviews.map(({ review, prediction }) => <ReviewCard key={review.id} review={review} prediction={prediction} />)}
          </div>
        </div>
        <div>
          <SectionHeading title="热门赛事" eyebrow="Hot" href="/hot" />
          <div className="grid gap-4">
            {hotEvents.map((event) => (
              <div key={event.id} className="glass rounded-lg p-5">
                <div className="text-xs text-gold">{event.competition} · {event.kickoff_time_text}</div>
                <h3 className="mt-2 text-lg font-semibold">{event.matchup}</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">{event.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SocialCta />
    </div>
  );
}
