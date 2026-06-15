import {
  type AiModel,
  type HotEvent,
  type Match,
  type Prediction,
  type Review
} from "@/lib/mock-data";
import worldcupSnapshot from "@/data/worldcup-content.json";
import { aiModels, matches, predictions, reviews } from "@/lib/content-data";

export type { AiModel, HotEvent, Match, Prediction, Review };

const publicModelIds = new Set(["alpha-pitch", "odds-mind", "goal-net", "squad-lens", "heat-guard"]);
const publicAiModels = aiModels.filter((model) => publicModelIds.has(model.id)).map(sanitizeAiModel);

type ContentData = {
  matches: Match[];
  predictions: Prediction[];
  reviews: Review[];
};

type SnapshotData = ContentData & {
  exported_at?: string;
  source?: string;
  counts?: {
    matches: number;
    predictions: number;
    reviews: number;
  };
};

const snapshotData = worldcupSnapshot as SnapshotData;
let cachedContentData: ContentData | null = null;
let cachedCompletedReviews: Review[] | null = null;
let cachedContentIndex: ContentIndex | null = null;

type ContentIndex = {
  activePredictions: Prediction[];
  completedReviews: Review[];
  predictionById: Map<string, Prediction>;
  reviewById: Map<string, Review>;
  reviewByPredictionId: Map<string, Review>;
};

export function getHomeData() {
  const data = getContentData();
  const index = getContentIndex(data);

  return {
    aiModels: publicAiModels.slice(0, 3),
    modelCount: publicAiModels.length,
    matches: data.matches,
    predictions: index.activePredictions.map(withPredictionModel),
    reviews: index.completedReviews.map((review) => withReviewPrediction(review, index)),
    totals: {
      predictions: data.predictions.length,
      reviews: index.completedReviews.length,
      matches: data.matches.length
    }
  };
}

export function getTodayPredictions() {
  const data = getContentData();
  return getContentIndex(data).activePredictions.map(withPredictionModel);
}

export function getAllPredictions() {
  return getContentData().predictions;
}

export function getModelDirectory() {
  return publicAiModels;
}

export function getSchedule() {
  return getContentData().matches;
}

export function getReviews() {
  const data = getContentData();
  const index = getContentIndex(data);
  return index.completedReviews.map((review) => withReviewPrediction(review, index));
}

export function getAllReviews() {
  const data = getContentData();
  return getContentIndex(data).completedReviews;
}

export function getPredictionDetail(id: string) {
  const data = getContentData();
  const index = getContentIndex(data);
  const prediction = index.predictionById.get(id);
  if (!prediction) return null;

  return {
    prediction,
    model: getPredictionModel(prediction),
    assistantModels: getAssistantModels(prediction),
    review: index.reviewByPredictionId.get(prediction.id)
  };
}

export function getReviewDetail(id: string) {
  const data = getContentData();
  const index = getContentIndex(data);
  const review = index.reviewById.get(id);
  if (!review) return null;

  return {
    review,
    prediction: getPredictionForReview(review, index)
  };
}

export function getDataSourceInfo() {
  const contentData = getContentData();

  return {
    source: snapshotData ? "worldcup_bot_snapshot" : "local",
    exportedAt: snapshotData?.exported_at,
    predictionCount: contentData.predictions.length,
    reviewCount: getContentIndex(contentData).completedReviews.length,
    matchCount: contentData.matches.length
  };
}

export function refreshDataSourceForRuntime() {
  return getDataSourceInfo();
}

function getContentData(): ContentData {
  if (cachedContentData) return cachedContentData;

  if (snapshotData?.predictions?.length) {
    cachedContentData = sanitizeContentData({
      matches: snapshotData.matches,
      predictions: snapshotData.predictions,
      reviews: snapshotData.reviews
    });
    return cachedContentData;
  }

  cachedContentData = sanitizeContentData({ matches, predictions, reviews });
  return cachedContentData;
}

function withPredictionModel(prediction: Prediction) {
  return {
    prediction,
    model: getPredictionModel(prediction)
  };
}

function withReviewPrediction(review: Review, index = getContentIndex()) {
  return {
    review,
    prediction: getPredictionForReview(review, index)
  };
}

function getAiModel(id: string) {
  return aiModels.find((model) => model.id === id);
}

function getPredictionModel(prediction: Prediction) {
  return getAiModel(prediction.model_id);
}

function getAssistantModels(prediction: Prediction) {
  return prediction.assistant_model_ids.map(getAiModel).filter((model): model is AiModel => Boolean(model));
}

function getPredictionForReview(review: Review, index = getContentIndex()) {
  return index.predictionById.get(review.prediction_id);
}

function getCompletedReviews(reviewList: Review[]) {
  if (cachedContentData?.reviews === reviewList && cachedCompletedReviews) return cachedCompletedReviews;
  const completedReviews = reviewList.filter(isCompletedReview);
  if (cachedContentData?.reviews === reviewList) cachedCompletedReviews = completedReviews;
  return completedReviews;
}

function getContentIndex(data = getContentData()): ContentIndex {
  if (cachedContentData === data && cachedContentIndex) return cachedContentIndex;

  const completedReviews = getCompletedReviews(data.reviews);
  const reviewById = new Map(completedReviews.map((review) => [review.id, review]));
  const reviewByPredictionId = new Map(completedReviews.map((review) => [review.prediction_id, review]));
  const predictionById = new Map(data.predictions.map((prediction) => [prediction.id, prediction]));
  const activePredictions = data.predictions.filter((prediction) => !reviewByPredictionId.has(prediction.id));
  const index = { activePredictions, completedReviews, predictionById, reviewById, reviewByPredictionId };

  if (cachedContentData === data) cachedContentIndex = index;
  return index;
}

function isCompletedReview(review: Review) {
  const bodyText = review.body.join("\n").trim();
  if (!bodyText) return false;
  if (/暂无完整正文|建议结合参考方向|建议结合.*阅读/.test(bodyText)) return false;
  if (review.match_result === "未复盘") return false;
  return true;
}

function sanitizeContentData(data: ContentData): ContentData {
  return {
    matches: data.matches
      .map((match) => {
        const normalizedMatch = normalizeFixtureTime(match);

        return {
          ...normalizedMatch,
          competition: sanitizePublicCopy(normalizedMatch.competition),
          kickoff_time: sanitizePublicCopy(normalizedMatch.kickoff_time),
          home_team: sanitizePublicCopy(normalizedMatch.home_team),
          away_team: sanitizePublicCopy(normalizedMatch.away_team),
          stage: sanitizePublicCopy(normalizedMatch.stage)
        };
      })
      .sort(compareMatchesByKickoff),
    predictions: data.predictions.map((prediction) => ({
      ...prediction,
      title: sanitizePublicCopy(prediction.title),
      competition: sanitizePublicCopy(prediction.competition),
      kickoff_time_text: sanitizePublicCopy(prediction.kickoff_time_text),
      matchup: sanitizePublicCopy(prediction.matchup),
      recommendation: sanitizePublicCopy(prediction.recommendation),
      body: prediction.body.map(sanitizePublicCopy),
      published_at: sanitizePublicCopy(prediction.published_at)
    })),
    reviews: data.reviews.map((review) => ({
      ...review,
      match_result: sanitizePublicCopy(review.match_result),
      result_status: normalizeReviewStatus(review),
      body: review.body.map(sanitizePublicCopy),
      reviewed_at: sanitizePublicCopy(review.reviewed_at)
    }))
  };
}

function normalizeFixtureTime(match: Match): Match {
  if (match.id === "tg-m6" || match.id === "wc-6" || (match.home_team === "澳大利亚" && match.away_team === "土耳其")) {
    return {
      ...match,
      kickoff_time: match.kickoff_time.includes("北京时间") ? "06/14 12:00 北京时间" : "06/14 12:00"
    };
  }

  return match;
}

function compareMatchesByKickoff(a: Match, b: Match) {
  return parseKickoffSortTime(a.kickoff_time) - parseKickoffSortTime(b.kickoff_time);
}

function parseKickoffSortTime(kickoffTime: string) {
  const match = kickoffTime.match(/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return Number.MAX_SAFE_INTEGER;

  const [, month, day, hour, minute] = match;
  return Date.UTC(2026, Number(month) - 1, Number(day), Number(hour), Number(minute));
}

function normalizeReviewStatus(review: Review): Review["result_status"] {
  const bodyText = review.body.join("\n");
  if (review.score <= 4) return "miss";
  if (/主方向和进球方向都没有打出|方向都没有打出/.test(bodyText)) return "miss";
  if (/主方向没有打出|进球方向没有打出/.test(bodyText)) return "half";
  return review.result_status;
}

function sanitizePublicCopy(text: string) {
  return text
    .replace(/风险等级/g, "参考等级")
    .replace(/风险提示/g, "变量提示")
    .replace(/风险点/g, "变量点")
    .replace(/热度风险/g, "热度变化")
    .replace(/冷门风险/g, "冷门信号")
    .replace(/风险/g, "不确定性")
    .replace(/本场复盘评分[：:]\s*\d+(\.\d+)?\/10[。.]?/g, "本场复盘记录已归档。")
    .replace(/复盘评分[：:]\s*\d+(\.\d+)?\/10/g, "复盘记录")
    .replace(/复盘评分/g, "复盘记录")
    .replace(/模型倾向/g, "参考方向")
    .replace(/博彩/g, "相关行动")
    .replace(/投资/g, "行动")
    .replace(/投注/g, "行动")
    .replace(/下注/g, "行动")
    .replace(/稳赚/g, "稳定参考")
    .replace(/稳赢/g, "稳健参考")
    .replace(/必中/g, "高置信")
    .replace(/收米/g, "结果反馈")
    .replace(/跟单/g, "跟踪观点")
    .replace(/后续/g, "接下来")
    .replace(/暂时/g, "目前");
}

function sanitizeAiModel(model: AiModel): AiModel {
  return {
    ...model,
    name: sanitizePublicCopy(model.name),
    role: sanitizePublicCopy(model.role),
    description: sanitizePublicCopy(model.description),
    specialties: model.specialties.map(sanitizePublicCopy),
    recent_record: sanitizePublicCopy(model.recent_record)
  };
}
