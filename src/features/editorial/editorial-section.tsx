import { SectionHeading } from "@/components/layout/section-heading";

import { ArticleCard } from "./article-card";
import { ARTICLES, VIDEOS } from "./data";
import { VideoCard } from "./video-card";

export function EditorialSection() {
  const [feature, ...rest] = ARTICLES;

  return (
    <section className="mx-auto max-w-site px-6 pt-16 lg:px-[150px] lg:pt-24">
      <SectionHeading eyebrow="FROM THE FIELD" title="ความรู้จากการทำงานจริง" />

      <div className="mt-10 grid gap-6 lg:grid-cols-[729fr_387fr] lg:grid-rows-2">
        <ArticleCard
          article={feature}
          size="lg"
          className="h-[360px] lg:row-span-2 lg:h-[464px]"
        />
        {rest.map((article) => (
          <ArticleCard
            key={article.title}
            article={article}
            className="h-[286px] lg:h-[220px]"
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {VIDEOS.map((video) => (
          <VideoCard
            key={video.youtubeId}
            video={video}
            className="h-[286px] lg:h-[300px]"
          />
        ))}
      </div>
    </section>
  );
}
