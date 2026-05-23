import { getAllPredictions, getSchedule, type Match, type Prediction } from "@/lib/data";

export type { Match, Prediction };

export const worldCupBasePath = "/world-cup-2026";

export type HostCountry = {
  slug: string;
  name: string;
  title: string;
  description: string;
  cities: string[];
};

export type HostCity = {
  slug: string;
  name: string;
  country: "美国" | "加拿大" | "墨西哥";
  stadium: string;
  summary: string;
  highlight?: string;
};

export const hostCountries: HostCountry[] = [
  {
    slug: "usa",
    name: "美国",
    title: "美国世界杯赛程与举办城市",
    description: "美国是2026美加墨世界杯主要举办地之一，承接多座城市的比赛，并举办本届世界杯决赛。",
    cities: ["亚特兰大", "波士顿", "达拉斯", "休斯敦", "堪萨斯城", "洛杉矶", "迈阿密", "纽约/新泽西", "费城", "旧金山湾区", "西雅图"]
  },
  {
    slug: "canada",
    name: "加拿大",
    title: "加拿大世界杯赛程与举办城市",
    description: "加拿大承接2026世界杯部分小组赛和淘汰赛，中文用户可重点关注多伦多和温哥华赛程。",
    cities: ["多伦多", "温哥华"]
  },
  {
    slug: "mexico",
    name: "墨西哥",
    title: "墨西哥世界杯赛程与举办城市",
    description: "墨西哥是2026世界杯联合举办国之一，墨西哥城将承接揭幕战，瓜达拉哈拉和蒙特雷也会承接比赛。",
    cities: ["墨西哥城", "瓜达拉哈拉", "蒙特雷"]
  }
];

export const hostCities: HostCity[] = [
  { slug: "atlanta", name: "亚特兰大", country: "美国", stadium: "Mercedes-Benz Stadium", summary: "美国东南部重点赛区，适合关注美国主场氛围和小组赛焦点战。" },
  { slug: "boston", name: "波士顿", country: "美国", stadium: "Gillette Stadium", summary: "美国东北部赛区，承接多场世界杯比赛。" },
  { slug: "dallas", name: "达拉斯", country: "美国", stadium: "AT&T Stadium", summary: "本届世界杯重要赛区之一，球场容量大，适合重点关注淘汰赛阶段安排。" },
  { slug: "guadalajara", name: "瓜达拉哈拉", country: "墨西哥", stadium: "Estadio Akron", summary: "墨西哥赛区城市之一，承接小组赛阶段比赛。" },
  { slug: "houston", name: "休斯敦", country: "美国", stadium: "NRG Stadium", summary: "美国南部重点城市，承接世界杯比赛日安排。" },
  { slug: "kansas-city", name: "堪萨斯城", country: "美国", stadium: "Arrowhead Stadium", summary: "美国中部赛区，承接世界杯比赛。" },
  { slug: "los-angeles", name: "洛杉矶", country: "美国", stadium: "SoFi Stadium", summary: "美国西海岸重点赛区，适合关注北美黄金时段比赛。", highlight: "美国西海岸焦点城市" },
  { slug: "mexico-city", name: "墨西哥城", country: "墨西哥", stadium: "Estadio Azteca", summary: "2026世界杯揭幕战举办城市，也是本届赛事最受关注的举办地之一。", highlight: "揭幕战城市" },
  { slug: "miami", name: "迈阿密", country: "美国", stadium: "Hard Rock Stadium", summary: "美国南部热门城市，承接世界杯焦点比赛。" },
  { slug: "monterrey", name: "蒙特雷", country: "墨西哥", stadium: "Estadio BBVA", summary: "墨西哥北部赛区，承接世界杯比赛。" },
  { slug: "new-york-new-jersey", name: "纽约/新泽西", country: "美国", stadium: "MetLife Stadium", summary: "2026世界杯决赛举办地，是本届赛事最受关注的城市之一。", highlight: "决赛城市" },
  { slug: "philadelphia", name: "费城", country: "美国", stadium: "Lincoln Financial Field", summary: "美国东部历史城市，承接世界杯比赛。" },
  { slug: "san-francisco-bay-area", name: "旧金山湾区", country: "美国", stadium: "Levi's Stadium", summary: "美国西海岸赛区，承接世界杯比赛。" },
  { slug: "seattle", name: "西雅图", country: "美国", stadium: "Lumen Field", summary: "美国西北部赛区，承接世界杯比赛。" },
  { slug: "toronto", name: "多伦多", country: "加拿大", stadium: "BMO Field", summary: "加拿大赛区城市之一，承接世界杯小组赛阶段比赛。" },
  { slug: "vancouver", name: "温哥华", country: "加拿大", stadium: "BC Place", summary: "加拿大西海岸赛区，承接世界杯比赛。" }
];

const placeholderTeamPattern = /组第|场胜者|场负者/;

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

export function getNamedWorldCupTeams(matches = getWorldCupMatches()) {
  const teams = new Set<string>();
  matches.forEach((match) => {
    [match.home_team, match.away_team].forEach((team) => {
      if (!placeholderTeamPattern.test(team)) teams.add(team);
    });
  });
  return Array.from(teams).sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export function getTeamPath(team: string) {
  return `${worldCupBasePath}/teams/${encodeURIComponent(team)}`;
}

export function getTeamMatches(team: string) {
  return getWorldCupMatches().filter((match) => match.home_team === team || match.away_team === team);
}

export function getHostCity(slug: string) {
  return hostCities.find((city) => city.slug === slug);
}

export function getHostCountry(slug: string) {
  return hostCountries.find((country) => country.slug === slug);
}

export function getHostCountryPath(slug: string) {
  return `${worldCupBasePath}/${slug}`;
}

export function getHostCityPath(slug: string) {
  return `${worldCupBasePath}/cities/${slug}`;
}

export function getOpeningMatch() {
  return getWorldCupMatches()[0];
}

export function getFinalMatch() {
  return getWorldCupMatches().find((match) => getStageLabel(match) === "决赛") ?? getWorldCupMatches().at(-1);
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

export function getMatchDateTimeLabel(match: Match) {
  return `${getMatchDateLabel(match)} ${getMatchTimeLabel(match)} 北京时间`;
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
