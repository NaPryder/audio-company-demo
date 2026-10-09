import Image from "next/image";
import Link from "next/link";

/**
 * มือถือ: รูปเต็มพื้นหลัง + overlay rgba(3, 8, 20, 0.6) - ความทึบขั้นต่ำ ห้ามต่ำกว่านี้
 * คำนวณจากกรณีตัวอักษรขาวตกทับส่วนที่สว่างที่สุดของรูป (ticket 10)
 *
 * desktop: ตาม reference (.scratch/landing-page/reference-hero.webp) - พื้น deep-navy
 * รูปลอยด้านขวา เว้นขอบขวาเท่า gutter ของเนื้อหา (150px) ขอบซ้าย/ล่าง/ขวาจางด้วย CSS mask แทน overlay ข้อความส่วนใหญ่จึงตกบนพื้นทึบ
 */
export function Hero() {
  return (
    <section className="relative isolate h-[540px] overflow-hidden bg-deep-navy lg:h-[650px]">
      <div className="absolute inset-0 lg:right-[150px] lg:left-[33%] lg:mask-b-from-75% lg:mask-l-from-55% lg:mask-r-from-85%">
        <Image
          src="/hero/hero-image.webp"
          alt="ห้องประชุมที่ติดตั้งระบบเสียงและภาพ"
          fill
          priority
          sizes="(min-width: 1024px) 67vw, 100vw"
          className="object-cover object-[60%_center]"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[rgba(3,8,20,0.6)] lg:hidden" />

      <div className="relative mx-auto h-full max-w-site px-6 pt-[132px] lg:px-[150px] lg:pt-[184px]">
        <div className="flex max-w-[342px] flex-col gap-[18px] text-surface lg:max-w-[790px] lg:gap-[22px]">
          <p className="text-[12px]/[20px] font-bold lg:text-[14px]/[20px]">
            ออกแบบ • จัดหา • ติดตั้ง • ทดสอบระบบ
          </p>
          <h1 className="text-[40px]/[50px] font-bold lg:text-[66px]/[78px]">
            <span className="lg:hidden">ระบบเสียงที่ออกแบบเพื่อพื้นที่จริง</span>
            <span className="hidden lg:inline">
              ระบบเสียงคุณภาพ
              <br />
              ที่ออกแบบเพื่อพื้นที่จริง
            </span>
          </h1>
          <p className="text-[17px]/[28px] lg:text-[20px]/[32px]">
            นำเสนอผลงานติดตั้งและแนวทางการทำงาน เพื่อช่วยให้คุณเห็นภาพระบบที่เหมาะกับโครงการ
          </p>
          <Link
            href="/portfolio"
            className="mt-1 inline-flex h-[52px] w-[178px] items-center justify-center rounded-sm bg-surface text-[16px]/[24px] font-bold text-burgundy lg:w-[186px]"
          >
            ดูผลงานติดตั้ง
          </Link>
        </div>
      </div>
    </section>
  );
}
