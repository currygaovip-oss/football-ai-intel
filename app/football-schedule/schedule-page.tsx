import Link from "next/link";
import { CalendarDays, ChevronRight } from "lucide-react";
import { FootballMatchRow } from "@/components/football-match-row";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { getAllPredictions } from "@/lib/data";
import { getFootballSchedule, getPredictionForMatch, groupMatchesByDate, type ScheduleRange } from "@/lib/football-schedule";
import { faqJsonLd, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";

const rangeCopy = {
  today: {
    title: "今日足球赛程",
    eyebrow: "Today Football Schedule",
    description: "查看今日足球赛程、比赛时间、对阵信息和赛前分析入口；有观点的比赛会显示参考方向。",
    empty: "今日暂无已收录比赛。可以查看明日赛程或本周赛程，继续关注接下来的重点场次。",
    primaryLink: "/football-schedule/tomorrow",
    primaryLabel: "查看明日赛程"
  },
  tomorrow: {
    title: "明日足球赛程",
    eyebrow: "Tomorrow Football Schedule",
    description: "查看明日足球赛程、比赛时间、对阵信息和赛前分析入口，提前关注重点比赛。",
    empty: "明日暂无已收录比赛。可以查看本周赛程，确认接下来已经整理的比赛安排。",
    primaryLink: "/football-schedule/week",
    primaryLabel: "查看本周赛程"
  },
  week: {
    title: "本周足球赛程",
    eyebrow: "Weekly Football Schedule",
    description: "查看本周足球赛程、比赛时间、重点对阵和赛前分析入口，适合提前安排观赛。",
    empty: "本周暂无已收录比赛。可以进入赛程中心查看世界杯和完整赛程。",
    primaryLink: "/schedule",
    primaryLabel: "查看赛程中心"
  }
} satisfies Record<ScheduleRange, { title: string; eyebrow: string; description: string; empty: string; primaryLink: string; primaryLabel: string }>;

export function FootballSchedulePage({ range, path }: { range: ScheduleRange; path: string }) {
  const copy = rangeCopy[range];
  const matches = getFootballSchedule(range);
  const predictions = getAllPredictions();
  const groups = groupMatchesByDate(matches);
  const matchesWithPrediction = matches.filter((match) => getPredictionForMatch(match, predictions)).length;

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: copy.title, description: copy.description, path })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: copy.title,
              path,
              items: matches.map((match) => ({
                name: `${match.home_team} vs ${match.away_team}`,
                path: getPredictionForMatch(match, predictions) ? `/predictions/${getPredictionForMatch(match, predictions)?.id}` : "/schedule"
              }))
            })
          )
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            faqJsonLd([
              {
                question: `${copy.title}主要看什么？`,
                answer: "先看比赛时间、赛事阶段和对阵双方；有赛前观点的比赛会显示参考方向和分析入口。"
              },
              {
                question: "没有比赛时怎么办？",
                answer: "可以切换到明日赛程、本周赛程或世界杯赛程，查看已经整理的比赛安排。"
              }
            ])
          )
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
          <CalendarDays size={15} /> {copy.eyebrow}
        </div>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-5xl">{copy.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/62">{copy.description}</p>
          </div>
          <Link href="/today" className="inline-flex shrink-0 rounded-md bg-turf px-4 py-2.5 text-sm font-semibold text-pitch-950">
            今日赛前分析
          </Link>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <Stat label="已收录比赛" value={matches.length} />
        <Stat label="有赛前观点" value={matchesWithPrediction} />
        <Stat label="赛程日期" value={groups.length} />
      </section>

      <nav className="flex flex-wrap gap-2">
        <ScheduleTab href="/football-schedule/today" label="今日足球赛程" active={range === "today"} />
        <ScheduleTab href="/football-schedule/tomorrow" label="明日足球赛程" active={range === "tomorrow"} />
        <ScheduleTab href="/football-schedule/week" label="本周足球赛程" active={range === "week"} />
        <ScheduleTab href="/world-cup-2026/schedule" label="世界杯赛程表" />
      </nav>

      {groups.length > 0 ? (
        <div className="space-y-5">
          {groups.map(([date, groupMatches]) => (
            <section key={date} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-white">{date}</h2>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/52">{groupMatches.length} 场</span>
              </div>
              <div className="grid gap-3">
                {groupMatches.map((match) => (
                  <FootballMatchRow key={match.id} match={match} prediction={getPredictionForMatch(match, predictions)} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-8 text-center">
          <h2 className="text-xl font-semibold text-white">暂无比赛</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-white/58">{copy.empty}</p>
          <Link href={copy.primaryLink} className="mt-5 inline-flex items-center gap-1 rounded-md border border-turf/30 bg-turf/10 px-4 py-2 text-sm text-turf hover:bg-turf/15">
            {copy.primaryLabel} <ChevronRight size={15} />
          </Link>
        </section>
      )}

      <SeoTopicLinks />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs text-white/45">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}

function ScheduleTab({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
  return (
    <Link className={`rounded-full border px-3 py-1.5 text-xs transition ${active ? "border-turf/35 bg-turf/15 text-turf" : "border-white/15 bg-white/[0.04] text-white/68 hover:border-turf/30 hover:text-turf"}`} href={href}>
      {label}
    </Link>
  );
}
