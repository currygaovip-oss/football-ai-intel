import type { Prediction, Review } from "@/lib/data";

export type ReviewVerdict = "hit" | "half" | "miss";

export type ReviewVerdictMeta = {
  verdict: ReviewVerdict;
  label: string;
  shortLabel: string;
  tone: "green" | "gold" | "red";
  title: string;
  description: string;
};

export type ReviewStats = {
  total: number;
  hit: number;
  half: number;
  miss: number;
};

const verdictMeta: Record<ReviewVerdict, Omit<ReviewVerdictMeta, "verdict">> = {
  hit: {
    label: "预测命中",
    shortLabel: "命中",
    tone: "green",
    title: "预测命中",
    description: "赛前参考方向与最终赛果或主要走势一致。"
  },
  half: {
    label: "半命中 / 小偏差",
    shortLabel: "半命中",
    tone: "gold",
    title: "半命中 / 小偏差",
    description: "主要走势接近赛前判断，但让步、进球数或细节存在偏差。"
  },
  miss: {
    label: "未命中",
    shortLabel: "未命中",
    tone: "red",
    title: "未命中",
    description: "核心参考方向与最终赛果或比赛走势不一致。"
  }
};

export function getReviewVerdict(review: Review): ReviewVerdict {
  const bodyText = review.body.join("\n");
  const explicitVerdict = getExplicitReviewVerdict(review.body);

  if (explicitVerdict) return explicitVerdict;
  if (review.result_status === "half") return "half";
  if (review.score >= 7 && review.result_status === "hit") return "hit";
  if (review.score <= 4 && review.result_status === "miss") return "miss";
  if (/方向命中|顺利打出|符合预期|判断基本一致/.test(bodyText) && review.score >= 7) return "hit";
  if (/未穿|小偏差|部分符合|走势接近|不足是|进球方向|让步|细节/.test(bodyText)) return "half";
  if (review.result_status === "miss" && review.score >= 5) return "half";
  if (review.result_status === "hit" && review.score <= 6) return "half";

  return review.result_status;
}

function getExplicitReviewVerdict(body: string[]): ReviewVerdict | null {
  const lines = body.map((line) => line.trim()).filter(Boolean);
  const resultIndex = lines.findIndex((line) => /^复盘结果[:：]?$/.test(line));
  const resultLine = resultIndex >= 0 ? lines[resultIndex + 1] : null;

  if (!resultLine) return null;
  if (/^(预测)?命中$|^全命中$|^方向命中$/.test(resultLine)) return "hit";
  if (/半命中|部分符合|小偏差/.test(resultLine)) return "half";
  if (/未命中/.test(resultLine)) return "miss";
  return null;
}

export function getReviewVerdictMeta(review: Review): ReviewVerdictMeta {
  const verdict = getReviewVerdict(review);
  return { verdict, ...verdictMeta[verdict] };
}

export function getReviewStats(reviews: Review[]): ReviewStats {
  return reviews.reduce<ReviewStats>(
    (stats, review) => {
      stats.total += 1;
      stats[getReviewVerdict(review)] += 1;
      return stats;
    },
    { total: 0, hit: 0, half: 0, miss: 0 }
  );
}

export function getRecentReviewStats(reviews: Review[], limit = 10) {
  return getReviewStats(reviews.slice(0, limit));
}

export function getMonthlyReviewStats(reviews: Review[], now = new Date()) {
  const since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return getReviewStats(reviews.filter((review) => {
    const reviewedAt = parseReviewedAt(review.reviewed_at, now);
    return reviewedAt ? reviewedAt >= since && reviewedAt <= now : false;
  }));
}

export function groupReviewsByVerdict<T extends { review: Review }>(items: T[]) {
  return items.reduce<Record<ReviewVerdict, T[]>>(
    (groups, item) => {
      groups[getReviewVerdict(item.review)].push(item);
      return groups;
    },
    { hit: [], half: [], miss: [] }
  );
}

export function formatReviewStats(stats: ReviewStats) {
  if (!stats.total) return "近期复盘持续记录中";
  return `近${stats.total}条复盘：命中 ${stats.hit}｜半命中 ${stats.half}｜未命中 ${stats.miss}`;
}

export function getReviewToneClass(tone: ReviewVerdictMeta["tone"], variant: "text" | "border" = "text") {
  if (variant === "border") {
    if (tone === "green") return "border-turf/35 bg-turf/10";
    if (tone === "gold") return "border-gold/35 bg-gold/10";
    return "border-red-400/30 bg-red-400/10";
  }
  if (tone === "green") return "text-turf";
  if (tone === "gold") return "text-gold";
  return "text-red-200";
}

export function getOriginalDirection(prediction?: Prediction, review?: Review) {
  const reviewDirection = review ? extractReviewBodyValue(review, "原参考方向：") : "";
  return reviewDirection || prediction?.recommendation.replace(/^模型倾向：|^参考方向：/, "") || "赛前参考已记录";
}

export function getReviewSummary(review: Review, prediction?: Prediction) {
  const direction = getOriginalDirection(prediction, review);
  const verdict = getReviewVerdictMeta(review);
  const firstBodyLine = review.body.find((line) => line.trim()) || "";
  const cleanBody = firstBodyLine.replace(/^赛后复盘[：:]?/, "").trim();
  const summary = cleanBody || `${verdict.label}，赛前参考为${direction}。`;
  return summary.length > 72 ? `${summary.slice(0, 72)}...` : summary;
}

function extractReviewBodyValue(review: Review, label: string) {
  const index = review.body.findIndex((line) => line.trim() === label);
  if (index < 0) return "";
  return review.body[index + 1]?.trim() ?? "";
}

function parseReviewedAt(value: string, now: Date) {
  const match = value.match(/(\d{1,2})\/(\d{1,2})(?:\s+(\d{1,2}):(\d{2}))?/);
  if (!match) return null;

  const [, month, day, hour = "0", minute = "0"] = match;
  const reviewedAt = new Date(now.getFullYear(), Number(month) - 1, Number(day), Number(hour), Number(minute));
  if (reviewedAt.getTime() > now.getTime() + 24 * 60 * 60 * 1000) {
    reviewedAt.setFullYear(reviewedAt.getFullYear() - 1);
  }

  return Number.isNaN(reviewedAt.getTime()) ? null : reviewedAt;
}

export function getReviewMatchResult(review: Review) {
  const bodyText = review.body.join("\n");
  const scoreLine = bodyText
    .split("\n")
    .map((line) => line.trim())
    .find((line) => /^[\u4e00-\u9fa5A-Za-z0-9·\s]+ \d+-\d+ [\u4e00-\u9fa5A-Za-z0-9·\s]+$/.test(line));

  if (scoreLine) return scoreLine;
  if (review.match_result && !/已复盘|未复盘/.test(review.match_result)) return review.match_result;
  return "赛果已归档";
}

export function reviewVerdictOrder() {
  return ["hit", "half", "miss"] as const;
}

export function reviewVerdictInfo(verdict: ReviewVerdict): ReviewVerdictMeta {
  return { verdict, ...verdictMeta[verdict] };
}
