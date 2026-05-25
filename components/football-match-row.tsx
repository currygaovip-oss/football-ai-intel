import Link from "next/link";
import { ChevronRight, Clock3, Target } from "lucide-react";
import { Badge } from "@/components/badge";
import { getMatchPath, getReadableKickoff, getTimeLabel } from "@/lib/football-schedule";
import type { Match, Prediction } from "@/lib/data";

export function FootballMatchRow({ match, prediction }: { match: Match; prediction?: Prediction }) {
  const direction = prediction?.recommendation.replace(/^模型倾向：/, "").replace(/^参考方向：/, "");
  const href = getMatchPath(match, prediction);

  return (
    <Link
      href={href}
      className="grid gap-3 rounded-lg border border-white/10 bg-black/20 p-4 transition hover:-translate-y-0.5 hover:border-turf/35 md:grid-cols-[84px_1fr_0.9fr_auto] md:items-center"
      data-analytics-event={prediction ? "click_prediction" : "click_match"}
      data-analytics-area="football_schedule"
      data-analytics-label={`${match.home_team} vs ${match.away_team}`}
    >
      <div>
        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          <Clock3 size={14} className="text-turf" />
          {getTimeLabel(match.kickoff_time)}
        </div>
        <div className="mt-1 text-xs text-white/42">北京时间</div>
      </div>
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge>{match.competition}</Badge>
          <Badge>{match.stage}</Badge>
        </div>
        <h2 className="text-lg font-semibold leading-snug text-white">{match.home_team} vs {match.away_team}</h2>
        <p className="mt-1 text-xs text-white/45">{getReadableKickoff(match)}</p>
      </div>
      {direction ? (
        <div className="rounded-md border border-turf/25 bg-turf/10 px-3 py-2">
          <div className="flex items-center gap-1.5 text-xs text-turf"><Target size={13} /> 参考方向</div>
          <div className="mt-1 text-sm font-semibold text-white">{direction}</div>
        </div>
      ) : (
        <div className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/46">查看赛程信息</div>
      )}
      <span className="inline-flex items-center gap-1 text-xs text-turf">
        {prediction ? "查看分析" : "查看比赛"} <ChevronRight size={13} />
      </span>
    </Link>
  );
}
