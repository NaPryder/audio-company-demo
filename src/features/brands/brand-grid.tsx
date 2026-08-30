import { BrandItem } from "./brand-item";
import type { Brand } from "./types";

/**
 * component เดียวรับ array - Home ส่ง 6 ตัว หน้า /brands ส่งทั้ง 12
 * จำนวนแถวจึงมาจากจำนวนสมาชิกเอง ไม่ต้องมี prop มาบอก
 *
 * ตัวเลขลงตัวพอดีทั้งสอง breakpoint:
 * desktop (1140 − 12 × 5) ÷ 6 = 180 · mobile (342 − 10) ÷ 2 = 166
 */
export function BrandGrid({ brands }: { brands: Brand[] }) {
  return (
    <ul className="grid grid-cols-2 gap-[10px] lg:grid-cols-6 lg:gap-3">
      {brands.map((brand) => (
        <BrandItem key={brand.name} brand={brand} />
      ))}
    </ul>
  );
}
