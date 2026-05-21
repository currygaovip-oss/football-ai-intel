export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl">
      <div className="glass rounded-lg p-6 sm:p-8">
        <div className="text-sm font-semibold text-turf">About</div>
        <h1 className="mt-3 text-4xl font-semibold">关于绿茵智报</h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-white/70">
          <p>
            绿茵智报是一个中文足球 AI 赛前情报项目，核心不是做纯赛程查询，而是围绕赛前观点、模型倾向、风险提示和赛后复盘建立一套长期记录。
          </p>
          <p>
            第一阶段会优先覆盖世界杯、五大联赛、杯赛和热门焦点赛事，先把内容结构、模型分工、社群承接和复盘机制跑通。
          </p>
          <p>
            我们更重视复盘。每一条赛前观点都应该能在赛后被检查：哪里判断对了，哪里被阵容、节奏、临场事件或模型假设影响，这些记录会帮助产品持续迭代。
          </p>
        </div>
        <div className="mt-8 rounded-lg border border-gold/25 bg-gold/10 p-5 text-sm leading-7 text-white/70">
          明确声明：本站内容仅供足球交流、数据研究和模型观察参考，不构成任何结果承诺或行动建议。请理性阅读，独立判断。
        </div>
      </div>
    </article>
  );
}
