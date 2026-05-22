import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "登录",
  description: "绿茵智报登录入口。",
  path: "/login",
  noIndex: true
});

export default function LoginPage() {
  redirect("/admin/login");
}
