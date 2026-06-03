import type { Metadata } from "next";
import Link from "next/link";
import { SeoTopicLinks } from "@/components/seo-topic-links";
import { getDataSourceInfo } from "@/lib/data";
import { seoTopics } from "@/lib/seo-topics";
import { createMetadata, itemListJsonLd, jsonLd, webPageJsonLd } from "@/lib/seo";
import { getCityTicketPath, ticketBasePath } from "@/lib/world-cup-tickets";
import {
  getHostCityPath,
  getPlayerPath,
  getTeamPath,
  getWorldCupFixturePath,
  getWorldCupMatches,
  getWorldCupPlayerEntries,
  getWorldCupTeamEntries,
  hostCities,
  worldCupBasePath
} from "@/lib/world-cup";

const path = `${worldCupBasePath}/index`;
const description = "世界杯2026长尾内容索引，按赛程、比赛、球队、球员、城市、门票和专题整理所有重点入口。";

export const metadata: Metadata = createMetadata({
  title: "世界杯2026长尾内容索引：赛程、球队、城市、门票与球员",
  description,
  path
});

export default function WorldCupIndexPage() {
  const matches = getWorldCupMatches();
  const teams = getWorldCupTeamEntries();
  const players = getWorldCupPlayerEntries();
  const dataSource = getDataSourceInfo();
  const featuredMatches = matches.slice(0, 24);
  const featuredTopics = seoTopics.filter((topic) => topic.slug.startsWith("world-cup") || topic.slug === "north-america-world-cup" || topic.slug === "world-cup-team-lineups").slice(0, 24);

  const itemList = [
    ...featuredTopics.map((topic) => ({ name: topic.title, path: `/topics/${topic.slug}` })),
    ...teams.slice(0, 16).map((team) => ({ name: `${team.name}世界杯赛程`, path: getTeamPath(team.slug) })),
    ...hostCities.map((city) => ({ name: `${city.name}世界杯赛程`, path: getHostCityPath(city.slug) })),
    ...players.slice(0, 16).map((player) => ({ name: `${player.name}世界杯2026看点`, path: getPlayerPath(player.slug) })),
    ...featuredMatches.map((match) => ({ name: `${match.home_team} vs ${match.away_team}`, path: getWorldCupFixturePath(match) }))
  ];

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(webPageJsonLd({ name: "世界杯2026长尾内容索引", description, path, dateModified: dataSource.exportedAt })) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(itemListJsonLd({ name: "世界杯2026长尾内容索引", path, items: itemList }))
        }}
      />

      <section className="rounded-lg border border-turf/20 bg-turf/[0.055] p-5 sm:p-7">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-turf">World Cup Index</div>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-5xl">世界杯2026长尾内容索引</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/64">
          按搜索意图整理世界杯赛程、单场比赛、热门球队、重点球员、举办城市、门票信息和专题问答，方便中文球迷与搜索引擎快速发现重点入口。
        </p>
        <div className="mt-5 grid gap-2 text-xs text-white/50 sm:grid-cols-3">
          <span>比赛 {dataSource.matchCount} 场</span>
          <span>观点 {dataSource.predictionCount} 条</span>
          <span>复盘 {dataSource.reviewCount} 条</span>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <IndexIntent title="时间与赛程搜索">
          承接世界杯赛程、北京时间、比赛时间、揭幕战、决赛、小组赛和淘汰赛等查询。
        </IndexIntent>
        <IndexIntent title="球队与球员搜索">
          承接阿根廷、巴西、法国、梅西、姆巴佩、贝林厄姆等球队与球员长尾入口。
        </IndexIntent>
        <IndexIntent title="城市与门票搜索">
          承接墨西哥城、纽约/新泽西、洛杉矶、达拉斯、多伦多、温哥华等城市和门票查询。
        </IndexIntent>
      </section>

      <IndexSection title="世界杯专题入口">
        {featuredTopics.map((topic) => <IndexLink key={topic.slug} href={`/topics/${topic.slug}`} label={topic.title} />)}
      </IndexSection>

      <IndexSection title="热门球队赛程">
        {teams.slice(0, 24).map((team) => <IndexLink key={team.slug} href={getTeamPath(team.slug)} label={`${team.name}世界杯赛程`} />)}
      </IndexSection>

      <IndexSection title="举办城市与门票">
        {hostCities.map((city) => <IndexLink key={city.slug} href={getHostCityPath(city.slug)} label={`${city.name}世界杯赛程`} />)}
        {hostCities.filter((city) => city.highlight).map((city) => <IndexLink key={`ticket-${city.slug}`} href={getCityTicketPath(city.slug)} label={`${city.name}世界杯门票`} tone="gold" />)}
        <IndexLink href={ticketBasePath} label="世界杯门票信息总览" tone="gold" />
      </IndexSection>

      <IndexSection title="重点球员看点">
        {players.slice(0, 24).map((player) => <IndexLink key={player.slug} href={getPlayerPath(player.slug)} label={`${player.name}世界杯2026看点`} />)}
      </IndexSection>

      <IndexSection title="重点比赛入口">
        {featuredMatches.map((match) => <IndexLink key={match.id} href={getWorldCupFixturePath(match)} label={`${match.home_team} vs ${match.away_team}`} />)}
      </IndexSection>

      <SeoTopicLinks />
    </div>
  );
}

function IndexIntent({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/62">{children}</p>
    </div>
  );
}

function IndexSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-white/10 bg-black/20 p-5">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
}

function IndexLink({ href, label, tone = "green" }: { href: string; label: string; tone?: "green" | "gold" }) {
  return (
    <Link
      href={href}
      className={`rounded-lg border px-3 py-2 text-sm transition ${
        tone === "gold"
          ? "border-gold/20 bg-gold/[0.055] text-gold hover:bg-gold/10"
          : "border-white/10 bg-white/[0.035] text-white/70 hover:border-turf/35 hover:text-turf"
      }`}
    >
      {label}
    </Link>
  );
}
