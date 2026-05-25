import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";

const kolPages: Record<string, { name: string; title: string; description: string }> = {
  alpha: { name: "AlphaPaw", title: "AlphaPaw 推荐绿茵智报", description: "从 AlphaPaw 进入绿茵智报，查看今日足球赛程、赛前分析和赛后复盘。" },
  luobai: { name: "洛白", title: "洛白 推荐绿茵智报", description: "从洛白进入绿茵智报，查看今日足球赛程、世界杯赛程和赛前分析。" },
  sevth7: { name: "Sevth7", title: "Sevth7 推荐绿茵智报", description: "从 Sevth7 进入绿茵智报，查看今日足球赛程和赛前参考方向。" },
  sanpao: { name: "三炮投研", title: "三炮投研 推荐绿茵智报", description: "从三炮投研进入绿茵智报，查看世界杯赛程、今日观点和赛后复盘。" },
  xiaoge: { name: "加密笑哥", title: "加密笑哥 推荐绿茵智报", description: "从加密笑哥进入绿茵智报，查看足球赛前观点和复盘记录。" },
  bizixun: { name: "币资讯", title: "币资讯 推荐绿茵智报", description: "从币资讯进入绿茵智报，查看赛程、赛前观点和重点赛事信息。" },
  freedom: { name: "Crypto Freedom", title: "Crypto Freedom 推荐绿茵智报", description: "从 Crypto Freedom 进入绿茵智报，查看足球赛程和赛前分析。" },
  leiting: { name: "雷霆", title: "雷霆 推荐绿茵智报", description: "从雷霆进入绿茵智报，查看世界杯2026赛程和赛前观点。" },
  kongkong: { name: "空空", title: "空空 推荐绿茵智报", description: "从空空进入绿茵智报，查看今日足球赛程、参考方向和复盘记录。" }
};

type GoParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(kolPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GoParams): Promise<Metadata> {
  const { slug } = await params;
  const page = kolPages[slug];
  if (!page) return createMetadata({ title: "绿茵智报推荐页", description: "绿茵智报推荐页。", path: `/go/${slug}`, noIndex: true });
  return createMetadata({ title: page.title, description: page.description, path: `/go/${slug}`, noIndex: true });
}

export default async function KolLandingPage({ params }: GoParams) {
  const { slug } = await params;
  const page = kolPages[slug];
  if (!page) notFound();

  return (
    <main className="mx-auto max-w-3xl space-y-5 py-10">
      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">绿茵智报</div>
        <h1 className="mt-3 text-3xl font-semibold text-white">{page.name} 推荐绿茵智报</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/62">{page.description}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link href={`/?utm_source=${slug}&utm_medium=kol&utm_campaign=worldcup`} className="rounded-md bg-turf px-4 py-2.5 text-sm font-semibold text-pitch-950">进入首页</Link>
          <Link href={`/today?utm_source=${slug}&utm_medium=kol&utm_campaign=worldcup`} className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/72 hover:border-turf/30 hover:text-turf">今日赛前分析</Link>
          <Link href={`/world-cup-2026?utm_source=${slug}&utm_medium=kol&utm_campaign=worldcup`} className="rounded-md border border-white/15 px-4 py-2.5 text-sm text-white/72 hover:border-turf/30 hover:text-turf">世界杯专题</Link>
        </div>
      </section>
    </main>
  );
}
