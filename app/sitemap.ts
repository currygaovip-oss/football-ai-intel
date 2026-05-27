import type { MetadataRoute } from "next";
import { getAllPredictions, getAllReviews } from "@/lib/data";
import { seoTopics } from "@/lib/seo-topics";
import { siteUrl } from "@/lib/seo";
import { getCityTicketPath, getTicketTopicPath, ticketBasePath, ticketTopics } from "@/lib/world-cup-tickets";
import {
  getHostCityPath,
  getHostCountryPath,
  getPlayerPath,
  getTeamPath,
  getWorldCupPlayerEntries,
  getWorldCupTeamEntries,
  getWorldCupFixturePath,
  getWorldCupMatches,
  hostCities,
  hostCountries,
  worldCupBasePath
} from "@/lib/world-cup";

const staticRoutes = [
  "",
  "/today",
  "/predictions",
  "/reviews",
  "/schedule",
  "/football-ai-intelligence",
  "/football-schedule/today",
  "/football-schedule/tomorrow",
  "/football-schedule/week",
  "/answers.txt",
  "/llms.txt",
  "/llms-full.txt",
  "/feed.xml",
  "/opensearch.xml",
  worldCupBasePath,
  `${worldCupBasePath}/schedule`,
  `${worldCupBasePath}/matches`,
  `${worldCupBasePath}/groups`,
  `${worldCupBasePath}/knockout`,
  `${worldCupBasePath}/teams`,
  `${worldCupBasePath}/players`,
  `${worldCupBasePath}/host-countries`,
  `${worldCupBasePath}/host-cities`,
  `${worldCupBasePath}/opening-match`,
  `${worldCupBasePath}/final`,
  ticketBasePath,
  `${worldCupBasePath}/share/schedule`,
  `${worldCupBasePath}/share/groups`,
  "/vip",
  "/about"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/today" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1 : route === "/today" ? 0.9 : 0.7
  }));

  const predictionEntries = getAllPredictions().map((prediction) => ({
    url: `${siteUrl}/predictions/${prediction.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: prediction.visibility === "free" ? 0.8 : 0.5
  }));

  const reviewEntries = getAllReviews().map((review) => ({
    url: `${siteUrl}/reviews/${review.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65
  }));

  const topicEntries = seoTopics.map((topic) => ({
    url: `${siteUrl}/topics/${topic.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75
  }));

  const worldCupFixtureEntries = getWorldCupMatches().map((match) => ({
    url: `${siteUrl}${getWorldCupFixturePath(match)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: match.stage.includes("决赛") || match.stage.includes("强赛") ? 0.78 : 0.72
  }));

  const worldCupTeamEntries = getWorldCupTeamEntries().map((team) => ({
    url: `${siteUrl}${getTeamPath(team.slug)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: team.searchFocus.length ? 0.74 : 0.7
  }));

  const worldCupSquadEntries = getWorldCupTeamEntries().filter((team) => team.players?.length).map((team) => ({
    url: `${siteUrl}${getTeamPath(team.slug)}/squad`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.72
  }));

  const worldCupPlayerEntries = getWorldCupPlayerEntries().map((player) => ({
    url: `${siteUrl}${getPlayerPath(player.slug)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  const hostCountryEntries = hostCountries.map((country) => ({
    url: `${siteUrl}${getHostCountryPath(country.slug)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.72
  }));

  const hostCityEntries = hostCities.map((city) => ({
    url: `${siteUrl}${getHostCityPath(city.slug)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: city.highlight ? 0.76 : 0.7
  }));

  const ticketTopicEntries = ticketTopics.map((topic) => ({
    url: `${siteUrl}${getTicketTopicPath(topic.slug)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: topic.slug === "official" || topic.slug === "final" || topic.slug === "opening-match" ? 0.76 : 0.7
  }));

  const cityTicketEntries = hostCities.map((city) => ({
    url: `${siteUrl}${getCityTicketPath(city.slug)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: city.highlight ? 0.74 : 0.68
  }));

  return [...staticEntries, ...topicEntries, ...hostCountryEntries, ...hostCityEntries, ...ticketTopicEntries, ...cityTicketEntries, ...worldCupTeamEntries, ...worldCupSquadEntries, ...worldCupPlayerEntries, ...worldCupFixtureEntries, ...predictionEntries, ...reviewEntries];
}
