import { getFinalMatch, getHostCity, getHostCityPath, getHostCountry, getOpeningMatch, hostCities, hostCountries, worldCupBasePath } from "@/lib/world-cup";

export const fifaTicketUrl = "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/tickets";
export const ticketBasePath = `${worldCupBasePath}/tickets`;

export type TicketTopic = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  points: string[];
  related: Array<{ label: string; href: string }>;
  faq: Array<{ question: string; answer: string }>;
};

export const ticketTopics: TicketTopic[] = [
  {
    slug: "official",
    title: "2026世界杯官方购票入口与门票信息",
    description: "整理2026世界杯官方门票入口、购票提醒、赛程确认和观赛前需要核对的信息。",
    heading: "2026世界杯官方购票入口",
    intro: "世界杯门票信息以 FIFA 官方发布为准。购票前建议先确认比赛时间、举办城市、球场和入场规则，再通过官方入口查看最新票务安排。",
    points: [
      "优先查看 FIFA 官方门票页面，确认销售阶段、账户要求和购票流程。",
      "同一城市可能承接多场比赛，购票前需要核对具体比赛、日期和球场。",
      "门票价格、可售状态和入场政策会随官方安排变化，购票前应再次确认。"
    ],
    related: [
      { label: "世界杯完整赛程", href: `${worldCupBasePath}/schedule` },
      { label: "美加墨举办城市", href: `${worldCupBasePath}/host-cities` },
      { label: "世界杯球队赛程", href: `${worldCupBasePath}/teams` }
    ],
    faq: [
      { question: "2026世界杯门票信息以哪里为准？", answer: "2026世界杯门票信息应以 FIFA 官方页面和官方后续公告为准。" },
      { question: "绿茵智报可以买世界杯门票吗？", answer: "绿茵智报只整理赛程、城市、观赛信息和赛前分析，不提供票务交易服务。" },
      { question: "购票前应该先看什么？", answer: "建议先确认比赛时间、举办城市、球场、参赛球队和官方入场要求。" }
    ]
  },
  {
    slug: "resale",
    title: "2026世界杯门票转让与二级市场提醒",
    description: "整理2026世界杯门票转让、二级市场和购票风险提醒，帮助中文用户赛前核对官方信息。",
    heading: "2026世界杯门票转让提醒",
    intro: "世界杯门票需求高，二级市场信息容易混杂。查看转让或转售相关信息时，应优先核对官方规则、平台资质和订单细节。",
    points: [
      "不要只看页面价格，应确认门票来源、座位信息、交付方式和退款规则。",
      "遇到明显异常的低价信息，需要额外谨慎核验。",
      "绿茵智报不提供门票交易，只做信息整理和观赛提醒。"
    ],
    related: [
      { label: "官方门票入口", href: `${ticketBasePath}/official` },
      { label: "世界杯决赛门票信息", href: `${ticketBasePath}/final` },
      { label: "世界杯举办城市", href: `${worldCupBasePath}/host-cities` }
    ],
    faq: [
      { question: "世界杯门票转让信息要注意什么？", answer: "重点核对官方规则、平台资质、座位信息、交付方式和退款条款。" },
      { question: "低价门票可信吗？", answer: "价格明显异常时应谨慎核验，避免只凭截图或口头承诺做决定。" },
      { question: "绿茵智报提供门票转让吗？", answer: "不提供。本站只整理公开信息、赛程入口和观赛提醒。" }
    ]
  },
  {
    slug: "opening-match",
    title: "2026世界杯揭幕战门票信息与观赛提醒",
    description: "查看2026世界杯揭幕战门票信息、墨西哥城赛区、比赛时间和官方购票提醒。",
    heading: "2026世界杯揭幕战门票信息",
    intro: "揭幕战将在墨西哥城举行，是本届世界杯关注度最高的比赛之一。购票前建议同时核对揭幕战时间、城市、球场和官方票务入口。",
    points: [
      "揭幕战城市为墨西哥城，球场为 Estadio Azteca。",
      "开赛阶段关注度高，门票信息应以 FIFA 官方更新为准。",
      "可先收藏赛程页，等参赛球队和官方票务细节更新后再核对。"
    ],
    related: [
      { label: "揭幕战详情", href: `${worldCupBasePath}/opening-match` },
      { label: "墨西哥城赛区", href: getHostCityPath("mexico-city") },
      { label: "官方门票入口", href: `${ticketBasePath}/official` }
    ],
    faq: [
      { question: "2026世界杯揭幕战在哪里？", answer: "2026世界杯揭幕战在墨西哥城赛区举行。" },
      { question: "揭幕战门票什么时候买？", answer: "门票销售阶段和购票安排以 FIFA 官方发布为准，建议持续关注官方入口。" },
      { question: "揭幕战页面能看什么？", answer: "可以查看比赛时间、举办城市、球场信息和后续赛前分析入口。" }
    ]
  },
  {
    slug: "final",
    title: "2026世界杯决赛门票信息与纽约新泽西观赛提醒",
    description: "查看2026世界杯决赛门票信息、纽约/新泽西赛区、比赛时间、球场和官方购票提醒。",
    heading: "2026世界杯决赛门票信息",
    intro: "决赛将在纽约/新泽西赛区举行，球场为 MetLife Stadium。决赛门票关注度高，购票前需要核对官方票务入口、比赛日期和入场要求。",
    points: [
      "决赛城市为纽约/新泽西赛区，球场为 MetLife Stadium。",
      "决赛门票需求通常较高，建议优先查看官方票务安排。",
      "赛程、交通、住宿和入场政策都可能影响观赛计划。"
    ],
    related: [
      { label: "决赛详情", href: `${worldCupBasePath}/final` },
      { label: "纽约/新泽西赛区", href: getHostCityPath("new-york-new-jersey") },
      { label: "官方门票入口", href: `${ticketBasePath}/official` }
    ],
    faq: [
      { question: "2026世界杯决赛在哪里？", answer: "2026世界杯决赛将在纽约/新泽西赛区举行。" },
      { question: "世界杯决赛门票信息在哪里确认？", answer: "建议以 FIFA 官方票务页面和后续官方公告为准。" },
      { question: "决赛页面能看什么？", answer: "可以查看决赛时间、举办城市、球场信息和淘汰赛入口。" }
    ]
  },
  ...hostCountries.map((country) => ({
    slug: country.slug,
    title: `${country.name}世界杯门票信息与观赛城市`,
    description: `查看${country.name}赛区2026世界杯门票信息、举办城市、球场和赛程入口。`,
    heading: `${country.name}世界杯门票信息`,
    intro: `${country.name}是2026世界杯举办国家之一。计划前往${country.name}观赛时，建议先确认城市、球场、比赛时间和官方门票入口。`,
    points: [
      `${country.name}赛区举办城市包括：${country.cities.join("、")}。`,
      "同一国家内不同城市的比赛时间、交通和入场安排可能不同。",
      "门票销售和入场规则应以 FIFA 官方信息为准。"
    ],
    related: [
      { label: `${country.name}举办城市`, href: `${worldCupBasePath}/${country.slug}` },
      { label: "世界杯完整赛程", href: `${worldCupBasePath}/schedule` },
      { label: "官方门票入口", href: `${ticketBasePath}/official` }
    ],
    faq: [
      { question: `${country.name}有哪些2026世界杯举办城市？`, answer: `${country.name}赛区举办城市包括：${country.cities.join("、")}。` },
      { question: `${country.name}世界杯门票信息在哪里看？`, answer: "建议以 FIFA 官方门票页面和赛事官方公告为准。" },
      { question: `去${country.name}看世界杯前要确认什么？`, answer: "建议确认比赛时间、城市、球场、门票状态、入场要求和交通安排。" }
    ]
  }))
];

export function getTicketTopic(slug: string) {
  return ticketTopics.find((topic) => topic.slug === slug);
}

export function getTicketTopicPath(slug: string) {
  return `${ticketBasePath}/${slug}`;
}

export function getCityTicketPath(slug: string) {
  return `${ticketBasePath}/cities/${slug}`;
}

export function getCityTicketTitle(slug: string) {
  const city = getHostCity(slug);
  return city ? `${city.name}世界杯门票信息与观赛提醒` : "2026世界杯城市门票信息";
}

export function getFeatureMatchTicketLinks() {
  const opening = getOpeningMatch();
  const final = getFinalMatch();
  return [
    opening ? { label: "揭幕战门票信息", href: `${ticketBasePath}/opening-match` } : null,
    final ? { label: "决赛门票信息", href: `${ticketBasePath}/final` } : null
  ].filter(Boolean) as Array<{ label: string; href: string }>;
}

export function getCountryTicketPath(slug: string) {
  return `${ticketBasePath}/${slug}`;
}

export function getCountryTicketTopic(slug: string) {
  const country = getHostCountry(slug);
  return country ? getTicketTopic(country.slug) : undefined;
}
