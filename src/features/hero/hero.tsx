import Image from "next/image";
import Link from "next/link";

import heroDesktop from "./images/conference-room-hero.jpg";
import heroMobile from "./images/conference-room-hero-mobile.jpg";

/**
 * overlay เป็น CSS ไม่ใช่รูป - รูปใบเดียวกันถูกใช้ในการ์ดผลงานที่ไม่มี overlay
 * ถ้า merge ลงรูปต้องเก็บสองไฟล์ และแก้ความทึบทีหลังไม่ได้
 *
 * rgba(3, 8, 20, 0.6) เป็นความทึบขั้นต่ำ ห้ามต่ำกว่านี้ - คำนวณจากกรณี
 * ตัวอักษรขาวตกทับส่วนที่สว่างที่สุดของรูป (ticket 10)
 *
 * ponytail: desktop กับ mobile เป็นคนละ crop จึงเป็น <Image> สองตัวสลับกันด้วย
 * breakpoint แปลว่า browser โหลดทั้งสองไฟล์เสมอ เพราะ <img> ที่ display:none ก็ยังถูก fetch
 * ทางแก้คือ <picture> + <source media> ซึ่งต้องประกอบ URL ของ /_next/image เองและเสีย
 * placeholder="blur" ไป - คุ้มค่อยทำวันที่รูปจริงเข้ามาแล้ววัด LCP บนมือถือได้
 */
export function Hero() {
  return (
    <section className="relative isolate h-[540px] overflow-hidden lg:h-[650px]">
      <Image
        src={heroMobile}
        alt="ห้องประชุมที่ติดตั้งระบบเสียงและภาพ"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="object-cover lg:hidden"
      />
      <Image
        src={heroDesktop}
        alt="ห้องประชุมที่ติดตั้งระบบเสียงและภาพ"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="hidden object-cover lg:block"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[rgba(3,8,20,0.6)]" />

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
