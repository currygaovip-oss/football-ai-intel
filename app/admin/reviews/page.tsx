import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getReviews } from "@/lib/data";

export default async function AdminReviewsPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");
  const reviews = getReviews();

  return (
    <AdminShell>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">赛后复盘</h2>
        <Link href="/admin/reviews/new" className="rounded-md bg-turf px-4 py-2 text-sm font-semibold text-pitch-950">
          新增复盘
        </Link>
      </div>
      <div className="grid gap-3">
        {reviews.map(({ review, prediction }) => (
          <div key={review.id} className="glass rounded-lg p-5">
            <div className="text-xs text-gold">{review.reviewed_at} · 评分 {review.score}</div>
            <h3 className="mt-2 text-lg font-semibold">{prediction?.matchup ?? review.prediction_id}</h3>
            <p className="mt-2 text-sm text-white/58">赛果：{review.match_result}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
