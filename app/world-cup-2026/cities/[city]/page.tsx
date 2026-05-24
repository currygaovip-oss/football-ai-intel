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
    title: `${city.name}世界杯赛程与球场信息`,
    description: `${city.name}是2026美加墨世界杯举办城市之一，比赛球场为${city.stadium}。${city.summary}`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: `${city.name}世界杯赛程与球场信息`, description: city.summary, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: `${city.name}是2026世界杯举办城市吗？`, answer: `${city.name}是2026美加墨世界杯举办城市之一，所属举办国家为${city.country}。` },
            { question: `${city.name}世界杯比赛在哪个球场？`, answer: `${city.name}赛区球场为${city.stadium}。` }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <MapPin size={15} /> Host City
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{city.name}世界杯赛程与球场信息</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">{city.summary}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Info label="举办国家" value={city.country} />
        <Info label="比赛球场" value={city.stadium} />
        <Info label="城市标签" value={city.highlight ?? "世界杯举办城市"} />
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-xl font-semibold text-white">{city.name}赛区怎么看</h2>
        <p className="mt-3 text-sm leading-7 text-white/62">
          可以先确认该城市所属国家和球场信息，再进入世界杯赛程表查看比赛时间。重点比赛发布赛前观点后，会在比赛详情页显示参考方向和完整分析入口。
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={`${worldCupBasePath}/schedule`} className="rounded-md bg-turf px-4 py-2 text-sm font-semibold text-pitch-950">查看世界杯赛程</Link>
          <Link href={getCityTicketPath(city.slug)} className="rounded-md border border-gold/30 px-4 py-2 text-sm text-gold hover:bg-gold/10">{city.name}门票信息</Link>
          <Link href={`${worldCupBasePath}/host-cities`} className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">全部举办城市</Link>
          <Link href="/today" className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/72 hover:border-turf/30 hover:text-turf">今日赛前分析</Link>
        </div>
      </section>

      <SeoTopicLinks />
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
