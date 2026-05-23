import Link from "next/link";
import { seoTopicLinks } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-white/55 sm:px-6 lg:px-8">
        <div className="font-medium text-white/80">绿茵智报 · 中文足球 AI 赛前情报官</div>
        <div className="flex flex-wrap gap-3 text-xs">
          {seoTopicLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-white/50 hover:text-turf">
              {item.label}
            </Link>
          ))}
        </div>
        <p>本内容仅用于足球交流、数据研究和赛前阅读参考，不构成任何结果承诺或行动建议。请理性看球，独立判断。</p>
      </div>
    </footer>
  );
}
