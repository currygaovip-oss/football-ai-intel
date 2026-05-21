import {
  type AiModel,
  type HotEvent,
  type Match,
  type Prediction,
  type Review
} from "@/lib/mock-data";
import { findPrediction, findReview, listAiModels, listHotEvents, listMatches, listPredictions, listReviews } from "@/lib/db";

export type { AiModel, HotEvent, Match, Prediction, Review };

export function getHomeData() {
  const aiModels = listAiModels();
  const hotEvents = listHotEvents();
  const matches = listMatches();
  const predictions = listPredictions();
  const reviews = listReviews();

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
  return listPredictions().map(withPredictionModel);
}

export function getModelDirectory() {
  return listAiModels();
}

export function getSchedule() {
  return listMatches();
}

export function getHotEvents() {
  return listHotEvents();
}

export function getReviews() {
  return listReviews().map(withReviewPrediction);
}

export function getPredictionDetail(id: string) {
  const prediction = findPrediction(id);
  if (!prediction) return null;

  return {
    prediction,
    model: getPredictionModel(prediction),
    assistantModels: getAssistantModels(prediction),
    review: listReviews().find((review) => review.prediction_id === prediction.id)
  };
}

export function getReviewDetail(id: string) {
  const review = findReview(id);
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
  return listAiModels().find((model) => model.id === id);
}

function getPredictionModel(prediction: Prediction) {
  return getAiModel(prediction.model_id);
}

function getAssistantModels(prediction: Prediction) {
  return prediction.assistant_model_ids.map(getAiModel).filter((model): model is AiModel => Boolean(model));
}

function getPredictionForReview(review: Review) {
  return listPredictions().find((prediction) => prediction.id === review.prediction_id);
}
