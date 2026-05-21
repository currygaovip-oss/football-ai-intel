import { cn } from "@/lib/utils";

const tones = {
  green: "border-turf/30 bg-turf/10 text-turf",
  gold: "border-gold/40 bg-gold/10 text-gold",
  white: "border-white/15 bg-white/10 text-white/80",
  red: "border-red-400/30 bg-red-400/10 text-red-200"
};

export function Badge({ children, tone = "white" }: { children: React.ReactNode; tone?: keyof typeof tones }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}
