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
  | "world-cup-2026-draw"
  | "world-cup-2026-format"
  | "world-cup-2026-48-teams"
  | "world-cup-2026-round-of-32"
  | "world-cup-2026-stadiums"
  | "world-cup-2026-qualified-teams"
  | "world-cup-2026-where"
  | "world-cup-2026-start-date"
  | "world-cup-2026-time-difference"
  | "world-cup-2026-asian-teams"
  | "world-cup-2026-watch-guide"
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

export type SeoKeywordCluster = {
  id: string;
  name: string;
  intent: string;
  terms: string[];
  routes: string[];
};

export type SeoTopicEnhancement = {
  clusterName: string;
  intent: string;
  longTailTerms: string[];
  sections: Array<{ heading: string; body: string }>;
  relatedLinks: Array<{ label: string; href: string }>;
};

export const seoKeywordClusters: SeoKeywordCluster[] = [
  {
    id: "world-cup-core",
    name: "世界杯核心词",
    intent: "确认2026世界杯赛程、比赛阶段、揭幕战和决赛时间。",
    terms: ["2026世界杯", "世界杯2026赛程", "美加墨世界杯", "世界杯完整赛程", "世界杯比赛时间"],
    routes: ["/world-cup-2026", "/world-cup-2026/schedule", "/topics/world-cup-2026-schedule"]
  },
  {
    id: "world-cup-time",
    name: "世界杯时间词",
    intent: "按北京时间确认开球时间、时差、揭幕战和决赛节点。",
    terms: ["2026世界杯什么时候开始", "2026世界杯北京时间", "2026世界杯时差", "世界杯揭幕战时间", "世界杯决赛时间"],
    routes: ["/world-cup-2026/china-time", "/topics/world-cup-2026-start-date", "/topics/world-cup-2026-time-difference"]
  },
  {
    id: "world-cup-place",
    name: "世界杯举办地词",
    intent: "了解美加墨举办国家、举办城市、球场和城市赛程。",
    terms: ["2026世界杯在哪里举办", "世界杯举办城市", "世界杯举办球场", "美加墨世界杯举办国家", "纽约世界杯赛程"],
    routes: ["/world-cup-2026/host-countries", "/world-cup-2026/host-cities", "/topics/world-cup-2026-stadiums"]
  },
  {
    id: "world-cup-format",
    name: "世界杯赛制词",
    intent: "了解48队赛制、分组、抽签、小组赛和淘汰赛路径。",
    terms: ["2026世界杯分组", "2026世界杯抽签", "2026世界杯赛制", "世界杯48队", "世界杯32强赛"],
    routes: ["/world-cup-2026/groups", "/world-cup-2026/knockout", "/topics/world-cup-2026-format"]
  },
  {
    id: "world-cup-team",
    name: "世界杯球队球员词",
    intent: "按球队和球员查看赛程、阵容看点、重点比赛和赛前分析。",
    terms: ["阿根廷世界杯赛程", "巴西世界杯赛程", "法国世界杯赛程", "梅西世界杯2026", "姆巴佩世界杯"],
    routes: ["/world-cup-2026/teams", "/world-cup-2026/players", "/topics/world-cup-team-lineups"]
  },
  {
    id: "football-analysis",
    name: "足球赛前复盘词",
    intent: "查看今日足球赛程、赛前分析、参考方向、比分赛果和赛后复盘。",
    terms: ["今日足球赛程", "足球赛前分析", "足球AI情报", "足球比赛分析", "足球赛后复盘"],
    routes: ["/today", "/predictions", "/reviews", "/football-ai-intelligence"]
  },
  {
    id: "world-cup-ticket",
    name: "世界杯门票观赛词",
    intent: "确认官方门票信息、城市观赛、购票前核对和观赛指南。",
    terms: ["2026世界杯门票", "世界杯门票怎么买", "世界杯官方购票链接", "世界杯观赛指南", "世界杯哪里看"],
    routes: ["/world-cup-2026/tickets", "/topics/world-cup-2026-watch-guide"]
  }
];

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
    slug: "world-cup-2026-draw",
    title: "2026世界杯抽签分组",
    eyebrow: "抽签分组",
    description: "2026世界杯抽签分组、A组到L组球队、小组赛对阵、比赛时间和出线路径。",
    intro: "按小组查看2026世界杯抽签分组结果，重点关注同组对手、比赛顺序、末轮形势和淘汰赛潜在路径。",
    primaryLink: { label: "世界杯分组", href: "/world-cup-2026/groups" },
    faq: [
      {
        question: "2026世界杯抽签分组怎么看？",
        answer: "重点看A组到L组球队、同组对手、小组赛比赛顺序和可能影响淘汰赛路径的关键对阵。"
      },
      {
        question: "2026世界杯有多少个小组？",
        answer: "2026世界杯为48队参赛，小组赛共12个小组，每组4队。"
      },
      {
        question: "抽签分组和赛前分析有什么关系？",
        answer: "分组强弱、赛程顺序和末轮对手，会影响球队轮换、出线压力和赛前判断。"
      }
    ]
  },
  {
    slug: "world-cup-2026-format",
    title: "2026世界杯赛制规则",
    eyebrow: "赛制规则",
    description: "2026世界杯赛制规则、48队参赛、12个小组、32强淘汰赛和晋级路径。",
    intro: "2026世界杯扩军至48队，赛程从小组赛进入32强淘汰赛。看懂赛制，有助于判断球队出线压力和淘汰赛路径。",
    primaryLink: { label: "世界杯赛程", href: "/world-cup-2026/schedule" },
    faq: [
      {
        question: "2026世界杯赛制有什么变化？",
        answer: "2026世界杯为48队参赛，小组赛为12个四队小组，之后进入32强淘汰赛。"
      },
      {
        question: "2026世界杯一共有多少场比赛？",
        answer: "2026世界杯一共有104场比赛。"
      },
      {
        question: "赛制规则为什么影响赛前阅读？",
        answer: "小组排名、晋级名额、休息时间和淘汰赛对位，都会影响球队在不同比赛日的策略。"
      }
    ]
  },
  {
    slug: "world-cup-2026-48-teams",
    title: "2026世界杯48队赛程",
    eyebrow: "48队赛程",
    description: "2026世界杯48队参赛球队、分组、小组赛赛程、晋级路径和重点球队。",
    intro: "48队世界杯带来更多球队、更多比赛日和更长淘汰赛路径，适合按球队、分组和比赛日交叉查看。",
    primaryLink: { label: "世界杯球队赛程", href: "/world-cup-2026/teams" },
    faq: [
      {
        question: "2026世界杯为什么是48队？",
        answer: "2026世界杯扩军至48支参赛球队，覆盖更多地区球队和更长赛程。"
      },
      {
        question: "48队世界杯怎么查球队赛程？",
        answer: "可以按球队查看比赛时间、同组对手、阵容重点和赛前观点。"
      },
      {
        question: "48队赛制适合重点看什么？",
        answer: "重点看小组赛对手、比赛间隔、第三轮出线形势和32强赛潜在对位。"
      }
    ]
  },
  {
    slug: "world-cup-2026-round-of-32",
    title: "2026世界杯32强赛",
    eyebrow: "32强赛",
    description: "2026世界杯32强赛时间、淘汰赛对阵、晋级路径、16强赛和决赛路线。",
    intro: "2026世界杯淘汰赛从32强赛开始，比赛密度、晋级路径和休息时间都是强队走势的关键变量。",
    primaryLink: { label: "世界杯淘汰赛", href: "/world-cup-2026/knockout" },
    faq: [
      {
        question: "2026世界杯32强赛是什么？",
        answer: "32强赛是2026世界杯淘汰赛第一轮，胜者继续进入16强赛。"
      },
      {
        question: "32强赛适合看哪些信息？",
        answer: "重点看对阵来源、开球时间、比赛城市、球队休息时间和晋级路径。"
      },
      {
        question: "32强赛和16强赛有什么关系？",
        answer: "32强赛胜者进入16强赛，之后继续进入1/4决赛、半决赛和决赛。"
      }
    ]
  },
  {
    slug: "world-cup-2026-stadiums",
    title: "2026世界杯举办球场",
    eyebrow: "举办球场",
    description: "2026世界杯举办球场、举办城市、美加墨赛区、比赛分布和观赛信息。",
    intro: "按举办城市查看世界杯球场信息，重点覆盖墨西哥城、纽约/新泽西、洛杉矶、达拉斯、多伦多和温哥华等赛区。",
    primaryLink: { label: "世界杯举办城市", href: "/world-cup-2026/host-cities" },
    faq: [
      {
        question: "2026世界杯有哪些举办球场？",
        answer: "2026世界杯分布在美国、加拿大、墨西哥多个城市，重点球场包括阿兹特克体育场、大都会人寿体育场、SoFi Stadium 等。"
      },
      {
        question: "举办球场和赛程有什么关系？",
        answer: "球场所在城市决定观赛安排、旅行路线、时差和比赛日节奏。"
      },
      {
        question: "中文球迷查球场时适合看什么？",
        answer: "重点看城市、球场、比赛时间、门票官方入口和当天对阵。"
      }
    ]
  },
  {
    slug: "world-cup-2026-qualified-teams",
    title: "2026世界杯参赛球队",
    eyebrow: "参赛球队",
    description: "2026世界杯参赛球队、热门球队赛程、球队名单、重点球员和分组信息。",
    intro: "按球队查看2026世界杯比赛时间、分组路径、重点球员和赛前关注点，适合快速找到热门球队入口。",
    primaryLink: { label: "世界杯参赛球队", href: "/world-cup-2026/teams" },
    faq: [
      {
        question: "2026世界杯参赛球队在哪里看？",
        answer: "可以按球队查看赛程、分组、重点球员和赛前关注点。"
      },
      {
        question: "哪些球队搜索热度更高？",
        answer: "阿根廷、巴西、法国、英格兰、葡萄牙、德国、西班牙、美国、墨西哥、加拿大、日本、韩国关注度较高。"
      },
      {
        question: "参赛球队和球队名单有什么区别？",
        answer: "参赛球队关注队伍与赛程，球队名单更关注阵容结构、重点球员和位置分布。"
      }
    ]
  },
  {
    slug: "world-cup-2026-where",
    title: "2026世界杯在哪里举办",
    eyebrow: "举办地点",
    description: "2026世界杯举办国家、举办城市、比赛球场和美加墨赛区分布。",
    intro: "2026世界杯由美国、加拿大、墨西哥联合举办，比赛分布在16座举办城市。中文球迷可按国家、城市和球场查找比赛安排。",
    primaryLink: { label: "世界杯举办城市", href: "/world-cup-2026/host-cities" },
    faq: [
      {
        question: "2026世界杯在哪里举办？",
        answer: "2026世界杯由美国、加拿大、墨西哥联合举办，比赛分布在北美16座举办城市。"
      },
      {
        question: "2026世界杯决赛在哪个城市？",
        answer: "2026世界杯决赛在纽约/新泽西大都会人寿体育场进行。"
      },
      {
        question: "2026世界杯揭幕战在哪个城市？",
        answer: "揭幕战在墨西哥城阿兹特克体育场进行。"
      }
    ]
  },
  {
    slug: "world-cup-2026-start-date",
    title: "2026世界杯什么时候开始",
    eyebrow: "开赛时间",
    description: "2026世界杯开赛时间、揭幕战北京时间、决赛时间和关键比赛日。",
    intro: "2026世界杯揭幕战为北京时间6月12日03:00，墨西哥对阵南非。决赛为北京时间7月20日03:00。",
    primaryLink: { label: "世界杯倒计时", href: "/world-cup-2026" },
    faq: [
      {
        question: "2026世界杯什么时候开始？",
        answer: "北京时间6月12日03:00，2026世界杯揭幕战在墨西哥城进行。"
      },
      {
        question: "2026世界杯什么时候结束？",
        answer: "决赛为北京时间7月20日03:00，地点为纽约/新泽西大都会人寿体育场。"
      },
      {
        question: "2026世界杯比赛时间适合怎样关注？",
        answer: "中文球迷可按北京时间、比赛日、球队和举办城市交叉查找重点比赛。"
      }
    ]
  },
  {
    slug: "world-cup-2026-time-difference",
    title: "2026世界杯时差与北京时间",
    eyebrow: "时差换算",
    description: "2026世界杯时差、北京时间、美国加拿大墨西哥开球时间和中文观赛时间。",
    intro: "美加墨世界杯覆盖多个时区，中文球迷重点看北京时间开球安排，再结合比赛城市判断观赛节奏。",
    primaryLink: { label: "世界杯北京时间", href: "/world-cup-2026/china-time" },
    faq: [
      {
        question: "2026世界杯和北京时间差多少？",
        answer: "美国、加拿大、墨西哥横跨多个时区，具体比赛以北京时间赛程为准。"
      },
      {
        question: "2026世界杯哪些比赛在北京时间凌晨？",
        answer: "揭幕战和决赛均为北京时间03:00，部分美加墨赛区比赛会落在中文球迷的凌晨或上午。"
      },
      {
        question: "世界杯北京时间怎么查更快？",
        answer: "可按比赛日、球队、城市和小组筛选，优先确认开球时间和赛事阶段。"
      }
    ]
  },
  {
    slug: "world-cup-2026-asian-teams",
    title: "2026世界杯亚洲球队赛程",
    eyebrow: "亚洲球队",
    description: "2026世界杯亚洲球队赛程、日本、韩国等球队比赛时间、分组和赛前观察。",
    intro: "亚洲球队在中文足球圈关注度高，赛前重点看小组对手、比赛间隔、阵容状态和出线路径。",
    primaryLink: { label: "世界杯球队赛程", href: "/world-cup-2026/teams" },
    faq: [
      {
        question: "2026世界杯亚洲球队赛程怎么看？",
        answer: "按球队查看比赛时间、对手、分组位置和赛前关注点。"
      },
      {
        question: "日本队世界杯赛程重点看什么？",
        answer: "重点看小组对手、阵容结构、边路推进和关键球员状态。"
      },
      {
        question: "韩国队世界杯赛程重点看什么？",
        answer: "重点看孙兴慜状态、前场效率、比赛节奏和出线路径。"
      }
    ]
  },
  {
    slug: "world-cup-2026-watch-guide",
    title: "2026世界杯观赛指南",
    eyebrow: "观赛指南",
    description: "2026世界杯观赛指南、北京时间、赛程、举办城市、门票入口和赛前阅读重点。",
    intro: "赛前先确认北京时间、对阵双方和举办城市，再结合球队状态、阵容消息和赛前观点阅读重点比赛。",
    primaryLink: { label: "世界杯赛程", href: "/world-cup-2026/schedule" },
    faq: [
      {
        question: "2026世界杯观赛前重点是什么？",
        answer: "先确认北京时间、对阵双方、赛事阶段和举办城市，再看球队状态与赛前观点。"
      },
      {
        question: "2026世界杯门票从哪里确认？",
        answer: "门票信息以 FIFA 官方渠道和赛事官方信息为准，绿茵智报整理官方入口与赛程提醒。"
      },
      {
        question: "中文球迷如何跟进世界杯赛程？",
        answer: "可按北京时间、球队、城市、小组赛和淘汰赛路径跟进重点比赛。"
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
    description: "查看足球赛后复盘记录，包括原参考方向、比赛结果、命中分类和偏差归因。",
    intro: "赛后复盘回看赛前判断与实际走势的差异，按预测命中、半命中和未命中归类，并说明主要原因。",
    primaryLink: { label: "查看复盘记录", href: "/reviews" },
    faq: [
      {
        question: "足球赛后复盘记录什么？",
        answer: "记录原参考方向、比赛结果、命中分类和主要偏差。"
      },
      {
        question: "为什么复盘不是比赛结束后立刻出现？",
        answer: "复盘需要核对赛果、实际走势和主要变量，完成后进入复盘记录。"
      },
      {
        question: "复盘结论怎么理解？",
        answer: "复盘结论用于回看赛前参考方向与实际比赛走势的贴合程度，不代表未来结果。"
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

export function getSeoTopicEnhancement(topic: SeoTopic): SeoTopicEnhancement {
  const topicPath = `/topics/${topic.slug}`;
  const topicClusterId = getTopicClusterId(topic.slug);
  const cluster = seoKeywordClusters.find((item) => item.id === topicClusterId) ?? seoKeywordClusters.find((item) => item.routes.includes(topicPath)) ?? seoKeywordClusters[0];
  const faqTerms = topic.faq.map((item) => item.question.replace(/[？?]/g, ""));
  const longTailTerms = uniqueTerms([topic.title, ...cluster.terms, ...faqTerms]).slice(0, 8);

  return {
    clusterName: cluster.name,
    intent: cluster.intent,
    longTailTerms,
    sections: getTopicSections(topic, cluster),
    relatedLinks: getTopicRelatedLinks(topic, cluster)
  };
}

function getTopicClusterId(slug: SeoTopicSlug) {
  if (
    slug === "world-cup-2026-match-time" ||
    slug === "world-cup-2026-china-time" ||
    slug === "world-cup-2026-opening-time" ||
    slug === "world-cup-2026-final-time" ||
    slug === "world-cup-2026-start-date" ||
    slug === "world-cup-2026-time-difference" ||
    slug === "world-cup-2026-countdown" ||
    slug === "world-cup-opening-final"
  ) {
    return "world-cup-time";
  }

  if (
    slug === "world-cup-2026-host-cities" ||
    slug === "world-cup-2026-stadiums" ||
    slug === "world-cup-2026-where" ||
    slug === "north-america-world-cup"
  ) {
    return "world-cup-place";
  }

  if (
    slug === "world-cup-2026-groups" ||
    slug === "world-cup-2026-group-stage" ||
    slug === "world-cup-2026-knockout" ||
    slug === "world-cup-2026-draw" ||
    slug === "world-cup-2026-format" ||
    slug === "world-cup-2026-48-teams" ||
    slug === "world-cup-2026-round-of-32"
  ) {
    return "world-cup-format";
  }

  if (
    slug === "world-cup-2026-teams" ||
    slug === "world-cup-2026-qualified-teams" ||
    slug === "world-cup-2026-asian-teams" ||
    slug === "world-cup-team-lineups"
  ) {
    return "world-cup-team";
  }

  if (slug === "world-cup-2026-tickets" || slug === "world-cup-2026-watch-guide") {
    return "world-cup-ticket";
  }

  if (slug === "today-football-schedule" || slug === "football-match-analysis" || slug === "football-review" || slug === "football-score-result") {
    return "football-analysis";
  }

  return "world-cup-core";
}

function getTopicSections(topic: SeoTopic, cluster: SeoKeywordCluster) {
  if (cluster.id === "world-cup-time") {
    return [
      { heading: "北京时间核对", body: "先确认比赛日和开球时间，再区分小组赛、淘汰赛、揭幕战、决赛等节点，适合中文球迷赛前快速核对。" },
      { heading: "时差与观看安排", body: "美加墨赛区与中国存在时差，部分比赛会落在凌晨或上午，赛前应同时查看北京时间和赛事阶段。" },
      { heading: "赛前阅读顺序", body: "从时间、对阵、球队状态到赛前观点逐层阅读，能更快判断一场比赛的核心变量。" }
    ];
  }

  if (cluster.id === "world-cup-place") {
    return [
      { heading: "举办地线索", body: "美加墨三国承接不同阶段比赛，城市、球场和开球时间会影响观赛安排与赛前关注点。" },
      { heading: "城市长尾入口", body: "纽约/新泽西、洛杉矶、达拉斯、多伦多、温哥华、墨西哥城等城市适合单独承接赛程和门票搜索。" },
      { heading: "比赛信息串联", body: "城市内容需要连接到具体比赛、球队赛程和门票提醒，形成从举办地到单场比赛的阅读路径。" }
    ];
  }

  if (cluster.id === "world-cup-format") {
    return [
      { heading: "赛制理解", body: "48队、12个小组、32强淘汰赛是2026世界杯的核心结构，分组和赛程需要一起查看。" },
      { heading: "小组赛路径", body: "按A组到L组整理同组对手、比赛时间和出线位置，能帮助赛前判断比赛重要性。" },
      { heading: "淘汰赛承接", body: "32强赛、16强赛、四分之一决赛、半决赛和决赛需要与完整赛程互链，方便持续追踪。" }
    ];
  }

  if (cluster.id === "world-cup-team") {
    return [
      { heading: "球队赛程入口", body: "球队词适合承接阿根廷、巴西、法国、英格兰、葡萄牙等热门搜索，并连接到具体比赛。" },
      { heading: "阵容与球员看点", body: "重点球员、阵容位置和首发变化会影响赛前判断，适合与比赛详情和赛前观点一起呈现。" },
      { heading: "赛后沉淀", body: "比赛结束后保留赛果和复盘入口，让球队赛程不只服务赛前，也能承接赛后回看。" }
    ];
  }

  if (cluster.id === "football-analysis") {
    return [
      { heading: "赛前分析结构", body: "赛前内容应同时覆盖比赛信息、球队状态、赛程强度、数据变化和参考方向。" },
      { heading: "赛程到观点", body: "从今日赛程进入赛前观点，再进入单场分析详情，能让搜索和阅读路径更连贯。" },
      { heading: "复盘闭环", body: "赛后复盘记录原参考方向、实际赛果和偏差说明，有助于建立长期内容信任。" }
    ];
  }

  if (cluster.id === "world-cup-ticket") {
    return [
      { heading: "官方信息优先", body: "门票内容以FIFA官方发布为准，适合同时连接举办城市、比赛时间和观赛提醒。" },
      { heading: "购票前核对", body: "核对比赛、城市、球场、官方票务链接和入场要求，比单独查看票务信息更稳妥。" },
      { heading: "观赛搜索承接", body: "门票、城市、揭幕战、决赛和球队赛程应互相连接，覆盖赛前计划型搜索。" }
    ];
  }

  return [
    { heading: `${topic.title}核心信息`, body: topic.intro },
    { heading: "长尾内容承接", body: `围绕${cluster.terms.slice(0, 3).join("、")}等词，把赛程、球队、比赛详情和赛前观点串联起来。` },
    { heading: "持续更新方向", body: "随着赛程、阵容、赛果和复盘变化，内容应持续补充最新比赛线索和相关入口。" }
  ];
}

function getTopicRelatedLinks(topic: SeoTopic, cluster: SeoKeywordCluster) {
  const links = [
    topic.primaryLink,
    ...cluster.routes.map((route) => ({
      label: route.startsWith("/topics/") ? getSeoTopic(route.replace("/topics/", ""))?.title ?? cluster.name : getRouteLabel(route),
      href: route
    }))
  ];

  return links.filter((link) => link.href !== `/topics/${topic.slug}`).filter((link, index, items) => items.findIndex((item) => item.href === link.href) === index).slice(0, 6);
}

function getRouteLabel(route: string) {
  const labels: Record<string, string> = {
    "/": "绿茵智报首页",
    "/today": "今日赛前观点",
    "/predictions": "足球赛前分析",
    "/reviews": "足球赛后复盘",
    "/football-ai-intelligence": "足球AI情报",
    "/world-cup-2026": "世界杯2026专题",
    "/world-cup-2026/schedule": "世界杯完整赛程",
    "/world-cup-2026/china-time": "世界杯北京时间",
    "/world-cup-2026/groups": "世界杯分组",
    "/world-cup-2026/knockout": "世界杯淘汰赛",
    "/world-cup-2026/teams": "世界杯球队赛程",
    "/world-cup-2026/players": "世界杯重点球员",
    "/world-cup-2026/host-countries": "美加墨举办国家",
    "/world-cup-2026/host-cities": "世界杯举办城市",
    "/world-cup-2026/tickets": "世界杯门票信息"
  };
  return labels[route] ?? route;
}

function uniqueTerms(terms: string[]) {
  return Array.from(new Set(terms.filter(Boolean)));
}
