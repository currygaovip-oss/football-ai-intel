import { Badge } from "@/components/badge";
import { SectionHeading } from "@/components/section-heading";
import { getSchedule } from "@/lib/data";

const groups = ["今日赛程", "明日赛程", "完整赛程", "世界杯", "小组赛", "淘汰赛", "热门赛事"];

export default function SchedulePage() {
  const matches = getSchedule();

  return (
    <div>
      <SectionHeading title="赛程中心" eyebrow="Schedule" level={1} />
      <div className="mb-6 flex flex-wrap gap-2">
        {groups.map((group) => <Badge key={group} tone={group === "世界杯" ? "green" : "white"}>{group}</Badge>)}
      </div>
      <div className="grid gap-4">
        {matches.map((match) => (
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
        ))}
      </div>
    </div>
  );
}
