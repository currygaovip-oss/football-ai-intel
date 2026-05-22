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
const publicAiModels = aiModels.filter((model) => publicModelIds.has(model.id));

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

  return {
    aiModels: publicAiModels.slice(0, 3),
    modelCount: publicAiModels.length,
    matches: data.matches,
    predictions: data.predictions.map(withPredictionModel),
    reviews: data.reviews.map((review) => withReviewPrediction(review, data.predictions))
  };
}

export function getTodayPredictions() {
  return getContentData().predictions.map(withPredictionModel);
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
  return data.reviews.map((review) => withReviewPrediction(review, data.predictions));
}

export function getAllReviews() {
  return getContentData().reviews;
}

export function getPredictionDetail(id: string) {
  const data = getContentData();
  const prediction = data.predictions.find((item) => item.id === id);
  if (!prediction) return null;

  return {
    prediction,
    model: getPredictionModel(prediction),
    assistantModels: getAssistantModels(prediction),
    review: data.reviews.find((review) => review.prediction_id === prediction.id)
  };
}

export function getReviewDetail(id: string) {
  const data = getContentData();
  const review = data.reviews.find((item) => item.id === id);
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
    reviewCount: contentData.reviews.length,
    matchCount: contentData.matches.length
  };
}

export function refreshDataSourceForRuntime() {
  return getDataSourceInfo();
}

function getContentData(): ContentData {
  if (snapshotData?.predictions?.length) {
    return {
      matches: snapshotData.matches,
      predictions: snapshotData.predictions,
      reviews: snapshotData.reviews
    };
  }
  return { matches, predictions, reviews };
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
