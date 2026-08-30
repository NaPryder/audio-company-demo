import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";

import { BrandGrid } from "./brand-grid";
import { HOME_BRANDS } from "./data";

/**
 * Home แสดง 6 - เบี่ยงจาก design ที่วาดไว้ 12 โดยตั้งใจ (ticket 11)
 * ผลพลอยได้: 6 ตัวที่มีโลโก้อยู่บน Home ทั้งหมด fallback `Logo unavailable`
 * จึงโผล่เฉพาะใน /brands หน้าแรกไม่มีช่องว่างที่ดูเหมือนเว็บทำไม่เสร็จ
 *
 * padding-top 80 ไม่ใช่ 96 เหมือน section อื่น - ตาม design
 */
export function BrandsSection() {
  return (
    <section className="mx-auto max-w-site px-6 pt-16 lg:px-[150px] lg:pt-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="PARTNER BRANDS"
          title="แบรนด์คู่ค้าที่บริษัทสามารถจัดหาได้"
        />
        <Link
          href="/brands"
          className="inline-flex h-[52px] w-full items-center justify-center rounded-sm border border-burgundy text-[16px]/[24px] font-bold text-burgundy lg:w-[186px]"
        >
          ดูแบรนด์ทั้งหมด
        </Link>
      </div>

      <div className="mt-10">
        <BrandGrid brands={HOME_BRANDS} />
      </div>
    </section>
  );
}
