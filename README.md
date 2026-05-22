# 绿茵智报 Football AI Intelligence

中文足球 AI 赛前情报 Web MVP。产品核心是赛前 AI 观点、参考方向、风险提示和赛后复盘记录。

## 技术栈

- Next.js App Router
- React
- Tailwind CSS
- TypeScript
- Node.js 24+
- 页面通过 `lib/data.ts` 数据服务层读取内容。
- 正式部署版默认读取 `data/worldcup-content.json` 数据快照。
- 数据快照由 TG bot 的 SQLite 数据库导出生成，适合今晚先上线推广。

## 页面

- `/` 首页
- `/today` 今日情报列表
- `/models` AI 分析师矩阵
- `/predictions/[id]` 赛前观点详情
- `/reviews` 赛后复盘列表
- `/reviews/[id]` 赛后复盘详情
- `/schedule` 赛程
- `/vip` VIP 社群说明
- `/login` 兼容旧入口，自动跳转到后台登录
- `/admin` 预览版内容后台
- `/about` 关于

## 运行

```bash
npm install
npm run dev
```

如果使用 pnpm：

```bash
pnpm install
pnpm dev
```

默认访问地址：

```text
http://localhost:3000
```

## 更新网站预测数据

TG bot 发布新预测后，在网站项目目录执行：

```bash
npm run export:worldcup
```

该命令会从默认路径读取：

```text
../worldcup_bot/worldcup_bot.db
```

并生成：

```text
data/worldcup-content.json
```

网站正式部署时会读取这份 JSON 快照。也就是说，今晚的运营流程是：

```text
TG bot 发布预测 → npm run export:worldcup → npm run build → 部署
```

如果 TG bot 数据库不在默认路径，可以指定：

```bash
WORLDCUP_BOT_DB_PATH="/你的路径/worldcup_bot.db" npm run export:worldcup
```

## 预览部署

当前版本适合部署为公开访问版本，用来验证 UI、内容结构和社群承接链路。

推荐平台：

- Vercel
- Cloudflare Pages
- 自建 Node.js 服务

部署设置：

- `robots.ts` 已禁止搜索引擎收录后台路径。
- 不接真实支付。
- 不公开真实 VIP 内容。
- 不创建返回全部内部预测、模型校准参数、原始 prompt 的公开 API。

Vercel 部署建议：

```bash
npm install
npm run build
```

环境变量可参考 `.env.example`。当前公开前台不依赖必填环境变量。

后台入口：

```text
http://localhost:3000/admin
```

本地开发默认密码：

```text
admin123
```

本地开发未配置 `ADMIN_PASSWORD` 时可使用默认密码。生产环境必须设置环境变量 `ADMIN_PASSWORD`，否则后台登录会被禁用，避免默认密码在线上可用。

后台数据当前写入本地 SQLite 文件 `data/football-ai-intel.db`。这适合本机预览和早期运营验证；如果要让后台、TG bot、网站三端完全实时同步，建议迁移到 PostgreSQL、托管 SQLite 或独立 API 服务。

## 数据与接口边界

当前公开前台优先读取 `data/worldcup-content.json`。页面只通过 `lib/data.ts` 读取内容，所以未来可以把数据服务层替换为：

- Next.js API routes 读取统一数据库
- FastAPI 服务读取 Telegram Bot 现有数据库
- PostgreSQL 数据服务

建议保留当前数据类型：`Match`、`Prediction`、`Review`、`AiModel`，便于迁移。

生产环境注意：

- 不要创建会一次性返回全部内部预测、模型评分或校准参数的公开 API。
- 公开页面只渲染用户允许查看的字段，VIP 内容和真实模型输出应在服务端按权限裁剪。
- 不要在 client component 中直接 import 数据源文件。
- Google 登录上线时建议使用 Auth.js / NextAuth，并在服务端校验角色、VIP 状态和 Telegram 绑定关系。
- 后台写入动作需要在服务端再次校验管理员状态，不能只依赖页面可见性。

## 正式上线前准备

数据：

- 真实赛程数据源。
- 真实赛前观点入库流程。
- 真实赛后复盘入库流程。
- 模型命中率从复盘表计算，不手写展示值。
- Telegram Bot SQLite 或 API 数据同步方案。

账号与权限：

- Google OAuth 项目。
- Auth.js / NextAuth 配置。
- `User`、`Session`、`Account`、`VipMembership` 数据表。
- VIP 内容服务端鉴权。
- Telegram 用户绑定策略。

安全：

- 后台登录已加入基础失败次数限制；正式 API 上线后继续补充接口 rate limit。
- 生产环境必须配置 `ADMIN_PASSWORD`，禁止使用本地默认密码。
- `robots.ts` 已屏蔽 `/admin` 和 `/login`，避免后台入口被搜索引擎收录。
- 已加入基础安全响应头和 Content-Security-Policy，后续接入外部统计、图片或登录服务时需要同步调整白名单。
- 服务端字段裁剪。
- session secret 和 OAuth secret 只放环境变量。
- 日志脱敏，避免记录用户邮箱、token、原始模型提示词。

合规和产品文案：

- 隐私政策。
- 服务条款。
- 免责声明。
- 对“指数、样本表现、模型倾向”等词做克制表达。
- 避免出现确定性承诺或行动引导。

运营：

- Telegram 群/频道正式链接。
- X 主页链接。
- 管理员联系方式。
- 内测反馈渠道。
