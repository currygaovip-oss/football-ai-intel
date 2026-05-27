import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const publicRules = {
    allow: "/",
    disallow: ["/admin", "/login"]
  };

  return {
    rules: [
      {
        userAgent: "*",
        ...publicRules
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-User",
          "anthropic-ai",
          "Google-Extended",
          "Applebot",
          "DuckDuckBot",
          "YouBot",
          "Amazonbot",
          "meta-externalagent",
          "Googlebot",
          "Bingbot"
        ],
        ...publicRules
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
