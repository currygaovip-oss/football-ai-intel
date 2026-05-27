import type { Match } from "@/lib/data";

export const worldCupOpeningCountdown = {
  label: "距离2026世界杯揭幕战",
  targetIso: "2026-06-12T03:00:00+08:00",
  dateLabel: "北京时间 6月12日 03:00",
  matchLabel: "墨西哥 vs 南非",
  href: "/world-cup-2026/opening-match"
};

export const worldCupFinalCountdown = {
  label: "距离2026世界杯决赛",
  targetIso: "2026-07-20T03:00:00+08:00",
  dateLabel: "北京时间 7月20日 03:00",
  matchLabel: "纽约/新泽西 · 大都会人寿体育场",
  href: "/world-cup-2026/final"
};

export type CountdownMatch = {
  label: string;
  targetIso: string;
  dateLabel: string;
  matchLabel: string;
  href: string;
};

export function getNextWorldCupMatch(matches: Match[]): CountdownMatch {
  const now = Date.now();
  const futureMatch = matches
    .map((match) => ({ match, targetIso: parseKickoffToIso(match.kickoff_time) }))
    .filter((item): item is { match: Match; targetIso: string } => Boolean(item.targetIso))
    .filter((item) => new Date(item.targetIso).getTime() > now)
    .sort((a, b) => new Date(a.targetIso).getTime() - new Date(b.targetIso).getTime())[0];

  if (!futureMatch) {
    return worldCupOpeningCountdown;
  }

  const { match, targetIso } = futureMatch;
  return {
    label: "下一场世界杯比赛",
    targetIso,
    dateLabel: formatKickoffLabel(match.kickoff_time),
    matchLabel: `${match.home_team} vs ${match.away_team}`,
    href: `/world-cup-2026/fixtures/${match.id}`
  };
}

function parseKickoffToIso(kickoffTime: string) {
  const match = kickoffTime.match(/^(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return "";
  return `2026-${match[1]}-${match[2]}T${match[3]}:${match[4]}:00+08:00`;
}

function formatKickoffLabel(kickoffTime: string) {
  const match = kickoffTime.match(/^(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return kickoffTime;
  return `北京时间 ${Number(match[1])}月${Number(match[2])}日 ${match[3]}:${match[4]}`;
}
