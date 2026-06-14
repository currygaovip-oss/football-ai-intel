import type { Prediction } from "@/lib/data";

const dateLikePattern = /(?:\d{1,2}[-/]\d{1,2}|\d{1,2}月\d{1,2}日)(?:\s+\d{1,2}:\d{2})?/;

export function getPredictionDisplayMeta(prediction: Prediction) {
  const competitionTime = prediction.competition.match(dateLikePattern)?.[0] ?? "";
  const kickoffTime = /待定/.test(prediction.kickoff_time_text)
    ? ""
    : prediction.kickoff_time_text.match(dateLikePattern)?.[0] ?? prediction.kickoff_time_text;

  return {
    competitionLabel: competitionTime ? "赛前观点" : prediction.competition,
    timeLabel: kickoffTime || competitionTime
  };
}

export function extractPredictionDirection(recommendation: string) {
  return recommendation.replace(/^模型倾向：/, "").replace(/^参考方向：/, "");
}

export function isVipPredictionLocked(prediction: Prediction, now = new Date()) {
  if (prediction.visibility !== "vip") return false;

  const kickoffDate = parseKickoffDate(prediction.kickoff_time_text);
  if (!kickoffDate) return true;

  const unlockAt = new Date(kickoffDate.getTime() + 3 * 60 * 60 * 1000);
  return now.getTime() < unlockAt.getTime();
}

export function getPredictionDirectionDisplay(prediction: Prediction) {
  const locked = isVipPredictionLocked(prediction);

  return {
    locked,
    label: locked ? "VIP赛前方向已锁定" : extractPredictionDirection(prediction.recommendation),
    recommendation: locked ? "VIP赛前方向已锁定，比赛结束后开放完整参考。" : prediction.recommendation,
    teaser: locked ? "赛前仅展示比赛信息，完整参考方向留给 VIP 社群。" : ""
  };
}

function parseKickoffDate(value: string) {
  const match = value.match(/(\d{1,2})[-/月](\d{1,2})(?:日)?\s+(\d{1,2}):(\d{2})/);
  if (!match) return null;

  const [, month, day, hour, minute] = match;
  const year = new Date().getFullYear();
  const iso = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hour.padStart(2, "0")}:${minute}:00+08:00`;
  const parsed = new Date(iso);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
