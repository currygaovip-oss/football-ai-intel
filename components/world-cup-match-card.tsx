import Link from "next/link";
import { ChevronRight, Clock3, Target } from "lucide-react";
import { Badge } from "@/components/badge";
import {
  getDirection,
  getMatchDateLabel,
  getMatchTimeLabel,
  getStageLabel,
  getWorldCupFixturePath,
  type Match,
  type Prediction
} from "@/lib/world-cup";

export function WorldCupMatchCard({ match, prediction }: { match: Match; prediction?: Prediction }) {
  const direction = getDirection(prediction);

  return (
    <Link
      href={getWorldCupFixturePath(match)}
      className="block rounded-lg border border-white/10 bg-black/20 p-4 transition hover:-translate-y-0.5 hover:border-turf/35"
      data-analytics-event="click_worldcup_fixture"
      data-analytics-area="worldcup_match_card"
      data-analytics-label={`${match.home_team} vs ${match.away_team}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{getStageLabel(match)}</Badge>
          {prediction ? <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP观点" : "赛前观点"}</Badge> : null}
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs text-white/50">
          <Clock3 size={14} className="text-turf" />
          {getMatchDateLabel(match)} {getMatchTimeLabel(match)}
        </div>
      </div>
      <h2 className="mt-3 text-lg font-semibold leading-snug text-white">{match.home_team} vs {match.away_team}</h2>
      {direction ? (
        <div className="mt-3 rounded-md border border-turf/25 bg-turf/10 px-3 py-2">
          <div className="flex items-center gap-1.5 text-xs text-turf"><Target size={13} /> 参考方向</div>
          <div className="mt-1 text-sm font-semibold text-white">{direction}</div>
        </div>
      ) : (
        <p className="mt-3 text-sm leading-6 text-white/50">赛前信息会随比赛临近继续整理。</p>
      )}
      <div className="mt-3 inline-flex items-center gap-1 text-xs text-turf">
        查看比赛页 <ChevronRight size={13} />
      </div>
    </Link>
  );
}
