import { MessageCircle, Send } from "lucide-react";

export const TELEGRAM_URL = "https://t.me/vipworldcup888";
export const X_URL = "https://x.com/worldcupvip";

export function SocialCta() {
  return (
    <div className="glass rounded-lg p-6">
      <div className="text-sm font-semibold text-turf">加入社群</div>
      <h3 className="mt-2 text-2xl font-semibold">跟随每日情报更新</h3>
      <p className="mt-2 text-sm leading-6 text-white/62">每日赛程、赛前观点和复盘同步到 Telegram 群，X 主页发布公开动态。</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-turf px-4 py-3 text-sm font-semibold text-pitch-950"
          data-analytics-event="click_telegram"
          data-analytics-area="social_cta"
          data-analytics-label="Telegram 社群"
        >
          <Send size={16} /> Telegram 社群
        </a>
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-3 text-sm text-white/82"
          data-analytics-event="click_x"
          data-analytics-area="social_cta"
          data-analytics-label="访问 X 主页"
        >
          <MessageCircle size={16} /> 访问 X 主页
        </a>
      </div>
    </div>
  );
}
