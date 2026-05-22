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
            内容重点覆盖世界杯、五大联赛、杯赛和热门焦点赛事，让用户在赛前快速看到模型观察、参考方向和主要风险。
          </p>
          <p>
            模型参考维度包括球队状态、历史交锋、阵容伤停、赛程密度、指数变化、进球趋势和复盘反馈。赛前观点会经过内容校验后发布，确保表达清晰并保留风险边界。
          </p>
          <p>
            我们不只展示符合预期的观点，也会记录偏差和未符合预期的场次。模型表现会通过长期样本持续校准，命中的会记录，偏差的也会复盘。
          </p>
        </div>
        <div className="mt-8 rounded-lg border border-gold/25 bg-gold/10 p-5 text-sm leading-7 text-white/70">
          明确声明：本站内容仅供足球交流、数据研究和模型观察参考，不构成任何结果承诺或行动建议。请理性阅读，独立判断。
        </div>
      </div>
    </article>
  );
}
