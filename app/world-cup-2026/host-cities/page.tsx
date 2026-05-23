import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getHostCityPath, hostCities, worldCupBasePath } from "@/lib/world-cup";

const description = "查看2026世界杯举办城市，美加墨16个城市、球场信息、揭幕战和决赛城市入口。";

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
          美加墨世界杯覆盖16个举办城市。页面按城市整理球场信息、重点标签和赛程入口，方便查看美国、加拿大、墨西哥不同赛区。
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
          </Link>
        ))}
      </section>

      <SeoTopicLinks />
    </div>
  );
}
