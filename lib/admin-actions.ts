"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkAdminPassword, clearAdminAuth, setAdminAuth } from "@/lib/admin-auth";
import { insertPrediction, insertReview } from "@/lib/db";
import type { Prediction, Review } from "@/lib/data";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (!checkAdminPassword(password)) {
    redirect("/admin/login?error=1");
  }

  await setAdminAuth();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminAuth();
  redirect("/admin/login");
}

export async function createPrediction(formData: FormData) {
  const now = Date.now();
  const prediction: Prediction = {
    id: `p-${now}`,
    match_id: optionalString(formData.get("match_id")),
    model_id: requiredString(formData.get("model_id")),
    assistant_model_ids: splitCsv(formData.get("assistant_model_ids")),
    title: requiredString(formData.get("title")),
    competition: requiredString(formData.get("competition")),
    kickoff_time_text: requiredString(formData.get("kickoff_time_text")),
    matchup: requiredString(formData.get("matchup")),
    visibility: requiredString(formData.get("visibility")) as Prediction["visibility"],
    recommendation: requiredString(formData.get("recommendation")),
    risk_level: requiredString(formData.get("risk_level")) as Prediction["risk_level"],
    body: splitLines(formData.get("body")),
    published_at: requiredString(formData.get("published_at"))
  };

  insertPrediction(prediction);
  revalidatePath("/");
  revalidatePath("/today");
  revalidatePath(`/predictions/${prediction.id}`);
  redirect("/admin/predictions");
}

export async function createReview(formData: FormData) {
  const now = Date.now();
  const review: Review = {
    id: `r-${now}`,
    prediction_id: requiredString(formData.get("prediction_id")),
    match_result: requiredString(formData.get("match_result")),
    result_status: requiredString(formData.get("result_status")) as Review["result_status"],
    score: Number(formData.get("score") || 0),
    body: splitLines(formData.get("body")),
    reviewed_at: requiredString(formData.get("reviewed_at"))
  };

  insertReview(review);
  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath(`/reviews/${review.id}`);
  redirect("/admin/reviews");
}

function requiredString(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  if (!text) throw new Error("Missing required field");
  return text;
}

function optionalString(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text || undefined;
}

function splitLines(value: FormDataEntryValue | null) {
  return String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitCsv(value: FormDataEntryValue | null) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
