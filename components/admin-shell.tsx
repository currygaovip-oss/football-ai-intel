import Link from "next/link";
import { logoutAdmin } from "@/lib/admin-actions";

const adminNav = [
  ["后台首页", "/admin"],
  ["赛前观点", "/admin/predictions"],
  ["赛后复盘", "/admin/reviews"],
  ["前台首页", "/"]
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="glass flex flex-col gap-4 rounded-lg p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-sm font-semibold text-turf">Admin Preview</div>
          <h1 className="mt-1 text-2xl font-semibold">绿茵智报内容后台</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {adminNav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-md border border-white/10 px-3 py-2 text-sm text-white/72 hover:border-turf/40 hover:text-turf">
              {label}
            </Link>
          ))}
          <form action={logoutAdmin}>
            <button className="rounded-md border border-gold/25 px-3 py-2 text-sm text-gold" type="submit">
              退出
            </button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}
