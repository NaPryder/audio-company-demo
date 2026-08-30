# B03 - env + lib ร่วม

Blocked by: B01
Status: todo

## งาน

- `src/lib/env.ts` - Zod validate env 11 ตัวตาม [spec §11](../spec.md). พังตอน build ไม่ใช่ตอนลูกค้ากดส่งฟอร์ม
- `.env.example` + `.env.local` ใส่ค่า mock ทั้ง 11 ตัวตาม spec §11 ตรง ๆ
- `src/lib/nav.ts` - config ลิงก์ 3 อันใช้ร่วม header / mobile menu / footer
  `ผลงาน → /portfolio` · `แบรนด์ → /brands` · `ติดต่อ → /contact`
- `src/features/contact/company.ts` - อ่าน `COMPANY_*` / `CONTACT_*` จาก env
  **server-side only ห้ามใส่ `NEXT_PUBLIC_`**

## Test

- env schema ปฏิเสธค่าว่างและ URL ผิดรูปแบบ
