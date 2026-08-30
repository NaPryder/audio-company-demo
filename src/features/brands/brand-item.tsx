import type { Brand } from "./types";

/**
 * `<img>` ธรรมดา ไม่ใช่ `next/image` เพราะโลโก้เป็น SVG
 * ซึ่ง optimizer ของ Next ปฏิเสธถ้าไม่เปิด `images.dangerouslyAllowSVG`
 * และการเปิดตัวนั้นแปลว่ายอมให้ SVG ที่มี script วิ่งผ่านได้ (ดู gate.md)
 */
export function BrandItem({ brand }: { brand: Brand }) {
  return (
    <li className="flex h-[112px] items-center justify-center rounded-sm border border-border bg-surface px-4">
      {brand.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logo}
          alt={brand.name}
          width={156}
          height={70}
          loading="lazy"
          className="max-h-[70px] w-[156px] object-contain"
        />
      ) : (
        <>
          <span lang="en" className="text-[12px]/[18px] text-muted">
            Logo unavailable
          </span>
          <span className="sr-only">{brand.name}</span>
        </>
      )}
    </li>
  );
}
