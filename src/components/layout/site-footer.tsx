import Link from "next/link";

import { company } from "@/features/contact/company";
import { NAV_LINKS } from "@/lib/nav";

/**
 * ข้อความในนี้เขียนขึ้นใหม่ ไม่ได้ลอกจาก design
 * บรรทัด `ข้อมูลบริษัท ลิงก์ และข้อความทางกฎหมายต้องได้รับการอนุมัติก่อน production`
 * ใน Figma เป็นโน้ตของคนออกแบบ ไม่ใช่ copy ของเว็บ
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-navy text-surface [--ring:var(--surface)]">
      <div className="mx-auto max-w-site px-6 py-12 lg:px-[150px] lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="lg:w-[360px]">
            <p className="text-[18px]/[25px] font-bold">{company.name}</p>
            <p className="mt-2 text-[13px]/[19px] text-card-meta">{company.tagline}</p>
            <p className="mt-4 text-[13px]/[19px] text-card-meta">
              <a href={`tel:${company.phone}`} className="hover:text-surface">
                {company.phoneDisplay}
              </a>
              {" · "}
              <a href={`mailto:${company.email}`} className="hover:text-surface">
                {company.email}
              </a>
            </p>
          </div>

          <nav aria-label="ลิงก์ท้ายเว็บ" className="lg:w-[420px]">
            <ul className="flex flex-col gap-3 lg:flex-row lg:justify-end lg:gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px]/[22px] font-bold hover:text-card-meta">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="text-[15px]/[22px] font-bold hover:text-card-meta">
                  ประกาศความเป็นส่วนตัว
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-[12px]/[18px] text-card-meta">
          © {year} {company.name}
        </p>
      </div>
    </footer>
  );
}
