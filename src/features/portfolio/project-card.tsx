import Image from "next/image";

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

export function ProjectCard({ project, size = "sm", className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "relative isolate overflow-hidden rounded-sm border border-border bg-card-navy",
        className,
      )}
    >
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={SIZES[size]}
        placeholder="blur"
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-[rgba(3,8,20,0.9)] px-5 py-4">
        <div className={cn("flex flex-col", size === "lg" ? "gap-[7px]" : "gap-[5px]")}>
          <p className="text-[11px]/[16px] font-bold text-card-meta">{project.category}</p>
          <h3
            className={cn(
              "font-bold text-surface",
              size === "lg" ? "text-[25px]/[34px]" : "text-[18px]/[25px]",
            )}
          >
            {project.title}
          </h3>
          {/* `project.client` ซ่อนเสมอใน v1 เพราะ NDA - ค่อยเปิดเป็นราย project (ดู gate.md) */}
        </div>
      </div>
    </article>
  );
}
