import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin, Ticket } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { fifaTicketUrl, getCityTicketPath, ticketBasePath } from "@/lib/world-cup-tickets";
import { getHostCity, getHostCityPath, hostCities, worldCupBasePath } from "@/lib/world-cup";

type CityTicketParams = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return hostCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: CityTicketParams): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getHostCity(slug);
  if (!city) {
    return createMetadata({
      title: "2026世界杯城市门票信息",
      description: "2026世界杯城市门票信息。",
      path: `${ticketBasePath}/cities/${slug}`,
      noIndex: true
    });
  }
  return createMetadata({
    title: `${city.name}世界杯门票信息、球场与观赛提醒`,
    description: `查看${city.name}赛区2026世界杯门票信息、比赛球场${city.stadium}、城市赛程和官方购票提醒。`,
    path: getCityTicketPath(city.slug)
  });
}

export default async function CityTicketPage({ params }: CityTicketParams) {
  const { city: slug } = await params;
  const city = getHostCity(slug);
  if (!city) notFound();
  const path = getCityTicketPath(city.slug);
  const ticketSearchTerms = [
    `${city.name}世界杯门票`,
    `${city.name}世界杯官方购票`,
    `${city.name}世界杯球场`,
    `${city.name}世界杯赛程`,
    `${city.name}世界杯观赛`
  ];

  return (
    <article className="mx-auto max-w-5xl space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: `${city.name}世界杯门票信息`, description: city.summary, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: `${city.name}有2026世界杯比赛吗？`, answer: `${city.name}是2026世界杯举办城市之一，比赛球场为${city.stadium}。` },
            { question: `${city.name}世界杯门票在哪里买？`, answer: "门票信息应以 FIFA 官方门票信息和官方公告为准。" },
            { question: `去${city.name}看世界杯前要确认什么？`, answer: "重点核对比赛时间、球场、官方门票状态、交通住宿和入场要求。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <MapPin size={15} /> City Ticket Guide
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{city.name}世界杯门票信息</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64">
          {city.name}是2026世界杯举办城市之一，比赛球场为{city.stadium}。重点看城市赛程、官方门票信息和入场前核对事项。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Info label="举办国家" value={city.country} />
        <Info label="比赛球场" value={city.stadium} />
        <Info label="城市标签" value={city.highlight ?? "世界杯举办城市"} />
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <div className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
          <Ticket size={16} /> 购票前先核对
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <CheckCard title="比赛时间" body="核对该城市对应比赛日期、开球时间和对阵双方。" />
          <CheckCard title="官方门票链接" body="门票销售阶段、余票和价格以 FIFA 官方信息为准。" />
          <CheckCard title="城市安排" body="提前核对交通、住宿、球场位置和入场政策。" />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <a href={fifaTicketUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-pitch-950">
            FIFA 官方门票信息 <ExternalLink size={15} />
          </a>
          <Link href={getHostCityPath(city.slug)} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">查看{city.name}赛区</Link>
          <Link href={`${worldCupBasePath}/schedule`} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">世界杯赛程</Link>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-5">
        <h2 className="text-xl font-semibold text-white">{city.name}观赛提醒</h2>
        <p className="mt-3 text-sm leading-7 text-white/62">
          {city.summary} 计划前往该城市观赛时，重点核对城市赛程、官方门票链接、入场要求和赛前观点。
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border border-gold/20 bg-gold/[0.055] p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/85">城市门票信息</div>
          <h2 className="mt-3 text-xl font-semibold text-white">{city.name}世界杯门票与观赛指南</h2>
          <p className="mt-3 text-sm leading-7 text-white/64">
            查看官方门票信息、举办球场、城市赛程和观赛提醒，赛前核对购票入口与赛区详情。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {ticketSearchTerms.map((term) => (
              <span key={term} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/66">
                {term}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <TicketPath title="官方路径">
            优先核对 FIFA 官方门票信息，再确认销售阶段、账号要求和赛事公告。
          </TicketPath>
          <TicketPath title="城市路径">
            从{city.name}赛区进入球场、比赛时间、交通住宿和入场要求等观赛信息。
          </TicketPath>
          <TicketPath title="比赛路径">
            购票前把具体比赛、对阵双方、开球时间和赛前观点一起核对，避免只看城市名称。
          </TicketPath>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-5">
        <h2 className="text-xl font-semibold text-white">继续查看{city.name}门票相关信息</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <TicketLink href={`${ticketBasePath}/official`} label="官方购票链接" />
          <TicketLink href={getHostCityPath(city.slug)} label={`${city.name}赛区信息`} />
          <TicketLink href={`${worldCupBasePath}/schedule`} label="世界杯完整赛程" />
          <TicketLink href="/topics/world-cup-2026-watch-guide" label="世界杯观赛指南" />
        </div>
      </section>

      <SeoTopicLinks />
    </article>
  );
}

function TicketPath({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/62">{children}</p>
    </div>
  );
}

function TicketLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/70 transition hover:border-turf/35 hover:text-turf">
      {label}
    </Link>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs text-white/45">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function CheckCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-4">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/60">{body}</p>
    </div>
  );
}
