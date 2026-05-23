import { getAllPredictions, getSchedule, type Match, type Prediction } from "@/lib/data";

export type ScheduleRange = "today" | "tomorrow" | "week";

export function getFootballSchedule(range: ScheduleRange) {
  const matches = getSchedule();
  if (range === "week") return matches.filter((match) => isWithinDays(match, 7));
  return matches.filter((match) => isSameOffsetDay(match, range === "today" ? 0 : 1));
}

export function getPredictionForMatch(match: Match, predictions = getAllPredictions()) {
  const matchup = `${match.home_team} vs ${match.away_team}`;
  return predictions.find((prediction) => {
    if (prediction.match_id && prediction.match_id === match.id) return true;
    return prediction.matchup === matchup || prediction.matchup.includes(match.home_team) && prediction.matchup.includes(match.away_team);
  });
}

export function groupMatchesByDate(matches: Match[]) {
  const groups = new Map<string, Match[]>();
  matches.forEach((match) => {
    const label = getDateLabel(match.kickoff_time);
    groups.set(label, [...(groups.get(label) ?? []), match]);
  });
  return Array.from(groups.entries());
}

export function getMatchPath(match: Match, prediction?: Prediction) {
  if (prediction) return `/predictions/${prediction.id}`;
  if (match.competition.includes("世界杯")) return `/world-cup-2026/fixtures/${match.id}`;
  return "/schedule";
}

export function getDateLabel(kickoffTime: string) {
  const match = kickoffTime.match(/^(\d{2})\/(\d{2})/);
  if (!match) return kickoffTime;
  return `${Number(match[1])}月${Number(match[2])}日`;
}

export function getTimeLabel(kickoffTime: string) {
  const match = kickoffTime.match(/\d{2}\/\d{2}\s+(\d{2}:\d{2})/);
  return match?.[1] ?? kickoffTime;
}

export function getReadableKickoff(match: Match) {
  return `${getDateLabel(match.kickoff_time)} ${getTimeLabel(match.kickoff_time)} 北京时间`;
}

function isSameOffsetDay(match: Match, offset: number) {
  const target = getTargetDate(offset);
  const targetLabel = `${String(target.getMonth() + 1).padStart(2, "0")}/${String(target.getDate()).padStart(2, "0")}`;
  return match.kickoff_time.startsWith(targetLabel);
}

function isWithinDays(match: Match, days: number) {
  const parsed = parseMatchDate(match.kickoff_time);
  if (!parsed) return false;
  const today = getTargetDate(0);
  const end = getTargetDate(days);
  return parsed >= today && parsed < end;
}

function parseMatchDate(kickoffTime: string) {
  const match = kickoffTime.match(/^(\d{2})\/(\d{2})/);
  if (!match) return null;
  const year = new Date().getFullYear();
  return new Date(year, Number(match[1]) - 1, Number(match[2]));
}

function getTargetDate(offset: number) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
}
