import Link from "next/link";
import { Bot, LogIn, Radio } from "lucide-react";

const nav = [
  ["首页", "/"],
  ["今日情报", "/today"],
  ["AI模型", "/models"],
  ["赛后复盘", "/reviews"],
  ["赛程", "/schedule"],
  ["热门赛事", "/hot"],
  ["VIP", "/vip"],
  ["关于", "/about"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-pitch-950/86 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-turf/30 bg-turf/10 text-turf shadow-glow">
            <Bot size={21} />
          </span>
          <div>
            <div className="flex items-center gap-2 text-base font-semibold tracking-wide">
              绿茵智报
              <span className="rounded-full border border-gold/35 bg-gold/10 px-2 py-0.5 text-[10px] font-medium tracking-normal text-gold">预览版</span>
            </div>
            <div className="text-xs text-white/55">Football AI Intelligence</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm text-white/72 transition hover:bg-white/10 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <Link href="/admin" className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm text-white/72">
            <LogIn size={16} />
            管理后台
          </Link>
          <a href="https://t.me/" className="inline-flex items-center gap-2 rounded-md border border-turf/30 bg-turf/10 px-3 py-2 text-sm text-turf">
            <Radio size={16} />
            Telegram 入口
          </a>
        </div>
      </div>
    </header>
  );
}
