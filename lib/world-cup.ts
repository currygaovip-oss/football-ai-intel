import { getAllPredictions, getSchedule, type Match, type Prediction } from "@/lib/data";

export type { Match, Prediction };

export const worldCupBasePath = "/world-cup-2026";

export function getWorldCupMatches() {
  return getSchedule().filter(isWorldCupMatch);
}

export function getWorldCupGroupMatches() {
  return getWorldCupMatches().filter((match) => isGroupStage(match));
}

export function getWorldCupKnockoutMatches() {
  return getWorldCupMatches().filter((match) => !isGroupStage(match));
}

export function getWorldCupMatch(id: string) {
  return getWorldCupMatches().find((match) => match.id === id);
}

export function getWorldCupPrediction(match: Match, predictions = getAllPredictions()) {
  const matchup = `${match.home_team} vs ${match.away_team}`;
  return predictions.find((prediction) => {
    if (prediction.match_id && prediction.match_id === match.id) return true;
    return prediction.matchup === matchup || prediction.matchup.includes(match.home_team) && prediction.matchup.includes(match.away_team);
  });
}

export function getWorldCupGroups(matches = getWorldCupGroupMatches()) {
  const groups = new Map<string, Match[]>();
  matches.forEach((match) => {
    const group = getGroupName(match);
    groups.set(group, [...(groups.get(group) ?? []), match]);
  });
  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b, "zh-CN"));
}

export function getWorldCupDateGroups(matches = getWorldCupMatches()) {
  const groups = new Map<string, Match[]>();
  matches.forEach((match) => {
    const date = getMatchDateLabel(match);
    groups.set(date, [...(groups.get(date) ?? []), match]);
  });
  return Array.from(groups.entries());
}

export function getWorldCupStageGroups(matches = getWorldCupMatches()) {
  const groups = new Map<string, Match[]>();
  matches.forEach((match) => {
    const stage = getStageLabel(match);
    groups.set(stage, [...(groups.get(stage) ?? []), match]);
  });
  return Array.from(groups.entries());
}

export function getWorldCupFixturePath(match: Match) {
  return `${worldCupBasePath}/fixtures/${match.id}`;
}

export function getMatchTitle(match: Match) {
  return `${match.home_team}vs${match.away_team}`;
}

export function getMatchDateLabel(match: Match) {
  const parsed = parseKickoffTime(match.kickoff_time);
  if (!parsed) return match.kickoff_time;
  return `${parsed.month}月${parsed.day}日`;
}

export function getMatchTimeLabel(match: Match) {
  const parsed = parseKickoffTime(match.kickoff_time);
  if (!parsed) return match.kickoff_time;
  return `${parsed.hour}:${parsed.minute}`;
}

export function getEventStartDate(match: Match) {
  const parsed = parseKickoffTime(match.kickoff_time);
  if (!parsed) return match.kickoff_time;
  return `2026-${String(parsed.month).padStart(2, "0")}-${String(parsed.day).padStart(2, "0")}T${parsed.hour}:${parsed.minute}:00+08:00`;
}

export function getDirection(prediction?: Prediction) {
  return prediction?.recommendation.replace(/^模型倾向：/, "").replace(/^参考方向：/, "");
}

export function getStageLabel(match: Match) {
  return match.stage.replace(/^世界杯\s*/, "").trim();
}

export function getGroupName(match: Match) {
  const group = match.stage.match(/[A-L]组/);
  return group?.[0] ?? "小组赛";
}

export function isGroupStage(match: Match) {
  return match.stage.includes("小组赛");
}

function isWorldCupMatch(match: Match) {
  return match.competition.includes("世界杯") || match.stage.includes("小组赛") || match.stage.includes("决赛") || match.stage.includes("强赛");
}

function parseKickoffTime(kickoffTime: string) {
  const match = kickoffTime.match(/^(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return null;
  return {
    month: Number(match[1]),
    day: Number(match[2]),
    hour: match[3],
    minute: match[4]
  };
}
