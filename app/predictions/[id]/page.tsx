import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { ModelMiniLink } from "@/components/model-card";
import { getPredictionDetail } from "@/lib/data";

export default async function PredictionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = getPredictionDetail(id);
  if (!detail) notFound();
  const { assistantModels, model, prediction, review } = detail;

  return (
    <article className="mx-auto max-w-4xl">
      <div className="glass rounded-lg p-6 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP内容" : "免费观点"}</Badge>
          <Badge>{prediction.competition}</Badge>
          <Badge tone="white">风险：{prediction.risk_level}</Badge>
          <span className="text-sm text-white/45">{prediction.published_at}</span>
        </div>
        <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">{prediction.title}</h1>
        {model ? (
          <section className="mt-6 rounded-lg border border-turf/25 bg-turf/10 p-5">
            <div className="text-sm font-semibold text-turf">AI 分析师模型</div>
            <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <div className="text-2xl font-semibold">{model.code} · {model.name}</div>
                <p className="mt-2 text-sm leading-6 text-white/64">{model.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md border border-white/10 bg-black/15 p-3">
                  <div className="text-white/45">内测样本表现</div>
                  <div className="mt-1 text-2xl font-semibold text-turf">{model.hit_rate}%+</div>
                </div>
                <div className="rounded-md border border-white/10 bg-black/15 p-3">
                  <div className="text-white/45">近期样本表现</div>
                  <div className="mt-1 text-xs leading-5 text-white/72">{model.recent_record}</div>
                </div>
              </div>
            </div>
            {assistantModels.length > 0 ? (
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="mb-3 text-xs text-white/45">辅助校准模型</div>
                <div className="flex flex-wrap gap-2">
                  {assistantModels.map((assistant) => <ModelMiniLink key={assistant.id} model={assistant} />)}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}
        <div className="mt-6 grid gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/68 sm:grid-cols-3">
          <div>开赛时间：{prediction.kickoff_time_text}</div>
          <div>对阵：{prediction.matchup}</div>
          <div>赛事：{prediction.competition}</div>
        </div>
        <section className="mt-8">
          <h2 className="mb-3 text-xl font-semibold">AI 分析正文</h2>
          <div className="space-y-4 text-base leading-8 text-white/72">
            {prediction.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
        <section className="mt-8 rounded-lg border border-turf/25 bg-turf/10 p-5">
          <h2 className="text-lg font-semibold text-turf">参考方向</h2>
          <p className="mt-2 text-white/82">{prediction.recommendation}</p>
        </section>
        <section className="mt-6 rounded-lg border border-gold/25 bg-gold/10 p-5">
          <h2 className="text-lg font-semibold text-gold">风险提示</h2>
          <p className="mt-2 text-sm leading-7 text-white/68">足球比赛存在阵容、伤停、临场战术、红黄牌和偶发事件影响。模型倾向只代表赛前信息下的概率判断，不能替代独立判断。</p>
        </section>
        <section className="mt-6 rounded-lg border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">数据来源与校验</h2>
          <p className="mt-2 text-sm leading-7 text-white/64">
            模型参考维度包括球队状态、历史交锋、阵容伤停、赛程密度、指数变化、进球趋势和赛后复盘反馈。赛前观点由 AI 分析模型生成初步框架，并结合人工校验后发布，用于提高内容可读性和风险边界。
          </p>
        </section>
        <section className="mt-6 rounded-lg border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold">如何阅读这条情报</h2>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-white/62 sm:grid-cols-3">
            <p>先看主模型和辅助模型，理解这条观点主要来自哪类分析逻辑。</p>
            <p>再看参考方向和风险等级，避免把单场倾向理解成确定结论。</p>
            <p>赛后优先查看复盘，长期记录比单场结果更重要。</p>
          </div>
        </section>
        {review ? (
          <Link href={`/reviews/${review.id}`} className="mt-6 inline-flex rounded-md border border-white/15 px-4 py-3 text-sm text-white/82 hover:border-turf/40 hover:text-turf">
            查看赛后复盘
          </Link>
        ) : null}
        <p className="mt-8 border-t border-white/10 pt-5 text-xs leading-6 text-white/45">
          免责声明：本内容仅用于足球交流、数据研究和赛前阅读参考，不构成任何结果承诺或行动建议。
        </p>
      </div>
    </article>
  );
}
