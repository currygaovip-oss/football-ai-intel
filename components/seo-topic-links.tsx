import Link from "next/link";
import { seoTopicLinks } from "@/lib/seo";

export function SeoTopicLinks() {
  return (
    <section className="rounded-lg border border-white/10 bg-black/20 p-4">
      <h2 className="text-base font-semibold text-white">常用足球内容</h2>
      <p className="mt-2 text-sm leading-6 text-white/56">
        今日赛程、赛前分析、世界杯赛程和赛后复盘集中在这里。
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {seoTopicLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-xs text-white/68 transition hover:border-turf/35 hover:text-turf"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
