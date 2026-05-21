import { ModelCard } from "@/components/model-card";
import { SectionHeading } from "@/components/section-heading";
import { getModelDirectory } from "@/lib/data";

export default function ModelsPage() {
  const aiModels = getModelDirectory();

  return (
    <div>
      <SectionHeading title="AI模型" eyebrow="Model Matrix" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        绿茵智报不是单一 AI 输出，而是由多个模型席位共同组成的赛前情报系统。每个模型有不同职责，历史命中率基于已复盘观点统计，仅用于观察模型表现。
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        {aiModels.map((model) => <ModelCard key={model.id} model={model} />)}
      </div>
    </div>
  );
}
