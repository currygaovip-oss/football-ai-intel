import type { Metadata } from "next";
import { PredictionCard } from "@/components/prediction-card";
import { SectionHeading } from "@/components/section-heading";
import { getModelDirectory, getReviews, getTodayPredictions } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "今日足球赛前分析：比赛观点、模型倾向与风险提示",
  description: "查看今日足球赛前分析、比赛时间、对阵信息、模型倾向、参考方向和风险等级；覆盖世界杯、五大联赛和焦点赛事。",
  path: "/today"
});

export default function TodayPage() {
  const predictions = getTodayPredictions();
  const models = getModelDirectory();
  const reviews = getReviews();
  const freeCount = predictions.filter(({ prediction }) => prediction.visibility === "free").length;
  const vipCount = predictions.length - freeCount;

  return (
    <div>
      <SectionHeading title="今日足球赛前分析" eyebrow="Pre-match" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        这里汇总今日足球比赛的赛前观点，包含赛事、比赛时间、对阵、参考方向、风险等级和 AI 分析师模型。AI 用于辅助读取球队状态、历史交锋、赛程强度、阵容消息和数据变化，最终内容用于足球交流与赛前阅读参考。
      </p>
      <div className="mb-6 grid gap-3 md:grid-cols-4">
        <div className="glass rounded-lg p-4">
          <div className="text-xs text-white/45">今日观点</div>
          <div className="mt-2 text-2xl font-semibold text-white">{predictions.length}</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-xs text-white/45">免费 / VIP</div>
          <div className="mt-2 text-2xl font-semibold text-turf">{freeCount}<span className="text-white/35"> / </span>{vipCount}</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-xs text-white/45">分析师席位</div>
          <div className="mt-2 text-2xl font-semibold text-white">{models.length}</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-xs text-white/45">复盘记录</div>
          <div className="mt-2 text-2xl font-semibold text-gold">{reviews.length}</div>
        </div>
      </div>
      <div className="grid gap-4">
        {predictions.map(({ prediction, model }) => <PredictionCard key={prediction.id} prediction={prediction} model={model} />)}
      </div>
      <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-lg font-semibold">今日足球赛前分析包含什么</h2>
        <div className="mt-3 grid gap-3 text-sm leading-7 text-white/62 md:grid-cols-3">
          <p>比赛基础信息：赛事、比赛时间、主队与客队，方便用户快速确认今日足球赛程。</p>
          <p>赛前分析维度：球队状态、历史交锋、赛程密度、阵容消息、进球趋势和数据变化。</p>
          <p>阅读边界：模型倾向和参考方向都配合风险等级展示，赛后会通过复盘记录长期校准。</p>
        </div>
      </section>
    </div>
  );
}
