export type SeoTopicSlug =
  | "today-football-schedule"
  | "football-match-analysis"
  | "world-cup-2026-schedule"
  | "world-cup-2026-teams"
  | "world-cup-2026-host-cities"
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
    eyebrow: "足球赛程",
    description: "今日足球赛程、比赛时间、赛事阶段和赛前分析，覆盖世界杯、五大联赛、杯赛和焦点赛事。",
    intro: "今日与近期足球赛程按开球时间整理，有赛前观点的比赛会标出参考方向和完整分析。",
    primaryLink: { label: "今日足球赛程", href: "/football-schedule/today" },
    faq: [
      {
        question: "今日足球赛程主要看什么？",
        answer: "今日赛程包含比赛时间、赛事阶段、对阵双方和赛前分析。"
      },
      {
        question: "没有今日比赛时怎么看？",
        answer: "完整赛程包含接下来已收录的比赛安排。"
      },
      {
        question: "赛程和赛前分析有什么关系？",
        answer: "结合比赛时间、对阵双方、赛前分析和参考方向判断比赛变量。"
      }
    ]
  },
  {
    slug: "football-match-analysis",
    title: "足球赛前分析",
    eyebrow: "赛前分析",
    description: "足球赛前分析、比赛观点、球队状态、赛程强度、数据变化和参考方向。",
    intro: "赛前分析围绕比赛时间、球队状态、赛程强度和数据变化展开，让中文球迷更快抓住一场比赛的关键角度。",
    primaryLink: { label: "足球赛前分析", href: "/predictions" },
    faq: [
      {
        question: "足球赛前分析包含哪些内容？",
        answer: "主要包含比赛信息、球队状态、赛程强度、历史交锋、数据变化和参考方向。"
      },
      {
        question: "参考方向应该怎么理解？",
        answer: "参考方向概括模型倾向，正文会展开球队状态、赛程强度和关键变量。"
      },
      {
        question: "赛前分析在哪里更新？",
        answer: "重点比赛结合最新信息更新，更多动态在 Telegram 群和 X 主页发布。"
      }
    ]
  },
  {
    slug: "world-cup-2026-schedule",
    title: "世界杯2026赛程",
    eyebrow: "世界杯 2026",
    description: "世界杯2026赛程、小组赛、淘汰赛、比赛时间和赛前分析。",
    intro: "世界杯2026赛程按比赛阶段呈现，小组赛、淘汰赛和焦点比赛分开查看，赛前观点与参考方向集中整理。",
    primaryLink: { label: "世界杯赛程", href: "/world-cup-2026/schedule" },
    faq: [
      {
        question: "世界杯2026赛程主要看什么？",
        answer: "重点看世界杯比赛时间、赛事阶段、对阵双方和赛前分析。"
      },
      {
        question: "世界杯小组赛和淘汰赛能筛选吗？",
        answer: "赛程中心支持按小组赛、淘汰赛和完整赛程查看。"
      },
      {
        question: "世界杯比赛有赛前观点吗？",
        answer: "重点比赛的赛前观点在赛程卡片和今日情报中展示。"
      }
    ]
  },
  {
    slug: "world-cup-2026-teams",
    title: "2026世界杯球队赛程",
    eyebrow: "世界杯球队",
    description: "2026世界杯热门球队赛程，覆盖阿根廷、巴西、法国、英格兰、葡萄牙、美国、墨西哥、加拿大等球队比赛时间和赛前分析。",
    intro: "按球队查找比赛时间、对手和赛前分析。热门球队包含赛程、阵容名单和重点球员。",
    primaryLink: { label: "世界杯球队赛程", href: "/world-cup-2026/teams" },
    faq: [
      {
        question: "世界杯球队赛程主要看什么？",
        answer: "按球队看比赛时间、对手、赛程阶段和赛前分析。"
      },
      {
        question: "哪些球队关注度更高？",
        answer: "阿根廷、巴西、法国、英格兰、葡萄牙、德国、西班牙、美国、墨西哥、加拿大、日本、韩国等球队在中文球迷中关注度较高。"
      },
      {
        question: "球队赛程有赛前观点吗？",
        answer: "重点比赛包含完整分析和参考方向，赛后保留复盘记录。"
      }
    ]
  },
  {
    slug: "world-cup-2026-host-cities",
    title: "2026世界杯举办城市",
    eyebrow: "举办城市",
    description: "2026世界杯美加墨举办城市、比赛球场、城市赛程、门票提醒和观赛信息。",
    intro: "2026世界杯由美国、加拿大、墨西哥联合举办，覆盖纽约/新泽西、洛杉矶、达拉斯、多伦多、温哥华、墨西哥城等赛区信息。",
    primaryLink: { label: "查看世界杯举办城市", href: "/world-cup-2026/host-cities" },
    faq: [
      {
        question: "2026世界杯在哪些国家举办？",
        answer: "2026世界杯由美国、加拿大、墨西哥联合举办。"
      },
      {
        question: "举办城市主要提供什么信息？",
        answer: "城市内容包含举办国家、比赛球场、赛程、门票提醒和赛前分析。"
      },
      {
        question: "中文球迷为什么关注城市赛程？",
        answer: "中文球迷常会按城市搜索比赛、门票和观赛安排，例如纽约世界杯赛程、洛杉矶世界杯赛程、多伦多世界杯赛程。"
      }
    ]
  },
  {
    slug: "world-cup-2026-tickets",
    title: "2026世界杯门票信息",
    eyebrow: "门票信息",
    description: "查看2026世界杯门票信息、官方购票链接、美加墨举办城市、揭幕战、决赛和观赛提醒。",
    intro: "世界杯门票信息以 FIFA 官方发布为准。绿茵智报提供官方票务链接、赛程、举办城市和观赛前核对事项。",
    primaryLink: { label: "查看世界杯门票信息", href: "/world-cup-2026/tickets" },
    faq: [
      {
        question: "2026世界杯门票信息以哪里为准？",
        answer: "以 FIFA 官方门票信息和赛事公告为准。"
      },
      {
        question: "绿茵智报提供门票交易吗？",
        answer: "不提供。本站提供公开信息、赛程、城市信息和观赛提醒。"
      },
      {
        question: "买票前应该确认哪些信息？",
        answer: "购票前需要核对世界杯赛程、举办城市、单场比赛和官方门票链接。"
      }
    ]
  },
  {
    slug: "football-review",
    title: "足球赛后复盘",
    eyebrow: "赛后复盘",
    description: "查看足球赛后复盘记录，包括原参考方向、比赛结果、符合情况、复盘评分和偏差归因。",
    intro: "赛后复盘回看赛前判断与实际走势的差异，记录命中与偏差，并说明主要原因。",
    primaryLink: { label: "查看复盘记录", href: "/reviews" },
    faq: [
      {
        question: "足球赛后复盘记录什么？",
        answer: "记录原参考方向、比赛结果、符合情况、复盘评分和主要偏差。"
      },
      {
        question: "为什么复盘不是比赛结束后立刻出现？",
        answer: "复盘会核对赛果、实际走势和主要变量，完成后进入复盘记录。"
      },
      {
        question: "复盘评分代表什么？",
        answer: "复盘评分记录赛前判断与实际比赛走势的贴合程度，不代表未来结果。"
      }
    ]
  },
  {
    slug: "football-score-result",
    title: "足球比分赛果",
    eyebrow: "比分赛果",
    description: "查看足球比分赛果、已完成比赛记录、原参考方向和赛后复盘。",
    intro: "比分赛果和赛前观点放在同一条线索中：比赛结果、原参考方向和复盘记录一起回看。",
    primaryLink: { label: "查看赛后复盘", href: "/reviews" },
    faq: [
      {
        question: "足球比分赛果怎么看？",
        answer: "已完成比赛保留赛果和复盘记录，便于回看赛前观点与实际赛果的差异。"
      },
      {
        question: "比分赛果会覆盖哪些比赛？",
        answer: "覆盖世界杯、五大联赛、杯赛和当天焦点足球赛事。"
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
