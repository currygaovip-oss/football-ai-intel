import { loginAdmin } from "@/lib/admin-actions";
import { getAdminPasswordHint } from "@/lib/admin-auth";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-md">
      <div className="glass rounded-lg p-6">
        <div className="text-sm font-semibold text-turf">Admin</div>
        <h1 className="mt-2 text-3xl font-semibold">后台登录</h1>
        <p className="mt-3 text-sm leading-6 text-white/58">{getAdminPasswordHint()}</p>
        {error ? <p className="mt-4 rounded-md border border-red-400/25 bg-red-400/10 p-3 text-sm text-red-200">密码不正确</p> : null}
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
