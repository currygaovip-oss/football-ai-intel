import {
  aiModels,
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
  const prediction = predictions.find((item) => item.id === id);
  if (!prediction) return null;

  return {
    prediction,
    model: getPredictionModel(prediction),
    assistantModels: getAssistantModels(prediction),
    review: reviews.find((review) => review.prediction_id === prediction.id)
  };
}

export function getReviewDetail(id: string) {
  const review = reviews.find((item) => item.id === id);
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

function getAiModel(id: string) {
  return aiModels.find((model) => model.id === id);
}

function getPredictionModel(prediction: Prediction) {
  return getAiModel(prediction.model_id);
}

function getAssistantModels(prediction: Prediction) {
  return prediction.assistant_model_ids.map(getAiModel).filter((model): model is AiModel => Boolean(model));
}

function getPredictionForReview(review: Review) {
  return predictions.find((prediction) => prediction.id === review.prediction_id);
}
