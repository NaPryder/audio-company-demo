import { ArticleCard } from "./article-card";
import type { Article } from "./types";

/** กริดเท่ากัน 3 คอลัมน์ - สัดส่วนเดียวกับ `ProjectGrid` */
export function ArticleGrid({ articles, cardAs }: { articles: Article[]; cardAs?: "h2" | "h3" }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          key={article.slug}
          article={article}
          as={cardAs}
          className="h-[292px] lg:h-[310px]"
        />
      ))}
    </div>
  );
}
