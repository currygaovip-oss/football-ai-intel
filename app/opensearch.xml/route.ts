import { NextResponse } from "next/server";
import { siteDescription, siteName, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">',
    `<ShortName>${siteName}</ShortName>`,
    `<Description>${siteDescription}</Description>`,
    '<InputEncoding>UTF-8</InputEncoding>',
    `<Image width="64" height="64" type="image/png">${siteUrl}/brand/football-ai-logo-universal.png</Image>`,
    `<Url type="text/html" method="get" template="${siteUrl}/search?q={searchTerms}" />`,
    "</OpenSearchDescription>"
  ].join("");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/opensearchdescription+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
