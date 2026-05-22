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
          ["AI分析师", home.modelCount]
        ].map(([label, value]) => (
          <div key={String(label)} className="glass rounded-lg p-5">
            <div className="text-sm text-white/48">{label}</div>
            <div className="mt-2 text-3xl font-semibold">{value}</div>
          </div>
        ))}
      </div>
      <div className="glass rounded-lg p-5">
        <h2 className="text-xl font-semibold">内容管理</h2>
        <p className="mt-3 text-sm leading-7 text-white/62">
          可在这里维护赛前观点和赛后复盘内容。发布后，相关内容会同步出现在首页、今日情报和复盘页面。
        </p>
      </div>
    </AdminShell>
  );
}
