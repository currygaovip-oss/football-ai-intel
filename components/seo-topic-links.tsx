import Link from "next/link";
import { getDataSourceInfo } from "@/lib/data";
import { seoTopicLinks } from "@/lib/seo";

export function SeoTopicLinks() {
  const dataSource = getDataSourceInfo();
  const updatedAt = formatDataDate(dataSource.exportedAt);

  return (
    <section className="rounded-lg border border-white/10 bg-black/20 p-4">
      <h2 className="text-base font-semibold text-white">常用足球内容</h2>
      <p className="mt-2 text-sm leading-6 text-white/56">
        一站看今日赛程、赛前分析、世界杯赛程和赛后复盘。
      </p>
      <div className="mt-3 grid gap-2 text-xs text-white/48 sm:grid-cols-3">
        <span>数据快照：{updatedAt}</span>
        <span>比赛 {dataSource.matchCount} 场</span>
        <span>观点 {dataSource.predictionCount} 条 / 复盘 {dataSource.reviewCount} 条</span>
      </div>
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

function formatDataDate(value?: string) {
  if (!value) return "按赛程整理";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "按赛程整理";
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
