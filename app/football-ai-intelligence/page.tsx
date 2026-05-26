import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MessageCircle, RotateCcw, Target } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { SocialCta } from "@/components/social-cta";
import { createMetadata, faqJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";

const path = "/football-ai-intelligence";
const description = "绿茵智报提供今日足球赛程、赛前观点、参考方向和赛后复盘，面向中文球迷追踪重点比赛。";

export const metadata: Metadata = createMetadata({
  title: "足球AI情报：今日赛程、赛前观点与参考方向",
  description,
  path
});

const entryCards = [
  {
    title: "今天有哪些比赛值得看",
    description: "查看今日重点比赛、对阵时间和参考方向。",
    href: "/today",
    icon: CalendarDays
  },
  {
    title: "想看完整赛前分析",
    description: "查看赛前观点、分析正文和赛后复盘。",
    href: "/predictions",
    icon: Target
  },
  {
    title: "关注世界杯2026",
    description: "查看美加墨世界杯赛程、球队、城市和重点比赛。",
    href: "/world-cup-2026",
    icon: MessageCircle
  },
  {
    title: "赛后回看结果",
    description: "比赛结束后回看原参考方向和复盘记录，判断信息是否有价值。",
    href: "/reviews",
    icon: RotateCcw
  }
];

const userNeeds = [
  "今日足球赛程与赛前观点",
  "重点比赛参考方向与分析正文",
  "世界杯2026赛程、球队和举办城市",
  "Telegram 群与 X 公开更新"
];

export default function FootballAiIntelligencePage() {
  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "足球AI情报", description, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: "足球AI情报看什么？", answer: "重点看今日足球赛程、赛前观点、参考方向、世界杯2026赛程和赛后复盘。" },
            { question: "绿茵智报适合哪些人？", answer: "适合赛前想了解比赛、对阵、参考方向和赛后复盘的中文球迷。" },
            { question: "赛前观点在哪里看？", answer: "今日情报提供赛前观点，Telegram 群和 X 主页同步公开动态。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="text-xs font-semibold tracking-[0.18em] text-turf">足球 AI 情报</div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">足球AI情报</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64">
          绿茵智报把今日赛程、赛前观点、参考方向和复盘记录放在同一条比赛线索里，帮助中文球迷更快抓住重点。
        </p>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {entryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-turf/35">
              <div className="flex items-start gap-3">
                <span className="rounded-md border border-turf/25 bg-turf/10 p-2 text-turf"><Icon size={18} /></span>
                <span>
                  <span className="block text-lg font-semibold text-white">{card.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-white/58">{card.description}</span>
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-5">
        <h2 className="text-xl font-semibold text-white">主要内容</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {userNeeds.map((item) => (
            <div key={item} className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/66">
              {item}
            </div>
          ))}
        </div>
      </section>

      <SocialCta />
      <SeoTopicLinks />
    </div>
  );
}
