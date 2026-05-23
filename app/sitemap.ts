import type { MetadataRoute } from "next";
import { getAllPredictions, getAllReviews } from "@/lib/data";
import { seoTopics } from "@/lib/seo-topics";
import { siteUrl } from "@/lib/seo";
import { getWorldCupFixturePath, getWorldCupMatches, worldCupBasePath } from "@/lib/world-cup";

const staticRoutes = [
  "",
  "/today",
  "/reviews",
  "/schedule",
  worldCupBasePath,
  `${worldCupBasePath}/schedule`,
  `${worldCupBasePath}/groups`,
  `${worldCupBasePath}/knockout`,
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

  return [...staticEntries, ...topicEntries, ...worldCupFixtureEntries, ...predictionEntries, ...reviewEntries];
}
