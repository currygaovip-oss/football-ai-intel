import type { Metadata } from "next";
import Link from "next/link";
import { Globe2 } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getHostCountryPath, hostCountries, worldCupBasePath } from "@/lib/world-cup";

const description = "2026世界杯由美国、加拿大、墨西哥共同举办，查看美加墨世界杯举办国家、举办城市和重点赛程。";

export const metadata: Metadata = createMetadata({
  title: "美加墨世界杯举办国家：美国、加拿大、墨西哥",
  description,
  path: `${worldCupBasePath}/host-countries`
});

export default function HostCountriesPage() {
  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "美加墨世界杯举办国家", description, path: `${worldCupBasePath}/host-countries` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: "2026世界杯举办国家", path: `${worldCupBasePath}/host-countries`, items: hostCountries.map((country) => ({ name: country.name, path: getHostCountryPath(country.slug) })) }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: "2026世界杯在哪举办？", answer: "2026世界杯由美国、加拿大、墨西哥共同举办，因此也常被称为美加墨世界杯。" },
            { question: "美加墨世界杯有哪些举办城市？", answer: "本届世界杯共有16个举办城市，分布在美国、加拿大和墨西哥。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <Globe2 size={15} /> Host Countries
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">美加墨世界杯举办国家</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          2026世界杯由美国、加拿大、墨西哥共同举办。这里按举办国家整理城市分布、球场信息和赛程，中文球迷可以按国家查看比赛分布。
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {hostCountries.map((country) => (
          <Link key={country.slug} href={getHostCountryPath(country.slug)} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-turf/35">
            <h2 className="text-xl font-semibold text-white">{country.name}</h2>
            <p className="mt-2 text-sm leading-7 text-white/62">{country.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {country.cities.map((city) => <span key={city} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/52">{city}</span>)}
            </div>
          </Link>
        ))}
      </section>

      <SeoTopicLinks />
    </div>
  );
}
