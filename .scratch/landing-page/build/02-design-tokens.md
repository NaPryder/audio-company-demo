# B02 - design tokens + font

Blocked by: B01
Status: todo

## งาน

- `src/app/globals.css` = บล็อก `:root` + `@theme inline` จาก [spec §4](../spec.md) **คัดลอกตรง ๆ**
  - radius **2px ทุกขนาด** ไม่ใช่ 12px
  - **ไม่มีเงาเลย** - Redesign ไม่ใช้ `drop-shadow` สักจุด
  - `--muted-fg: #5c6472` **ไม่ใช่ `#667085`** (ค่าเดิมได้ contrast 4.5059:1 เกินเกณฑ์แค่ 0.006)
- `:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px }`
- `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }`
- `src/app/layout.tsx` - `<html lang="th">` + `Noto_Sans_Thai` weight `["400","700"]` subsets `["thai","latin"]` variable `--font-noto-sans-thai` display `swap`
- ไม่มี theme toggle ไม่มี `dark:` ที่ไหนเลย

## Done

หน้าชั่วคราวที่วางกล่องสี token ทุกตัว render สีถูก แล้วลบทิ้ง
