import type { Metadata } from "next";
import { ModelCard } from "@/components/model-card";
import { SectionHeading } from "@/components/section-heading";
import { getModelDirectory } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "AI 分析师矩阵",
  description: "了解绿茵智报的 AI 分析师模型，包括基本面、指数结构、进球趋势、阵容赛程和热度风险分析。",
  path: "/models"
});

export default function ModelsPage() {
  const aiModels = getModelDirectory();

  return (
    <div>
      <SectionHeading title="AI分析师矩阵" eyebrow="Analyst Matrix" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        多个 AI 分析师模型从不同角度拆解比赛：基本面、指数结构、进球趋势、阵容赛程和热度风险分别判断，再汇总成赛前参考方向。
      </p>
      <div className="mb-6 rounded-lg border border-gold/25 bg-gold/10 p-4 text-sm leading-7 text-white/68">
        模型参考维度包括球队状态、历史交锋、阵容伤停、赛程密度、指数变化、进球趋势和复盘反馈。所有观点都会标注风险等级，方便用户理解判断边界。
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {aiModels.map((model) => <ModelCard key={model.id} model={model} />)}
      </div>
    </div>
  );
}
