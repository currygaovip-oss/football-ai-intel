import { LogIn } from "lucide-react";
import { SocialCta } from "@/components/social-cta";

export default function LoginPage() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_0.8fr]">
      <section className="glass rounded-lg p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-turf/30 bg-turf/10 px-3 py-1 text-sm text-turf">
          <LogIn size={16} /> Google 登录预留
        </div>
        <h1 className="mt-5 text-4xl font-semibold">账号系统即将开放</h1>
        <p className="mt-4 leading-8 text-white/66">
          第一阶段先不接入完整登录和支付。后续当收藏观点、关注模型、VIP 权限、Telegram 绑定上线时，会优先接入 Google 登录。
        </p>
        <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/62">
          计划方案：Auth.js / NextAuth + Google OAuth，用户表预留 email、头像、角色、VIP 到期时间和 Telegram 绑定字段。
        </div>
      </section>
      <SocialCta />
    </div>
  );
}
