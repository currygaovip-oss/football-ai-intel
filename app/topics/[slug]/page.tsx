import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/badge";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { getAllPredictions, getReviews, getSchedule } from "@/lib/data";
import { getPredictionDisplayMeta } from "@/lib/prediction-display";
import { getSeoTopic, seoTopics } from "@/lib/seo-topics";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getHostCityPath, getTeamPath, getWorldCupFixturePath, getWorldCupTeamEntries, hostCities } from "@/lib/world-cup";

type TopicParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return seoTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicParams): Promise<Metadata> {
  const { slug } = await params;
  const topic = getSeoTopic(slug);
  if (!topic) {
    return createMetadata({
      title: "足球内容专题",
      description: "绿茵智报足球内容专题。",
      path: `/topics/${slug}`,
      noIndex: true
    });
  }

  return createMetadata({
    title: topic.title,
    description: topic.description,
    path: `/topics/${topic.slug}`
  });
}

export default async function TopicPage({ params }: TopicParams) {
  const { slug } = await params;
  const topic = getSeoTopic(slug);
  if (!topic) notFound();

  const matches = getSchedule();
  const predictions = getAllPredictions();
  const reviews = getReviews();
  const topicMatches = getTopicMatches(topic.slug, matches).slice(0, 8);
  const topicPredictions = predictions.slice(0, 6);
  const topicReviews = reviews.slice(0, 4);
  const listItems = getListItems(topic.slug, topicMatches, topicPredictions, topicReviews);

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: topic.title, description: topic.description, path: `/topics/${topic.slug}` })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd(topic.faq)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: topic.title,
              path: `/topics/${topic.slug}`,
              items: listItems
            })
          )
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">{topic.eyebrow}</div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">{topic.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64">{topic.intro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={topic.primaryLink.href} className="rounded-md bg-turf px-4 py-2.5 text-sm font-semibold text-pitch-950">
            {topic.primaryLink.label}
          </Link>
          <Link href="/today" className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/78 hover:border-turf/30 hover:text-turf">
            今日赛前观点
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {topic.faq.map((item) => (
          <div key={item.question} className="rounded-lg border border-turf/15 bg-turf/[0.045] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-turf/80">快速答案</div>
            <h2 className="mt-3 text-lg font-semibold text-white">{item.question}</h2>
            <p className="mt-3 text-sm leading-7 text-white/66">{item.answer}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">重点赛程</h2>
            <Link href="/schedule" className="text-sm text-turf">查看赛程中心</Link>
          </div>
          {topicMatches.length > 0 ? (
            <div className="grid gap-3">
              {topicMatches.map((match) => (
                <Link key={match.id} href={getWorldCupFixturePath(match)} className="rounded-lg border border-white/10 bg-black/20 p-4 transition hover:border-turf/30">
                  <div className="mb-2 text-xs text-turf">{match.competition} · {match.stage}</div>
                  <div className="text-lg font-semibold text-white">{match.home_team} vs {match.away_team}</div>
                  <div className="mt-2 text-sm text-white/55">{match.kickoff_time}</div>
                  {match.status === "finished" ? <div className="mt-2 text-sm text-gold">赛果：{match.home_score}-{match.away_score}</div> : null}
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-black/20 p-6 text-sm leading-6 text-white/58">
              近期重点赛程请以完整赛程为准。
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <h2 className="text-xl font-semibold text-white">赛前观点</h2>
            <div className="mt-4 grid gap-3">
              {topicPredictions.slice(0, 4).map((prediction) => (
                (() => {
                  const { competitionLabel, timeLabel } = getPredictionDisplayMeta(prediction);
                  return (
                    <Link key={prediction.id} href={`/predictions/${prediction.id}`} className="rounded-lg border border-white/10 bg-black/20 p-4 transition hover:border-turf/30">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP" : "免费"}</Badge>
                        <Badge>{competitionLabel}</Badge>
                      </div>
                      <div className="font-semibold text-white">{prediction.matchup}</div>
                      <div className="mt-2 text-sm text-white/58">{timeLabel || "开球时间以赛程为准"}</div>
                    </Link>
                  );
                })()
              ))}
            </div>
          </div>

          {topicReviews.length > 0 ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <h2 className="text-xl font-semibold text-white">复盘记录</h2>
              <div className="mt-4 grid gap-3">
                {topicReviews.map(({ review, prediction }) => (
                  <Link key={review.id} href={`/reviews/${review.id}`} className="rounded-lg border border-white/10 bg-black/20 p-4 transition hover:border-gold/30">
                    <div className="text-xs text-gold">复盘评分 {review.score}</div>
                    <div className="mt-2 font-semibold text-white">{prediction?.matchup ?? "足球赛后复盘"}</div>
                    <div className="mt-2 text-sm text-white/58">赛果：{review.match_result}</div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function getTopicMatches(slug: string, matches: ReturnType<typeof getSchedule>) {
  if (slug === "today-football-schedule") {
    const today = new Date();
    const target = `${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;
    const todayMatches = matches.filter((match) => match.kickoff_time.startsWith(target));
    return todayMatches.length ? todayMatches : matches;
  }
  if (slug === "world-cup-2026-schedule") {
    return matches.filter((match) => match.competition.includes("世界杯") || match.stage.includes("小组赛") || match.stage.includes("淘汰赛"));
  }
  if (
    slug === "world-cup-2026-match-time" ||
    slug === "world-cup-2026-china-time" ||
    slug === "world-cup-2026-groups" ||
    slug === "world-cup-2026-group-stage" ||
    slug === "world-cup-2026-knockout" ||
    slug === "world-cup-2026-opening-time" ||
    slug === "world-cup-2026-final-time" ||
    slug === "north-america-world-cup" ||
    slug === "world-cup-opening-final" ||
    slug === "world-cup-team-lineups"
  ) {
    return matches.filter((match) => match.competition.includes("世界杯") || match.stage.includes("小组赛") || match.stage.includes("淘汰赛") || match.stage.includes("决赛"));
  }
  if (slug === "football-score-result" || slug === "football-review") {
    return matches.filter((match) => match.status === "finished");
  }
  return matches;
}

function getListItems(
  slug: string,
  matches: ReturnType<typeof getSchedule>,
  predictions: ReturnType<typeof getAllPredictions>,
  reviews: ReturnType<typeof getReviews>
) {
  if (slug === "football-review" || slug === "football-score-result") {
    return reviews.map(({ review, prediction }) => ({
      name: `${prediction?.matchup ?? "足球赛事"}赛后复盘`,
      path: `/reviews/${review.id}`
    }));
  }
  if (slug === "football-match-analysis") {
    return predictions.map((prediction) => ({
      name: `${prediction.matchup}赛前分析`,
      path: `/predictions/${prediction.id}`
    }));
  }
  if (slug === "world-cup-2026-teams" || slug === "world-cup-team-lineups") {
    return getWorldCupTeamEntries().map((team) => ({
      name: `${team.name}世界杯2026赛程`,
      path: getTeamPath(team.slug)
    }));
  }
  if (slug === "world-cup-2026-host-cities" || slug === "north-america-world-cup") {
    return hostCities.map((city) => ({
      name: `${city.name}世界杯赛程与球场信息`,
      path: getHostCityPath(city.slug)
    }));
  }
  return matches.map((match) => ({
    name: `${match.home_team} vs ${match.away_team}`,
    path: getWorldCupFixturePath(match)
  }));
}
