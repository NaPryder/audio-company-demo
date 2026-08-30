import type { ReactNode } from "react";

import { SectionHeading } from "./section-heading";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
};

/** หัวเพจของ route ที่ไม่ใช่ Home - `SectionHeading` บนพื้น bg ไม่มีรูป */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-site px-6 pt-16 lg:px-[150px] lg:pt-24">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
    </div>
  );
}
