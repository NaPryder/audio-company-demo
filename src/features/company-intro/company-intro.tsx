import { SectionHeading } from "@/components/layout/section-heading";

/**
 * ⚠️ design ฝั่ง mobile มี capability แค่ 3 อัน - `ระบบภาพ` (node `36:9253`) ไม่มีอยู่
 * สันนิษฐานว่าลบพลาด จึงทำ 4 อันทั้งสอง breakpoint (ticket 02)
 */
const CAPABILITIES = ["ระบบเสียง", "ระบบภาพ", "ระบบประชุม", "ระบบควบคุม"];

export function CompanyIntro() {
  return (
    <section className="mx-auto max-w-site px-6 pt-16 lg:px-[150px] lg:pt-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-[72px]">
        <div className="lg:w-[461px] lg:shrink-0">
          <SectionHeading
            eyebrow="WHAT WE DO"
            title={
              <>
                เชื่อมเทคโนโลยีให้ใช้งานง่าย
                <br />
                และเหมาะกับพื้นที่
              </>
            }
          />
        </div>

        <div className="lg:w-[638px]">
          <p className="text-[17px]/[28px] text-muted lg:text-[18px]/[30px]">
            เราออกแบบ จัดหา ติดตั้ง และทดสอบระบบเสียงและภาพ สำหรับห้องประชุม ห้องอบรม
            และพื้นที่ใช้งานจริง โดยเริ่มจากลักษณะของห้องและวิธีที่คุณใช้งานจริง ก่อนเลือกอุปกรณ์
            ทีมงานดูแลตั้งแต่การวางระบบจนถึงการส่งมอบและแนะนำการใช้งาน
            เพื่อให้เปิดห้องแล้วใช้งานได้ทันที
          </p>

          <ul className="mt-8 flex flex-col gap-3 lg:flex-row lg:gap-6">
            {CAPABILITIES.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2 shrink-0 bg-burgundy" />
                <span className="text-[16px]/[24px] font-bold text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
