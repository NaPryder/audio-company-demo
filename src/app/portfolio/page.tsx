import { PageHeader } from "@/components/layout/page-header";
import { PROJECTS } from "@/features/portfolio/data";
import { ProjectGrid } from "@/features/portfolio/project-grid";

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
