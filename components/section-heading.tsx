import Link from "next/link";

export function SectionHeading({ title, eyebrow, href, level = 2 }: { title: string; eyebrow?: string; href?: string; level?: 1 | 2 }) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? <div className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-turf">{eyebrow}</div> : null}
        <Heading className="text-xl font-semibold text-white sm:text-2xl">{title}</Heading>
      </div>
      {href ? (
        <Link href={href} className="text-sm text-turf hover:text-white">
          查看更多
        </Link>
      ) : null}
    </div>
  );
}
