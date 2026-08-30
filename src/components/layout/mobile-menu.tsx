"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import type { NavLink } from "@/lib/nav";

/**
 * `<dialog>` + `showModal()` ไม่ใช่ shadcn `sheet`
 * browser แถม Esc, focus trap, `::backdrop` และพื้นหลัง inert มาให้ฟรี
 *
 * ที่ต้องเติมเอง: `aria-expanded` + `aria-controls` บนปุ่มเปิด,
 * accessible name ของปุ่มปิด และคืน focus กลับปุ่มเปิดตอนปิด
 * `onClose` ยิงทั้งตอนกดปุ่มปิดและตอนกด Esc จึงคืน focus ได้ครบทั้งสองทาง
 */
export function MobileMenu({ links }: { links: readonly NavLink[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
        className="h-11 w-[62px] shrink-0 rounded-sm border border-white/25 text-[13px]/[19px] font-bold text-surface lg:hidden"
      >
        เมนู
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        onClose={() => {
          setOpen(false);
          openButtonRef.current?.focus();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-deep-navy p-0 text-surface backdrop:bg-black/70"
      >
        <div className="flex h-full flex-col px-6 py-5">
          <div className="flex h-[68px] items-center justify-end">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="h-11 w-[62px] rounded-sm border border-white/25 text-[13px]/[19px] font-bold text-surface"
            >
              ปิดเมนู
            </button>
          </div>
          <nav aria-label="เมนูหลัก" className="mt-6">
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => dialogRef.current?.close()}
                    className="block py-3 text-[25px]/[34px] font-bold text-surface"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
