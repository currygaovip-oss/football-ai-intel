import { getAllPredictions, getSchedule, type Match, type Prediction } from "@/lib/data";

export type { Match, Prediction };

export const worldCupBasePath = "/world-cup-2026";

export type HostCountry = {
  slug: string;
  name: string;
  title: string;
  description: string;
  cities: string[];
};

export type HostCity = {
  slug: string;
  name: string;
  country: "美国" | "加拿大" | "墨西哥";
  stadium: string;
  summary: string;
  highlight?: string;
};

export type WorldCupTeamEntry = {
  slug: string;
  name: string;
  region: string;
  summary: string;
  profile?: string;
  style?: string;
  history?: string;
  squadStatus?: string;
  players?: WorldCupPlayerFocus[];
  searchFocus: string[];
  aliases?: string[];
};

export type WorldCupPlayerFocus = {
  slug: string;
  name: string;
  position: string;
  note: string;
  photoUrl?: string;
  photoPosition?: string;
  photoCredit?: string;
  photoSourceUrl?: string;
};

export type WorldCupPlayerEntry = WorldCupPlayerFocus & {
  teamSlug: string;
  teamName: string;
  teamRegion: string;
  teamSummary: string;
  teamPath: string;
  squadPath: string;
};

export const hostCountries: HostCountry[] = [
  {
    slug: "usa",
    name: "美国",
    title: "美国世界杯赛程与举办城市",
    description: "美国是2026美加墨世界杯主要举办地之一，承接多座城市的比赛，并举办本届世界杯决赛。",
    cities: ["亚特兰大", "波士顿", "达拉斯", "休斯敦", "堪萨斯城", "洛杉矶", "迈阿密", "纽约/新泽西", "费城", "旧金山湾区", "西雅图"]
  },
  {
    slug: "canada",
    name: "加拿大",
    title: "加拿大世界杯赛程与举办城市",
    description: "加拿大承接2026世界杯部分小组赛和淘汰赛，中文球迷可重点关注多伦多和温哥华赛程。",
    cities: ["多伦多", "温哥华"]
  },
  {
    slug: "mexico",
    name: "墨西哥",
    title: "墨西哥世界杯赛程与举办城市",
    description: "墨西哥是2026世界杯联合举办国之一，墨西哥城将承接揭幕战，瓜达拉哈拉和蒙特雷也会承接比赛。",
    cities: ["墨西哥城", "瓜达拉哈拉", "蒙特雷"]
  }
];

export const hostCities: HostCity[] = [
  { slug: "atlanta", name: "亚特兰大", country: "美国", stadium: "Mercedes-Benz Stadium", summary: "美国东南部重点赛区，美国主场氛围和小组赛焦点战热度较高。" },
  { slug: "boston", name: "波士顿", country: "美国", stadium: "Gillette Stadium", summary: "美国东北部赛区，承接多场世界杯比赛。" },
  { slug: "dallas", name: "达拉斯", country: "美国", stadium: "AT&T Stadium", summary: "本届世界杯重要赛区之一，球场容量大，淘汰赛阶段关注度较高。" },
  { slug: "guadalajara", name: "瓜达拉哈拉", country: "墨西哥", stadium: "Estadio Akron", summary: "墨西哥赛区城市之一，承接小组赛阶段比赛。" },
  { slug: "houston", name: "休斯敦", country: "美国", stadium: "NRG Stadium", summary: "美国南部重点城市，承接世界杯比赛日安排。" },
  { slug: "kansas-city", name: "堪萨斯城", country: "美国", stadium: "Arrowhead Stadium", summary: "美国中部赛区，承接世界杯比赛。" },
  { slug: "los-angeles", name: "洛杉矶", country: "美国", stadium: "SoFi Stadium", summary: "美国西海岸重点赛区，北美黄金时段比赛关注度较高。", highlight: "美国西海岸焦点城市" },
  { slug: "mexico-city", name: "墨西哥城", country: "墨西哥", stadium: "Estadio Azteca", summary: "2026世界杯揭幕战举办城市，也是本届赛事最受关注的举办地之一。", highlight: "揭幕战城市" },
  { slug: "miami", name: "迈阿密", country: "美国", stadium: "Hard Rock Stadium", summary: "美国南部热门城市，承接世界杯焦点比赛。" },
  { slug: "monterrey", name: "蒙特雷", country: "墨西哥", stadium: "Estadio BBVA", summary: "墨西哥北部赛区，承接世界杯比赛。" },
  { slug: "new-york-new-jersey", name: "纽约/新泽西", country: "美国", stadium: "MetLife Stadium", summary: "2026世界杯决赛举办地，是本届赛事最受关注的城市之一。", highlight: "决赛城市" },
  { slug: "philadelphia", name: "费城", country: "美国", stadium: "Lincoln Financial Field", summary: "美国东部历史城市，承接世界杯比赛。" },
  { slug: "san-francisco-bay-area", name: "旧金山湾区", country: "美国", stadium: "Levi's Stadium", summary: "美国西海岸赛区，承接世界杯比赛。" },
  { slug: "seattle", name: "西雅图", country: "美国", stadium: "Lumen Field", summary: "美国西北部赛区，承接世界杯比赛。" },
  { slug: "toronto", name: "多伦多", country: "加拿大", stadium: "BMO Field", summary: "加拿大赛区城市之一，承接世界杯小组赛阶段比赛。" },
  { slug: "vancouver", name: "温哥华", country: "加拿大", stadium: "BC Place", summary: "加拿大西海岸赛区，承接世界杯比赛。" }
];

export const featuredWorldCupTeams: WorldCupTeamEntry[] = [
  {
    slug: "argentina",
    name: "阿根廷",
    region: "南美",
    summary: "阿根廷是本届世界杯中文球迷关注度最高的球队之一，赛前重点看小组赛路径、核心球员状态和淘汰赛位置。",
    profile: "阿根廷的比赛热度长期较高，赛前判断需要结合核心球员状态、前场效率和小组赛出线形势。",
    style: "球队通常以技术能力、前场创造力和关键球员个人能力见长，赛前重点看阵容轮换与前场效率。",
    history: "阿根廷是世界杯传统强队，曾多次进入世界杯决赛阶段，也是中文球迷长期关注的热门球队。",
    squadStatus: "最终名单以阿根廷队官方公布为准。赛前重点看核心球员状态、首发结构和前场分工。",
    players: [
      {
        slug: "lionel-messi",
        name: "梅西",
        position: "前场",
        note: "阿根廷关注度最高的名字，重点看出场时间、活动区域和前场分工。",
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Lionel-Messi-Argentina-2022-FIFA-World-Cup.jpg",
        photoPosition: "center 18%",
        photoCredit: "Hossein Zohrevand / Wikimedia Commons",
        photoSourceUrl: "https://commons.wikimedia.org/wiki/File:Lionel-Messi-Argentina-2022-FIFA-World-Cup.jpg"
      },
      { slug: "julian-alvarez", name: "阿尔瓦雷斯", position: "前锋", note: "前场机动性强，首发位置和进攻分工是重点。" },
      { slug: "lautaro-martinez", name: "劳塔罗", position: "前锋", note: "禁区终结效率和比赛参与度是阿根廷锋线看点。" },
      { slug: "emiliano-martinez", name: "马丁内斯", position: "门将", note: "大赛经验和关键扑救能力让他长期处于高关注位置。" }
    ],
    searchFocus: ["阿根廷世界杯赛程", "阿根廷比赛时间", "阿根廷赛前分析"]
  },
  {
    slug: "brazil",
    name: "巴西",
    region: "南美",
    summary: "巴西队关注点集中在前场组合、边路冲击和淘汰赛前景，赛前阅读重点看首发结构与比赛节奏。",
    profile: "巴西的比赛通常自带进攻期待，赛前判断需要同时观察阵容完整度、边路效率和防守保护。",
    style: "边路推进、个人能力和转换效率决定巴西的比赛上限，伤停与首发结构是赛前重点。",
    history: "巴西是世界杯历史上最具代表性的球队之一，每届大赛都会吸引大量中文球迷关注。",
    squadStatus: "最终名单以巴西队官方公布为准。赛前重点看边路人选、前场组合和中场保护。",
    players: [
      {
        slug: "vinicius-junior",
        name: "维尼修斯",
        position: "前锋",
        note: "边路突破和反击威胁突出，是巴西前场最重要的变量之一。",
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/Vinicius_Junior_2018_1_%28cropped%29.jpg",
        photoPosition: "center 18%",
        photoCredit: "Wikimedia Commons",
        photoSourceUrl: "https://commons.wikimedia.org/wiki/File:Vinicius_Junior_2018_1_(cropped).jpg"
      },
      { slug: "rodrygo", name: "罗德里戈", position: "前锋", note: "可胜任多个前场位置，赛前重点关注首发角色和进攻分工。" },
      { slug: "endrick", name: "恩德里克", position: "前锋", note: "年轻前锋热度高，大赛角色和出场时间是重点。" },
      { slug: "bruno-guimaraes", name: "布鲁诺·吉马良斯", position: "中场", note: "中场组织与对抗能力影响巴西队攻守平衡。" }
    ],
    searchFocus: ["巴西世界杯赛程", "巴西比赛时间", "巴西赛前分析"]
  },
  {
    slug: "france",
    name: "法国",
    region: "欧洲",
    summary: "法国队阵容深度突出，赛前重点看核心球员状态、中后场组合和淘汰赛路径。",
    profile: "法国的优势来自速度、对抗和阵容厚度，赛前判断更依赖首发结构、伤停变化和前场效率。",
    style: "速度、身体对抗和前场冲击是法国的主要优势，关键在于中后场组合与进攻效率。",
    history: "法国队近几届世界杯表现稳定，是中文球迷持续关注的欧洲热门球队。",
    squadStatus: "最终名单以法国队官方公布为准。赛前重点看中后场组合、前场速度和核心球员出场状态。",
    players: [
      {
        slug: "kylian-mbappe",
        name: "姆巴佩",
        position: "前锋",
        note: "法国前场核心，速度、终结和出场状态会直接改变比赛走势。",
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Kylian_Mbappe_2017.jpg/960px-Kylian_Mbappe_2017.jpg",
        photoPosition: "center 18%",
        photoCredit: "Biser Todorov / Wikimedia Commons",
        photoSourceUrl: "https://commons.wikimedia.org/wiki/File:Kylian_Mbappe_2017.jpg"
      },
      { slug: "antoine-griezmann", name: "格列兹曼", position: "前场", note: "组织串联和关键比赛经验突出，角色变化是重点。" },
      { slug: "aurelien-tchouameni", name: "楚阿梅尼", position: "中场", note: "中场覆盖和防守保护能力影响法国队结构稳定性。" },
      { slug: "william-saliba", name: "萨利巴", position: "后卫", note: "防线稳定性和对抗能力是法国队赛前分析的重要部分。" }
    ],
    searchFocus: ["法国世界杯赛程", "法国比赛时间", "法国赛前分析"]
  },
  {
    slug: "england",
    name: "英格兰",
    region: "欧洲",
    summary: "英格兰长期保持较高关注度，赛前重点看前场组合、中场控制和关键球员状态。",
    profile: "英格兰阵容厚度较高，但大赛表现常受首发取舍和比赛节奏影响，赛前需要重点观察中前场组合。",
    style: "球队阵容厚度较高，赛前重点看前场组合、中场控制和关键球员出场安排。",
    history: "英格兰队是世界杯传统热门球队，赛前话题和媒体关注度一直较高。",
    squadStatus: "最终名单以英格兰队官方公布为准。赛前重点看中前场组合、首发取舍和边路输出。",
    players: [
      { slug: "harry-kane", name: "凯恩", position: "前锋", note: "英格兰队前场核心之一，终结能力和回撤串联是赛前重点。" },
      {
        slug: "jude-bellingham",
        name: "贝林厄姆",
        position: "中场",
        note: "攻守覆盖和关键球能力突出，是英格兰中前场的核心看点。",
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/82/2022_FIFA_World_Cup_-_Bellingham_%28cropped%29.jpg",
        photoPosition: "center 18%",
        photoCredit: "Wikimedia Commons",
        photoSourceUrl: "https://commons.wikimedia.org/wiki/File:2022_FIFA_World_Cup_-_Bellingham_(cropped).jpg"
      },
      { slug: "phil-foden", name: "福登", position: "前场", note: "前场创造力和位置变化会影响球队进攻方式。" },
      { slug: "bukayo-saka", name: "萨卡", position: "边锋", note: "边路推进和持续输出能力是英格兰重要进攻来源。" }
    ],
    searchFocus: ["英格兰世界杯赛程", "英格兰比赛时间", "英格兰赛前分析"]
  },
  {
    slug: "portugal",
    name: "葡萄牙",
    region: "欧洲",
    summary: "葡萄牙拥有高关注球星和较强阵容深度，赛前重点看前场效率、中场创造力和核心球员角色。",
    profile: "葡萄牙的比赛关注度来自球星、阵容深度和进攻选择，赛前判断需要结合首发结构与比赛阶段。",
    style: "葡萄牙的赛前重点是前场效率、中场创造力、边路推进和首发结构。",
    history: "葡萄牙在近年国际大赛中长期保持较高关注度，也是世界杯搜索热门球队之一。",
    squadStatus: "最终名单以葡萄牙队官方公布为准。赛前重点看前场效率、中场创造力和核心球员角色。",
    players: [
      {
        slug: "cristiano-ronaldo",
        name: "C罗",
        position: "前锋",
        note: "葡萄牙关注度最高的名字，出场角色、身体状态和终结效率都是看点。",
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cristiano_Ronaldo.jpg/960px-Cristiano_Ronaldo.jpg",
        photoPosition: "center 16%",
        photoCredit: "Wikimedia Commons",
        photoSourceUrl: "https://commons.wikimedia.org/wiki/File:Cristiano_Ronaldo.jpg"
      },
      { slug: "bruno-fernandes", name: "布鲁诺·费尔南德斯", position: "中场", note: "传球创造力和定位球能力影响葡萄牙进攻质量。" },
      { slug: "bernardo-silva", name: "贝尔纳多·席尔瓦", position: "中场", note: "控球、推进和前场连接能力突出，比赛角色是重点。" },
      { slug: "rafael-leao", name: "莱奥", position: "边锋", note: "边路冲击和个人突破能力是葡萄牙前场变化来源。" }
    ],
    searchFocus: ["葡萄牙世界杯赛程", "葡萄牙比赛时间", "葡萄牙赛前分析"]
  },
  {
    slug: "germany",
    name: "德国",
    region: "欧洲",
    summary: "德国是世界杯传统热门球队，赛前重点看中场控制、阵容更新和后防稳定性。",
    profile: "德国的比赛判断离不开中场压迫、年轻球员角色和防线稳定性，淘汰赛路径同样值得关注。",
    style: "德国的赛前重点是中场控制、压迫效率、后防稳定性和前场终结。",
    history: "德国队拥有深厚世界杯历史，赛程、阵容和核心球员长期受到中文球迷关注。",
    squadStatus: "最终名单以德国队官方公布为准。赛前重点看中场控制、压迫强度和防线稳定性。",
    players: [
      { slug: "jamal-musiala", name: "穆西亚拉", position: "前场", note: "盘带和前场创造力突出，是德国队高关注球员之一。" },
      { slug: "florian-wirtz", name: "维尔茨", position: "前场", note: "组织创造和进攻连接能力是德国队阵容重点。" },
      { slug: "kai-havertz", name: "哈弗茨", position: "前场", note: "前场多位置能力和战术角色是重点。" },
      { slug: "joshua-kimmich", name: "基米希", position: "中场", note: "比赛阅读和攻守转换能力是德国队结构的重要部分。" }
    ],
    searchFocus: ["德国世界杯赛程", "德国比赛时间", "德国赛前分析"]
  },
  {
    slug: "spain",
    name: "西班牙",
    region: "欧洲",
    summary: "西班牙世界杯赛程、控球节奏、阵容结构和淘汰赛路径。",
    profile: "西班牙的控球体系、年轻球员和大赛赛程长期受到关注。",
    style: "球队通常强调控球、传导和中前场技术能力，赛前重点关注节奏控制和边路突破。",
    history: "西班牙是欧洲传统热门球队，世界杯赛程和阵容一直是赛前阅读重点。",
    squadStatus: "最终名单以西班牙队官方公布为准。赛前重点看控球节奏、边路突破和中场组合。",
    players: [
      {
        slug: "lamine-yamal",
        name: "亚马尔",
        position: "边锋",
        note: "年轻球员热度高，边路创造力和出场角色是西班牙的重要看点。",
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Lamine_Yamal%2C_S%C3%A1nchez_se_reuni%C3%B3_con_los_futbolistas_de_la_selecci%C3%B3n_espa%C3%B1ola_tras_ganar_la_Eurocopa_2024_%283%29_%28cropped%29_%28cropped%29.jpg",
        photoPosition: "center 18%",
        photoCredit: "La Moncloa / Wikimedia Commons",
        photoSourceUrl: "https://commons.wikimedia.org/wiki/File:Lamine_Yamal,_S%C3%A1nchez_se_reuni%C3%B3_con_los_futbolistas_de_la_selecci%C3%B3n_espa%C3%B1ola_tras_ganar_la_Eurocopa_2024_(3)_(cropped)_(cropped).jpg"
      },
      { slug: "pedri", name: "佩德里", position: "中场", note: "中场连接和控球能力是西班牙节奏的重要部分。" },
      { slug: "gavi", name: "加维", position: "中场", note: "对抗、跑动和中场压迫能力影响西班牙比赛节奏。" },
      { slug: "rodri", name: "罗德里", position: "中场", note: "中场稳定性和攻守平衡是西班牙赛前分析重点。" }
    ],
    searchFocus: ["西班牙世界杯赛程", "西班牙比赛时间", "西班牙赛前分析"]
  },
  {
    slug: "usa",
    name: "美国",
    region: "北美",
    summary: "美国是2026世界杯东道主之一，美国队赛程、主场比赛和举办城市信息会持续受到关注。",
    profile: "美国队是2026世界杯东道主之一，主场赛程、举办城市和球队阵容都是赛前重点。",
    style: "美国的赛前重点是主场环境、年轻球员冲击力、边路推进和比赛节奏。",
    history: "美国队在本届世界杯拥有东道主身份，相关赛程和城市信息会持续升温。",
    squadStatus: "最终名单以美国队官方公布为准。赛前重点看主场环境、边路推进和年轻球员冲击力。",
    players: [
      { slug: "christian-pulisic", name: "普利西奇", position: "前场", note: "美国队最受关注的球员之一，前场创造力和状态是赛前重点。" },
      { slug: "gio-reyna", name: "雷纳", position: "中场", note: "技术能力和进攻组织角色是重点。" },
      { slug: "tyler-adams", name: "泰勒·亚当斯", position: "中场", note: "中场覆盖和防守保护能力影响球队稳定性。" },
      { slug: "folarin-balogun", name: "巴洛贡", position: "前锋", note: "锋线终结和出场角色影响美国队进攻质量。" }
    ],
    searchFocus: ["美国世界杯赛程", "美国队比赛时间", "美国世界杯主场"]
  },
  {
    slug: "mexico",
    name: "墨西哥",
    region: "北美",
    summary: "墨西哥世界杯赛程、揭幕战、墨西哥城赛区和重点比赛赛前分析。",
    profile: "墨西哥队是东道主之一，球队赛程、揭幕战、墨西哥城赛区和阵容动态都是赛前重点。",
    style: "球队关注点包括主场氛围、对抗强度、边路进攻和关键比赛经验。",
    history: "墨西哥是世界杯常客，也是2026世界杯联合举办国之一。",
    squadStatus: "最终名单以墨西哥队官方公布为准。赛前重点看主场氛围、边路进攻和中场对抗。",
    players: [
      { slug: "santiago-gimenez", name: "圣地亚哥·希门尼斯", position: "前锋", note: "锋线关注度较高，终结效率和首发角色值得重点看。" },
      { slug: "edson-alvarez", name: "埃德森·阿尔瓦雷斯", position: "中场", note: "中场防守和对抗能力是墨西哥队结构重点。" },
      { slug: "hirving-lozano", name: "洛萨诺", position: "边锋", note: "边路速度和反击威胁是赛前分析关注点。" },
      { slug: "luis-chavez", name: "路易斯·查韦斯", position: "中场", note: "中场推进和定位球能力影响墨西哥进攻节奏。" }
    ],
    searchFocus: ["墨西哥世界杯赛程", "墨西哥队比赛时间", "世界杯揭幕战"]
  },
  {
    slug: "canada",
    name: "加拿大",
    region: "北美",
    summary: "加拿大以东道主身份参赛，赛前重点看主场比赛节奏、边路速度和核心球员状态。",
    profile: "加拿大的关注点集中在多伦多、温哥华赛区安排，以及球队能否把主场氛围转化为比赛强度。",
    style: "加拿大的赛前重点是边路速度、前场冲击和主场比赛节奏。",
    history: "加拿大队在2026世界杯拥有东道主身份，赛程和举办城市会持续升温。",
    squadStatus: "最终名单以加拿大队官方公布为准。赛前重点看边路速度、前场冲击和主场比赛节奏。",
    players: [
      { slug: "alphonso-davies", name: "阿方索·戴维斯", position: "边路", note: "加拿大队关注度最高的球员之一，速度和边路推进是重要看点。" },
      { slug: "jonathan-david", name: "乔纳森·戴维", position: "前锋", note: "锋线终结和跑位能力影响加拿大队进攻质量。" },
      { slug: "tajon-buchanan", name: "布坎南", position: "边路", note: "边路冲击和转换速度是重点。" },
      { slug: "stephen-eustaquio", name: "欧斯塔基奥", position: "中场", note: "中场组织与节奏控制影响加拿大队比赛稳定性。" }
    ],
    searchFocus: ["加拿大世界杯赛程", "加拿大队比赛时间", "加拿大世界杯城市"]
  },
  {
    slug: "japan",
    name: "日本",
    region: "亚洲",
    summary: "日本队整体性强，赛前重点看旅欧球员状态、首发结构和体能节奏。",
    profile: "日本的比赛关注点在整体压迫、快速传导和边路配合，首发结构与体能节奏会影响比赛走势。",
    style: "日本通常重视整体压迫、快速传导和边路配合，首发结构与体能节奏是赛前重点。",
    history: "日本队近几届世界杯保持稳定竞争力，赛程和核心球员长期受到中文球迷关注。",
    squadStatus: "最终名单以日本队官方公布为准。赛前重点看首发结构、体能节奏和边路配合。",
    players: [
      { slug: "takefusa-kubo", name: "久保建英", position: "前场", note: "前场创造力和边路持球能力是日本队关注焦点。" },
      { slug: "kaoru-mitoma", name: "三笘薰", position: "边锋", note: "边路突破能力突出，出场状态和进攻角色是重点。" },
      { slug: "wataru-endo", name: "远藤航", position: "中场", note: "中场防守和对抗能力影响日本队比赛稳定性。" },
      { slug: "daichi-kamada", name: "镰田大地", position: "中场", note: "前场连接和进攻参与度是日本队重要看点。" }
    ],
    searchFocus: ["日本世界杯赛程", "日本队比赛时间", "日本赛前分析"]
  },
  {
    slug: "korea",
    name: "韩国",
    region: "亚洲",
    summary: "韩国队关注度稳定，赛前重点看孙兴慜状态、反击效率和防线稳定性。",
    profile: "韩国的比赛重点在前场速度、反击质量和中后场稳定性，核心球员状态会直接影响赛前判断。",
    style: "韩国的赛前重点是前场速度、反击效率、中后场稳定性和核心球员状态。",
    history: "韩国队长期参加世界杯正赛，赛程和核心球员长期受到中文球迷关注。",
    squadStatus: "最终名单以韩国队官方公布为准。赛前重点看反击效率、防线稳定性和核心球员状态。",
    players: [
      {
        slug: "son-heung-min",
        name: "孙兴慜",
        position: "前锋",
        note: "韩国前场核心，状态、出场角色和反击威胁会直接影响比赛判断。",
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Son_Heung-min_-_2022_%2852552243725%29_%28cropped%29.jpg",
        photoPosition: "center 16%",
        photoCredit: "Wikimedia Commons",
        photoSourceUrl: "https://commons.wikimedia.org/wiki/File:Son_Heung-min_-_2022_(52552243725)_(cropped).jpg"
      },
      { slug: "kim-min-jae", name: "金玟哉", position: "后卫", note: "防线核心，防守稳定性和对抗能力影响韩国队防守质量。" },
      { slug: "lee-kang-in", name: "李刚仁", position: "前场", note: "前场创造力和定位球能力是韩国队进攻看点。" },
      { slug: "hwang-hee-chan", name: "黄喜灿", position: "前锋", note: "冲击力和反击能力是韩国队进攻变化来源。" }
    ],
    searchFocus: ["韩国世界杯赛程", "韩国队比赛时间", "韩国赛前分析"],
    aliases: ["韩国"]
  }
];

const placeholderTeamPattern = /组第|场胜者|场负者/;

export function getWorldCupMatches() {
  return getSchedule().filter(isWorldCupMatch);
}

export function getWorldCupGroupMatches() {
  return getWorldCupMatches().filter((match) => isGroupStage(match));
}

export function getWorldCupKnockoutMatches() {
  return getWorldCupMatches().filter((match) => !isGroupStage(match));
}

export function getWorldCupMatch(id: string) {
  return getWorldCupMatches().find((match) => match.id === id);
}

export function getWorldCupPrediction(match: Match, predictions = getAllPredictions()) {
  const matchup = `${match.home_team} vs ${match.away_team}`;
  return predictions.find((prediction) => {
    if (prediction.match_id && prediction.match_id === match.id) return true;
    return prediction.matchup === matchup || prediction.matchup.includes(match.home_team) && prediction.matchup.includes(match.away_team);
  });
}

export function getWorldCupGroups(matches = getWorldCupGroupMatches()) {
  const groups = new Map<string, Match[]>();
  matches.forEach((match) => {
    const group = getGroupName(match);
    groups.set(group, [...(groups.get(group) ?? []), match]);
  });
  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b, "zh-CN"));
}

export function getWorldCupDateGroups(matches = getWorldCupMatches()) {
  const groups = new Map<string, Match[]>();
  matches.forEach((match) => {
    const date = getMatchDateLabel(match);
    groups.set(date, [...(groups.get(date) ?? []), match]);
  });
  return Array.from(groups.entries());
}

export function getWorldCupStageGroups(matches = getWorldCupMatches()) {
  const groups = new Map<string, Match[]>();
  matches.forEach((match) => {
    const stage = getStageLabel(match);
    groups.set(stage, [...(groups.get(stage) ?? []), match]);
  });
  return Array.from(groups.entries());
}

export function getNamedWorldCupTeams(matches = getWorldCupMatches()) {
  const teams = new Set<string>();
  matches.forEach((match) => {
    [match.home_team, match.away_team].forEach((team) => {
      if (!placeholderTeamPattern.test(team)) teams.add(team);
    });
  });
  return Array.from(teams).sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export function getWorldCupTeamEntries() {
  const featuredNames = new Set(featuredWorldCupTeams.map((team) => team.name));
  const extraTeams = getNamedWorldCupTeams()
    .filter((team) => !featuredNames.has(team))
    .map<WorldCupTeamEntry>((team) => ({
      slug: encodeURIComponent(team),
      name: team,
      region: "世界杯参赛球队",
      summary: `${team}世界杯2026比赛时间、小组赛对手和赛前看点，重点关注阵容变化、比赛节奏和关键球员状态。`,
      searchFocus: [`${team}世界杯赛程`, `${team}比赛时间`, `${team}赛前分析`]
    }));

  return [...featuredWorldCupTeams, ...extraTeams];
}

export function getWorldCupPlayerEntries() {
  return featuredWorldCupTeams.flatMap<WorldCupPlayerEntry>((team) => (
    team.players ?? []
  ).map((player) => ({
    ...player,
    teamSlug: team.slug,
    teamName: team.name,
    teamRegion: team.region,
    teamSummary: team.summary,
    teamPath: getTeamPath(team.slug),
    squadPath: getTeamSquadPath(team.slug)
  })));
}

export function getWorldCupPlayerEntry(slug: string) {
  return getWorldCupPlayerEntries().find((player) => player.slug === slug);
}

export function getWorldCupTeamEntry(slugOrName: string) {
  const decoded = decodeURIComponent(slugOrName);
  return getWorldCupTeamEntries().find((team) => team.slug === slugOrName || team.name === decoded || team.aliases?.includes(decoded));
}

export function getTeamPath(team: string) {
  const entry = getWorldCupTeamEntry(team);
  return `${worldCupBasePath}/teams/${entry?.slug ?? encodeURIComponent(team)}`;
}

export function getTeamSquadPath(team: string) {
  const entry = getWorldCupTeamEntry(team);
  return `${getTeamPath(entry?.slug ?? team)}/squad`;
}

export function getPlayerPath(player: string) {
  return `${worldCupBasePath}/players/${player}`;
}

export function getTeamMatches(team: string) {
  const entry = getWorldCupTeamEntry(team);
  const names = new Set([entry?.name ?? decodeURIComponent(team), ...(entry?.aliases ?? [])]);
  return getWorldCupMatches().filter((match) => names.has(match.home_team) || names.has(match.away_team));
}

export function getHostCity(slug: string) {
  return hostCities.find((city) => city.slug === slug);
}

export function getHostCountry(slug: string) {
  return hostCountries.find((country) => country.slug === slug);
}

export function getHostCountryPath(slug: string) {
  return `${worldCupBasePath}/${slug}`;
}

export function getHostCityPath(slug: string) {
  return `${worldCupBasePath}/cities/${slug}`;
}

export function getOpeningMatch() {
  return getWorldCupMatches()[0];
}

export function getFinalMatch() {
  return getWorldCupMatches().find((match) => getStageLabel(match) === "决赛") ?? getWorldCupMatches().at(-1);
}

export function getWorldCupFixturePath(match: Match) {
  return `${worldCupBasePath}/fixtures/${match.id}`;
}

export function getMatchTitle(match: Match) {
  return `${match.home_team}vs${match.away_team}`;
}

export function getMatchDateLabel(match: Match) {
  const parsed = parseKickoffTime(match.kickoff_time);
  if (!parsed) return match.kickoff_time;
  return `${parsed.month}月${parsed.day}日`;
}

export function getMatchTimeLabel(match: Match) {
  const parsed = parseKickoffTime(match.kickoff_time);
  if (!parsed) return match.kickoff_time;
  return `${parsed.hour}:${parsed.minute}`;
}

export function getMatchDateTimeLabel(match: Match) {
  return `${getMatchDateLabel(match)} ${getMatchTimeLabel(match)} 北京时间`;
}

export function getEventStartDate(match: Match) {
  const parsed = parseKickoffTime(match.kickoff_time);
  if (!parsed) return match.kickoff_time;
  return `2026-${String(parsed.month).padStart(2, "0")}-${String(parsed.day).padStart(2, "0")}T${parsed.hour}:${parsed.minute}:00+08:00`;
}

export function getDirection(prediction?: Prediction) {
  return prediction?.recommendation.replace(/^模型倾向：/, "").replace(/^参考方向：/, "");
}

export function getStageLabel(match: Match) {
  return match.stage.replace(/^世界杯\s*/, "").trim();
}

export function getGroupName(match: Match) {
  const group = match.stage.match(/[A-L]组/);
  return group?.[0] ?? "小组赛";
}

export function isGroupStage(match: Match) {
  return match.stage.includes("小组赛");
}

function isWorldCupMatch(match: Match) {
  return match.competition.includes("世界杯") || match.stage.includes("小组赛") || match.stage.includes("决赛") || match.stage.includes("强赛");
}

function parseKickoffTime(kickoffTime: string) {
  const match = kickoffTime.match(/^(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})/);
  if (!match) return null;
  return {
    month: Number(match[1]),
    day: Number(match[2]),
    hour: match[3],
    minute: match[4]
  };
}
