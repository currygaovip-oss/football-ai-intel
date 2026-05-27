"use client";

import * as React from "react";
import Link from "next/link";
import { CalendarDays, Clock3, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type CountdownTarget = {
  label: string;
  targetIso: string;
  dateLabel: string;
  matchLabel: string;
  href: string;
};

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
};

type WorldCupCountdownProps = {
  primary: CountdownTarget;
  secondary?: CountdownTarget;
  variant?: "card" | "wide" | "strip";
  className?: string;
};

export function WorldCupCountdown({ primary, secondary, variant = "card", className }: WorldCupCountdownProps) {
  const primaryParts = useCountdown(primary.targetIso);
  const secondaryParts = useCountdown(secondary?.targetIso);

  if (variant === "strip") {
    return (
      <Link
        href={primary.href}
        className={cn(
          "flex flex-col gap-3 rounded-lg border border-turf/20 bg-turf/[0.075] p-4 transition hover:border-turf/40 sm:flex-row sm:items-center sm:justify-between",
          className
        )}
        data-analytics-event="click_world_cup_countdown"
        data-analytics-area="countdown_strip"
        data-analytics-label={primary.label}
      >
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-turf">
            <Clock3 size={14} /> 世界杯倒计时
          </div>
          <div className="mt-2 text-base font-semibold text-white">{primary.matchLabel}</div>
          <div className="mt-1 text-xs text-white/50">{primary.dateLabel}</div>
        </div>
        <CountdownNumbers parts={primaryParts} compact />
      </Link>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-turf/20 bg-turf/[0.065] p-4",
        variant === "wide" ? "sm:p-5" : "",
        className
      )}
    >
      <div className={cn("grid gap-4", variant === "wide" ? "lg:grid-cols-[1fr_auto]" : "")}>
        <Link
          href={primary.href}
          className="block"
          data-analytics-event="click_world_cup_countdown"
          data-analytics-area={variant === "wide" ? "countdown_wide" : "countdown_card"}
          data-analytics-label={primary.label}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-turf">
            <Trophy size={14} /> 世界杯倒计时
          </div>
          <h2 className={cn("mt-2 font-semibold leading-tight text-white", variant === "wide" ? "text-2xl sm:text-3xl" : "text-lg")}>
            {primary.label}
          </h2>
          <div className="mt-2 text-sm text-white/62">{primary.matchLabel}</div>
          <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-white/45">
            <CalendarDays size={13} />
            {primary.dateLabel}
          </div>
        </Link>
        <CountdownNumbers parts={primaryParts} />
      </div>

      {secondary ? (
        <Link
          href={secondary.href}
          className="mt-4 flex items-center justify-between gap-3 rounded-md border border-white/10 bg-black/20 px-3 py-2 transition hover:border-gold/30"
          data-analytics-event="click_world_cup_countdown"
          data-analytics-area="countdown_secondary"
          data-analytics-label={secondary.label}
        >
          <div>
            <div className="text-xs text-white/45">{secondary.label}</div>
            <div className="mt-1 text-sm font-medium text-white">{secondary.matchLabel}</div>
          </div>
          <div className="text-right text-xs text-gold">
            {secondaryParts ? `${secondaryParts.days} 天` : "-- 天"}
          </div>
        </Link>
      ) : null}
    </div>
  );
}

function CountdownNumbers({ parts, compact = false }: { parts: CountdownParts | null; compact?: boolean }) {
  const items = [
    { label: "天", value: parts ? String(parts.days) : "--" },
    { label: "小时", value: parts ? String(parts.hours).padStart(2, "0") : "--" },
    { label: "分钟", value: parts ? String(parts.minutes).padStart(2, "0") : "--" }
  ];

  return (
    <div className={cn("grid grid-cols-3 gap-2", compact ? "min-w-[210px]" : "")} suppressHydrationWarning>
      {items.map((item) => (
        <div key={item.label} className="rounded-md border border-white/10 bg-black/25 px-3 py-2 text-center">
          <div className={cn("font-semibold text-white", compact ? "text-lg" : "text-2xl")}>{item.value}</div>
          <div className="mt-1 text-[11px] text-white/42">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function useCountdown(targetIso: string | undefined) {
  const [parts, setParts] = React.useState<CountdownParts | null>(null);

  React.useEffect(() => {
    if (!targetIso) return;

    const tick = () => setParts(getCountdownParts(targetIso));
    tick();
    const timer = window.setInterval(tick, 60000);
    return () => window.clearInterval(timer);
  }, [targetIso]);

  return parts;
}

function getCountdownParts(targetIso: string): CountdownParts {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes };
}
