import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getTodayPredictions } from "@/lib/data";

export default async function AdminPredictionsPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const predictions = getTodayPredictions();

  return (
    <AdminShell>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">赛前观点</h2>
        <Link href="/admin/predictions/new" className="rounded-md bg-turf px-4 py-2 text-sm font-semibold text-pitch-950">
          新增观点
        </Link>
      </div>
      <div className="grid gap-3">
        {predictions.map(({ prediction, model }) => (
          <div key={prediction.id} className="glass rounded-lg p-5">
            <div className="text-xs text-turf">{prediction.competition} · {prediction.published_at}</div>
            <h3 className="mt-2 text-lg font-semibold">{prediction.title}</h3>
            <p className="mt-2 text-sm text-white/58">{model?.code} · {model?.name} · {prediction.visibility.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
