import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { aiModels, hotEvents, matches, predictions, reviews, type AiModel, type HotEvent, type Match, type Prediction, type Review } from "@/lib/mock-data";

type Statement = {
  all: (...params: unknown[]) => unknown[];
  get: (...params: unknown[]) => unknown;
  run: (...params: unknown[]) => unknown;
};

type Database = {
  exec: (sql: string) => void;
  prepare: (sql: string) => Statement;
};

let db: Database | null = null;

export function getDb() {
  if (db) return db;

  const dataDir = path.join(process.cwd(), "data");
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

  // Node 24 ships node:sqlite. The local MVP uses it to avoid native npm addons.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DatabaseSync } = require("node:sqlite") as { DatabaseSync: new (filename: string) => Database };
  db = new DatabaseSync(path.join(dataDir, "football-ai-intel.db"));
  initializeDb(db);
  seedDb(db);
  return db;
}

export function listAiModels(): AiModel[] {
  return getDb().prepare("select * from ai_models order by rowid asc").all().map(rowToAiModel);
}

export function listMatches(): Match[] {
  return getDb().prepare("select * from matches order by rowid asc").all().map(rowToMatch);
}

export function listPredictions(): Prediction[] {
  return getDb().prepare("select * from predictions order by rowid asc").all().map(rowToPrediction);
}

export function listReviews(): Review[] {
  return getDb().prepare("select * from reviews order by rowid asc").all().map(rowToReview);
}

export function listHotEvents(): HotEvent[] {
  return getDb().prepare("select * from hot_events order by rowid asc").all().map(rowToHotEvent);
}

export function findPrediction(id: string) {
  const row = getDb().prepare("select * from predictions where id = ?").get(id);
  return row ? rowToPrediction(row) : undefined;
}

export function findReview(id: string) {
  const row = getDb().prepare("select * from reviews where id = ?").get(id);
  return row ? rowToReview(row) : undefined;
}

export function insertPrediction(prediction: Prediction) {
  getDb()
    .prepare(
      `insert into predictions
      (id, match_id, model_id, assistant_model_ids, title, competition, kickoff_time_text, matchup, visibility, recommendation, risk_level, body, published_at)
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      prediction.id,
      prediction.match_id ?? null,
      prediction.model_id,
      JSON.stringify(prediction.assistant_model_ids),
      prediction.title,
      prediction.competition,
      prediction.kickoff_time_text,
      prediction.matchup,
      prediction.visibility,
      prediction.recommendation,
      prediction.risk_level,
      JSON.stringify(prediction.body),
      prediction.published_at
    );
}

export function insertReview(review: Review) {
  getDb()
    .prepare(
      `insert into reviews
      (id, prediction_id, match_result, result_status, score, body, reviewed_at)
      values (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(review.id, review.prediction_id, review.match_result, review.result_status, review.score, JSON.stringify(review.body), review.reviewed_at);
}

function initializeDb(database: Database) {
  database.exec(`
    create table if not exists ai_models (
      id text primary key,
      code text not null,
      name text not null,
      role text not null,
      description text not null,
      specialties text not null,
      risk_style text not null,
      recent_record text not null,
      hit_rate real not null,
      average_score real not null,
      total_predictions integer not null,
      latest_count integer not null
    );

    create table if not exists matches (
      id text primary key,
      competition text not null,
      kickoff_time text not null,
      home_team text not null,
      away_team text not null,
      home_score integer,
      away_score integer,
      status text not null,
      stage text not null
    );

    create table if not exists predictions (
      id text primary key,
      match_id text,
      model_id text not null,
      assistant_model_ids text not null,
      title text not null,
      competition text not null,
      kickoff_time_text text not null,
      matchup text not null,
      visibility text not null,
      recommendation text not null,
      risk_level text not null,
      body text not null,
      published_at text not null
    );

    create table if not exists reviews (
      id text primary key,
      prediction_id text not null,
      match_result text not null,
      result_status text not null,
      score real not null,
      body text not null,
      reviewed_at text not null
    );

    create table if not exists hot_events (
      id text primary key,
      title text not null,
      competition text not null,
      kickoff_time_text text not null,
      matchup text not null,
      body text not null,
      published_at text not null
    );
  `);
}

function seedDb(database: Database) {
  const seeded = database.prepare("select count(*) as count from ai_models").get() as { count: number };
  if (seeded.count > 0) return;

  const insertModel = database.prepare(
    `insert into ai_models
    (id, code, name, role, description, specialties, risk_style, recent_record, hit_rate, average_score, total_predictions, latest_count)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  aiModels.forEach((model) => {
    insertModel.run(
      model.id,
      model.code,
      model.name,
      model.role,
      model.description,
      JSON.stringify(model.specialties),
      model.risk_style,
      model.recent_record,
      model.hit_rate,
      model.average_score,
      model.total_predictions,
      model.latest_count
    );
  });

  const insertMatch = database.prepare(
    `insert into matches
    (id, competition, kickoff_time, home_team, away_team, home_score, away_score, status, stage)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  matches.forEach((match) => {
    insertMatch.run(match.id, match.competition, match.kickoff_time, match.home_team, match.away_team, match.home_score ?? null, match.away_score ?? null, match.status, match.stage);
  });

  predictions.forEach(insertPrediction);
  reviews.forEach(insertReview);

  const insertHotEvent = database.prepare(
    `insert into hot_events
    (id, title, competition, kickoff_time_text, matchup, body, published_at)
    values (?, ?, ?, ?, ?, ?, ?)`
  );
  hotEvents.forEach((event) => {
    insertHotEvent.run(event.id, event.title, event.competition, event.kickoff_time_text, event.matchup, event.body, event.published_at);
  });
}

function rowToAiModel(row: unknown): AiModel {
  const value = row as Record<string, unknown>;
  return {
    id: String(value.id),
    code: String(value.code),
    name: String(value.name),
    role: String(value.role),
    description: String(value.description),
    specialties: parseJsonArray(value.specialties),
    risk_style: value.risk_style as AiModel["risk_style"],
    recent_record: String(value.recent_record),
    hit_rate: Number(value.hit_rate),
    average_score: Number(value.average_score),
    total_predictions: Number(value.total_predictions),
    latest_count: Number(value.latest_count)
  };
}

function rowToMatch(row: unknown): Match {
  const value = row as Record<string, unknown>;
  return {
    id: String(value.id),
    competition: String(value.competition),
    kickoff_time: String(value.kickoff_time),
    home_team: String(value.home_team),
    away_team: String(value.away_team),
    home_score: value.home_score == null ? undefined : Number(value.home_score),
    away_score: value.away_score == null ? undefined : Number(value.away_score),
    status: value.status as Match["status"],
    stage: String(value.stage)
  };
}

function rowToPrediction(row: unknown): Prediction {
  const value = row as Record<string, unknown>;
  return {
    id: String(value.id),
    match_id: value.match_id == null ? undefined : String(value.match_id),
    model_id: String(value.model_id),
    assistant_model_ids: parseJsonArray(value.assistant_model_ids),
    title: String(value.title),
    competition: String(value.competition),
    kickoff_time_text: String(value.kickoff_time_text),
    matchup: String(value.matchup),
    visibility: value.visibility as Prediction["visibility"],
    recommendation: String(value.recommendation),
    risk_level: value.risk_level as Prediction["risk_level"],
    body: parseJsonArray(value.body),
    published_at: String(value.published_at)
  };
}

function rowToReview(row: unknown): Review {
  const value = row as Record<string, unknown>;
  return {
    id: String(value.id),
    prediction_id: String(value.prediction_id),
    match_result: String(value.match_result),
    result_status: value.result_status as Review["result_status"],
    score: Number(value.score),
    body: parseJsonArray(value.body),
    reviewed_at: String(value.reviewed_at)
  };
}

function rowToHotEvent(row: unknown): HotEvent {
  const value = row as Record<string, unknown>;
  return {
    id: String(value.id),
    title: String(value.title),
    competition: String(value.competition),
    kickoff_time_text: String(value.kickoff_time_text),
    matchup: String(value.matchup),
    body: String(value.body),
    published_at: String(value.published_at)
  };
}

function parseJsonArray(value: unknown) {
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
