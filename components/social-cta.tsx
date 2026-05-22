import { MessageCircle, Send } from "lucide-react";

export const TELEGRAM_URL = "https://t.me/vipworldcup888";
export const X_URL = "https://x.com/worldcupvip";

export function SocialCta() {
  return (
    <div className="glass rounded-lg p-6">
      <div className="text-sm font-semibold text-turf">社群入口</div>
      <h3 className="mt-2 text-2xl font-semibold">跟随每日情报更新</h3>
      <p className="mt-2 text-sm leading-6 text-white/62">每日赛程、赛前观点和复盘会同步到 Telegram 群，更多更新可关注 X。</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a href={TELEGRAM_URL} className="inline-flex items-center justify-center gap-2 rounded-md bg-turf px-4 py-3 text-sm font-semibold text-pitch-950">
          <Send size={16} /> Telegram 社群
        </a>
        <a href={X_URL} className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-3 text-sm text-white/82">
          <MessageCircle size={16} /> 访问 X 主页
        </a>
      </div>
    </div>
  );
}
