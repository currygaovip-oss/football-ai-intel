import Link from "next/link";
import { BrainCircuit, Gauge } from "lucide-react";
import { Badge } from "@/components/badge";
import type { AiModel } from "@/lib/data";

export function ModelCard({ model, compact = false }: { model: AiModel; compact?: boolean }) {
  return (
    <div className="glass rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-turf/30 bg-turf/10 text-turf">
            <BrainCircuit size={21} />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">{model.code}</div>
            <div className="text-sm text-white/58">{model.name} · {model.role}</div>
          </div>
        </div>
        <Badge tone={model.hit_rate >= 60 ? "green" : model.hit_rate >= 53 ? "gold" : "white"}>样本 {model.hit_rate}%</Badge>
      </div>

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <div className="text-white/45">内测样本表现</div>
          <div className="mt-1 text-2xl font-semibold text-turf">{model.hit_rate}%</div>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 p-3">
          <div className="text-white/45">复盘评分</div>
          <div className="mt-1 flex items-center gap-2 text-2xl font-semibold text-gold">
            <Gauge size={18} /> {model.average_score}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/64">{compact ? `${model.role}：${model.recent_record}` : model.description}</p>

      {!compact ? (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {model.specialties.map((specialty) => <Badge key={specialty}>{specialty}</Badge>)}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/45">
            <span>{model.recent_record}</span>
            <span>风格：{model.risk_style}</span>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function ModelMiniLink({ model }: { model: AiModel }) {
  return (
    <Link href="/models" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:border-turf/40">
      <span className="font-semibold text-white">{model.code}</span>
      <span className="ml-2 text-white/50">{model.name}</span>
    </Link>
  );
}
