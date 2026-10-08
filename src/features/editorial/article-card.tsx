import Image from "next/image";

import { cn } from "@/lib/utils";

import type { Article } from "./types";

const SIZES = {
  lg: "(min-width:1024px) 729px, 100vw",
  sm: "(min-width:1024px) 387px, 100vw",
} as const;

type ArticleCardProps = {
  article: Article;
  size?: keyof typeof SIZES;
  className?: string;
};

/** กดไม่ได้โดยตั้งใจ - v1 ยังไม่มีหน้าปลายทางของบทความ จึงไม่ห่อด้วยลิงก์ */
export function ArticleCard({ article, size = "sm", className }: ArticleCardProps) {
  return (
    <article
      className={cn(
        "relative isolate overflow-hidden rounded-sm border border-border bg-card-navy",
        className,
      )}
    >
      <Image
        src={article.image}
        alt={article.imageAlt}
        fill
        sizes={SIZES[size]}
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-[rgba(3,8,20,0.9)] px-5 py-4">
        <h3
          className={cn(
            "font-bold text-surface",
            size === "lg" ? "text-[25px]/[34px]" : "text-[18px]/[25px]",
          )}
        >
          {article.title}
        </h3>
      </div>
    </article>
  );
}
