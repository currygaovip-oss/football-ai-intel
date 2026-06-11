import type { Metadata } from "next";
import { CheckCircle2, MessageCircle, ShieldAlert } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { SocialCta } from "@/components/social-cta";
import { getDataSourceInfo } from "@/lib/data";
import { createMetadata, faqJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "VIP 社群说明",
  description: "绿茵智报 VIP 社群说明，提供重点赛事赛前分析、关键变量、参考方向和赛后复盘记录。",
  path: "/vip"
});

const features = [
  "重点赛事赛前分析与关键变量",
  "参考方向与关键变量拆解",
  "赛后复盘结论和偏差归因",
  "Telegram 群与 X 动态更新"
];

export default function VipPage() {
  const dataSource = getDataSourceInfo();

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "VIP 社群说明", description: "绿茵智报 VIP 社群说明，提供重点赛事赛前分析、关键变量、参考方向和赛后复盘记录。", path: "/vip", dateModified: dataSource.exportedAt })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: "绿茵智报 VIP 社群提供什么？", answer: "提供重点赛事赛前分析、关键变量、参考方向、赛后复盘和社群更新提醒。" },
            { question: "VIP 内容适合哪些球迷？", answer: "适合关注世界杯赛程、球队状态、赛前变量、模型观点和赛后复盘记录的中文球迷。" },
            { question: "VIP 内容是否代表确定结果？", answer: "不代表。所有内容仅作足球交流、数据研究和赛前阅读参考。" }
          ]))
        }}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="glass rounded-lg p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-sm text-gold">
            <ShieldAlert size={16} /> VIP 社群说明
          </div>
          <h1 className="mt-5 text-4xl font-semibold">VIP 聚焦重点赛事深度阅读。</h1>
          <p className="mt-4 leading-8 text-white/66">
            VIP 内容聚焦重点比赛的赛前分析、关键变量和赛后复盘。Telegram 社群开放开通咨询，X 主页同步公开更新。
          </p>
          <div className="mt-5 grid gap-2 text-xs text-white/48 sm:grid-cols-3">
            <span>内容更新：{formatDataDate(dataSource.exportedAt)}</span>
            <span>比赛 {dataSource.matchCount} 场</span>
            <span>观点 {dataSource.predictionCount} 条 / 复盘 {dataSource.reviewCount} 条</span>
          </div>
          <div className="mt-8 grid gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
                <CheckCircle2 className="mt-0.5 text-turf" size={18} />
                <span className="text-white/74">{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/56">
            <strong className="text-white/80">边界声明：</strong>VIP 内容不是结果承诺，也不提供单场确定结论。所有内容仅作足球交流、数据研究和赛前阅读参考。
          </div>
        </section>
        <aside className="space-y-6">
          <SocialCta />
          <div className="glass rounded-lg p-6">
            <MessageCircle className="text-gold" />
            <h2 className="mt-4 text-xl font-semibold">适合哪些人？</h2>
            <p className="mt-2 text-sm leading-7 text-white/62">
              面向喜欢研究赛程、球队状态、赛前变量和复盘记录的球迷。所有内容都以信息参考和交流讨论为主。
            </p>
          </div>
        </aside>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <VipInfo title="世界杯重点比赛">
          结合世界杯赛程、球队赛程、比赛时间和单场比赛详情，重点跟进高关注对阵。
        </VipInfo>
        <VipInfo title="赛前变量拆解">
          围绕开球时间、球队状态、阵容变化、赛程压力和模型观点进行赛前阅读。
        </VipInfo>
        <VipInfo title="复盘记录沉淀">
          赛后回看原参考方向、实际赛果和偏差说明，长期观察内容质量。
        </VipInfo>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function VipInfo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/62">{children}</p>
    </div>
  );
}

function formatDataDate(value?: string) {
  if (!value) return "按赛程整理";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "按赛程整理";
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
