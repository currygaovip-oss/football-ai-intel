import { ModelCard } from "@/components/model-card";
import { SectionHeading } from "@/components/section-heading";
import { getModelDirectory } from "@/lib/data";

export default function ModelsPage() {
  const aiModels = getModelDirectory();

  return (
    <div>
      <SectionHeading title="AI模型" eyebrow="Model Matrix" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        绿茵智报不是单一 AI 输出，而是由多个模型席位共同组成的赛前情报系统。每个模型有不同职责，样本表现基于内测复盘记录展示，仅用于观察模型稳定性。
      </p>
      <div className="mb-6 rounded-lg border border-gold/25 bg-gold/10 p-4 text-sm leading-7 text-white/68">
        说明：上线初期的模型表现属于样本展示，不构成结果承诺。后续接入真实复盘数据后，命中率、评分和样本量会从复盘记录自动计算。
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {aiModels.map((model) => <ModelCard key={model.id} model={model} />)}
      </div>
    </div>
  );
}
