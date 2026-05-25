import type { Metadata } from "next";
import { loginAdmin } from "@/lib/admin-actions";
import { getAdminPasswordHint } from "@/lib/admin-auth";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "后台登录",
  description: "绿茵智报后台登录。",
  path: "/admin/login",
  noIndex: true
});

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const errorMessage =
    error === "locked"
      ? "连续输错次数过多，请稍后再试。"
      : error === "config"
        ? "生产环境未配置 ADMIN_PASSWORD，后台登录已禁用。"
        : error
          ? "密码不正确"
          : "";

  return (
    <div className="mx-auto max-w-md">
      <div className="glass rounded-lg p-6">
        <div className="text-sm font-semibold text-turf">Admin</div>
        <h1 className="mt-2 text-3xl font-semibold">后台登录</h1>
        <p className="mt-3 text-sm leading-6 text-white/58">{getAdminPasswordHint()}</p>
        {errorMessage ? <p className="mt-4 rounded-md border border-red-400/25 bg-red-400/10 p-3 text-sm text-red-200">{errorMessage}</p> : null}
        <form action={loginAdmin} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-white/62">后台密码</span>
            <input name="password" type="password" className="mt-2 w-full rounded-md border border-white/15 bg-black/20 px-3 py-3 text-white outline-none focus:border-turf/50" />
          </label>
          <button type="submit" className="w-full rounded-md bg-turf px-4 py-3 text-sm font-semibold text-pitch-950">
            进入后台
          </button>
        </form>
      </div>
    </div>
  );
}
