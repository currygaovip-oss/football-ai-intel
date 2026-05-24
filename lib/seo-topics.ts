export type SeoTopicSlug =
  | "today-football-schedule"
  | "football-match-analysis"
  | "world-cup-2026-schedule"
  | "world-cup-2026-tickets"
  | "football-review"
  | "football-score-result";

export type SeoTopic = {
  slug: SeoTopicSlug;
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  primaryLink: { label: string; href: string };
  faq: Array<{ question: string; answer: string }>;
};

export const seoTopics: SeoTopic[] = [
  {
    slug: "today-football-schedule",
    title: "今日足球赛程",
    eyebrow: "Football Schedule",
    description: "查看今日足球赛程、比赛时间、赛事阶段和赛前分析入口，覆盖世界杯、五大联赛、杯赛和焦点赛事。",
    intro: "今日与近期重点足球赛程按比赛时间和对阵整理；已发布观点的比赛可继续阅读赛前分析和参考方向。",
    primaryLink: { label: "查看今日足球赛程", href: "/football-schedule/today" },
    faq: [
      {
        question: "今日足球赛程页面主要看什么？",
        answer: "可以先看比赛时间、赛事阶段和对阵双方，有赛前观点的比赛会提供分析入口。"
      },
      {
        question: "没有今日比赛时怎么看？",
        answer: "可以切换到完整赛程，查看接下来已经收录的比赛安排。"
      },
      {
        question: "赛程和赛前分析有什么关系？",
        answer: "赛程用于确认比赛时间和对阵，赛前分析用于进一步阅读参考方向和比赛变量。"
      }
    ]
  },
  {
    slug: "football-match-analysis",
    title: "足球赛前分析",
    eyebrow: "Pre-match Analysis",
    description: "查看足球赛前分析、比赛观点、球队状态、赛程强度、数据变化和参考方向。",
    intro: "赛前分析会把比赛时间、球队状态、赛程强度和数据变化整理成更容易阅读的赛前信息，帮助用户快速判断一场比赛值得关注的角度。",
    primaryLink: { label: "查看足球赛前分析", href: "/predictions" },
    faq: [
      {
        question: "足球赛前分析包含哪些内容？",
        answer: "主要包含比赛信息、球队状态、赛程强度、历史交锋、数据变化和参考方向。"
      },
      {
        question: "参考方向应该怎么理解？",
        answer: "参考方向是对赛前信息的摘要，适合和正文分析、比赛变量一起阅读。"
      },
      {
        question: "赛前分析会更新吗？",
        answer: "重点比赛会根据最新信息整理更新，更多动态会同步到 Telegram 群和 X 主页。"
      }
    ]
  },
  {
    slug: "world-cup-2026-schedule",
    title: "世界杯2026赛程",
    eyebrow: "World Cup 2026",
    description: "查看世界杯2026赛程、小组赛、淘汰赛、比赛时间和赛前分析入口。",
    intro: "世界杯2026赛程会按比赛阶段整理，方便查看小组赛、淘汰赛和重点比赛时间；有赛前观点的比赛会提供分析入口。",
    primaryLink: { label: "查看世界杯赛程", href: "/world-cup-2026/schedule" },
    faq: [
      {
        question: "世界杯2026赛程页面可以看哪些内容？",
        answer: "可以查看已经收录的世界杯比赛时间、赛事阶段、对阵信息和赛前分析入口。"
      },
      {
        question: "世界杯小组赛和淘汰赛能筛选吗？",
        answer: "赛程中心支持按小组赛、淘汰赛和完整赛程查看。"
      },
      {
        question: "世界杯比赛有赛前观点吗？",
        answer: "重点比赛发布赛前观点后，会在赛程卡片和今日情报页显示入口。"
      }
    ]
  },
  {
    slug: "world-cup-2026-tickets",
    title: "2026世界杯门票信息",
    eyebrow: "World Cup Tickets",
    description: "查看2026世界杯门票信息、官方购票入口、美加墨举办城市、揭幕战、决赛和观赛提醒。",
    intro: "世界杯门票信息以 FIFA 官方发布为准。绿茵智报整理官方入口、赛程、举办城市和观赛前需要核对的公开信息。",
    primaryLink: { label: "查看世界杯门票信息", href: "/world-cup-2026/tickets" },
    faq: [
      {
        question: "2026世界杯门票信息以哪里为准？",
        answer: "以 FIFA 官方门票页面和赛事官方公告为准。"
      },
      {
        question: "绿茵智报提供门票交易吗？",
        answer: "不提供。本站只整理公开信息、赛程入口、城市信息和观赛提醒。"
      },
      {
        question: "买票前应该先看哪些页面？",
        answer: "建议先查看世界杯赛程、举办城市、单场比赛页和官方门票入口。"
      }
    ]
  },
  {
    slug: "football-review",
    title: "足球赛后复盘",
    eyebrow: "Match Review",
    description: "查看足球赛后复盘记录，包括原参考方向、比赛结果、符合情况、复盘评分和偏差归因。",
    intro: "赛后复盘用于回看赛前判断与实际走势的差异，命中的会记录，出现偏差的场次也会整理原因。",
    primaryLink: { label: "查看复盘记录", href: "/reviews" },
    faq: [
      {
        question: "足球赛后复盘记录什么？",
        answer: "记录原参考方向、比赛结果、符合情况、复盘评分和主要偏差。"
      },
      {
        question: "为什么复盘不是比赛结束后立刻出现？",
        answer: "复盘需要整理赛果、实际走势和主要变量，完成后才会发布。"
      },
      {
        question: "复盘评分代表什么？",
        answer: "复盘评分用于辅助记录赛前判断与实际比赛走势的贴合程度，不代表未来结果。"
      }
    ]
  },
  {
    slug: "football-score-result",
    title: "足球比分赛果",
    eyebrow: "Scores & Results",
    description: "查看足球比分赛果、已完成比赛记录、原参考方向和赛后复盘入口。",
    intro: "比分赛果适合和赛前观点一起回看：先确认比赛结果，再查看原参考方向和复盘记录。",
    primaryLink: { label: "查看赛后复盘", href: "/reviews" },
    faq: [
      {
        question: "足球比分赛果页面适合怎么看？",
        answer: "可以先看已完成比赛结果，再进入复盘记录查看赛前观点与实际赛果的差异。"
      },
      {
        question: "比分赛果会覆盖哪些比赛？",
        answer: "会优先整理世界杯、五大联赛、杯赛和当天焦点足球赛事。"
      },
      {
        question: "赛果和复盘有什么区别？",
        answer: "赛果记录比赛结果，复盘会进一步解释赛前判断与实际走势的偏差。"
      }
    ]
  }
];

export function getSeoTopic(slug: string) {
  return seoTopics.find((topic) => topic.slug === slug);
}
