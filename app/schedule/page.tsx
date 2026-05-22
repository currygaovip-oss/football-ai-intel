import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { getSchedule } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "世界杯赛程中心",
  description: "查看世界杯赛程、今日赛程、明日赛程、小组赛和淘汰赛安排，配合绿茵智报赛前观点阅读。",
  path: "/schedule"
});

const filters = [
  { key: "today", label: "今日赛程" },
  { key: "tomorrow", label: "明日赛程" },
  { key: "all", label: "完整赛程" },
  { key: "worldcup", label: "世界杯" },
  { key: "group", label: "小组赛" },
  { key: "knockout", label: "淘汰赛" }
] as const;

type FilterKey = (typeof filters)[number]["key"];

const emptyCopy: Record<FilterKey, string> = {
  today: "今日暂无已收录赛程。可以先查看完整赛程或世界杯赛程。",
  tomorrow: "明日暂无已收录赛程。可以先查看完整赛程或世界杯赛程。",
  all: "暂无已收录赛程。",
  worldcup: "暂无世界杯赛程。",
  group: "暂无小组赛赛程。",
  knockout: "暂无淘汰赛赛程。"
};

export default async function SchedulePage({ searchParams }: { searchParams?: Promise<{ type?: string }> }) {
  const params = await searchParams;
  const currentType = normalizeFilter(params?.type);
  const matches = getSchedule();
  const filteredMatches = matches.filter((match) => matchMatchesFilter(match, currentType));

  return (
    <div>
      <SectionHeading title="赛程中心" eyebrow="Schedule" level={1} />
      <div className="mb-6 flex flex-wrap gap-2">
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
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <div className="grid gap-4">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <div key={match.id} className="glass grid gap-4 rounded-lg p-5 md:grid-cols-[1fr_1.5fr_1fr] md:items-center">
              <div>
                <div className="text-sm text-turf">{match.competition}</div>
                <div className="mt-1 text-xs text-white/45">{match.stage}</div>
              </div>
              <div className="text-xl font-semibold">{match.home_team} vs {match.away_team}</div>
              <div className="text-sm text-white/62 md:text-right">
                {match.kickoff_time}
                {match.status === "finished" ? <span className="ml-3 text-gold">{match.home_score}-{match.away_score}</span> : null}
              </div>
            </div>
          ))
        ) : (
          <div className="glass rounded-lg p-8 text-center">
            <div className="text-lg font-semibold text-white">暂无比赛</div>
            <p className="mt-2 text-sm leading-6 text-white/58">{emptyCopy[currentType]}</p>
            <Link href="/schedule?type=all" className="mt-5 inline-flex rounded-md border border-turf/30 bg-turf/10 px-4 py-2 text-sm text-turf hover:bg-turf/15">
              查看完整赛程
            </Link>
          </div>
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
  if (type === "worldcup") return match.competition.includes("世界杯");
  if (type === "group") return match.stage.includes("小组赛") || match.competition.includes("小组赛");
  if (type === "knockout") return match.stage.includes("淘汰赛") || match.competition.includes("淘汰赛") || match.stage.includes("决赛");

  const today = new Date();
  const offset = type === "today" ? 0 : 1;
  const target = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
  const targetLabel = `${String(target.getMonth() + 1).padStart(2, "0")}/${String(target.getDate()).padStart(2, "0")}`;
  return match.kickoff_time.startsWith(targetLabel);
}
