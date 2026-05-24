import type { Metadata } from "next";

export const siteUrl = "https://lyzbvip.vip";
export const siteName = "绿茵智报";
export const siteDescription = "绿茵智报整理2026世界杯赛程、美加墨世界杯举办城市、今日足球赛程、赛前分析、参考方向和赛后复盘，面向中文足球用户持续记录重点赛事观点。";
export const defaultOgImage = "/brand/football-ai-logo-universal.png?v=3";

export const seoKeywords = [
  "绿茵智报",
  "足球赛程",
  "今日足球赛程",
  "今日足球比赛",
  "今日足球赛事",
  "足球赛程表",
  "足球比赛时间",
  "世界杯赛程",
  "世界杯2026赛程",
  "2026世界杯",
  "美加墨世界杯",
  "美加墨世界杯赛程",
  "世界杯举办城市",
  "2026世界杯举办城市",
  "2026世界杯揭幕战",
  "2026世界杯决赛",
  "世界杯小组赛赛程",
  "世界杯淘汰赛赛程",
  "世界杯比赛时间",
  "世界杯门票",
  "2026世界杯门票",
  "世界杯门票怎么买",
  "世界杯官方购票入口",
  "美加墨世界杯门票",
  "世界杯决赛门票",
  "世界杯揭幕战门票",
  "世界杯观赛攻略",
  "五大联赛赛程",
  "中超赛程",
  "足球赛前分析",
  "足球比赛分析",
  "足球赛事分析",
  "足球赛前观点",
  "世界杯赛前分析",
  "球队状态分析",
  "足球指数分析",
  "足球数据分析",
  "足球比分赛果",
  "足球赛后复盘"
];

export const seoTopicLinks = [
  { label: "世界杯2026专题", href: "/world-cup-2026" },
  { label: "美加墨世界杯", href: "/world-cup-2026/host-countries" },
  { label: "世界杯举办城市", href: "/world-cup-2026/host-cities" },
  { label: "世界杯门票信息", href: "/world-cup-2026/tickets" },
  { label: "今日足球赛程", href: "/football-schedule/today" },
  { label: "足球赛前分析", href: "/predictions" },
  { label: "世界杯2026赛程", href: "/world-cup-2026/schedule" },
  { label: "足球赛后复盘", href: "/topics/football-review" },
  { label: "足球比分赛果", href: "/topics/football-score-result" },
  { label: "VIP社群说明", href: "/vip" }
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

export function webPageJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl
    },
    publisher: organizationJsonLd(),
    inLanguage: "zh-CN"
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function itemListJsonLd({ name, path, items }: { name: string; path: string; items: Array<{ name: string; path: string }> }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path)
    }))
  };
}

export function sportsEventJsonLd({
  name,
  path,
  startDate,
  competition,
  homeTeam,
  awayTeam
}: {
  name: string;
  path: string;
  startDate: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name,
    url: absoluteUrl(path),
    startDate,
    sport: "Football",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      name: competition
    },
    competitor: [
      { "@type": "SportsTeam", name: homeTeam },
      { "@type": "SportsTeam", name: awayTeam }
    ],
    inLanguage: "zh-CN"
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
