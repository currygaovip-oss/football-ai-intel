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
