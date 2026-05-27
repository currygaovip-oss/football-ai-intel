import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { getAllPredictions } from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import { seoTopics } from "@/lib/seo-topics";
import { getTeamPath, getWorldCupTeamEntries, worldCupBasePath } from "@/lib/world-cup";

export const metadata: Metadata = createMetadata({
  title: "站内搜索",
  description: "搜索绿茵智报的足球赛程、世界杯2026、球队赛程、赛前观点和赛后复盘。",
  path: "/search",
  noIndex: true
});

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const query = (params?.q ?? "").trim();
  const normalized = query.toLowerCase();
  const teams = getWorldCupTeamEntries();
  const predictions = getAllPredictions();

  const topicResults = seoTopics.filter((topic) => matches(normalized, [topic.title, topic.description, topic.intro]));
  const teamResults = teams.filter((team) => matches(normalized, [team.name, team.summary, ...team.searchFocus]));
  const predictionResults = predictions.filter((prediction) => matches(normalized, [prediction.matchup, prediction.title, prediction.recommendation])).slice(0, 8);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-turf">
          <Search size={15} /> 搜索
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-white">搜索绿茵智报</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">
          可搜索世界杯赛程、球队、球员、赛前观点和赛后复盘。
        </p>
      </section>

      {query ? (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">“{query}”相关内容</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {topicResults.map((topic) => (
              <ResultCard key={topic.slug} title={topic.title} href={`/topics/${topic.slug}`} summary={topic.description} />
            ))}
            {teamResults.map((team) => (
              <ResultCard key={team.slug} title={`${team.name}世界杯赛程`} href={getTeamPath(team.slug)} summary={team.summary} />
            ))}
            {predictionResults.map((prediction) => (
              <ResultCard key={prediction.id} title={prediction.matchup} href={`/predictions/${prediction.id}`} summary={prediction.recommendation} />
            ))}
          </div>
          {!topicResults.length && !teamResults.length && !predictionResults.length ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-white/58">
              可从世界杯2026、今日情报或赛程中心继续查找。
            </div>
          ) : null}
        </section>
      ) : (
        <section className="grid gap-3 md:grid-cols-2">
          <ResultCard title="今日足球赛程" href="/football-schedule/today" summary="查看今日比赛时间、重点对阵和赛前观点。" />
          <ResultCard title="世界杯2026赛程" href={`${worldCupBasePath}/schedule`} summary="查看美加墨世界杯小组赛、淘汰赛和重点比赛时间。" />
          <ResultCard title="世界杯球队赛程" href={`${worldCupBasePath}/teams`} summary="按球队查看比赛时间、对手和重点球员。" />
          <ResultCard title="足球赛前分析" href="/predictions" summary="查看重点比赛参考方向和赛前分析。" />
        </section>
      )}

      <SeoTopicLinks />
    </div>
  );
}

function matches(query: string, fields: string[]) {
  if (!query) return false;
  return fields.some((field) => field.toLowerCase().includes(query));
}

function ResultCard({ title, href, summary }: { title: string; href: string; summary: string }) {
  return (
    <Link href={href} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-turf/35">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-white/58">{summary}</p>
    </Link>
  );
}
