import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ShieldCheck, Ticket } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { fifaTicketUrl, getCityTicketPath, getTicketTopicPath, ticketBasePath, ticketTopics } from "@/lib/world-cup-tickets";
import { getHostCityPath, hostCities, worldCupBasePath } from "@/lib/world-cup";

const description = "整理2026世界杯门票信息、FIFA官方购票入口、美加墨举办城市、揭幕战、决赛和观赛提醒。绿茵智报不提供票务交易，只做公开信息整理。";

export const metadata: Metadata = createMetadata({
  title: "2026世界杯门票信息、官方购票入口与观赛提醒",
  description,
  path: ticketBasePath
});

export default function WorldCupTicketsPage() {
  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "2026世界杯门票信息", description, path: ticketBasePath })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: "2026世界杯门票信息专题", path: ticketBasePath, items: ticketTopics.map((topic) => ({ name: topic.heading, path: getTicketTopicPath(topic.slug) })) }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: "2026世界杯门票信息以哪里为准？", answer: "应以 FIFA 官方门票页面和赛事官方后续公告为准。" },
            { question: "绿茵智报卖世界杯门票吗？", answer: "不卖。绿茵智报只整理赛程、城市、官方入口和观赛提醒。" },
            { question: "买票前应该先确认什么？", answer: "建议先确认比赛时间、举办城市、球场、官方购票流程和入场要求。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-gold/25 bg-gold/10 p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          <Ticket size={15} /> World Cup Tickets
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">2026世界杯门票信息与观赛提醒</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/66">
          这里整理 FIFA 官方门票入口、美加墨举办城市、揭幕战、决赛和城市观赛信息。绿茵智报不提供票务交易，购票安排请以官方发布为准。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={fifaTicketUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-pitch-950">
            FIFA 官方门票页面 <ExternalLink size={15} />
          </a>
          <Link href={`${worldCupBasePath}/schedule`} className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/78 hover:border-gold/35 hover:text-gold">
            查看世界杯赛程
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <InfoCard title="先看官方入口">
          门票销售阶段、账户要求、价格区间和入场规则会变化，正式购票前应回到 FIFA 官方页面核对。
        </InfoCard>
        <InfoCard title="再看城市与赛程">
          美加墨共有16个举办城市，同一城市可能有多场比赛，购票前要确认具体比赛、日期和球场。
        </InfoCard>
        <InfoCard title="避免信息混杂">
          二级市场信息需要额外核验来源、座位、交付方式和退款规则，避免只凭截图或口头说明判断。
        </InfoCard>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">Ticket Topics</div>
            <h2 className="mt-1 text-2xl font-semibold text-white">门票信息专题</h2>
          </div>
          <Link href={`${worldCupBasePath}/host-cities`} className="text-sm text-turf hover:text-white">查看举办城市</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ticketTopics.map((topic) => (
            <Link key={topic.slug} href={getTicketTopicPath(topic.slug)} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-gold/35">
              <h2 className="text-lg font-semibold text-white">{topic.heading}</h2>
              <p className="mt-2 text-sm leading-7 text-white/60">{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">Host Cities</div>
          <h2 className="mt-1 text-2xl font-semibold text-white">城市观赛与门票信息</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {hostCities.map((city) => (
            <Link key={city.slug} href={getCityTicketPath(city.slug)} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-turf/35">
              <div className="flex items-center gap-2 text-xs text-turf">
                <ShieldCheck size={14} /> {city.country}
              </div>
              <h2 className="mt-2 text-lg font-semibold text-white">{city.name}门票信息</h2>
              <p className="mt-2 text-sm leading-6 text-white/58">{city.stadium}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-xl font-semibold text-white">观赛前的三个核对点</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Link href={`${worldCupBasePath}/schedule`} className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/66 hover:border-turf/35">核对比赛时间和对阵</Link>
          <Link href={`${worldCupBasePath}/host-cities`} className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/66 hover:border-turf/35">核对举办城市和球场</Link>
          <Link href={`${ticketBasePath}/official`} className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/66 hover:border-turf/35">核对官方门票入口</Link>
        </div>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-white/62">{children}</p>
    </div>
  );
}
