# 绿茵智报 Football AI Intelligence

中文足球 AI 赛前情报 Web MVP。产品核心是赛前 AI 观点、参考方向、风险提示和赛后复盘记录。

## 技术栈

- Next.js App Router
- React
- Tailwind CSS
- TypeScript
- Node.js 24+
- 页面通过 `lib/data.ts` 数据服务层读取内容，当前底层使用本地 fixture，后续可替换为 SQLite/API/PostgreSQL

## 页面

- `/` 首页
- `/today` 今日情报列表
- `/models` AI模型矩阵
- `/predictions/[id]` 赛前观点详情
- `/reviews` 赛后复盘列表
- `/reviews/[id]` 赛后复盘详情
- `/schedule` 赛程
- `/hot` 热门赛事
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

## 预览部署

当前版本适合部署为预览版，用来验证 UI、内容结构和社群承接链路。

推荐平台：

- Vercel
- Cloudflare Pages
- 自建 Node.js 服务

预览版设置：

- 保留页面顶部“预览版”标识。
- `robots.ts` 已禁止搜索引擎收录。
- 不接真实支付。
- 不公开真实 VIP 内容。
- 不创建返回全部内部预测、模型校准参数、原始 prompt 的公开 API。

Vercel 部署建议：

```bash
npm install
npm run build
```

环境变量可参考 `.env.example`。当前预览 MVP 不依赖必填环境变量。

后台入口：

```text
http://localhost:3000/admin
```

本地预览默认密码：

```text
admin123
```

部署或共享预览时请设置环境变量 `ADMIN_PASSWORD` 覆盖默认密码。

后台数据当前写入本地 SQLite 文件 `data/football-ai-intel.db`。这适合本机预览和早期运营验证；正式部署到 Serverless 平台前，建议迁移到 PostgreSQL、托管 SQLite 或独立 API 服务。

## 数据与接口边界

第一版底层使用本地 fixture 数据，但页面只通过 `lib/data.ts` 读取。后续可以把数据服务层替换为：

- Next.js API routes 读取 SQLite
- FastAPI 服务读取 Telegram Bot 现有数据库
- PostgreSQL 数据服务

建议保留当前数据类型：`Match`、`Prediction`、`Review`、`HotEvent`、`AiModel`，便于迁移。

生产环境注意：

- 不要创建会一次性返回全部内部预测、模型评分或校准参数的公开 API。
- 公开页面只渲染用户允许查看的字段，VIP 内容和真实模型输出应在服务端按权限裁剪。
- 不要在 client component 中直接 import 数据源文件。
- Google 登录上线时建议使用 Auth.js / NextAuth，并在服务端校验角色、VIP 状态和 Telegram 绑定关系。

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

- API rate limit。
- 服务端字段裁剪。
- session secret 和 OAuth secret 只放环境变量。
- 日志脱敏，避免记录用户邮箱、token、原始模型提示词。
- 增加 CSP 后再公开投放。

合规和产品文案：

- 隐私政策。
- 服务条款。
- 免责声明。
- 对“指数、盘口、命中率”等词做克制表达。
- 避免出现确定性承诺或投注引导。

运营：

- Telegram 群/频道正式链接。
- X 主页链接。
- 管理员联系方式。
- 内测反馈渠道。
