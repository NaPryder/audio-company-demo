import { SectionHeading } from "@/components/layout/section-heading";
import { LeadForm } from "@/features/lead-form/lead-form";

import { company } from "./company";

/**
 * ใช้ซ้ำทั้งดุ้นทั้งบน Home และหน้า /contact - เนื้อหาเหมือนกัน 100% ไม่มี prop variant
 *
 * ไม่มี File Upload block - Q4 ตัด field ไฟล์แนบทิ้งทั้งหมด
 * description ก็ตัดคำว่า "หรือแนบแบบห้อง" ออกจาก copy เดิมด้วยเหตุผลเดียวกัน
 *
 * `as` มีไว้เพราะ /contact ไม่ได้ใช้ `PageHeader` - หัวข้อของ section นี้คือ h1 ของหน้านั้น
 */
export function ContactSection({ as = "h2" }: { as?: "h1" | "h2" }) {
  const channels = [
    { label: "อีเมล", value: company.email, href: `mailto:${company.email}` },
    { label: "โทรศัพท์", value: company.phoneDisplay, href: `tel:${company.phone}` },
    { label: "LINE", value: company.lineId, href: null },
  ];

  const socials = [
    { label: "Facebook", href: company.social.facebook },
    { label: "Instagram", href: company.social.instagram },
    { label: "TikTok", href: company.social.tiktok },
  ];

  return (
    <section className="mx-auto max-w-site px-6 pt-16 pb-16 lg:px-[150px] lg:pt-24 lg:pb-24">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="lg:w-[410px] lg:shrink-0">
          <SectionHeading
            as={as}
            eyebrow="START A CONVERSATION"
            title="เล่าให้เราฟังเกี่ยวกับพื้นที่ของคุณ"
            description="ส่งข้อมูลเบื้องต้นเกี่ยวกับพื้นที่ของคุณ เพื่อให้ทีมงานติดต่อกลับและช่วยประเมินแนวทางต่อไป"
          />

          <dl className="mt-8 flex flex-col gap-4">
            {channels.map((channel) => (
              <div key={channel.label}>
                <dt className="text-[12px]/[18px] font-bold text-muted">{channel.label}</dt>
                <dd className="text-[17px]/[28px] text-ink">
                  {channel.href ? (
                    <a href={channel.href} className="hover:text-burgundy">
                      {channel.value}
                    </a>
                  ) : (
                    channel.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-4">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px]/[22px] font-bold text-burgundy underline underline-offset-2"
                >
                  <span lang="en">{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-[666px]">
          <LeadForm contactPhone={company.phoneDisplay} />
        </div>
      </div>
    </section>
  );
}
