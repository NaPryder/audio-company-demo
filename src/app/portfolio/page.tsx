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
        {/* กริดอยู่ใต้ h1 ของ PageHeader ตรง ๆ ไม่มีหัวข้อ section คั่น การ์ดจึงเป็น h2 */}
        <ProjectGrid projects={PROJECTS} cardAs="h2" />
      </div>
    </>
  );
}
