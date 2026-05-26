import type { Metadata } from "next";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getTicketTopicPath } from "@/lib/world-cup-tickets";
import { getHostCityPath, getMatchDateTimeLabel, getOpeningMatch, getWorldCupPrediction, worldCupBasePath } from "@/lib/world-cup";

const description = "2026世界杯揭幕战时间、举办城市、对阵双方和赛前观点。揭幕战将在墨西哥城举行。";

export const metadata: Metadata = createMetadata({
  title: "2026世界杯揭幕战时间与举办城市",
  description,
  path: `${worldCupBasePath}/opening-match`
});

export default function OpeningMatchPage() {
  const match = getOpeningMatch();
  const prediction = match ? getWorldCupPrediction(match) : undefined;

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "2026世界杯揭幕战时间与举办城市", description, path: `${worldCupBasePath}/opening-match` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: "2026世界杯揭幕战在哪里举行？", answer: "2026世界杯揭幕战将在墨西哥城举行。" },
            { question: "2026世界杯揭幕战什么时候开始？", answer: match ? `当前赛程显示为${getMatchDateTimeLabel(match)}。` : "揭幕战时间以世界杯赛程表为准。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-turf">
          <Trophy size={15} /> 揭幕战
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">2026世界杯揭幕战</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
          揭幕战是美加墨世界杯开赛阶段的核心比赛。重点看比赛时间、墨西哥城赛区信息和赛前观点。
        </p>
      </section>

      {match ? <WorldCupMatchCard match={match} prediction={prediction} /> : null}

      <section className="grid gap-4 md:grid-cols-3">
        <Info title="举办城市" body="墨西哥城是2026世界杯揭幕战城市，球场为 Estadio Azteca。" href={getHostCityPath("mexico-city")} />
        <Info title="门票信息" body="查看揭幕战官方票务链接、墨西哥城赛区和购票前提醒。" href={getTicketTopicPath("opening-match")} />
        <Info title="完整赛程" body="查看小组赛、淘汰赛和全部比赛时间。" href={`${worldCupBasePath}/schedule`} />
        <Info title="赛前观点" body="赛前观点包含参考方向、球队状态和比赛节奏。" href="/today" />
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function Info({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <Link href={href} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-turf/35">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-white/62">{body}</p>
    </Link>
  );
}
