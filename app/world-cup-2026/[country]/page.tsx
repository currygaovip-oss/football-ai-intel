import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getHostCityPath, getHostCountry, getHostCountryPath, hostCities, hostCountries, worldCupBasePath } from "@/lib/world-cup";

type CountryParams = { params: Promise<{ country: string }> };

export function generateStaticParams() {
  return hostCountries.map((country) => ({ country: country.slug }));
}

export async function generateMetadata({ params }: CountryParams): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getHostCountry(slug);
  if (!country) return createMetadata({ title: "2026世界杯举办国家", description: "2026世界杯举办国家。", path: `${worldCupBasePath}/${slug}`, noIndex: true });
  return createMetadata({
    title: country.title,
    description: country.description,
    path: getHostCountryPath(country.slug)
  });
}

export default async function HostCountryPage({ params }: CountryParams) {
  const { country: slug } = await params;
  const country = getHostCountry(slug);
  if (!country) notFound();
  const cities = hostCities.filter((city) => city.country === country.name);
  const path = getHostCountryPath(country.slug);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: country.title, description: country.description, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: country.title, path, items: cities.map((city) => ({ name: `${city.name}世界杯赛程`, path: getHostCityPath(city.slug) })) }))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <MapPin size={15} /> Host Country
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{country.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">{country.description}</p>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">Cities</div>
            <h2 className="mt-1 text-2xl font-semibold text-white">{country.name}举办城市</h2>
          </div>
          <Link href={`${worldCupBasePath}/host-cities`} className="text-sm text-turf hover:text-white">全部城市</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cities.map((city) => (
            <Link key={city.slug} href={getHostCityPath(city.slug)} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-turf/35">
              <h2 className="text-lg font-semibold text-white">{city.name}</h2>
              <p className="mt-1 text-sm text-turf">{city.stadium}</p>
              <p className="mt-3 text-sm leading-6 text-white/58">{city.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Link href={`${worldCupBasePath}/schedule`} className="rounded-lg border border-white/10 bg-black/20 p-5 hover:border-turf/35">
          <h2 className="text-lg font-semibold text-white">世界杯赛程表</h2>
          <p className="mt-2 text-sm leading-6 text-white/58">查看小组赛、淘汰赛和单场比赛详情。</p>
        </Link>
        <Link href={`${worldCupBasePath}/opening-match`} className="rounded-lg border border-white/10 bg-black/20 p-5 hover:border-turf/35">
          <h2 className="text-lg font-semibold text-white">世界杯揭幕战</h2>
          <p className="mt-2 text-sm leading-6 text-white/58">查看揭幕战时间、地点和比赛页入口。</p>
        </Link>
        <Link href={`${worldCupBasePath}/final`} className="rounded-lg border border-white/10 bg-black/20 p-5 hover:border-turf/35">
          <h2 className="text-lg font-semibold text-white">世界杯决赛</h2>
          <p className="mt-2 text-sm leading-6 text-white/58">查看决赛时间、地点和赛程入口。</p>
        </Link>
      </section>

      <SeoTopicLinks />
    </div>
  );
}
