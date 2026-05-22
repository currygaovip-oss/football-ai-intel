import type { Metadata } from "next";
import { CheckCircle2, MessageCircle, ShieldAlert } from "lucide-react";
import { SocialCta } from "@/components/social-cta";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "VIP 社群说明",
  description: "绿茵智报 VIP 社群说明，提供重点赛事赛前分析、关键变量、参考方向和赛后复盘记录。",
  path: "/vip"
});

const features = [
  "重点赛事赛前分析与关键变量",
  "参考方向与关键变量拆解",
  "赛后复盘评分和偏差归因",
  "Telegram 群内更新提醒"
];

export default function VipPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <section className="glass rounded-lg p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-sm text-gold">
          <ShieldAlert size={16} /> VIP 社群说明
        </div>
        <h1 className="mt-5 text-4xl font-semibold">VIP 适合深度阅读重点赛事。</h1>
        <p className="mt-4 leading-8 text-white/66">
          VIP 内容聚焦重点比赛的赛前分析、关键变量和赛后复盘。想持续跟踪赛事观点的用户，可通过 Telegram 社群联系管理员了解加入方式。
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
          <strong className="text-white/80">边界声明：</strong>VIP 内容不是结果承诺，也不提供单场确定结论。所有内容仅用于足球交流、数据研究和赛前阅读参考。
        </div>
      </section>
      <aside className="space-y-6">
        <SocialCta />
        <div className="glass rounded-lg p-6">
          <MessageCircle className="text-gold" />
          <h2 className="mt-4 text-xl font-semibold">适合谁加入？</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            适合喜欢研究赛程、球队状态、赛前变量和复盘记录的足球用户。所有内容都以信息参考和交流讨论为主。
          </p>
        </div>
      </aside>
    </div>
  );
}
