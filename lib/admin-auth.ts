import { createHash } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "football_ai_admin";

export async function isAdminAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value === getAdminToken();
}

export async function setAdminAuth() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, getAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminAuth() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function checkAdminPassword(password: string) {
  return password === getAdminPassword();
}

export function getAdminPasswordHint() {
  return process.env.ADMIN_PASSWORD ? "已使用环境变量 ADMIN_PASSWORD" : "本地预览默认密码：admin123";
}

function getAdminToken() {
  const secret = process.env.AUTH_SECRET || "football-ai-preview-secret";
  return createHash("sha256").update(`${secret}:${getAdminPassword()}`).digest("hex");
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}
