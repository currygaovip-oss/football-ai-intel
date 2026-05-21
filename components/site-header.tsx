import Link from "next/link";
import { Bot, Radio } from "lucide-react";

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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-turf/30 bg-turf/10 text-turf shadow-glow">
            <Bot size={21} />
          </span>
          <div>
            <div className="flex items-center gap-2 text-base font-semibold tracking-wide">
              绿茵智报
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
          <Link href="/vip" className="inline-flex items-center gap-2 rounded-md border border-turf/30 bg-turf/10 px-3 py-2 text-sm text-turf">
            <Radio size={16} />
            社群入口
          </Link>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 text-sm sm:px-6 lg:hidden lg:px-8">
        {nav.map(([label, href]) => (
          <Link key={href} href={href} className="shrink-0 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/72">
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
