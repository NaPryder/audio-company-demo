import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import type { Project } from "./types";

const SIZES = {
  lg: "(min-width:1024px) 752px, 100vw",
  sm: "(min-width:1024px) 364px, 100vw",
} as const;

type ProjectCardProps = {
  project: Project;
  /** ขนาดของการ์ด ไม่ใช่ variant ของหน้า - คุมแค่ type scale, gap และ `sizes` */
  size?: keyof typeof SIZES;
  className?: string;
};

/**
 * กดได้ทั้งใบด้วย stretched link - `<Link>` ครอบเฉพาะ `<h3>` เพื่อให้ accessible name
 * เป็นชื่อโครงการล้วน ไม่ใช่ alt รูป + หมวด + ชื่อ ปนกัน
 *
 * แถบล่างเป็น in-flow (`justify-end`) ไม่ใช่ `absolute` แล้ว เพราะ `::after` ของ stretched link
 * จะยึดกับ ancestor ที่ positioned ตัวใกล้ที่สุด - ถ้าแถบยัง `absolute` พื้นที่กดจะเหลือแค่แถบ
 * รูปจึงถอยไปหลังด้วย `-z-10` แทน (การ์ดมี `isolate` z-index ไม่รั่วออกนอกใบ)
 */
export function ProjectCard({ project, size = "sm", className }: ProjectCardProps) {
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
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={SIZES[size]}
        placeholder="blur"
        className="-z-10 object-cover"
      />
      <div className="bg-[rgba(3,8,20,0.9)] px-5 py-4 transition-colors group-hover:bg-[rgba(3,8,20,0.96)]">
        <div className={cn("flex flex-col", size === "lg" ? "gap-[7px]" : "gap-[5px]")}>
          <p className="text-[11px]/[16px] font-bold text-card-meta">{project.category}</p>
          <h3
            className={cn(
              "font-bold text-surface",
              size === "lg" ? "text-[25px]/[34px]" : "text-[18px]/[25px]",
            )}
          >
            <Link
              href={`/portfolio/${project.slug}`}
              className="outline-none after:absolute after:inset-0"
            >
              {project.title}
            </Link>
          </h3>
          {/* `project.client` ซ่อนเสมอใน v1 เพราะ NDA - ค่อยเปิดเป็นราย project (ดู gate.md) */}
        </div>
      </div>
    </article>
  );
}
