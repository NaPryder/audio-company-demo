import { ProjectCard } from "./project-card";
import type { Project } from "./types";

/**
 * กริดเท่ากัน 3 คอลัมน์สำหรับหน้า list - ไม่มี filter
 * 1140 − gap 24 × 2 = 1092 ÷ 3 = 364 ซึ่งเท่ากับการ์ดใบเล็กบน Home พอดี
 * จึงใช้ `ProjectCard` ตัวเดิมได้โดยไม่ต้องคิดสัดส่วนรูปใหม่
 */
type ProjectGridProps = {
  projects: Project[];
  /** ระดับหัวข้อของการ์ด - ขึ้นกับว่ากริดถูกวางใต้หัวข้อระดับไหน ดู `ProjectCard` */
  cardAs?: "h2" | "h3";
};

export function ProjectGrid({ projects, cardAs }: ProjectGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          as={cardAs}
          className="h-[292px] lg:h-[310px]"
        />
      ))}
    </div>
  );
}
