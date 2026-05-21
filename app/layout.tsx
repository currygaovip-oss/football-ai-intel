import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL("https://lyzbvip.vip"),
  title: "绿茵智报 | 中文足球 AI 赛前情报官",
  description: "中文足球 AI 赛前观点、模型倾向、风险提示与赛后复盘记录。",
  applicationName: "绿茵智报",
  icons: {
    icon: "/icon.svg"
  },
  openGraph: {
    title: "绿茵智报 | 中文足球 AI 赛前情报官",
    description: "中文足球 AI 赛前观点、模型倾向、风险提示与赛后复盘记录。",
    url: "https://lyzbvip.vip",
    siteName: "绿茵智报",
    locale: "zh_CN",
    type: "website"
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
