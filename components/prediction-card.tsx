import Link from "next/link";
import { BrainCircuit, Clock, ShieldAlert, Sparkles, Trophy } from "lucide-react";
import { Badge } from "@/components/badge";
import type { AiModel, Prediction } from "@/lib/data";

export function PredictionCard({ prediction, model, compact = false }: { prediction: Prediction; model?: AiModel; compact?: boolean }) {
  if (compact) {
    return (
      <Link href={`/predictions/${prediction.id}`} className="glass block rounded-lg p-4 transition hover:-translate-y-0.5 hover:border-turf/40">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP" : "免费"}</Badge>
          <Badge>{prediction.competition}</Badge>
          <span className="ml-auto text-xs text-white/45">{prediction.published_at}</span>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-snug text-white">{prediction.matchup}</h3>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/62">
              <span className="flex items-center gap-1.5"><Clock size={14} />{prediction.kickoff_time_text}</span>
              <span className="flex items-center gap-1.5"><ShieldAlert size={14} />风险：{prediction.risk_level}</span>
            </div>
          </div>
          {model ? (
            <div className="shrink-0 rounded-md border border-turf/20 bg-turf/10 px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <BrainCircuit size={15} className="text-turf" />
                <span className="font-semibold text-white">{model.code}</span>
                <span className="text-white/50">{model.name}</span>
              </div>
              <div className="mt-1 text-xs text-white/50">近期样本表现 {model.hit_rate}% · {model.role}</div>
            </div>
          ) : null}
        </div>

        <p className="mt-3 flex items-start gap-2 rounded-md border border-turf/20 bg-turf/10 px-3 py-2 text-sm text-turf">
          <Sparkles className="mt-0.5 shrink-0" size={15} />
          <span>{prediction.recommendation}</span>
        </p>
      </Link>
    );
  }

  return (
    <Link href={`/predictions/${prediction.id}`} className="glass block rounded-lg p-5 transition hover:-translate-y-0.5 hover:border-turf/40">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge tone={prediction.visibility === "vip" ? "gold" : "green"}>{prediction.visibility === "vip" ? "VIP" : "免费"}</Badge>
        <Badge>{prediction.competition}</Badge>
        <span className="ml-auto text-xs text-white/45">{prediction.published_at}</span>
      </div>
      {model ? (
        <div className="mb-4 rounded-md border border-turf/20 bg-turf/10 p-3">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <BrainCircuit size={16} className="text-turf" />
            <span className="font-semibold text-white">{model.code}</span>
            <span className="text-white/58">{model.name}</span>
            <span className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[11px] text-white/62">{model.role}</span>
          </div>
          <div className="mt-3 grid gap-2 text-xs text-white/58 sm:grid-cols-2">
            <span className="rounded border border-white/10 bg-black/15 px-2 py-1">内测样本表现 {model.hit_rate}%+</span>
            <span className="rounded border border-white/10 bg-black/15 px-2 py-1">{model.recent_record}</span>
          </div>
        </div>
      ) : null}
      <h3 className="mb-3 text-lg font-semibold leading-snug text-white">{prediction.title}</h3>
      <div className="grid gap-2 text-sm text-white/68 sm:grid-cols-3">
        <span className="flex items-center gap-2"><Clock size={15} />{prediction.kickoff_time_text}</span>
        <span className="flex items-center gap-2"><Trophy size={15} />{prediction.matchup}</span>
        <span className="flex items-center gap-2"><ShieldAlert size={15} />风险：{prediction.risk_level}</span>
      </div>
      <p className="mt-4 flex items-start gap-2 rounded-md border border-turf/20 bg-turf/10 px-3 py-2 text-sm text-turf">
        <Sparkles className="mt-0.5 shrink-0" size={15} />
        <span>{prediction.recommendation}</span>
      </p>
    </Link>
  );
}
