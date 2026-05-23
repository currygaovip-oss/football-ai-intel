import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defaultOgImage, seoKeywords, siteDescription, siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "绿茵智报 | 2026世界杯赛程、今日足球赛程与赛前分析",
    template: "%s | 绿茵智报"
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: seoKeywords,
  alternates: {
    canonical: siteUrl
  },
  icons: {
    icon: [
      { url: defaultOgImage, sizes: "1254x1254", type: "image/png" }
    ],
    apple: defaultOgImage
  },
  openGraph: {
    title: "绿茵智报 | 2026世界杯赛程、今日足球赛程与赛前分析",
    description: siteDescription,
    url: siteUrl,
    siteName,
    images: [
      {
        url: defaultOgImage,
        width: 1254,
        height: 1254,
        alt: siteName
      }
    ],
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "绿茵智报 | 2026世界杯赛程、今日足球赛程与赛前分析",
    description: siteDescription,
    images: [defaultOgImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">
        <div className="fixed inset-0 -z-10 pitch-grid opacity-35" />
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
        <SiteHeader />
        <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
