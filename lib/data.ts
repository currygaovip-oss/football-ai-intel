import {
  aiModels,
  getAiModel,
  getAssistantModels,
  getPrediction,
  getPredictionForReview,
  getPredictionModel,
  getReview,
  getReviewByPrediction,
  hotEvents,
  matches,
  predictions,
  reviews,
  type AiModel,
  type HotEvent,
  type Match,
  type Prediction,
  type Review
} from "@/lib/mock-data";

export type { AiModel, HotEvent, Match, Prediction, Review };

export function getHomeData() {
  return {
    aiModels: aiModels.slice(0, 3),
    modelCount: aiModels.length,
    hotEvents,
    matches,
    predictions: predictions.map(withPredictionModel),
    reviews: reviews.map(withReviewPrediction)
  };
}

export function getTodayPredictions() {
  return predictions.map(withPredictionModel);
}

export function getModelDirectory() {
  return aiModels;
}

export function getSchedule() {
  return matches;
}

export function getHotEvents() {
  return hotEvents;
}

export function getReviews() {
  return reviews.map(withReviewPrediction);
}

export function getPredictionDetail(id: string) {
  const prediction = getPrediction(id);
  if (!prediction) return null;

  return {
    prediction,
    model: getPredictionModel(prediction),
    assistantModels: getAssistantModels(prediction),
    review: getReviewByPrediction(prediction.id)
  };
}

export function getReviewDetail(id: string) {
  const review = getReview(id);
  if (!review) return null;

  return {
    review,
    prediction: getPredictionForReview(review)
  };
}

function withPredictionModel(prediction: Prediction) {
  return {
    prediction,
    model: getPredictionModel(prediction)
  };
}

function withReviewPrediction(review: Review) {
  return {
    review,
    prediction: getPredictionForReview(review)
  };
}
