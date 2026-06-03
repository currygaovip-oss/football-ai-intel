import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const baseArg = process.argv.find((arg) => arg.startsWith("--base="));
const baseUrl = (baseArg?.split("=")[1] || process.env.SEO_AUDIT_BASE_URL || "").replace(/\/$/, "");
const strict = args.has("--strict");

const publicCopyFiles = ["app", "components", "lib"];
const ignoredPublicPaths = [
  `${path.sep}app${path.sep}admin${path.sep}`,
  `${path.sep}lib${path.sep}db.ts`,
  `${path.sep}lib${path.sep}content-data.ts`,
  `${path.sep}lib${path.sep}data.ts`
];

const forbiddenPublicTerms = [
  "这里",
  "本页",
  "页面",
  "功能",
  "模块",
  "后续",
  "发布后",
  "尚未",
  "暂无",
  "当前没有",
  "比赛卡片",
  "赛前信息",
  "开发",
  "模板",
  "占位",
  "先看",
  "用户",
  "已收录",
  "已发布",
  "查看详情",
  "会展示",
  "会更新",
  "会标出",
  "会直接",
  "时间待定",
  "稳赚",
  "必中",
  "稳赢",
  "下注",
  "博彩",
  "投注",
  "跟单",
  "收米"
];

const coreRoutes = [
  "/",
  "/today",
  "/predictions",
  "/reviews",
  "/schedule",
  "/football-ai-intelligence",
  "/world-cup-2026",
  "/world-cup-2026/index",
  "/world-cup-2026/schedule",
  "/world-cup-2026/matches",
  "/world-cup-2026/china-time",
  "/world-cup-2026/teams",
  "/world-cup-2026/players",
  "/world-cup-2026/host-countries",
  "/world-cup-2026/host-cities",
  "/world-cup-2026/tickets"
];

const searchIntents = [
  {
    name: "世界杯核心入口",
    terms: ["2026世界杯", "世界杯赛程", "世界杯2026赛程", "美加墨世界杯"],
    routes: ["/world-cup-2026", "/world-cup-2026/schedule"]
  },
  {
    name: "世界杯时间问题",
    terms: ["2026世界杯什么时候开始", "世界杯比赛时间", "2026世界杯北京时间", "2026世界杯时差"],
    routes: ["/topics/world-cup-2026-start-date", "/world-cup-2026/china-time", "/topics/world-cup-2026-time-difference"]
  },
  {
    name: "举办地与城市",
    terms: ["2026世界杯在哪里举办", "世界杯举办城市", "世界杯举办球场", "美加墨世界杯举办国家"],
    routes: ["/topics/world-cup-2026-where", "/world-cup-2026/host-cities", "/topics/world-cup-2026-stadiums"]
  },
  {
    name: "赛制分组",
    terms: ["2026世界杯分组", "2026世界杯抽签", "2026世界杯赛制", "世界杯48队", "世界杯32强赛"],
    routes: ["/topics/world-cup-2026-groups", "/topics/world-cup-2026-draw", "/topics/world-cup-2026-format", "/topics/world-cup-2026-48-teams", "/topics/world-cup-2026-round-of-32"]
  },
  {
    name: "球队与球员",
    terms: ["阿根廷世界杯赛程", "巴西世界杯赛程", "法国世界杯赛程", "梅西世界杯2026", "姆巴佩世界杯"],
    routes: ["/world-cup-2026/teams", "/world-cup-2026/players"]
  },
  {
    name: "今日足球与赛前分析",
    terms: ["今日足球赛程", "足球赛前分析", "足球AI情报", "足球比赛分析", "足球赛后复盘"],
    routes: ["/today", "/predictions", "/football-ai-intelligence", "/reviews"]
  }
];

const geoQuestions = [
  "今天有哪些足球比赛？",
  "2026世界杯赛程怎么看？",
  "2026世界杯什么时候开始？",
  "2026世界杯在哪里举办？",
  "2026世界杯时差和北京时间怎么换算？",
  "美加墨世界杯有哪些举办城市？",
  "阿根廷世界杯赛程怎么看？",
  "梅西世界杯看点是什么？",
  "足球赛前分析哪里看？",
  "2026世界杯门票信息在哪里看？"
];

const highValueRoutes = [
  ...coreRoutes,
  "/topics/world-cup-2026-where",
  "/topics/world-cup-2026-start-date",
  "/topics/world-cup-2026-time-difference",
  "/topics/world-cup-2026-asian-teams",
  "/topics/world-cup-2026-watch-guide",
  "/topics/world-cup-2026-draw",
  "/topics/world-cup-2026-format",
  "/topics/world-cup-2026-stadiums",
  "/topics/world-cup-2026-qualified-teams",
  "/topics/world-cup-2026-round-of-32",
  "/world-cup-2026/cities/mexico-city",
  "/world-cup-2026/cities/new-york-new-jersey",
  "/world-cup-2026/cities/los-angeles",
  "/world-cup-2026/teams/argentina",
  "/world-cup-2026/teams/brazil",
  "/world-cup-2026/teams/france",
  "/world-cup-2026/fixtures/tg-m1",
  "/world-cup-2026/fixtures/tg-m2",
  "/world-cup-2026/tickets/cities/mexico-city",
  "/world-cup-2026/tickets/cities/new-york-new-jersey",
  "/world-cup-2026/players/lionel-messi",
  "/world-cup-2026/players/kylian-mbappe",
  "/world-cup-2026/players/jude-bellingham"
];

function textBetween(source, startText, endText) {
  const start = source.indexOf(startText);
  if (start === -1) return "";
  const end = source.indexOf(endText, start + startText.length);
  if (end === -1) return "";
  return source.slice(start + startText.length, end);
}

function quotedStrings(source) {
  return [...source.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)].map((match) => match[1]);
}

async function readProjectFile(filePath) {
  return readFile(path.join(root, filePath), "utf8");
}

async function collectFiles(dir) {
  const absoluteDir = path.join(root, dir);
  if (!existsSync(absoluteDir)) return [];

  const entries = await readdir(absoluteDir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(absoluteDir, entry.name);
    const relativePath = path.relative(root, absolutePath);
    if (entry.isDirectory()) {
      if ([".next", "node_modules", "backups"].includes(entry.name)) continue;
      files.push(...await collectFiles(relativePath));
      continue;
    }
    if (/\.(ts|tsx|js|jsx|mjs|md)$/.test(entry.name)) {
      files.push(relativePath);
    }
  }
  return files;
}

function isIgnoredPublicFile(filePath) {
  const normalized = `${path.sep}${filePath}`;
  return ignoredPublicPaths.some((ignoredPath) => normalized.includes(ignoredPath));
}

async function auditPublicCopy() {
  const files = (await Promise.all(publicCopyFiles.map(collectFiles))).flat();
  const findings = [];

  for (const file of files) {
    if (isIgnoredPublicFile(file)) continue;
    const source = await readProjectFile(file);
    const lines = source.split("\n");
    lines.forEach((line, index) => {
      for (const term of forbiddenPublicTerms) {
        if (line.includes(term)) {
          findings.push({
            severity: "high",
            file,
            line: index + 1,
            term,
            preview: line.trim().slice(0, 160)
          });
        }
      }
    });
  }

  return findings;
}

function parseTopics(source) {
  const slugMatches = [...source.matchAll(/slug:\s*"([^"]+)"/g)];
  return slugMatches.map((match, index) => {
    const start = match.index ?? 0;
    const end = slugMatches[index + 1]?.index ?? source.length;
    const block = source.slice(start, end);
    return {
      slug: match[1],
      title: block.match(/title:\s*"([^"]+)"/)?.[1] || "",
      eyebrow: block.match(/eyebrow:\s*"([^"]+)"/)?.[1] || "",
      description: block.match(/description:\s*"([^"]+)"/)?.[1] || "",
      intro: block.match(/intro:\s*"([^"]+)"/)?.[1] || "",
      faqCount: [...block.matchAll(/question:\s*"([^"]+)"/g)].length,
      questions: [...block.matchAll(/question:\s*"([^"]+)"/g)].map((item) => item[1])
    };
  });
}

function parseKeywordClusters(source) {
  const clusterMatches = [...source.matchAll(/id:\s*"([^"]+)"/g)];
  return clusterMatches.map((match, index) => {
    const start = match.index ?? 0;
    const end = clusterMatches[index + 1]?.index ?? source.length;
    const block = source.slice(start, end);
    return {
      id: match[1],
      name: block.match(/name:\s*"([^"]+)"/)?.[1] || "",
      intent: block.match(/intent:\s*"([^"]+)"/)?.[1] || "",
      terms: quotedStrings(textBetween(block, "terms: [", "]")),
      routes: quotedStrings(textBetween(block, "routes: [", "]"))
    };
  }).filter((cluster) => cluster.id.includes("world-cup") || cluster.id.includes("football"));
}

function parseTopicLinks(source) {
  return [...source.matchAll(/\{\s*label:\s*"([^"]+)",\s*href:\s*"([^"]+)"\s*\}/g)].map((match) => ({
    label: match[1],
    href: match[2]
  }));
}

async function auditKeywordCoverage() {
  const seoSource = await readProjectFile("lib/seo.ts");
  const topicSource = await readProjectFile("lib/seo-topics.ts");
  const keywordsBlock = textBetween(seoSource, "export const seoKeywords = [", "];");
  const keywords = quotedStrings(keywordsBlock);
  const topicLinks = parseTopicLinks(textBetween(seoSource, "export const seoTopicLinks = [", "];"));
  const topics = parseTopics(topicSource);
  const keywordClusters = parseKeywordClusters(topicSource);
  const topicRoutes = new Set(topics.map((topic) => `/topics/${topic.slug}`));
  const linkedRoutes = new Set(topicLinks.map((link) => link.href));

  const findings = [];
  for (const intent of searchIntents) {
    const missingKeywords = intent.terms.filter((term) => !keywords.includes(term));
    const missingRoutes = intent.routes.filter((route) => !linkedRoutes.has(route) && !topicRoutes.has(route) && !coreRoutes.includes(route));
    const weakTopics = intent.routes
      .filter((route) => route.startsWith("/topics/"))
      .map((route) => topics.find((topic) => `/topics/${topic.slug}` === route))
      .filter(Boolean)
      .filter((topic) => topic.description.length < 24 || topic.intro.length < 36 || topic.faqCount < 3)
      .map((topic) => topic.slug);

    if (missingKeywords.length || missingRoutes.length || weakTopics.length) {
      findings.push({
        severity: missingRoutes.length ? "high" : "medium",
        intent: intent.name,
        missingKeywords,
        missingRoutes,
        weakTopics
      });
    }
  }

  const duplicateTopicTitles = findDuplicates(topics.map((topic) => topic.title).filter(Boolean));
  const duplicateTopicDescriptions = findDuplicates(topics.map((topic) => topic.description).filter(Boolean));
  const clusterFindings = auditKeywordClusters(keywordClusters, topics);

  return {
    keywords,
    topicLinks,
    topics,
    keywordClusters,
    findings: [...findings, ...clusterFindings],
    duplicateTopicTitles,
    duplicateTopicDescriptions
  };
}

function auditKeywordClusters(clusters, topics) {
  const findings = [];
  const topicRoutes = new Set(topics.map((topic) => `/topics/${topic.slug}`));
  const coreClusterIds = [
    "world-cup-core",
    "world-cup-time",
    "world-cup-place",
    "world-cup-format",
    "world-cup-team",
    "football-analysis",
    "world-cup-ticket"
  ];
  const clusterIds = new Set(clusters.map((cluster) => cluster.id));
  const missingClusters = coreClusterIds.filter((id) => !clusterIds.has(id));
  if (missingClusters.length) {
    findings.push({ severity: "high", intent: "关键词矩阵", missingRoutes: missingClusters, missingKeywords: [], weakTopics: [] });
  }

  clusters.forEach((cluster) => {
    const missing = [];
    if (cluster.terms.length < 5) missing.push("长尾词不足");
    if (cluster.routes.length < 2) missing.push("承接入口不足");
    if (cluster.intent.length < 18) missing.push("检索意图过短");
    const topicRouteCount = cluster.routes.filter((route) => topicRoutes.has(route)).length;
    if (topicRouteCount === 0 && cluster.id !== "football-analysis") missing.push("缺专题承接");

    if (missing.length) {
      findings.push({
        severity: "medium",
        intent: `${cluster.name || cluster.id}矩阵`,
        missingKeywords: missing,
        missingRoutes: [],
        weakTopics: []
      });
    }
  });

  return findings;
}

function findDuplicates(items) {
  const count = new Map();
  items.forEach((item) => count.set(item, (count.get(item) || 0) + 1));
  return [...count.entries()].filter(([, value]) => value > 1).map(([item]) => item);
}

function stripHtml(value = "") {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMeta(html, name) {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["'][^>]*>`, "i")
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeHtml(match[1]);
  }
  return "";
}

function extractLink(html, rel) {
  const patterns = [
    new RegExp(`<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']*)["'][^>]*>`, "i"),
    new RegExp(`<link[^>]+href=["']([^"']*)["'][^>]+rel=["']${rel}["'][^>]*>`, "i")
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeHtml(match[1]);
  }
  return "";
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;/g, "'");
}

async function fetchWithTimeout(url, timeoutMs = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal, headers: { "User-Agent": "lyzb-seo-geo-audit/1.0" } });
  } finally {
    clearTimeout(timer);
  }
}

async function auditLivePages(topicLinks) {
  if (!baseUrl) {
    return { skipped: true, baseUrl: "", findings: [], pages: [], sitemapUrls: [] };
  }

  const targetRoutes = unique([...highValueRoutes, ...topicLinks.map((link) => link.href)]).slice(0, 80);
  const sitemapUrls = await fetchSitemapUrls(baseUrl);
  const pages = [];
  const findings = [];

  for (const route of targetRoutes) {
    const url = `${baseUrl}${route}`;
    try {
      const response = await fetchWithTimeout(url);
      const html = await response.text();
      const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "");
      const description = extractMeta(html, "description");
      const canonical = extractLink(html, "canonical");
      const h1 = stripHtml(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
      const text = stripHtml(html);
      const noIndex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html);
      const jsonLdCount = (html.match(/application\/ld\+json/g) || []).length;
      const hasDateModified = html.includes("\"dateModified\"");
      const hasDataSnapshot = text.includes("数据快照");
      const inSitemap = sitemapUrls.length ? sitemapUrls.has(new URL(route, "https://lyzbvip.vip").toString()) : null;

      const page = {
        route,
        status: response.status,
        title,
        description,
        canonical,
        h1,
        textLength: text.length,
        jsonLdCount,
        hasDateModified,
        hasDataSnapshot,
        noIndex,
        inSitemap
      };
      pages.push(page);

      if (response.status !== 200) findings.push(pageFinding("high", route, `HTTP 状态为 ${response.status}`));
      if (!title) findings.push(pageFinding("high", route, "缺少 title"));
      if (title && (title.length < 10 || title.length > 42)) findings.push(pageFinding("medium", route, `title 长度需要复核：${title.length} 字`));
      if (!description) findings.push(pageFinding("high", route, "缺少 description"));
      if (description && (description.length < 28 || description.length > 110)) findings.push(pageFinding("medium", route, `description 长度需要复核：${description.length} 字`));
      if (!h1) findings.push(pageFinding("high", route, "缺少 H1"));
      if (!canonical) findings.push(pageFinding("high", route, "缺少 canonical"));
      if (canonical && !canonical.startsWith("https://lyzbvip.vip")) findings.push(pageFinding("medium", route, `canonical 指向异常：${canonical}`));
      if (noIndex) findings.push(pageFinding("high", route, "页面带 noindex"));
      if (text.includes("This page could not be found")) findings.push(pageFinding("high", route, "页面内容为 404"));
      if (text.length < 900 && route !== "/feed.xml") findings.push(pageFinding(route === "/vip" ? "low" : "medium", route, `正文内容偏薄：${text.length} 字符`));
      if (jsonLdCount < 1 && !route.endsWith(".txt")) findings.push(pageFinding("low", route, "未检测到结构化数据"));
      if (!route.endsWith(".txt") && !route.endsWith(".xml") && !hasDateModified) findings.push(pageFinding("low", route, "结构化数据缺少 dateModified"));
      if (!route.endsWith(".txt") && !route.endsWith(".xml") && !hasDataSnapshot) findings.push(pageFinding("low", route, "缺少数据快照信息"));
      if (inSitemap === false) findings.push(pageFinding("medium", route, "未出现在 sitemap.xml"));
    } catch (error) {
      findings.push(pageFinding("high", route, `抓取失败：${error.name === "AbortError" ? "超时" : error.message}`));
    }
  }

  return { skipped: false, baseUrl, findings, pages, sitemapUrls: [...sitemapUrls] };
}

async function fetchSitemapUrls(origin) {
  try {
    const response = await fetchWithTimeout(`${origin}/sitemap.xml`);
    if (!response.ok) return new Set();
    const xml = await response.text();
    return new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeHtml(match[1])));
  } catch {
    return new Set();
  }
}

function pageFinding(severity, route, message) {
  return { severity, route, message };
}

function unique(items) {
  return [...new Set(items)];
}

async function auditGeo(topicData) {
  const sourceFiles = ["app/llms.txt/route.ts", "app/llms-full.txt/route.ts", "app/answers.txt/route.ts"];
  const source = (await Promise.all(sourceFiles.map(readProjectFile))).join("\n");
  const findings = [];
  const coveredQuestions = geoQuestions.filter((question) => source.includes(question) || questionHints(question).some((hint) => source.includes(hint)));
  const missingQuestions = geoQuestions.filter((question) => !coveredQuestions.includes(question));

  if (missingQuestions.length) {
    findings.push({ severity: "medium", message: "GEO 问答覆盖不完整", missingQuestions });
  }

  const requiredEntities = ["绿茵智报", "lyzbvip.vip", "今日足球赛程", "2026世界杯", "美加墨世界杯", "赛前观点", "参考方向", "赛后复盘"];
  const missingEntities = requiredEntities.filter((entity) => !source.includes(entity));
  if (missingEntities.length) {
    findings.push({ severity: "high", message: "AI 摘要上下文缺少核心实体", missingEntities });
  }

  const topicsWithoutQuestion = topicData.topics.filter((topic) => topic.faqCount < 3).map((topic) => topic.slug);
  if (topicsWithoutQuestion.length) {
    findings.push({ severity: "medium", message: "部分专题 FAQ 数量不足", topicsWithoutQuestion });
  }

  let liveGeo = null;
  if (baseUrl) {
    const liveFindings = [];
    const liveTargets = ["/llms.txt", "/llms-full.txt", "/answers.txt"];
    for (const route of liveTargets) {
      try {
        const response = await fetchWithTimeout(`${baseUrl}${route}`);
        const text = await response.text();
        if (!response.ok) liveFindings.push({ severity: "high", route, message: `HTTP 状态为 ${response.status}` });
        if (!text.includes("绿茵智报")) liveFindings.push({ severity: "high", route, message: "缺少品牌实体" });
        if (!text.includes("2026世界杯")) liveFindings.push({ severity: "medium", route, message: "缺少世界杯核心实体" });
      } catch (error) {
        liveFindings.push({ severity: "high", route, message: `抓取失败：${error.message}` });
      }
    }
    liveGeo = liveFindings;
  }

  return {
    coveredQuestions,
    missingQuestions,
    findings,
    liveFindings: liveGeo
  };
}

function questionHints(question) {
  if (question.includes("阿根廷世界杯赛程")) return ["热门球队问答", "getWorldCupTeamEntries", "世界杯球队"];
  if (question.includes("梅西世界杯")) return ["重点球员问答", "getWorldCupPlayerEntries", "世界杯重点球员"];
  if (question.includes("什么时候开始")) return ["2026世界杯什么时候开始"];
  if (question.includes("在哪里举办")) return ["2026世界杯在哪里举办"];
  if (question.includes("时差")) return ["2026世界杯时差", "北京时间"];
  if (question.includes("举办城市")) return ["举办城市"];
  if (question.includes("赛前分析")) return ["足球赛前分析", "赛前观点"];
  if (question.includes("门票")) return ["门票信息", "官方购票"];
  return question.split(/[？?]/).filter(Boolean);
}

function countSeverity(findings, severity) {
  return findings.filter((finding) => finding.severity === severity).length;
}

function scoreFromFindings(findings, base = 100) {
  const score = base - countSeverity(findings, "high") * 12 - countSeverity(findings, "medium") * 6 - countSeverity(findings, "low") * 2;
  return Math.max(0, Math.min(100, score));
}

function formatFinding(finding) {
  if (finding.file) return `${finding.file}:${finding.line} 命中「${finding.term}」 ${finding.preview}`;
  if (finding.intent) {
    const parts = [];
    if (finding.missingKeywords?.length) parts.push(`缺关键词：${finding.missingKeywords.join("、")}`);
    if (finding.missingRoutes?.length) parts.push(`缺入口：${finding.missingRoutes.join("、")}`);
    if (finding.weakTopics?.length) parts.push(`内容偏薄：${finding.weakTopics.join("、")}`);
    return `${finding.intent}：${parts.join("；")}`;
  }
  if (finding.route) return `${finding.route}：${finding.message}`;
  if (finding.missingQuestions) return `${finding.message}：${finding.missingQuestions.join("、")}`;
  if (finding.missingEntities) return `${finding.message}：${finding.missingEntities.join("、")}`;
  if (finding.topicsWithoutQuestion) return `${finding.message}：${finding.topicsWithoutQuestion.join("、")}`;
  return finding.message || JSON.stringify(finding);
}

function printSection(title, findings, limit = 12) {
  console.log(`\n${title}`);
  if (!findings.length) {
    console.log("  通过");
    return;
  }
  findings.slice(0, limit).forEach((finding, index) => {
    console.log(`  ${index + 1}. [${finding.severity}] ${formatFinding(finding)}`);
  });
  if (findings.length > limit) {
    console.log(`  还有 ${findings.length - limit} 条，见 reports/seo-geo-audit-latest.json`);
  }
}

async function main() {
  const publicCopyFindings = await auditPublicCopy();
  const keywordAudit = await auditKeywordCoverage();
  const liveAudit = await auditLivePages(keywordAudit.topicLinks);
  const geoAudit = await auditGeo(keywordAudit);

  const geoFindings = [...geoAudit.findings, ...(geoAudit.liveFindings || [])];
  const allFindings = [
    ...publicCopyFindings,
    ...keywordAudit.findings,
    ...liveAudit.findings,
    ...geoFindings
  ];

  const scores = {
    publicCopy: scoreFromFindings(publicCopyFindings),
    keywordCoverage: scoreFromFindings(keywordAudit.findings),
    livePages: liveAudit.skipped ? null : scoreFromFindings(liveAudit.findings),
    geo: scoreFromFindings(geoFindings),
    overall: scoreFromFindings(allFindings, 100)
  };

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl: baseUrl || null,
    scores,
    summary: {
      keywords: keywordAudit.keywords.length,
      topics: keywordAudit.topics.length,
      keywordClusters: keywordAudit.keywordClusters.length,
      topicLinks: keywordAudit.topicLinks.length,
      livePagesChecked: liveAudit.pages.length,
      geoQuestionsCovered: geoAudit.coveredQuestions.length,
      geoQuestionsTotal: geoQuestions.length,
      findings: allFindings.length,
      high: countSeverity(allFindings, "high"),
      medium: countSeverity(allFindings, "medium"),
      low: countSeverity(allFindings, "low")
    },
    publicCopy: publicCopyFindings,
    keywordCoverage: {
      findings: keywordAudit.findings,
      duplicateTopicTitles: keywordAudit.duplicateTopicTitles,
      duplicateTopicDescriptions: keywordAudit.duplicateTopicDescriptions,
      keywordClusters: keywordAudit.keywordClusters,
      topics: keywordAudit.topics
    },
    livePages: liveAudit,
    geo: geoAudit
  };

  await mkdir(path.join(root, "reports"), { recursive: true });
  await writeFile(path.join(root, "reports", "seo-geo-audit-latest.json"), JSON.stringify(report, null, 2));

  console.log("\n绿茵智报 SEO/GEO 质检");
  console.log(`时间：${report.generatedAt}`);
  console.log(`模式：${baseUrl ? `源码 + 页面抓取（${baseUrl}）` : "源码扫描"}`);
  console.log("\n评分：");
  console.log(`  公开文案：${scores.publicCopy}/100`);
  console.log(`  关键词覆盖：${scores.keywordCoverage}/100`);
  console.log(`  页面技术：${scores.livePages === null ? "未抓取，使用 --base=http://localhost:端口 开启" : `${scores.livePages}/100`}`);
  console.log(`  GEO 可读性：${scores.geo}/100`);
  console.log(`  综合：${scores.overall}/100`);
  console.log("\n数据：");
  console.log(`  关键词：${report.summary.keywords}`);
  console.log(`  专题页：${report.summary.topics}`);
  console.log(`  关键词集群：${report.summary.keywordClusters}`);
  console.log(`  内链入口：${report.summary.topicLinks}`);
  console.log(`  页面抓取：${report.summary.livePagesChecked}`);
  console.log(`  GEO 问答覆盖：${report.summary.geoQuestionsCovered}/${report.summary.geoQuestionsTotal}`);

  printSection("公开文案风险", publicCopyFindings);
  printSection("关键词与落地页覆盖", keywordAudit.findings);
  printSection("页面技术检查", liveAudit.skipped ? [] : liveAudit.findings);
  if (liveAudit.skipped) console.log("  未抓取页面；可运行：npm run seo:audit -- --base=http://localhost:3006");
  printSection("GEO 可读性检查", geoFindings);

  if (keywordAudit.duplicateTopicTitles.length || keywordAudit.duplicateTopicDescriptions.length) {
    console.log("\n重复内容提醒");
    keywordAudit.duplicateTopicTitles.forEach((title) => console.log(`  重复标题：${title}`));
    keywordAudit.duplicateTopicDescriptions.forEach((description) => console.log(`  重复描述：${description}`));
  }

  console.log("\n报告文件：reports/seo-geo-audit-latest.json");

  if (strict && (countSeverity(allFindings, "high") > 0 || scores.overall < 80)) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("SEO/GEO 质检失败：", error);
  process.exitCode = 1;
});
