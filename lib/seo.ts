import type { Metadata } from "next";

export const siteUrl = "https://lyzbvip.vip";
export const siteName = "绿茵智报";
export const siteDescription = "中文足球 AI 赛前情报平台，提供赛前观点、模型倾向、风险提示、世界杯赛程和赛后复盘。";
export const defaultOgImage = "/brand/football-ai-logo-universal.png?v=3";

export const seoKeywords = [
  "绿茵智报",
  "足球 AI",
  "足球 AI 赛前情报",
  "今日足球预测",
  "足球赛前观点",
  "AI 模型倾向",
  "世界杯赛程",
  "足球数据分析",
  "赛后复盘"
];

type PageSeo = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function createMetadata({ title, description, path = "/", image = defaultOgImage, noIndex = false, type = "website" }: PageSeo): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: seoKeywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1254,
          height: 1254,
          alt: siteName
        }
      ],
      locale: "zh_CN",
      type
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [image]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false
        }
      : {
          index: true,
          follow: true
        }
  };
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function jsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    inLanguage: "zh-CN",
    publisher: organizationJsonLd()
  };
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: absoluteUrl("/brand/football-ai-logo-universal.png")
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  publishedAt
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: organizationJsonLd(),
    publisher: organizationJsonLd(),
    inLanguage: "zh-CN",
    image: absoluteUrl("/brand/football-ai-logo-universal.png")
  };
}

export function truncateSeo(text: string, length = 150) {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= length) return compact;
  return `${compact.slice(0, length - 1)}…`;
}
