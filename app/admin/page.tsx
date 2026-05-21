import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getHomeData, getReviews, getTodayPredictions } from "@/lib/data";

export default async function AdminPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const home = getHomeData();
  const predictions = getTodayPredictions();
  const reviews = getReviews();

  return (
    <AdminShell>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["赛前观点", predictions.length],
          ["赛后复盘", reviews.length],
          ["AI模型", home.modelCount]
        ].map(([label, value]) => (
          <div key={String(label)} className="glass rounded-lg p-5">
            <div className="text-sm text-white/48">{label}</div>
            <div className="mt-2 text-3xl font-semibold">{value}</div>
          </div>
        ))}
      </div>
      <div className="glass rounded-lg p-5">
        <h2 className="text-xl font-semibold">当前后台范围</h2>
        <p className="mt-3 text-sm leading-7 text-white/62">
          第一版后台用于维护赛前观点和赛后复盘。比赛、AI模型和热门赛事已经进入 SQLite，后续可以继续扩展编辑页面。
        </p>
      </div>
    </AdminShell>
  );
}
