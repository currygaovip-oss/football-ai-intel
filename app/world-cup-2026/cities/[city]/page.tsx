import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { breadcrumbJsonLd, createMetadata, faqJsonLd, jsonLd, placeJsonLd, webPageJsonLd } from "@/lib/seo";
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
    description: `${city.name}是2026美加墨世界杯举办城市之一，比赛球场为${city.stadium}。包含${city.name}赛区、世界杯赛程、门票提醒和赛前观点。`,
    path: getHostCityPath(city.slug)
  });
}

export default async function HostCityPage({ params }: CityParams) {
  const { city: slug } = await params;
  const city = getHostCity(slug);
  if (!city) notFound();
  const path = getHostCityPath(city.slug);
  const citySearchTerms = [
    `${city.name}世界杯赛程`,
    `${city.name}世界杯球场`,
    `${city.name}世界杯门票`,
    `${city.name}世界杯比赛时间`,
    `${city.name}赛区观赛`
  ];

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: `${city.name}世界杯赛程、球场与门票信息`, description: city.summary, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(placeJsonLd({ name: city.name, description: `${city.name}是2026世界杯举办城市，比赛球场为${city.stadium}。${city.summary}`, path, country: city.country, stadium: city.stadium }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: `${city.name}是2026世界杯举办城市吗？`, answer: `${city.name}是2026美加墨世界杯举办城市之一，所属举办国家为${city.country}。` },
            { question: `${city.name}世界杯比赛在哪个球场？`, answer: `${city.name}赛区球场为${city.stadium}。` },
            { question: `${city.name}世界杯门票信息在哪里看？`, answer: `${city.name}门票信息包含城市观赛提醒和官方票务链接，实际购票以 FIFA 官方信息和赛事公告为准。` }
          ]))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbJsonLd([
              { name: "首页", path: "/" },
              { name: "世界杯2026", path: worldCupBasePath },
              { name: "举办城市", path: `${worldCupBasePath}/host-cities` },
              { name: city.name, path }
            ])
          )
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <MapPin size={15} /> Host City
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{city.name}世界杯赛程与球场信息</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          {city.summary} 重点看赛区球场、比赛日程、门票提醒和赛前观点。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Info label="举办国家" value={city.country} />
        <Info label="比赛球场" value={city.stadium} />
        <Info label="城市标签" value={city.highlight ?? "世界杯举办城市"} />
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-xl font-semibold text-white">{city.name}赛区重点</h2>
        <p className="mt-3 text-sm leading-7 text-white/62">
          举办国家、比赛球场、比赛时间和重点对阵，是赛前阅读该赛区的核心线索。
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={`${worldCupBasePath}/schedule`} className="rounded-md bg-turf px-4 py-2 text-sm font-semibold text-pitch-950">查看世界杯赛程</Link>
          <Link href={getCityTicketPath(city.slug)} className="rounded-md border border-gold/30 px-4 py-2 text-sm text-gold hover:bg-gold/10">{city.name}门票信息</Link>
          <Link href={`${worldCupBasePath}/host-cities`} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">全部举办城市</Link>
          <Link href="/today" className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">今日赛前分析</Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border border-gold/20 bg-gold/[0.055] p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/85">城市长尾词</div>
          <h2 className="mt-3 text-xl font-semibold text-white">{city.name}世界杯搜索路径</h2>
          <p className="mt-3 text-sm leading-7 text-white/64">
            围绕城市、球场、比赛时间和门票提醒，把{city.name}赛区信息连接到完整赛程、单场比赛和赛前观点。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {citySearchTerms.map((term) => (
              <span key={term} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/66">
                {term}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <SearchCard title="赛区比赛时间">
            先核对北京时间和当地城市，再查看该比赛所属阶段、对阵双方和赛前阅读重点。
          </SearchCard>
          <SearchCard title="球场与观赛">
            {city.stadium} 是{city.name}赛区核心信息，适合与门票提醒、城市交通和入场要求一起核对。
          </SearchCard>
          <SearchCard title="赛前观点入口">
            城市赛程应继续连接到单场比赛、球队赛程和赛前观点，方便赛前快速追踪。
          </SearchCard>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <SearchCard title={`${city.name}世界杯赛程`}>
          该赛区比赛时间、赛事阶段和重点对阵。
        </SearchCard>
        <SearchCard title={`${city.name}世界杯门票`}>
          官方票务信息、城市观赛提醒和入场前核对事项。绿茵智报不提供票务交易。
        </SearchCard>
        <SearchCard title={`${city.name}赛前分析`}>
          重点比赛包含参考方向、球队状态、赛程强度和数据变化。
        </SearchCard>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-5">
        <h2 className="text-xl font-semibold text-white">继续查看{city.name}相关信息</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <CityLink href={`${worldCupBasePath}/schedule`} label="世界杯完整赛程" />
          <CityLink href={`${worldCupBasePath}/host-cities`} label="全部举办城市" />
          <CityLink href={getCityTicketPath(city.slug)} label={`${city.name}门票信息`} />
          <CityLink href="/topics/world-cup-2026-stadiums" label="世界杯举办球场" />
        </div>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function CityLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/70 transition hover:border-turf/35 hover:text-turf">
      {label}
    </Link>
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
