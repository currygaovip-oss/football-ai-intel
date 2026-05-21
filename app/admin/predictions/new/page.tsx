import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { createPrediction } from "@/lib/admin-actions";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getModelDirectory } from "@/lib/data";

export default async function NewPredictionPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const models = getModelDirectory();

  return (
    <AdminShell>
      <div className="glass rounded-lg p-5">
        <h2 className="text-2xl font-semibold">新增赛前观点</h2>
        <form action={createPrediction} className="mt-6 grid gap-4">
          <Input name="title" label="标题" />
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="competition" label="赛事" placeholder="世界杯 小组赛" />
            <Input name="kickoff_time_text" label="开赛时间" placeholder="今晚 21:00" />
            <Input name="matchup" label="对阵" placeholder="阿贾克斯 vs 格罗宁根" />
            <Input name="published_at" label="发布时间" placeholder="今天 11:20" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-sm text-white/62">主模型</span>
              <select name="model_id" className="mt-2 w-full rounded-md border border-white/15 bg-pitch-950 px-3 py-3 text-white">
                {models.map((model) => <option key={model.id} value={model.id}>{model.code} · {model.name}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-white/62">可见范围</span>
              <select name="visibility" className="mt-2 w-full rounded-md border border-white/15 bg-pitch-950 px-3 py-3 text-white">
                <option value="free">免费</option>
                <option value="vip">VIP</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-white/62">风险等级</span>
              <select name="risk_level" className="mt-2 w-full rounded-md border border-white/15 bg-pitch-950 px-3 py-3 text-white">
                <option value="低">低</option>
                <option value="中">中</option>
                <option value="高">高</option>
              </select>
            </label>
          </div>
          <Input name="assistant_model_ids" label="辅助模型 ID，逗号分隔" placeholder="tacti-core,squad-lens" />
          <Input name="recommendation" label="参考方向" />
          <Textarea name="body" label="分析正文，每段一行" />
          <button type="submit" className="rounded-md bg-turf px-4 py-3 text-sm font-semibold text-pitch-950">
            发布观点
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
