import Link from "next/link";

import { company } from "@/features/contact/company";
import { NAV_LINKS } from "@/lib/nav";

import { MobileMenu } from "./mobile-menu";

/**
 * sticky พื้น deep navy ทึบตลอด ไม่มีปุ่ม CTA (design ชุด Redesign ตัดออก)
 *
 * `--ring` ถูก override เป็นสีขาวเฉพาะใน header เพราะ ring สี maroon
 * บนพื้น deep navy แทบมองไม่เห็น - สเปกกำหนดแค่ระยะ offset ไม่ได้กำหนดสีบนพื้นเข้ม
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-deep-navy [--ring:var(--surface)]">
      <div className="mx-auto flex h-[68px] max-w-site items-center justify-between px-6 lg:h-[76px] lg:px-[150px]">
        <Link href="/" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-11 shrink-0 place-items-center rounded-sm bg-maroon text-[15px]/[20px] font-bold text-surface"
          >
            OB
          </span>
          <span className="flex flex-col">
            <span className="text-[13px]/[18px] font-bold text-surface lg:text-[15px]/[20px]">
              {company.name}
            </span>
            <span className="text-[10px]/[14px] text-card-meta lg:text-[11px]/[16px]">
              {company.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="เมนูหลัก" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[16px]/[24px] font-bold text-surface hover:text-card-meta"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileMenu links={NAV_LINKS} />
      </div>
    </header>
  );
}
