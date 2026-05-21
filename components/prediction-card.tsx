import Link from "next/link";
import { BrainCircuit, Clock, ShieldAlert, Trophy } from "lucide-react";
import { Badge } from "@/components/badge";
import type { AiModel, Prediction } from "@/lib/data";

export function PredictionCard({ prediction, model }: { prediction: Prediction; model?: AiModel }) {
  return (
    <Link href={`/predictions/${prediction.id}`} className="glass block rounded-lg p-5 transition hover:-translate-y-0.5 hover:border-turf/40">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP" : "免费"}</Badge>
        <Badge>{prediction.competition}</Badge>
        <span className="ml-auto text-xs text-white/45">{prediction.published_at}</span>
      </div>
      {model ? (
        <div className="mb-4 rounded-md border border-white/10 bg-white/5 p-3">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <BrainCircuit size={16} className="text-turf" />
            <span className="font-semibold text-white">{model.code}</span>
            <span className="text-white/52">{model.name}</span>
            <span className="ml-auto text-xs text-turf">历史命中率 {model.hit_rate}%</span>
          </div>
          <div className="mt-2 text-xs text-white/45">{model.recent_record}</div>
        </div>
      ) : null}
      <h3 className="mb-3 text-lg font-semibold leading-snug text-white">{prediction.title}</h3>
      <div className="grid gap-2 text-sm text-white/68 sm:grid-cols-3">
        <span className="flex items-center gap-2"><Clock size={15} />{prediction.kickoff_time_text}</span>
        <span className="flex items-center gap-2"><Trophy size={15} />{prediction.matchup}</span>
        <span className="flex items-center gap-2"><ShieldAlert size={15} />风险：{prediction.risk_level}</span>
      </div>
      <p className="mt-4 rounded-md border border-turf/20 bg-turf/10 px-3 py-2 text-sm text-turf">{prediction.recommendation}</p>
    </Link>
  );
}
