import { createHash } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "football_ai_admin";
const MAX_LOGIN_FAILURES = 5;
const LOGIN_LOCK_MS = 10 * 60 * 1000;

type LoginFailureState = {
  count: number;
  lockedUntil: number;
};

const loginFailures = new Map<string, LoginFailureState>();

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
  const adminPassword = getAdminPassword();
  return Boolean(adminPassword) && password === adminPassword;
}

export function getAdminPasswordHint() {
  if (process.env.ADMIN_PASSWORD) return "已使用环境变量 ADMIN_PASSWORD";
  if (process.env.NODE_ENV === "production") return "生产环境未配置 ADMIN_PASSWORD，后台登录已禁用。";
  return "本地预览默认密码：admin123";
}

export function isAdminPasswordConfigured() {
  return Boolean(getAdminPassword());
}

export function isLoginAllowed(identifier: string) {
  const state = loginFailures.get(identifier);
  if (!state) return true;
  if (state.lockedUntil > Date.now()) return false;
  if (state.lockedUntil > 0) loginFailures.delete(identifier);
  return true;
}

export function recordFailedLogin(identifier: string) {
  const current = loginFailures.get(identifier);
  const nextCount = (current?.count ?? 0) + 1;
  loginFailures.set(identifier, {
    count: nextCount,
    lockedUntil: nextCount >= MAX_LOGIN_FAILURES ? Date.now() + LOGIN_LOCK_MS : 0
  });
}

export function clearFailedLogins(identifier: string) {
  loginFailures.delete(identifier);
}

function getAdminToken() {
  const secret = process.env.AUTH_SECRET || "football-ai-preview-secret";
  return createHash("sha256").update(`${secret}:${getAdminPassword() ?? "admin-disabled"}`).digest("hex");
}

function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV === "production") return null;
  return "admin123";
}
