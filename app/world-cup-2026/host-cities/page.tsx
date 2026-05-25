import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getCityTicketPath, ticketBasePath } from "@/lib/world-cup-tickets";
import { getHostCityPath, hostCities, worldCupBasePath } from "@/lib/world-cup";

const description = "2026世界杯举办城市，美加墨16个城市、球场信息、揭幕战和决赛城市。";

export const metadata: Metadata = createMetadata({
  title: "2026世界杯举办城市：美加墨16个城市与球场",
  description,
  path: `${worldCupBasePath}/host-cities`
});

export default function HostCitiesPage() {
  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "2026世界杯举办城市", description, path: `${worldCupBasePath}/host-cities` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: "2026世界杯举办城市", path: `${worldCupBasePath}/host-cities`, items: hostCities.map((city) => ({ name: `${city.name}世界杯赛程`, path: getHostCityPath(city.slug) })) }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: "2026世界杯有多少个举办城市？", answer: "2026世界杯共有16个举办城市，分布在美国、加拿大、墨西哥。" },
            { question: "2026世界杯决赛在哪里？", answer: "2026世界杯决赛将在纽约/新泽西赛区举行。" },
            { question: "2026世界杯揭幕战在哪里？", answer: "2026世界杯揭幕战将在墨西哥城举行。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <MapPin size={15} /> Host Cities
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">2026世界杯举办城市</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          美加墨世界杯覆盖16个举办城市。按城市看球场信息、重点赛程和门票提醒。
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {hostCities.map((city) => (
          <Link key={city.slug} href={getHostCityPath(city.slug)} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-turf/35">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold text-white">{city.name}</h2>
                <div className="mt-1 text-xs text-turf">{city.country}</div>
              </div>
              {city.highlight ? <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-1 text-[11px] text-gold">{city.highlight}</span> : null}
            </div>
            <p className="mt-3 text-sm leading-6 text-white/58">{city.stadium}</p>
            <span className="mt-4 inline-flex text-xs font-semibold text-gold">门票与观赛信息</span>
          </Link>
        ))}
      </section>

      <section className="rounded-lg border border-gold/20 bg-gold/10 p-5">
        <h2 className="text-xl font-semibold text-white">2026世界杯城市门票信息</h2>
        <p className="mt-2 text-sm leading-7 text-white/62">
          计划前往美加墨观赛时，先核对球场、比赛时间和官方门票链接。绿茵智报不提供票务交易。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={ticketBasePath} className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-pitch-950">门票信息总览</Link>
          {hostCities.filter((city) => city.highlight).map((city) => (
            <Link key={city.slug} href={getCityTicketPath(city.slug)} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/76 hover:border-gold/35 hover:text-gold">
              {city.name}门票信息
            </Link>
          ))}
        </div>
      </section>

      <SeoTopicLinks />
    </div>
  );
}
