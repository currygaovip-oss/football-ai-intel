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

export function getHomeData() {
  const data = getContentData();
  const activePredictions = getActivePredictions(data);
  const completedReviews = getCompletedReviews(data.reviews);

  return {
    aiModels: publicAiModels.slice(0, 3),
    modelCount: publicAiModels.length,
    matches: data.matches,
    predictions: activePredictions.map(withPredictionModel),
    reviews: completedReviews.map((review) => withReviewPrediction(review, data.predictions)),
    totals: {
      predictions: data.predictions.length,
      reviews: completedReviews.length,
      matches: data.matches.length
    }
  };
}

export function getTodayPredictions() {
  const data = getContentData();
  return getActivePredictions(data).map(withPredictionModel);
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
  return getCompletedReviews(data.reviews).map((review) => withReviewPrediction(review, data.predictions));
}

export function getAllReviews() {
  return getCompletedReviews(getContentData().reviews);
}

export function getPredictionDetail(id: string) {
  const data = getContentData();
  const prediction = data.predictions.find((item) => item.id === id);
  if (!prediction) return null;

  return {
    prediction,
    model: getPredictionModel(prediction),
    assistantModels: getAssistantModels(prediction),
    review: getCompletedReviews(data.reviews).find((review) => review.prediction_id === prediction.id)
  };
}

export function getReviewDetail(id: string) {
  const data = getContentData();
  const review = getCompletedReviews(data.reviews).find((item) => item.id === id);
  if (!review) return null;

  return {
    review,
    prediction: getPredictionForReview(review, data.predictions)
  };
}

export function getDataSourceInfo() {
  const contentData = getContentData();

  return {
    source: snapshotData ? "worldcup_bot_snapshot" : "local",
    exportedAt: snapshotData?.exported_at,
    predictionCount: contentData.predictions.length,
    reviewCount: getCompletedReviews(contentData.reviews).length,
    matchCount: contentData.matches.length
  };
}

export function refreshDataSourceForRuntime() {
  return getDataSourceInfo();
}

function getContentData(): ContentData {
  if (snapshotData?.predictions?.length) {
    return sanitizeContentData({
      matches: snapshotData.matches,
      predictions: snapshotData.predictions,
      reviews: snapshotData.reviews
    });
  }
  return sanitizeContentData({ matches, predictions, reviews });
}

function withPredictionModel(prediction: Prediction) {
  return {
    prediction,
    model: getPredictionModel(prediction)
  };
}

function withReviewPrediction(review: Review, predictionList = getContentData().predictions) {
  return {
    review,
    prediction: getPredictionForReview(review, predictionList)
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

function getPredictionForReview(review: Review, predictionList = getContentData().predictions) {
  return predictionList.find((prediction) => prediction.id === review.prediction_id);
}

function getActivePredictions(data: ContentData) {
  const completedPredictionIds = new Set(getCompletedReviews(data.reviews).map((review) => review.prediction_id));
  return data.predictions.filter((prediction) => !completedPredictionIds.has(prediction.id));
}

function getCompletedReviews(reviewList: Review[]) {
  return reviewList.filter(isCompletedReview);
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
    matches: data.matches.map((match) => ({
      ...match,
      competition: sanitizePublicCopy(match.competition),
      kickoff_time: sanitizePublicCopy(match.kickoff_time),
      home_team: sanitizePublicCopy(match.home_team),
      away_team: sanitizePublicCopy(match.away_team),
      stage: sanitizePublicCopy(match.stage)
    })),
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
