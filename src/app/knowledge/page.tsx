import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ArticleGrid } from "@/features/knowledge/article-grid";
import { ARTICLES } from "@/features/knowledge/data";
import { KnowledgeTabs } from "@/features/knowledge/knowledge-tabs";

export const metadata: Metadata = {
  title: "ความรู้จากการทำงานจริง",
  description: "บทความเรื่องการวางแผน ออกแบบ และตรวจรับระบบเสียงและภาพสำหรับห้องประชุม",
  alternates: { canonical: "/knowledge" },
};

export default function KnowledgePage() {
  return (
    <>
      <PageHeader eyebrow="FROM THE FIELD" title="ความรู้จากการทำงานจริง" />
      <div className="mx-auto max-w-site px-6 pt-10 pb-16 lg:px-[150px] lg:pb-24">
        <KnowledgeTabs current="/knowledge" />
        <div className="mt-10">
          <ArticleGrid articles={ARTICLES} cardAs="h2" />
        </div>
      </div>
    </>
  );
}
