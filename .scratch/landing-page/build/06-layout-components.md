# B06 - layout components

Blocked by: B02, B03
Status: todo

container ทุกที่: `mx-auto max-w-[1440px] px-6 lg:px-[150px]`

- `components/layout/site-header.tsx` - sticky พื้น `--deep-navy` · สูง 76/68 · โลโก้ 280×44 / 224×44 ใช้ `COMPANY_NAME` + `COMPANY_TAGLINE` · nav 3 อันจาก `lib/nav.ts` · **ไม่มีปุ่ม CTA** (design ชุดเก่ามี Redesign ตัดออก)
- `components/layout/mobile-menu.tsx` - `"use client"` · `<dialog>` + `showModal()` **ไม่ใช่ shadcn `sheet`**
  ได้ฟรีจาก browser: Esc / focus trap / `::backdrop` / พื้นหลัง inert
  ต้องเพิ่มเอง: `aria-expanded` + `aria-controls` บนปุ่มเปิด · accessible name ของปุ่มปิด · **คืน focus กลับปุ่มเปิดตอนปิด**
- `components/layout/site-footer.tsx` - พื้น `--deep-navy` · desktop แถวเดียว (ชื่อบริษัท 360 + nav 420) + note ล่าง / mobile stack 3 ชั้น
  **ห้ามลอกข้อความ `ข้อมูลบริษัท ลิงก์ และข้อความทางกฎหมายต้องได้รับการอนุมัติก่อน production`** - เป็นโน้ตของคนออกแบบ
- `components/layout/section-heading.tsx` - eyebrow + title + desc · ครอบ eyebrow ด้วย `<span lang="en">` **ที่นี่ครั้งเดียวได้ทั้งหมด**
- `components/layout/page-header.tsx` - `SectionHeading` บนพื้น `--bg` ไม่มีรูป · padding-top 96/64

## Done

screenshot 1440 + 390 เห็น header/footer ถูก · Esc ปิดเมนู · focus กลับปุ่มเปิด
