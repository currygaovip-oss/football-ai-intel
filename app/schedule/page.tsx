import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, ChevronRight, Clock3, Trophy } from "lucide-react";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { cn } from "@/lib/utils";
import { getAllPredictions, getSchedule } from "@/lib/data";
import { createMetadata, faqJsonLd, itemListJsonLd, jsonLd, sportsEventJsonLd, webPageJsonLd } from "@/lib/seo";

const scheduleDescription = "查看今日足球赛程、明日赛程、世界杯2026赛程、小组赛和淘汰赛比赛时间；有赛前分析的比赛可继续阅读参考方向和详细分析。";

export const metadata: Metadata = createMetadata({
  title: "足球赛程中心：今日赛程、世界杯赛程与比赛时间",
  description: scheduleDescription,
  path: "/schedule"
});

const filters = [
  { key: "today", label: "今日" },
  { key: "tomorrow", label: "明日" },
  { key: "group", label: "小组赛" },
  { key: "knockout", label: "淘汰赛" },
  { key: "all", label: "全部" }
] as const;

type FilterKey = (typeof filters)[number]["key"];

const emptyCopy: Record<FilterKey, string> = {
  today: "今日暂无已收录赛程。可切换到全部赛程继续查看。",
  tomorrow: "明日暂无已收录赛程。可切换到全部赛程继续查看。",
  all: "暂无已收录赛程。",
  group: "暂无小组赛赛程。",
  knockout: "暂无淘汰赛赛程。"
};

export default async function SchedulePage({ searchParams }: { searchParams?: Promise<{ type?: string }> }) {
  const params = await searchParams;
  const currentType = normalizeFilter(params?.type);
  const matches = getSchedule();
  const predictions = getAllPredictions();
  const filteredMatches = matches.filter((match) => matchMatchesFilter(match, currentType));
  const todayCount = matches.filter((match) => matchMatchesFilter(match, "today")).length;
  const tomorrowCount = matches.filter((match) => matchMatchesFilter(match, "tomorrow")).length;
  const predictionMatchCount = matches.filter((match) => findPredictionForMatch(predictions, match)).length;
  const dateGroups = groupMatchesByDate(filteredMatches);
  const stageGroups = groupStageCounts(matches);

  return (
    <div className="space-y-5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "足球赛程中心", description: scheduleDescription, path: "/schedule" })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            itemListJsonLd({
              name: "足球赛程列表",
              path: `/schedule?type=${currentType}`,
              items: filteredMatches.slice(0, 20).map((match) => ({
                name: `${match.home_team} vs ${match.away_team}`,
                path: `/schedule?type=${currentType}`
              }))
            })
          )
        }}
      />
      {filteredMatches.slice(0, 6).map((match) => (
        <script
          key={`event-${match.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(
              sportsEventJsonLd({
                name: `${match.home_team} vs ${match.away_team}`,
                path: `/schedule?type=${currentType}`,
                startDate: toEventDateTime(match.kickoff_time),
                competition: match.competition,
                homeTeam: match.home_team,
                awayTeam: match.away_team
              })
            )
          }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            faqJsonLd([
              {
                question: "足球赛程中心可以查看哪些内容？",
                answer: "可以查看今日足球赛程、明日赛程、世界杯小组赛、淘汰赛和全部已收录比赛时间。"
              },
              {
                question: "哪些比赛有赛前分析？",
                answer: "已经发布赛前观点的比赛会显示分析入口，点击后可以查看参考方向和详细分析。"
              },
              {
                question: "世界杯赛程怎么筛选？",
                answer: "可以通过小组赛、淘汰赛和全部赛程标签切换，也可以查看右侧世界杯阶段入口。"
              }
            ])
          )
        }}
      />
      <section className="border-b border-white/10 pb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-turf">
              <CalendarDays size={14} /> Schedule
            </div>
            <h1 className="text-2xl font-semibold leading-tight text-white">足球赛程中心</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/58">
              查看今日、明日和世界杯阶段赛程。有赛前观点的比赛会显示分析入口。
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-white/58">
            <ScheduleStat label="今日" value={todayCount} href="/football-schedule/today" />
            <ScheduleStat label="明日" value={tomorrowCount} href="/football-schedule/tomorrow" />
            <ScheduleStat label="全部" value={matches.length} href="/schedule?type=all" />
            <ScheduleStat label="有分析" value={predictionMatchCount} href="/today" />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-2 border-y border-white/10 py-3">
        <Link href="/football-schedule/today" className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/75 transition hover:border-turf/30 hover:text-turf">今日足球赛程</Link>
        <Link href="/football-schedule/tomorrow" className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/75 transition hover:border-turf/30 hover:text-turf">明日足球赛程</Link>
        <Link href="/world-cup-2026/schedule" className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/75 transition hover:border-turf/30 hover:text-turf">世界杯赛程表</Link>
        {filters.map((filter) => {
          const active = filter.key === currentType;
          return (
            <Link
              key={filter.key}
              href={`/schedule?type=${filter.key}`}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition",
                active ? "border-turf/35 bg-turf/15 text-turf" : "border-white/15 bg-white/10 text-white/75 hover:border-turf/30 hover:text-turf"
              )}
              data-analytics-event="click_schedule"
              data-analytics-area="schedule_filters"
              data-analytics-label={filter.label}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <section className="grid gap-5 xl:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          {dateGroups.length > 0 ? (
            dateGroups.map(([dateLabel, groupMatches]) => (
              <section key={dateLabel} className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.28em] text-turf">Match Day</div>
                    <h2 className="mt-1 text-xl font-semibold text-white">{dateLabel}</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55">
                    {groupMatches.length} 场比赛
                  </div>
                </div>
                <div className="grid gap-3">
                  {groupMatches.map((match) => (
                    <ScheduleMatchCard key={match.id} match={match} relatedPrediction={findPredictionForMatch(predictions, match)} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="glass rounded-lg p-8 text-center">
              <div className="text-lg font-semibold text-white">暂无比赛</div>
              <p className="mt-2 text-sm leading-6 text-white/58">{emptyCopy[currentType]}</p>
              <Link href="/schedule?type=all" className="mt-5 inline-flex rounded-md border border-turf/30 bg-turf/10 px-4 py-2 text-sm text-turf hover:bg-turf/15">
                查看全部赛程
              </Link>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
              <Trophy size={16} className="text-gold" /> 世界杯阶段
            </div>
            <div className="space-y-2">
              {stageGroups.map(([stage, count]) => (
                <Link
                  key={stage}
                  href={`/schedule?type=${stage.includes("淘汰") || stage.includes("决赛") ? "knockout" : "group"}`}
                  className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm transition hover:border-turf/30 hover:text-turf"
                  data-analytics-event="click_schedule"
                  data-analytics-area="schedule_stage"
                  data-analytics-label={stage}
                >
                  <span>{stage}</span>
                  <span className="text-xs text-white/45">{count} 场</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-turf/20 bg-turf/10 p-4">
            <h2 className="text-base font-semibold text-white">赛前观点入口</h2>
            <p className="mt-2 text-sm leading-6 text-white/62">
              已发布观点的比赛会显示“查看赛前分析”。其他比赛保持赛程展示，赛前更新时会补充分析入口。
            </p>
            <Link
              href="/today"
              className="mt-4 inline-flex items-center gap-1 text-sm text-turf hover:text-turfSoft"
              data-analytics-event="click_today"
              data-analytics-area="schedule_sidebar"
              data-analytics-label="查看全部赛前分析"
            >
              查看全部赛前分析 <ChevronRight size={15} />
            </Link>
          </div>
        </aside>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold">今日足球赛程怎么用</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            先看比赛时间、赛事阶段和对阵双方，再进入已发布观点的比赛详情，阅读赛前分析和参考方向。
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold">世界杯赛程分类</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            按小组赛、淘汰赛和全部赛程筛选，快速找到对应比赛日、分组和开球时间。
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold">赛前分析入口</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            有赛前观点的比赛会显示详情链接，页面包含对阵、比赛时间、参考方向和复盘入口。
          </p>
        </div>
      </section>

      <SeoTopicLinks />
    </div>
  );
}

function ScheduleStat({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 transition hover:border-turf/30 hover:text-turf"
      data-analytics-event="click_schedule"
      data-analytics-area="schedule_stats"
      data-analytics-label={label}
    >
      <span>{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </Link>
  );
}

function ScheduleMatchCard({
  match,
  relatedPrediction
}: {
  match: ReturnType<typeof getSchedule>[number];
  relatedPrediction?: ReturnType<typeof getAllPredictions>[number];
}) {
  return (
    <div className="grid gap-3 rounded-lg border border-white/10 bg-black/20 p-4 md:grid-cols-[88px_1fr_auto] md:items-center">
      <div className="flex items-center gap-2 text-sm text-white/62 md:block">
        <Clock3 size={15} className="text-turf md:hidden" />
        <div className="font-semibold text-white">{getTimeLabel(match.kickoff_time)}</div>
        <div className="mt-0.5 text-xs text-white/42">{match.competition}</div>
      </div>
      <div>
        <div className="text-xs text-turf">{match.stage}</div>
        <h2 className="mt-1 text-lg font-semibold text-white">{match.home_team} vs {match.away_team}</h2>
        {match.status === "finished" ? <div className="mt-1 text-sm text-gold">赛果：{match.home_score}-{match.away_score}</div> : null}
      </div>
      <div className="md:text-right">
        {relatedPrediction ? (
          <Link
            href={`/predictions/${relatedPrediction.id}`}
            className="inline-flex items-center gap-1 rounded-md border border-turf/25 bg-turf/10 px-3 py-1.5 text-xs text-turf hover:bg-turf/15"
            data-analytics-event="click_prediction"
            data-analytics-area="schedule_match_card"
            data-analytics-label={relatedPrediction.matchup}
          >
            查看赛前分析 <ChevronRight size={13} />
          </Link>
        ) : (
          <div className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/42">赛前更新</div>
        )}
      </div>
    </div>
  );
}

function normalizeFilter(type: string | undefined): FilterKey {
  return filters.some((filter) => filter.key === type) ? (type as FilterKey) : "all";
}

function matchMatchesFilter(match: ReturnType<typeof getSchedule>[number], type: FilterKey) {
  if (type === "all") return true;
  if (type === "group") return match.stage.includes("小组赛") || match.competition.includes("小组赛");
  if (type === "knockout") return match.stage.includes("淘汰赛") || match.competition.includes("淘汰赛") || match.stage.includes("决赛");

  const today = new Date();
  const offset = type === "today" ? 0 : 1;
  const target = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
  const targetLabel = `${String(target.getMonth() + 1).padStart(2, "0")}/${String(target.getDate()).padStart(2, "0")}`;
  return match.kickoff_time.startsWith(targetLabel);
}

function findPredictionForMatch(predictions: ReturnType<typeof getAllPredictions>, match: ReturnType<typeof getSchedule>[number]) {
  const matchup = `${match.home_team} vs ${match.away_team}`;
  return predictions.find((prediction) => prediction.matchup === matchup || prediction.matchup.includes(match.home_team) && prediction.matchup.includes(match.away_team));
}

function groupMatchesByDate(matches: ReturnType<typeof getSchedule>) {
  const groups = new Map<string, typeof matches>();
  matches.forEach((match) => {
    const label = getDateLabel(match.kickoff_time);
    groups.set(label, [...(groups.get(label) ?? []), match]);
  });
  return Array.from(groups.entries());
}

function groupStageCounts(matches: ReturnType<typeof getSchedule>) {
  const groups = new Map<string, number>();
  matches.forEach((match) => {
    const label = match.stage.split("·")[0].trim() || match.stage;
    groups.set(label, (groups.get(label) ?? 0) + 1);
  });
  return Array.from(groups.entries()).slice(0, 6);
}

function getDateLabel(kickoffTime: string) {
  const match = kickoffTime.match(/^(\d{2})\/(\d{2})/);
  if (!match) return kickoffTime;
  return `${Number(match[1])}月${Number(match[2])}日`;
}

function getTimeLabel(kickoffTime: string) {
  const match = kickoffTime.match(/\d{2}\/\d{2}\s+(\d{2}:\d{2})/);
  return match?.[1] ?? kickoffTime;
}

function toEventDateTime(kickoffTime: string) {
  const match = kickoffTime.match(/^(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return kickoffTime;
  const year = new Date().getFullYear();
  return `${year}-${match[1]}-${match[2]}T${match[3]}:${match[4]}:00+07:00`;
}
