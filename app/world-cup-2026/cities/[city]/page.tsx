import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getCityTicketPath } from "@/lib/world-cup-tickets";
import { getHostCity, getHostCityPath, hostCities, worldCupBasePath } from "@/lib/world-cup";

type CityParams = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return hostCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: CityParams): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getHostCity(slug);
  if (!city) return createMetadata({ title: "2026世界杯举办城市", description: "2026世界杯举办城市。", path: `${worldCupBasePath}/cities/${slug}`, noIndex: true });
  return createMetadata({
    title: `${city.name}世界杯赛程、球场与门票信息`,
    description: `${city.name}是2026美加墨世界杯举办城市之一，比赛球场为${city.stadium}。查看${city.name}赛区信息、世界杯赛程、门票提醒和赛前分析。`,
    path: getHostCityPath(city.slug)
  });
}

export default async function HostCityPage({ params }: CityParams) {
  const { city: slug } = await params;
  const city = getHostCity(slug);
  if (!city) notFound();
  const path = getHostCityPath(city.slug);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: `${city.name}世界杯赛程、球场与门票信息`, description: city.summary, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: `${city.name}是2026世界杯举办城市吗？`, answer: `${city.name}是2026美加墨世界杯举办城市之一，所属举办国家为${city.country}。` },
            { question: `${city.name}世界杯比赛在哪个球场？`, answer: `${city.name}赛区球场为${city.stadium}。` },
            { question: `${city.name}世界杯门票信息在哪里看？`, answer: `${city.name}门票信息整理城市观赛提醒和官方票务链接，实际购票以 FIFA 官方信息和赛事公告为准。` }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <MapPin size={15} /> Host City
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{city.name}世界杯赛程与球场信息</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          {city.summary} 这里可以查看赛区、球场、赛程、门票提醒和赛前分析。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Info label="举办国家" value={city.country} />
        <Info label="比赛球场" value={city.stadium} />
        <Info label="城市标签" value={city.highlight ?? "世界杯举办城市"} />
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-xl font-semibold text-white">{city.name}赛区怎么看</h2>
        <p className="mt-3 text-sm leading-7 text-white/62">
          该城市所属国家、比赛球场和赛程集中展示。重点比赛详情包含参考方向和完整分析。
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={`${worldCupBasePath}/schedule`} className="rounded-md bg-turf px-4 py-2 text-sm font-semibold text-pitch-950">查看世界杯赛程</Link>
          <Link href={getCityTicketPath(city.slug)} className="rounded-md border border-gold/30 px-4 py-2 text-sm text-gold hover:bg-gold/10">{city.name}门票信息</Link>
          <Link href={`${worldCupBasePath}/host-cities`} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">全部举办城市</Link>
          <Link href="/today" className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">今日赛前分析</Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <SearchCard title={`${city.name}世界杯赛程`}>
          适合查看该赛区相关比赛时间、比赛阶段和重点对阵，也可从完整赛程查看单场比赛。
        </SearchCard>
        <SearchCard title={`${city.name}世界杯门票`}>
          本站只整理公开信息和官方票务提醒，不提供门票交易。购票前请以 FIFA 官方信息和赛事公告为准。
        </SearchCard>
        <SearchCard title={`${city.name}赛前分析`}>
          重点比赛包含参考方向和完整分析，赛前可重点关注球队状态、赛程强度和数据变化。
        </SearchCard>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function SearchCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-white/62">{children}</p>
    </div>
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
