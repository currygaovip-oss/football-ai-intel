import type { Metadata } from "next";
import { PredictionCard } from "@/components/prediction-card";
import { SectionHeading } from "@/components/section-heading";
import { getModelDirectory, getReviews, getTodayPredictions } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "今日足球 AI 赛前观点",
  description: "查看今日足球赛前观点、AI 模型倾向、风险等级和最新发布的中文足球数据分析情报。",
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
      <SectionHeading title="今日情报" eyebrow="Pre-match" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        每条观点都由一个主 AI 分析师模型署名，并可由多个辅助模型校准。赛前观点由 AI 生成初步框架，并结合人工校验后发布；样本表现用于观察模型稳定性，不代表任何确定结果。
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
    </div>
  );
}
