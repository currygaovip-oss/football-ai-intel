import type { Metadata } from "next";
import { createMetadata, faqJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";

const aboutDescription = "绿茵智报整理足球赛程、赛前分析、参考方向和赛后复盘，面向中文球迷提供赛前阅读参考。";

export const metadata: Metadata = createMetadata({
  title: "关于绿茵智报",
  description: aboutDescription,
  path: "/about"
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "关于绿茵智报", description: aboutDescription, path: "/about" })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            faqJsonLd([
              {
                question: "绿茵智报是什么？",
                answer: "绿茵智报是面向中文球迷的赛前情报网站，整理足球赛程、赛前分析、参考方向和赛后复盘。"
              },
              {
                question: "绿茵智报覆盖哪些比赛？",
                answer: "内容重点覆盖世界杯、五大联赛、中超、杯赛和当天焦点足球赛事。"
              },
              {
                question: "绿茵智报的内容可以作为结果承诺吗？",
                answer: "不可以。本站内容仅作足球交流、数据研究和赛前阅读参考，不构成任何结果承诺或行动建议。"
              }
            ])
          )
        }}
      />
      <div className="glass rounded-lg p-6 sm:p-8">
        <div className="text-sm font-semibold text-turf">About</div>
        <h1 className="mt-3 text-4xl font-semibold">关于绿茵智报</h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-white/70">
          <p>
            绿茵智报面向中文球迷，整理今日赛程、重点比赛、赛前分析和赛后复盘，让赛前信息更集中、更容易阅读。
          </p>
          <p>
            内容重点覆盖世界杯、五大联赛、杯赛和焦点赛事。每条赛前观点标注比赛时间、对阵双方和参考方向。
          </p>
          <p>
            分析会参考球队状态、历史交锋、阵容伤停、赛程密度、指数变化和进球趋势，并用更容易阅读的方式整理成赛前信息。
          </p>
          <p>
            赛后复盘记录比赛结果、原参考方向和主要偏差。这样不只看到赛前观点，也能回看判断过程和实际赛果。
          </p>
        </div>
        <div className="mt-8 rounded-lg border border-gold/25 bg-gold/10 p-5 text-sm leading-7 text-white/70">
          明确声明：本站内容仅供足球交流、数据研究和模型观察参考，不构成任何结果承诺或行动建议。请理性阅读，独立判断。
        </div>
      </div>
    </article>
  );
}
