import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { VIDEOS } from "@/features/knowledge/data";
import { KnowledgeTabs } from "@/features/knowledge/knowledge-tabs";
import { VideoCard } from "@/features/knowledge/video-card";

export const metadata: Metadata = {
  title: "วิดีโอ · ความรู้จากการทำงานจริง",
  description: "วิดีโองานติดตั้งและการใช้งานระบบเสียงและภาพสำหรับห้องประชุม",
  alternates: { canonical: "/knowledge/videos" },
};

export default function KnowledgeVideosPage() {
  return (
    <>
      <PageHeader eyebrow="FROM THE FIELD" title="ความรู้จากการทำงานจริง" />
      <div className="mx-auto max-w-site px-6 pt-10 pb-16 lg:px-[150px] lg:pb-24">
        <KnowledgeTabs current="/knowledge/videos" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {VIDEOS.map((video) => (
            <VideoCard
              key={video.youtubeId}
              video={video}
              as="h2"
              className="h-[286px] lg:h-[310px]"
            />
          ))}
        </div>
      </div>
    </>
  );
}
