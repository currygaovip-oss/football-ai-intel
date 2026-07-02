const defaultAnalyticsEndpoint = "https://api.lyzbvip.vip/website-events";
const analyticsOrigin = getOrigin(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || defaultAnalyticsEndpoint);

/** @type {import('next').NextConfig} */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://upload.wikimedia.org",
  "font-src 'self' data:",
  `connect-src 'self'${analyticsOrigin ? ` ${analyticsOrigin}` : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join("; ");

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/hot",
        destination: "/schedule",
        permanent: true
      }
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Content-Security-Policy", value: csp }
        ]
      }
    ];
  }
};

export default nextConfig;

function getOrigin(value) {
  if (!value) return "";
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
