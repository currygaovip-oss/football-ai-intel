import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Ticket } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { fifaTicketUrl, getTicketTopic, getTicketTopicPath, ticketBasePath, ticketTopics } from "@/lib/world-cup-tickets";
import { worldCupBasePath } from "@/lib/world-cup";

type TicketParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ticketTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TicketParams): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTicketTopic(slug);
  if (!topic) {
    return createMetadata({
      title: "2026世界杯门票信息",
      description: "2026世界杯门票信息。",
      path: `${ticketBasePath}/${slug}`,
      noIndex: true
    });
  }
  return createMetadata({
    title: topic.title,
    description: topic.description,
    path: getTicketTopicPath(topic.slug)
  });
}

export default async function TicketTopicPage({ params }: TicketParams) {
  const { slug } = await params;
  const topic = getTicketTopic(slug);
  if (!topic) notFound();
  const path = getTicketTopicPath(topic.slug);

  return (
    <article className="mx-auto max-w-5xl space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: topic.title, description: topic.description, path })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(topic.faq)) }} />

      <section className="rounded-lg border border-gold/25 bg-gold/10 p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          <Ticket size={15} /> Ticket Info
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{topic.heading}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/66">{topic.intro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={fifaTicketUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-pitch-950">
            FIFA 官方门票页面 <ExternalLink size={15} />
          </a>
          <Link href={ticketBasePath} className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/78 hover:border-gold/35 hover:text-gold">
            门票信息总览
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {topic.points.map((point) => (
          <div key={point} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm leading-7 text-white/66">{point}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-xl font-semibold text-white">继续查看</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {topic.related.map((item) => (
            <Link key={`${item.href}-${item.label}`} href={item.href} className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm font-semibold text-white/76 transition hover:border-turf/35 hover:text-turf">
              {item.label}
            </Link>
          ))}
          <Link href={`${worldCupBasePath}/host-cities`} className="rounded-lg border border-white/10 bg-black/20 p-4 text-sm font-semibold text-white/76 transition hover:border-turf/35 hover:text-turf">
            2026世界杯举办城市
          </Link>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-5">
        <h2 className="text-xl font-semibold text-white">信息说明</h2>
        <p className="mt-3 text-sm leading-7 text-white/62">
          绿茵智报只整理世界杯赛程、举办城市、观赛信息和赛前分析入口，不提供票务交易服务。门票销售阶段、可售状态、价格和入场规则请以 FIFA 官方页面为准。
        </p>
      </section>

      <SeoTopicLinks />
    </article>
  );
}
