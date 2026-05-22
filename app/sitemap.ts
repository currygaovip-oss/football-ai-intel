import type { MetadataRoute } from "next";
import { getAllPredictions, getAllReviews } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

const staticRoutes = [
  "",
  "/today",
  "/reviews",
  "/schedule",
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

  return [...staticEntries, ...predictionEntries, ...reviewEntries];
}
