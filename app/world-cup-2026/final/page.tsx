import type { Metadata } from "next";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { WorldCupMatchCard } from "@/components/world-cup-match-card";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { createMetadata, faqJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getFinalMatch, getHostCityPath, getMatchDateTimeLabel, getWorldCupPrediction, worldCupBasePath } from "@/lib/world-cup";

const description = "查看2026世界杯决赛时间、举办城市、比赛入口和赛前分析入口。决赛将在纽约/新泽西赛区举行。";

export const metadata: Metadata = createMetadata({
  title: "2026世界杯决赛时间与举办城市",
  description,
  path: `${worldCupBasePath}/final`
});

export default function WorldCupFinalPage() {
  const match = getFinalMatch();
  const prediction = match ? getWorldCupPrediction(match) : undefined;

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "2026世界杯决赛时间与举办城市", description, path: `${worldCupBasePath}/final` })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqJsonLd([
            { question: "2026世界杯决赛在哪里举行？", answer: "2026世界杯决赛将在纽约/新泽西赛区举行。" },
            { question: "2026世界杯决赛什么时候开始？", answer: match ? `当前赛程显示为${getMatchDateTimeLabel(match)}。` : "可在世界杯赛程表中查看决赛时间。" }
          ]))
        }}
      />

      <section className="rounded-lg border border-gold/25 bg-gold/10 p-5 sm:p-7">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          <Trophy size={15} /> Final
        </div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">2026世界杯决赛</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64">
          决赛是美加墨世界杯最受关注的比赛。本页整理决赛时间、纽约/新泽西赛区信息和赛前分析。
        </p>
      </section>

      {match ? <WorldCupMatchCard match={match} prediction={prediction} /> : null}

      <section className="grid gap-4 md:grid-cols-3">
        <Info title="举办城市" body="纽约/新泽西赛区承接2026世界杯决赛，球场为 MetLife Stadium。" href={getHostCityPath("new-york-new-jersey")} />
        <Info title="淘汰赛赛程" body="查看32强赛到决赛的全部比赛时间。" href={`${worldCupBasePath}/knockout`} />
        <Info title="赛前观点" body="决赛临近后，相关观点会显示参考方向和分析入口。" href="/today" />
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function Info({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <Link href={href} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-gold/35">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-white/62">{body}</p>
    </Link>
  );
}
