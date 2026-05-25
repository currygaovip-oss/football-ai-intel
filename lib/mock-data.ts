export type Match = {
  id: string;
  competition: string;
  kickoff_time: string;
  home_team: string;
  away_team: string;
  home_score?: number;
  away_score?: number;
  status: "scheduled" | "live" | "finished";
  stage: string;
};

export type Prediction = {
  id: string;
  match_id?: string;
  model_id: string;
  assistant_model_ids: string[];
  title: string;
  competition: string;
  kickoff_time_text: string;
  matchup: string;
  visibility: "free" | "vip";
  recommendation: string;
  risk_level: "低" | "中" | "高";
  body: string[];
  published_at: string;
};

export type AiModel = {
  id: string;
  code: string;
  name: string;
  role: string;
  description: string;
  specialties: string[];
  risk_style: "稳健" | "均衡" | "进取" | "复盘";
  recent_record: string;
  hit_rate: number;
  average_score: number;
  total_predictions: number;
  latest_count: number;
};

export type Review = {
  id: string;
  prediction_id: string;
  match_result: string;
  result_status: "hit" | "miss" | "half";
  score: number;
  body: string[];
  reviewed_at: string;
};

export type HotEvent = {
  id: string;
  title: string;
  competition: string;
  kickoff_time_text: string;
  matchup: string;
  body: string;
  published_at: string;
};

export const matches: Match[] = [
  { id: "m1", competition: "世界杯 小组赛", kickoff_time: "今晚 21:00", home_team: "阿根廷", away_team: "丹麦", status: "scheduled", stage: "小组赛" },
  { id: "m2", competition: "英超", kickoff_time: "明晨 03:00", home_team: "阿森纳", away_team: "纽卡斯尔", status: "scheduled", stage: "第 18 轮" },
  { id: "m3", competition: "西甲", kickoff_time: "明晨 04:00", home_team: "皇家社会", away_team: "塞维利亚", status: "scheduled", stage: "第 16 轮" },
  { id: "m4", competition: "世界杯 淘汰赛", kickoff_time: "昨日 23:00", home_team: "法国", away_team: "克罗地亚", home_score: 2, away_score: 1, status: "finished", stage: "1/8 决赛" }
];

export const aiModels: AiModel[] = [
  {
    id: "alpha-pitch",
    code: "AlphaPitch",
    name: "绿茵深算",
    role: "综合赛前主模型",
    description: "融合球队状态、赛程压力、攻防效率和历史交锋，负责给出赛前主路径判断。",
    specialties: ["世界杯", "五大联赛焦点战", "强弱分明场"],
    risk_style: "均衡",
    recent_record: "近100条高质量样本回测：92%",
    hit_rate: 92,
    average_score: 9.2,
    total_predictions: 186,
    latest_count: 3
  },
  {
    id: "odds-mind",
    code: "OddsMind",
    name: "指数解码器",
    role: "指数结构理解模型",
    description: "读取赛前指数变化、市场温度和概率偏差，识别方向是否过热或被低估。",
    specialties: ["指数变化", "市场温度", "概率偏差"],
    risk_style: "均衡",
    recent_record: "近100条高质量指数样本回测：90%",
    hit_rate: 90,
    average_score: 9.0,
    total_predictions: 142,
    latest_count: 2
  },
  {
    id: "goal-net",
    code: "GoalNet",
    name: "进球网络",
    role: "进球趋势模型",
    description: "关注比赛节奏、射门质量、禁区触球和防线承压，输出进球区间和节奏判断。",
    specialties: ["总进球趋势", "射门质量", "比赛节奏"],
    risk_style: "均衡",
    recent_record: "近100条进球趋势样本回测：88%",
    hit_rate: 88,
    average_score: 8.8,
    total_predictions: 158,
    latest_count: 2
  },
  {
    id: "tacti-core",
    code: "TactiCore",
    name: "战术核心",
    role: "场面与战术模型",
    description: "拆解阵型、压迫强度、控球推进和攻防转换，判断比赛实际场面是否支撑模型倾向。",
    specialties: ["阵型对位", "高位压迫", "攻防转换"],
    risk_style: "稳健",
    recent_record: "近100条战术场面样本回测：86%",
    hit_rate: 86,
    average_score: 8.6,
    total_predictions: 131,
    latest_count: 1
  },
  {
    id: "upset-x",
    code: "UpsetX",
    name: "冷门探针",
    role: "热门风险识别模型",
    description: "寻找强队热度过高、弱队被低估、赛程或阵容不匹配带来的冷门窗口。",
    specialties: ["冷门风险", "弱队韧性", "强队过热"],
    risk_style: "进取",
    recent_record: "近100条热度风险样本回测：85%",
    hit_rate: 85,
    average_score: 8.5,
    total_predictions: 96,
    latest_count: 1
  },
  {
    id: "line-shift",
    code: "LineShift",
    name: "指数漂移",
    role: "临场指数扫描模型",
    description: "聚焦开赛前的指数漂移、方向修正和异常波动，给赛前观点做最后校准。",
    specialties: ["尾盘变化", "临场修正", "异常波动"],
    risk_style: "均衡",
    recent_record: "临场样本表现：89%",
    hit_rate: 89,
    average_score: 8.9,
    total_predictions: 117,
    latest_count: 1
  },
  {
    id: "heat-guard",
    code: "HeatGuard",
    name: "热度守卫",
    role: "热度降噪模型",
    description: "过滤媒体叙事、社群热度和热门球队光环，识别哪些判断可能被情绪放大。",
    specialties: ["舆论热度", "热门降噪", "风险提示"],
    risk_style: "稳健",
    recent_record: "近100条热度降噪样本回测：87%",
    hit_rate: 87,
    average_score: 8.7,
    total_predictions: 124,
    latest_count: 2
  },
  {
    id: "squad-lens",
    code: "SquadLens",
    name: "阵容透镜",
    role: "阵容与赛程模型",
    description: "分析伤停、首发变化、轮换深度和连续作战压力，判断纸面实力是否会打折。",
    specialties: ["伤停信息", "首发变化", "赛程压力"],
    risk_style: "稳健",
    recent_record: "近100条阵容赛程样本回测：91%",
    hit_rate: 91,
    average_score: 9.1,
    total_predictions: 149,
    latest_count: 2
  },
  {
    id: "review-core",
    code: "ReviewCore",
    name: "复盘校准",
    role: "赛后复盘模型",
    description: "负责赛后归因、偏差解释和模型表现记录，把单场判断沉淀为长期校准数据。",
    specialties: ["赛后复盘", "偏差归因", "模型校准"],
    risk_style: "复盘",
    recent_record: "复盘样本表现：94%",
    hit_rate: 94,
    average_score: 9.4,
    total_predictions: 102,
    latest_count: 2
  },
  {
    id: "score-cast",
    code: "ScoreCast",
    name: "比分分布",
    role: "比分区间模型",
    description: "输出比分区间、结果分布和低高比分路径，强调概率分布而不是单一确定比分。",
    specialties: ["比分区间", "结果分布", "低高比分路径"],
    risk_style: "进取",
    recent_record: "比分样本表现：86%",
    hit_rate: 86,
    average_score: 8.6,
    total_predictions: 88,
    latest_count: 1
  }
];

export const predictions: Prediction[] = [
  {
    id: "p1",
    match_id: "m1",
    model_id: "alpha-pitch",
    assistant_model_ids: ["tacti-core", "squad-lens"],
    title: "阿根廷 vs 丹麦：节奏控制权与边路推进的分歧",
    competition: "世界杯 小组赛",
    kickoff_time_text: "今晚 21:00",
    matchup: "阿根廷 vs 丹麦",
    visibility: "free",
    recommendation: "模型倾向：阿根廷方向，关注下半场进攻效率",
    risk_level: "中",
    published_at: "今天 11:20",
    body: [
      "模型认为阿根廷在中前场压迫后的二次进攻质量更稳定，但丹麦的中场横向覆盖会让比赛前 30 分钟较难快速打开。",
      "关键变量是阿根廷边后卫前插后的回防距离。如果丹麦能持续把球转移到弱侧，阿根廷的控球优势会被稀释。",
      "综合近期射门质量、定位球产出和替补席变化，本场更偏向阿根廷方向，但前段时间可能出现僵持。"
    ]
  },
  {
    id: "p2",
    match_id: "m2",
    model_id: "odds-mind",
    assistant_model_ids: ["line-shift", "heat-guard"],
    title: "阿森纳 vs 纽卡斯尔：高位压迫下的转换球价值",
    competition: "英超",
    kickoff_time_text: "明晨 03:00",
    matchup: "阿森纳 vs 纽卡斯尔",
    visibility: "vip",
    recommendation: "参考方向：阿森纳不败，进球预期偏谨慎",
    risk_level: "中",
    published_at: "今天 09:45",
    body: [
      "阿森纳主场控球结构仍然完整，但纽卡斯尔在中路逼抢后的直塞质量值得警惕。",
      "模型将比赛拆成两个阶段：上半场阿森纳阵地战占优，下半场纽卡斯尔替补冲击会提升开放程度。",
      "本场不宜过度放大主队热度，参考方向以主队不败为主，同时保留低比分路径。"
    ]
  },
  {
    id: "p3",
    match_id: "m3",
    model_id: "goal-net",
    assistant_model_ids: ["score-cast", "tacti-core"],
    title: "皇家社会 vs 塞维利亚：低速消耗战中的定位球窗口",
    competition: "西甲",
    kickoff_time_text: "明晨 04:00",
    matchup: "皇家社会 vs 塞维利亚",
    visibility: "free",
    recommendation: "模型倾向：总进球预期偏低",
    risk_level: "低",
    published_at: "昨天 22:10",
    body: [
      "两队近期前场推进都更依赖局部人数堆叠，连续冲刺和快速反击质量并不突出。",
      "皇家社会更容易制造角球和二点球，但塞维利亚后场站位收缩时，禁区内保护相对扎实。",
      "模型给出的主路径是低速消耗战，重点观察定位球和远射带来的偶发波动。"
    ]
  }
];

export const reviews: Review[] = [
  {
    id: "r1",
    prediction_id: "p1",
    match_result: "阿根廷 2-0 丹麦",
    result_status: "hit",
    score: 8.1,
    reviewed_at: "赛后 2 小时",
    body: [
      "赛前判断的节奏僵持基本出现，丹麦前 30 分钟对中路压迫有效，但未能持续形成高质量射门。",
      "阿根廷下半场通过边路推进和二次进攻拉开差距，模型倾向命中。接下来继续跟踪阿根廷面对更强反击队时的回防质量。"
    ]
  },
  {
    id: "r2",
    prediction_id: "p3",
    match_result: "皇家社会 1-1 塞维利亚",
    result_status: "half",
    score: 6.6,
    reviewed_at: "昨日 07:30",
    body: [
      "低速消耗战方向成立，但一次定位球防守失误让比赛提前进入拉扯状态。",
      "本场复盘评分为中等，原因是赛前对塞维利亚定位球防线稳定性的估计偏乐观。"
    ]
  }
];

export const hotEvents: HotEvent[] = [
  {
    id: "h1",
    title: "欧冠焦点：拜仁与国米的中场强度对照",
    competition: "欧冠",
    kickoff_time_text: "本周四 04:00",
    matchup: "拜仁慕尼黑 vs 国际米兰",
    body: "两队都具备强转换能力，前 20 分钟的逼抢成功率将直接影响模型对比赛走势的判断。",
    published_at: "今天 12:00"
  },
  {
    id: "h2",
    title: "友谊赛观察：巴西新阵容的边路实验",
    competition: "国家队友谊赛",
    kickoff_time_text: "本周六 08:30",
    matchup: "巴西 vs 美国",
    body: "重点看巴西边锋与中锋的站位轮换，这类比赛不宜给出强倾向。",
    published_at: "今天 10:30"
  }
];

export function getPrediction(id: string) {
  return predictions.find((prediction) => prediction.id === id);
}

export function getAiModel(id: string) {
  return aiModels.find((model) => model.id === id);
}

export function getPredictionModel(prediction: Prediction) {
  return getAiModel(prediction.model_id);
}

export function getAssistantModels(prediction: Prediction) {
  return prediction.assistant_model_ids.map(getAiModel).filter((model): model is AiModel => Boolean(model));
}

export function getReview(id: string) {
  return reviews.find((review) => review.id === id);
}

export function getReviewByPrediction(predictionId: string) {
  return reviews.find((review) => review.prediction_id === predictionId);
}

export function getPredictionForReview(review: Review) {
  return predictions.find((prediction) => prediction.id === review.prediction_id);
}
