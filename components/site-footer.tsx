import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import { TELEGRAM_URL, X_URL } from "@/components/social-cta";
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
        <div className="flex flex-wrap gap-3">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-turf/30 bg-turf/10 px-3 py-2 text-xs text-turf"
            data-analytics-event="click_telegram"
            data-analytics-area="footer"
            data-analytics-label="Telegram 社群"
          >
            <Send size={14} /> Telegram 社群
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-xs text-white/68 hover:border-turf/30 hover:text-turf"
            data-analytics-event="click_x"
            data-analytics-area="footer"
            data-analytics-label="X 主页"
          >
            <MessageCircle size={14} /> X 主页
          </a>
        </div>
        <p>本内容仅用于足球交流、数据研究和赛前阅读参考，不构成任何结果承诺或行动建议。请理性看球，独立判断。</p>
      </div>
    </footer>
  );
}
