import { PredictionCard } from "@/components/prediction-card";
import { SectionHeading } from "@/components/section-heading";
import { getTodayPredictions } from "@/lib/data";

export default function TodayPage() {
  const predictions = getTodayPredictions();

  return (
    <div>
      <SectionHeading title="今日情报" eyebrow="Pre-match" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        每条观点都由一个主 AI 模型生成，并可由多个辅助模型校准。历史命中率基于已复盘观点统计，仅用于观察模型表现。VIP 标记只表示内容深度不同，第一阶段通过社群联系管理员开通。
      </p>
      <div className="grid gap-4">
        {predictions.map(({ prediction, model }) => <PredictionCard key={prediction.id} prediction={prediction} model={model} />)}
      </div>
    </div>
  );
}
