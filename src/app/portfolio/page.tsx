import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PROJECTS } from "@/features/portfolio/data";
import { ProjectGrid } from "@/features/portfolio/project-grid";

export const metadata: Metadata = {
  title: "ผลงานติดตั้ง",
  description:
    "ผลงานออกแบบและติดตั้งระบบเสียงและภาพสำหรับห้องประชุม ห้องอบรม และพื้นที่อเนกประสงค์",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader eyebrow="SELECTED WORK" title="ผลงานติดตั้ง" />
      <div className="mx-auto max-w-site px-6 pt-10 pb-16 lg:px-[150px] lg:pb-24">
        <ProjectGrid projects={PROJECTS} />
      </div>
    </>
  );
}
