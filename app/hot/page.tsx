import { SectionHeading } from "@/components/section-heading";
import { getHotEvents } from "@/lib/data";

export default function HotPage() {
  const hotEvents = getHotEvents();

  return (
    <div>
      <SectionHeading title="热门赛事" eyebrow="Beyond World Cup" level={1} />
      <p className="mb-6 max-w-3xl text-sm leading-7 text-white/62">
        这里记录世界杯之外的焦点比赛，包括五大联赛、杯赛、友谊赛和附加赛。热门赛事会优先进入 AI 观点观察池。
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {hotEvents.map((event) => (
          <article key={event.id} className="glass rounded-lg p-6">
            <div className="text-xs text-gold">{event.competition} · {event.kickoff_time_text}</div>
            <h2 className="mt-3 text-2xl font-semibold">{event.title}</h2>
            <div className="mt-2 text-sm text-white/58">{event.matchup}</div>
            <p className="mt-4 leading-7 text-white/68">{event.body}</p>
            <div className="mt-5 text-xs text-white/42">发布：{event.published_at}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
