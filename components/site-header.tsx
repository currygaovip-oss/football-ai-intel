import Link from "next/link";
import { MessageCircle, Radio } from "lucide-react";
import { TELEGRAM_URL, X_URL } from "@/components/social-cta";

const nav = [
  ["首页", "/"],
  ["今日情报", "/today"],
  ["世界杯", "/world-cup-2026"],
  ["赛后复盘", "/reviews"],
  ["赛程", "/schedule"],
  ["VIP", "/vip"],
  ["关于", "/about"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-pitch-950/86 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" data-analytics-event="click_nav" data-analytics-area="header" data-analytics-label="首页 Logo">
          <img
            src="/brand/football-ai-logo-universal.png"
            alt="绿茵智报"
            className="h-11 w-11 shrink-0 rounded-full border border-gold/45 object-cover shadow-glow"
          />
          <div>
            <div className="flex items-center gap-2 text-base font-semibold tracking-wide">
              绿茵智报
            </div>
            <div className="text-xs text-white/55">Football AI Intelligence</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-md px-3 py-2 text-sm text-white/72 transition hover:bg-white/10 hover:text-white"
              data-analytics-event="click_nav"
              data-analytics-area="desktop_header"
              data-analytics-label={label}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-turf/30 bg-turf/10 px-3 py-2 text-sm text-turf"
            data-analytics-event="click_telegram"
            data-analytics-area="header"
            data-analytics-label="社群入口"
          >
            <Radio size={16} />
            Telegram
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white/72 transition hover:border-turf/30 hover:text-turf"
            data-analytics-event="click_x"
            data-analytics-area="header"
            data-analytics-label="X 主页"
          >
            <MessageCircle size={16} />
            X 主页
          </a>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 text-sm sm:px-6 lg:hidden lg:px-8">
        {nav.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="shrink-0 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/72"
            data-analytics-event="click_nav"
            data-analytics-area="mobile_header"
            data-analytics-label={label}
          >
            {label}
          </Link>
        ))}
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-md border border-turf/30 bg-turf/10 px-3 py-2 text-turf"
          data-analytics-event="click_telegram"
          data-analytics-area="mobile_header"
          data-analytics-label="Telegram"
        >
          Telegram
        </a>
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/72"
          data-analytics-event="click_x"
          data-analytics-area="mobile_header"
          data-analytics-label="X 主页"
        >
          X 主页
        </a>
      </nav>
    </header>
  );
}
