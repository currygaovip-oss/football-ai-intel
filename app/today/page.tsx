import { PredictionCard } from "@/components/prediction-card";
import { SectionHeading } from "@/components/section-heading";
import { getModelDirectory, getReviews, getTodayPredictions } from "@/lib/data";

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
        每条观点都由一个主 AI 模型署名，并可由多个辅助模型校准。样本表现用于观察模型稳定性，不代表任何确定结果。VIP 标记只表示内容深度不同，第一阶段通过社群联系管理员开通。
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
          <div className="text-xs text-white/45">模型席位</div>
          <div className="mt-2 text-2xl font-semibold text-white">{models.length}</div>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="text-xs text-white/45">已复盘样本</div>
          <div className="mt-2 text-2xl font-semibold text-gold">{reviews.length}</div>
        </div>
      </div>
      <div className="grid gap-4">
        {predictions.map(({ prediction, model }) => <PredictionCard key={prediction.id} prediction={prediction} model={model} />)}
      </div>
    </div>
  );
}
