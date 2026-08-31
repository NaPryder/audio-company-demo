import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** วลีสั้นตัวพิมพ์ใหญ่ - ครอบ lang ให้ที่นี่ที่เดียว ไม่ต้องไปใส่ซ้ำที่ผู้เรียก */
  eyebrow: string;
  /** eyebrow เกือบทุกจุดเป็นอังกฤษ - หน้า /portfolio/[slug] ส่ง "th" เพราะที่นั่นคือหมวดภาษาไทย */
  eyebrowLang?: string;
  /** default "h2" - 5 call site เดิมเป็น section ทั้งหมด ไม่ต้องแก้สักจุด */
  as?: "h1" | "h2" | "h3";
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  eyebrowLang = "en",
  as: Heading = "h2",
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-[10px]", className)}>
      <p className="text-[12px]/[18px] font-bold text-burgundy">
        <span lang={eyebrowLang}>{eyebrow}</span>
      </p>
      <Heading className="text-[31px]/[42px] font-bold text-ink lg:text-[40px]/[52px]">
        {title}
      </Heading>
      {description ? (
        <p className="max-w-[640px] text-[17px]/[28px] text-muted">{description}</p>
      ) : null}
    </div>
  );
}
