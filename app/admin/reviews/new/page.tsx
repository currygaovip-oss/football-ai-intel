import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { createReview } from "@/lib/admin-actions";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getTodayPredictions } from "@/lib/data";

export default async function NewReviewPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const predictions = getTodayPredictions();

  return (
    <AdminShell>
      <div className="glass rounded-lg p-5">
        <h2 className="text-2xl font-semibold">新增赛后复盘</h2>
        <form action={createReview} className="mt-6 grid gap-4">
          <label className="block">
            <span className="text-sm text-white/62">关联赛前观点</span>
            <select name="prediction_id" className="mt-2 w-full rounded-md border border-white/15 bg-pitch-950 px-3 py-3 text-white">
              {predictions.map(({ prediction }) => <option key={prediction.id} value={prediction.id}>{prediction.matchup} · {prediction.title}</option>)}
            </select>
          </label>
          <div className="grid gap-4 md:grid-cols-3">
            <Input name="match_result" label="比赛结果" placeholder="阿根廷 2-0 丹麦" />
            <label className="block">
              <span className="text-sm text-white/62">结果状态</span>
              <select name="result_status" className="mt-2 w-full rounded-md border border-white/15 bg-pitch-950 px-3 py-3 text-white">
                <option value="hit">命中</option>
                <option value="half">部分符合</option>
                <option value="miss">未命中</option>
              </select>
            </label>
            <Input name="score" label="复盘评分" placeholder="7.5" />
          </div>
          <Input name="reviewed_at" label="复盘时间" placeholder="赛后 2 小时" />
          <Textarea name="body" label="复盘正文，每段一行" />
          <button type="submit" className="rounded-md bg-turf px-4 py-3 text-sm font-semibold text-pitch-950">
            发布复盘
          </button>
        </form>
      </div>
    </AdminShell>
  );
}

function Input({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm text-white/62">{label}</span>
      <input name={name} placeholder={placeholder} className="mt-2 w-full rounded-md border border-white/15 bg-black/20 px-3 py-3 text-white outline-none focus:border-turf/50" />
    </label>
  );
}

function Textarea({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className="text-sm text-white/62">{label}</span>
      <textarea name={name} rows={7} className="mt-2 w-full rounded-md border border-white/15 bg-black/20 px-3 py-3 text-white outline-none focus:border-turf/50" />
    </label>
  );
}
