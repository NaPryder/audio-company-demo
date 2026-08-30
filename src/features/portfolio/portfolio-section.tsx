import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";

import { PROJECTS } from "./data";
import { ProjectCard } from "./project-card";

/**
 * กริดไม่สมมาตรของ Home - ลำดับใน array กำหนดตำแหน่ง ตัวแรกคือใบใหญ่
 *
 * desktop คอลัมน์เป็น fr ตามสัดส่วน 752:364 ไม่ใช่ px ตายตัว
 * เพราะ container กว้าง 1140 เฉพาะตอน viewport ≥ 1440 - ระหว่าง 1024 ถึง 1440 มันหด
 */
export function PortfolioSection() {
  const [feature, ...rest] = PROJECTS;

  return (
    <section className="mx-auto max-w-site px-6 pt-16 lg:px-[150px] lg:pt-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow="SELECTED WORK" title="ผลงานติดตั้ง" />
        <Link
          href="/portfolio"
          className="inline-flex h-[52px] w-full items-center justify-center rounded-sm border border-burgundy text-[16px]/[24px] font-bold text-burgundy lg:w-[186px]"
        >
          ดูผลงานทั้งหมด
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[752fr_364fr] lg:grid-rows-2">
        <ProjectCard
          project={feature}
          size="lg"
          className="h-[380px] lg:row-span-2 lg:h-[520px]"
        />
        {rest.slice(0, 2).map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className="h-[292px] lg:h-[248px]"
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {rest.slice(2).map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className="h-[292px] lg:h-[310px]"
          />
        ))}
      </div>
    </section>
  );
}
