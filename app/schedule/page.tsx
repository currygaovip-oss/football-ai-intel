import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { getAllPredictions, getSchedule } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "足球赛程中心：今日赛程、世界杯赛程与比赛时间",
  description: "查看今日足球赛程、明日赛程、世界杯赛程、小组赛和淘汰赛比赛时间；有赛前分析的比赛可继续阅读模型倾向和风险提示。",
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
  const predictions = getAllPredictions();
  const filteredMatches = matches.filter((match) => matchMatchesFilter(match, currentType));

  return (
    <div>
      <SectionHeading title="足球赛程中心" eyebrow="Schedule" level={1} />
      <p className="mb-5 max-w-4xl text-sm leading-7 text-white/62">
        查看今日足球赛程、明日足球赛程、世界杯小组赛与淘汰赛比赛时间。绿茵智报会在重点比赛旁标记赛前分析入口，用户可以从赛程继续阅读对阵信息、模型倾向、参考方向和风险提示。
      </p>
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
          filteredMatches.map((match) => {
            const relatedPrediction = findPredictionForMatch(predictions, match);
            return (
              <div key={match.id} className="glass grid gap-4 rounded-lg p-5 md:grid-cols-[1fr_1.5fr_1fr] md:items-center">
                <div>
                  <div className="text-sm text-turf">{match.competition}</div>
                  <div className="mt-1 text-xs text-white/45">{match.stage}</div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{match.home_team} vs {match.away_team}</h2>
                  {relatedPrediction ? (
                    <Link
                      href={`/predictions/${relatedPrediction.id}`}
                      className="mt-2 inline-flex rounded-md border border-turf/25 bg-turf/10 px-3 py-1.5 text-xs text-turf hover:bg-turf/15"
                    >
                      查看{match.home_team}vs{match.away_team}赛前分析
                    </Link>
                  ) : (
                    <div className="mt-2 text-xs text-white/42">暂无赛前分析，赛前更新后会显示入口。</div>
                  )}
                </div>
                <div className="text-sm text-white/62 md:text-right">
                  {match.kickoff_time}
                  {match.status === "finished" ? <span className="ml-3 text-gold">{match.home_score}-{match.away_score}</span> : null}
                </div>
              </div>
            );
          })
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

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold">今日足球赛程怎么用</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            先确认比赛时间和赛事阶段，再进入有观点的比赛详情页，阅读赛前分析、模型倾向和风险等级。
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold">世界杯赛程分类</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            支持世界杯、小组赛、淘汰赛和完整赛程筛选，后续可继续扩展五大联赛、欧冠和杯赛入口。
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-semibold">赛前分析入口</h2>
          <p className="mt-2 text-sm leading-7 text-white/62">
            有赛前观点的比赛会显示详情链接，页面包含对阵、比赛时间、参考方向、风险提示和赛后复盘入口。
          </p>
        </div>
      </section>
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

function findPredictionForMatch(predictions: ReturnType<typeof getAllPredictions>, match: ReturnType<typeof getSchedule>[number]) {
  const matchup = `${match.home_team} vs ${match.away_team}`;
  return predictions.find((prediction) => prediction.matchup === matchup || prediction.matchup.includes(match.home_team) && prediction.matchup.includes(match.away_team));
}
