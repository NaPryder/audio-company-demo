import Link from "next/link";

import { cn } from "@/lib/utils";

const TABS = [
  { href: "/knowledge", label: "บทความ" },
  { href: "/knowledge/videos", label: "วิดีโอ" },
] as const;

/**
 * แท็บเป็นลิงก์ไปคนละ route ไม่ใช่ ARIA tablist - ทั้งสองหน้าเป็น static และแชร์ลิงก์ได้
 * จึงใช้ `<nav>` + `aria-current` ตามความหมายจริงของมัน
 */
export function KnowledgeTabs({ current }: { current: (typeof TABS)[number]["href"] }) {
  return (
    <nav aria-label="ประเภทเนื้อหา" className="flex gap-6 border-b border-border">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab.href === current ? "page" : undefined}
          className={cn(
            "-mb-px border-b-2 pb-3 text-[16px]/[24px] font-bold",
            tab.href === current
              ? "border-burgundy text-ink"
              : "border-transparent text-muted hover:text-ink",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
