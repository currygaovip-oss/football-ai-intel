"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const DEFAULT_ANALYTICS_ENDPOINT = "https://api.lyzbvip.vip/website-events";
const ENDPOINT = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || DEFAULT_ANALYTICS_ENDPOINT;
const SITE_KEY = process.env.NEXT_PUBLIC_ANALYTICS_SITE_KEY;

type AnalyticsPayload = {
  event: string;
  path: string;
  target?: string;
  label?: string;
  referrer?: string;
  title?: string;
  screen?: string;
  visitorId: string;
  sessionId: string;
  metadata?: Record<string, string>;
};

export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const queryString = searchParams.toString();
    sendEvent({
      event: "page_view",
      path: queryString ? `${pathname}?${queryString}` : pathname,
      referrer: document.referrer || ""
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-analytics-event]")
        : null;
      if (!target) return;

      sendEvent({
        event: target.dataset.analyticsEvent || "click",
        path: window.location.pathname,
        target: target.dataset.analyticsTarget || target.getAttribute("href") || "",
        label: target.dataset.analyticsLabel || target.textContent?.trim().slice(0, 80) || "",
        metadata: {
          area: target.dataset.analyticsArea || "",
          type: target.dataset.analyticsType || ""
        }
      });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}

function sendEvent(input: Omit<AnalyticsPayload, "visitorId" | "sessionId">) {
  if (!ENDPOINT || typeof window === "undefined") return;

  const payload: AnalyticsPayload & { siteKey?: string } = {
    ...input,
    visitorId: getStoredId("lyzb_visitor_id", "localStorage"),
    sessionId: getStoredId("lyzb_session_id", "sessionStorage"),
    siteKey: SITE_KEY,
    title: document.title,
    screen: `${window.innerWidth}x${window.innerHeight}`
  };

  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
    mode: "cors"
  }).catch(() => {
    // Analytics should never block page usage.
  });
}

function getStoredId(key: string, storageType: "localStorage" | "sessionStorage") {
  try {
    const storage = window[storageType];
    const current = storage.getItem(key);
    if (current) return current;

    const value = createId();
    storage.setItem(key, value);
    return value;
  } catch {
    return createId();
  }
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
