import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import type { Article } from "./types";

const SIZES = {
  lg: "(min-width:1024px) 729px, 100vw",
  sm: "(min-width:1024px) 387px, 100vw",
} as const;

type ArticleCardProps = {
  article: Article;
  size?: keyof typeof SIZES;
  /** ระดับหัวข้อ - หน้า /knowledge วางกริดใต้ h1 ตรง ๆ จึงต้องส่ง "h2" ดู `ProjectCard` */
  as?: "h2" | "h3";
  className?: string;
};

/** stretched link แบบเดียวกับ `ProjectCard` - เหตุผลของ `justify-end` กับ `-z-10` อยู่ที่นั่น */
export function ArticleCard({
  article,
  size = "sm",
  as: Heading = "h3",
  className,
}: ArticleCardProps) {
  return (
    <article
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-sm",
        "border border-border bg-card-navy",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
        className,
      )}
    >
      <Image
        src={article.image}
        alt={article.imageAlt}
        fill
        sizes={SIZES[size]}
        className="-z-10 object-cover"
      />
      <div className="bg-[rgba(3,8,20,0.9)] px-5 py-4 transition-colors group-hover:bg-[rgba(3,8,20,0.96)]">
        <Heading
          className={cn(
            "font-bold text-surface",
            size === "lg" ? "text-[25px]/[34px]" : "text-[18px]/[25px]",
          )}
        >
          <Link
            href={`/knowledge/${article.slug}`}
            className="outline-none after:absolute after:inset-0"
          >
            {article.title}
          </Link>
        </Heading>
      </div>
    </article>
  );
}
