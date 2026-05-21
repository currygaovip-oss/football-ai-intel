import { MessageCircle, Send } from "lucide-react";

export function SocialCta() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "/vip";
  const xUrl = process.env.NEXT_PUBLIC_X_URL || "/about";

  return (
    <div className="glass rounded-lg p-6">
      <div className="text-sm font-semibold text-turf">社群入口</div>
      <h3 className="mt-2 text-2xl font-semibold">跟随每日情报更新</h3>
      <p className="mt-2 text-sm leading-6 text-white/62">第一阶段先通过社群承接深度内容、VIP说明和长期复盘记录。正式 Telegram 与 X 链接可在部署环境变量中替换。</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a href={telegramUrl} className="inline-flex items-center justify-center gap-2 rounded-md bg-turf px-4 py-3 text-sm font-semibold text-pitch-950">
          <Send size={16} /> Telegram 社群
        </a>
        <a href={xUrl} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-3 text-sm text-white/82">
          <MessageCircle size={16} /> 访问 X 主页
        </a>
      </div>
    </div>
  );
}
