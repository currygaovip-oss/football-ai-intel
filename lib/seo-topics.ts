export type SeoTopicSlug =
  | "today-football-schedule"
  | "football-match-analysis"
  | "world-cup-2026-schedule"
  | "world-cup-2026-countdown"
  | "world-cup-2026-teams"
  | "world-cup-2026-host-cities"
  | "world-cup-2026-tickets"
  | "world-cup-2026-match-time"
  | "world-cup-2026-china-time"
  | "world-cup-2026-groups"
  | "world-cup-2026-group-stage"
  | "world-cup-2026-knockout"
  | "world-cup-2026-opening-time"
  | "world-cup-2026-final-time"
  | "north-america-world-cup"
  | "world-cup-opening-final"
  | "world-cup-team-lineups"
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
    intro: "今日与近期足球赛程按开球时间整理，重点呈现比赛时间、对阵双方和赛前阅读重点。",
    primaryLink: { label: "今日足球赛程", href: "/football-schedule/today" },
    faq: [
      {
        question: "今日足球赛程主要看什么？",
        answer: "今日赛程包含比赛时间、赛事阶段、对阵双方和赛前分析。"
      },
      {
        question: "没有今日比赛时怎么看？",
        answer: "完整赛程按比赛日整理近期重点对阵，适合赛前快速确认开球时间。"
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
        answer: "参考方向概括模型倾向，正文重点看球队状态、赛程强度和关键变量。"
      },
      {
        question: "赛前分析在哪里看？",
        answer: "今日情报集中整理重点比赛，Telegram 群和 X 主页同步公开动态。"
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
        answer: "重点比赛可在今日情报中查看赛前观点和参考方向。"
      }
    ]
  },
  {
    slug: "world-cup-2026-countdown",
    title: "2026世界杯倒计时",
    eyebrow: "世界杯时间",
    description: "2026世界杯倒计时、揭幕战时间、决赛时间、美加墨世界杯比赛日和赛程入口。",
    intro: "2026世界杯揭幕战为北京时间6月12日03:00，墨西哥对阵南非。倒计时适合快速确认揭幕战、决赛和下一场世界杯比赛时间。",
    primaryLink: { label: "世界杯倒计时", href: "/world-cup-2026" },
    faq: [
      {
        question: "2026世界杯还有多少天？",
        answer: "绿茵智报首页和世界杯专题提供揭幕战倒计时，并同步下一场世界杯比赛时间。"
      },
      {
        question: "2026世界杯揭幕战什么时候开始？",
        answer: "北京时间6月12日03:00，墨西哥对阵南非。"
      },
      {
        question: "2026世界杯决赛什么时候开始？",
        answer: "北京时间7月20日03:00，决赛地点为纽约/新泽西大都会人寿体育场。"
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
        answer: "重点比赛包含赛前观点和参考方向，赛后保留复盘记录。"
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
        answer: "中文球迷常按城市搜索比赛、门票和观赛安排，例如纽约世界杯赛程、洛杉矶世界杯赛程、多伦多世界杯赛程。"
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
    slug: "world-cup-2026-match-time",
    title: "2026世界杯比赛时间",
    eyebrow: "比赛时间",
    description: "2026世界杯比赛时间、北京时间开球、比赛日、小组赛和淘汰赛对阵整理。",
    intro: "按北京时间查看2026世界杯开球安排，重点关注小组赛比赛日、淘汰赛时间、揭幕战和决赛。",
    primaryLink: { label: "查看世界杯赛程", href: "/world-cup-2026/schedule" },
    faq: [
      {
        question: "2026世界杯比赛时间怎么看？",
        answer: "按北京时间查看小组赛、淘汰赛、揭幕战和决赛安排。"
      },
      {
        question: "世界杯比赛时间适合赛前看什么？",
        answer: "开球时间和赛事阶段是基础，再结合球队状态、首发信息和赛前观点阅读。"
      },
      {
        question: "世界杯赛程按什么顺序整理？",
        answer: "按比赛日、阶段和对阵顺序整理，方便快速找到具体比赛。"
      }
    ]
  },
  {
    slug: "world-cup-2026-china-time",
    title: "2026世界杯北京时间",
    eyebrow: "北京时间",
    description: "2026世界杯北京时间、揭幕战、决赛、小组赛和淘汰赛开球安排，适合中文球迷赛前确认比赛时间。",
    intro: "按北京时间整理美加墨世界杯开球安排，重点覆盖揭幕战、决赛、小组赛比赛日和淘汰赛关键节点。",
    primaryLink: { label: "世界杯北京时间", href: "/world-cup-2026/china-time" },
    faq: [
      {
        question: "2026世界杯北京时间怎么看？",
        answer: "重点看北京时间开球、比赛阶段、对阵双方和所在赛区。美加墨与中国存在时差，部分比赛会落在凌晨或上午。"
      },
      {
        question: "2026世界杯揭幕战北京时间是什么时候？",
        answer: "揭幕战为北京时间6月12日03:00，墨西哥对阵南非。"
      },
      {
        question: "2026世界杯决赛北京时间是什么时候？",
        answer: "决赛为北京时间7月20日03:00，地点为纽约/新泽西大都会人寿体育场。"
      }
    ]
  },
  {
    slug: "world-cup-2026-groups",
    title: "2026世界杯分组",
    eyebrow: "世界杯分组",
    description: "2026世界杯分组、小组赛对阵、A组到L组比赛时间和球队赛程。",
    intro: "按 A 组到 L 组整理世界杯小组赛对阵和比赛时间，适合快速查看同组球队、出线路径和重点比赛。",
    primaryLink: { label: "世界杯分组", href: "/world-cup-2026/groups" },
    faq: [
      {
        question: "2026世界杯分几个小组？",
        answer: "2026世界杯采用48队参赛，小组赛从A组到L组展开。"
      },
      {
        question: "世界杯分组适合看什么？",
        answer: "分组信息适合查看同组对手、比赛时间、出线路径和可能影响淘汰赛位置的关键对阵。"
      },
      {
        question: "世界杯分组和球队赛程有什么区别？",
        answer: "分组按A组到L组呈现对阵关系，球队赛程按单支球队整理全部比赛时间和对手。"
      }
    ]
  },
  {
    slug: "world-cup-2026-group-stage",
    title: "2026世界杯小组赛赛程",
    eyebrow: "小组赛",
    description: "2026世界杯小组赛赛程、比赛时间、A组到L组对阵和赛前观点。",
    intro: "小组赛决定淘汰赛路径，重点看开球时间、同组对手、赛程密度和最后一轮出线形势。",
    primaryLink: { label: "世界杯小组赛", href: "/world-cup-2026/groups" },
    faq: [
      {
        question: "2026世界杯小组赛什么时候开始？",
        answer: "小组赛从揭幕战开始，按比赛日连续展开，中文球迷可按北京时间查看全部对阵。"
      },
      {
        question: "小组赛赛程重点看什么？",
        answer: "重点看开球时间、同组对手、赛程间隔、末轮出线形势和赛前观点。"
      },
      {
        question: "小组赛和淘汰赛怎么区分？",
        answer: "小组赛按A组到L组进行，淘汰赛从32强赛开始，比赛结果直接影响晋级。"
      }
    ]
  },
  {
    slug: "world-cup-2026-knockout",
    title: "2026世界杯淘汰赛赛程",
    eyebrow: "淘汰赛",
    description: "2026世界杯淘汰赛赛程、32强赛、16强赛、1/4决赛、半决赛、季军赛和决赛时间。",
    intro: "淘汰赛从32强赛开始，重点关注晋级路径、比赛城市、开球时间和关键球队的赛前状态。",
    primaryLink: { label: "世界杯淘汰赛", href: "/world-cup-2026/knockout" },
    faq: [
      {
        question: "2026世界杯淘汰赛从哪一轮开始？",
        answer: "2026世界杯淘汰赛从32强赛开始，之后进入16强赛、1/4决赛、半决赛、季军赛和决赛。"
      },
      {
        question: "淘汰赛赛程适合重点看什么？",
        answer: "重点看晋级路径、休息时间、比赛城市、阵容状态和赛前观点。"
      },
      {
        question: "世界杯决赛属于淘汰赛吗？",
        answer: "决赛是淘汰赛最后一场，2026世界杯决赛为北京时间7月20日03:00。"
      }
    ]
  },
  {
    slug: "world-cup-2026-opening-time",
    title: "2026世界杯揭幕战时间",
    eyebrow: "揭幕战",
    description: "2026世界杯揭幕战时间、北京时间、比赛城市、球场和对阵信息。",
    intro: "2026世界杯揭幕战在墨西哥城阿兹特克体育场进行，北京时间6月12日03:00开球，墨西哥对阵南非。",
    primaryLink: { label: "世界杯揭幕战", href: "/world-cup-2026/opening-match" },
    faq: [
      {
        question: "2026世界杯揭幕战北京时间是什么时候？",
        answer: "北京时间6月12日03:00，墨西哥对阵南非。"
      },
      {
        question: "2026世界杯揭幕战在哪里举行？",
        answer: "揭幕战在墨西哥城阿兹特克体育场举行。"
      },
      {
        question: "揭幕战赛前重点看什么？",
        answer: "重点看主队热度、阵容状态、比赛节奏和赛前观点。"
      }
    ]
  },
  {
    slug: "world-cup-2026-final-time",
    title: "2026世界杯决赛时间",
    eyebrow: "决赛",
    description: "2026世界杯决赛时间、北京时间、举办城市、球场和淘汰赛路径。",
    intro: "2026世界杯决赛为北京时间7月20日03:00，地点为纽约/新泽西大都会人寿体育场。",
    primaryLink: { label: "世界杯决赛", href: "/world-cup-2026/final" },
    faq: [
      {
        question: "2026世界杯决赛北京时间是什么时候？",
        answer: "北京时间7月20日03:00。"
      },
      {
        question: "2026世界杯决赛在哪里举行？",
        answer: "决赛在纽约/新泽西大都会人寿体育场举行。"
      },
      {
        question: "决赛前适合看哪些信息？",
        answer: "重点看晋级路径、休息时间、伤停信息、首发变化和赛前观点。"
      }
    ]
  },
  {
    slug: "north-america-world-cup",
    title: "美加墨世界杯",
    eyebrow: "美加墨世界杯",
    description: "美加墨世界杯举办国家、举办城市、球场、世界杯赛程、门票信息和观赛重点。",
    intro: "2026世界杯由美国、加拿大、墨西哥联合举办。中文球迷可重点关注举办城市、球场、比赛时间和门票信息。",
    primaryLink: { label: "查看举办城市", href: "/world-cup-2026/host-cities" },
    faq: [
      {
        question: "美加墨世界杯是哪三个国家？",
        answer: "2026世界杯由美国、加拿大、墨西哥联合举办。"
      },
      {
        question: "美加墨世界杯有哪些核心城市？",
        answer: "纽约/新泽西、洛杉矶、达拉斯、多伦多、温哥华、墨西哥城等城市关注度较高。"
      },
      {
        question: "美加墨世界杯适合重点看什么？",
        answer: "重点看比赛时间、举办城市、球队赛程、门票信息和赛前观点。"
      }
    ]
  },
  {
    slug: "world-cup-opening-final",
    title: "2026世界杯揭幕战与决赛",
    eyebrow: "揭幕战与决赛",
    description: "2026世界杯揭幕战、决赛时间、举办城市、比赛球场和赛程入口。",
    intro: "2026世界杯揭幕战与决赛是中文球迷搜索最集中的两类比赛，重点关注开球时间、举办城市和对阵信息。",
    primaryLink: { label: "查看揭幕战", href: "/world-cup-2026/opening-match" },
    faq: [
      {
        question: "2026世界杯揭幕战在哪里？",
        answer: "2026世界杯揭幕战在墨西哥城阿兹特克体育场举行。"
      },
      {
        question: "2026世界杯决赛在哪里？",
        answer: "2026世界杯决赛在纽约/新泽西大都会人寿体育场举行。"
      },
      {
        question: "揭幕战和决赛赛前看什么？",
        answer: "重点看开球时间、比赛城市、球队状态、阵容信息和赛前观点。"
      }
    ]
  },
  {
    slug: "world-cup-team-lineups",
    title: "2026世界杯球队名单",
    eyebrow: "球队名单",
    description: "2026世界杯球队名单、重点球员、阵容位置、球队赛程和赛前看点。",
    intro: "按球队查看世界杯重点球员、阵容位置和比赛安排，适合赛前了解球队框架和关键球员状态。",
    primaryLink: { label: "查看球队名单", href: "/world-cup-2026/teams" },
    faq: [
      {
        question: "2026世界杯球队名单在哪里看？",
        answer: "球队名单以各队官方公布为准，绿茵智报整理热门球队、重点球员和赛程入口。"
      },
      {
        question: "球队名单和赛前分析有什么关系？",
        answer: "阵容结构、首发位置和核心球员状态，是赛前判断比赛节奏的重要线索。"
      },
      {
        question: "哪些球队关注度更高？",
        answer: "阿根廷、巴西、法国、英格兰、葡萄牙、德国、西班牙、美国、墨西哥、加拿大、日本、韩国关注度较高。"
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
        answer: "复盘需要核对赛果、实际走势和主要变量，完成后进入复盘记录。"
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
        question: "比分赛果覆盖哪些比赛？",
        answer: "覆盖世界杯、五大联赛、杯赛和当天焦点足球赛事。"
      },
      {
        question: "赛果和复盘有什么区别？",
        answer: "赛果记录比赛结果，复盘进一步解释赛前判断与实际走势的偏差。"
      }
    ]
  }
];

export function getSeoTopic(slug: string) {
  return seoTopics.find((topic) => topic.slug === slug);
}
