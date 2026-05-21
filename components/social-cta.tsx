import { MessageCircle, Send } from "lucide-react";

export function SocialCta() {
  const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM_URL || "/vip";
  const xUrl = process.env.NEXT_PUBLIC_X_URL || "/about";

  return (
    <div className="glass rounded-lg p-6">
      <div className="text-sm font-semibold text-turf">社群入口</div>
      <h3 className="mt-2 text-2xl font-semibold">跟随每日情报更新</h3>
      <p className="mt-2 text-sm leading-6 text-white/62">通过社群获取每日赛前情报更新、复盘说明和后续 VIP 开通信息。上线初期先以内容质量和长期记录建立信任。</p>
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
