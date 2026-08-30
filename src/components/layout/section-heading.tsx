import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** วลีอังกฤษสั้นตัวพิมพ์ใหญ่ - ครอบ lang="en" ให้ที่นี่ที่เดียว ไม่ต้องไปใส่ซ้ำที่ผู้เรียก */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-[10px]", className)}>
      <p className="text-[12px]/[18px] font-bold text-burgundy">
        <span lang="en">{eyebrow}</span>
      </p>
      <h2 className="text-[31px]/[42px] font-bold text-ink lg:text-[40px]/[52px]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[640px] text-[17px]/[28px] text-muted">{description}</p>
      ) : null}
    </div>
  );
}
