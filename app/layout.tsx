import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://lyzbvip.vip"),
  title: "绿茵智报 | 中文足球 AI 赛前情报官",
  description: "中文足球 AI 赛前观点，综合历史比赛、指数变化、阵容赛程和进球趋势，输出模型倾向与风险等级。",
  applicationName: "绿茵智报",
  icons: {
    icon: [
      { url: "/brand/football-ai-logo-universal.png?v=3", sizes: "1254x1254", type: "image/png" }
    ],
    apple: "/brand/football-ai-logo-universal.png?v=3"
  },
  openGraph: {
    title: "绿茵智报 | 中文足球 AI 赛前情报官",
    description: "综合历史比赛、指数变化、阵容赛程和进球趋势，输出赛前模型倾向与风险等级。",
    url: "https://lyzbvip.vip",
    siteName: "绿茵智报",
    images: [
      {
        url: "/brand/football-ai-logo-universal.png?v=3",
        width: 1254,
        height: 1254,
        alt: "绿茵智报"
      }
    ],
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "绿茵智报 | 中文足球 AI 赛前情报官",
    description: "综合历史比赛、指数变化、阵容赛程和进球趋势，输出赛前模型倾向与风险等级。",
    images: ["/brand/football-ai-logo-universal.png?v=3"]
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
        <SiteHeader />
        <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
