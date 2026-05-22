import { CheckCircle2, MessageCircle, ShieldAlert } from "lucide-react";
import { SocialCta } from "@/components/social-cta";

const features = [
  "更完整的赛前 AI 分析正文与关键变量",
  "VIP 标记赛事的模型倾向与风险拆解",
  "赛后复盘评分、偏差归因和长期表现记录",
  "Telegram 群内的更新提醒与社群说明"
];

export default function VipPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <section className="glass rounded-lg p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-sm text-gold">
          <ShieldAlert size={16} /> VIP 社群说明
        </div>
        <h1 className="mt-5 text-4xl font-semibold">VIP 适合深度跟踪赛前观点。</h1>
        <p className="mt-4 leading-8 text-white/66">
          VIP 内容会提供更完整的模型拆解、关键变量说明和复盘记录。当前通过 Telegram 社群开放加入说明，适合希望长期跟踪模型表现的用户。
        </p>
        <div className="mt-8 grid gap-3">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
              <CheckCircle2 className="mt-0.5 text-turf" size={18} />
              <span className="text-white/74">{feature}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-lg border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/56">
          <strong className="text-white/80">边界声明：</strong>VIP 不是结果承诺，也不提供任何形式的强引导。所有内容仅用于足球交流、模型研究和赛前阅读参考。
        </div>
      </section>
      <aside className="space-y-6">
        <SocialCta />
        <div className="glass rounded-lg p-6">
          <MessageCircle className="text-gold" />
          <h2 className="mt-4 text-xl font-semibold">适合谁加入？</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            适合想长期跟踪模型表现、喜欢赛前拆解和赛后复盘的足球用户。不适合只想寻找单场确定答案的人。
          </p>
        </div>
      </aside>
    </div>
  );
}
