import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "绿茵智报 | 中文足球 AI 赛前情报官",
  description: "中文足球 AI 赛前观点、模型倾向、风险提示与赛后复盘记录。",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
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
