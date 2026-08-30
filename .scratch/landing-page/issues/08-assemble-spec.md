# 08 - ประกอบร่างเป็นสเปกฉบับสุดท้าย

Type: task
Status: resolved
Blocked by: 01, 02, 03, 04, 05, 06, 07, 09, 10, 11

## Question

นี่คือ ticket ที่ผลิตตัว destination เอง.
รวมทุกอย่างที่ตัดสินไปแล้วเป็นเอกสารเดียวที่ session ใหม่อ่านแล้วลงมือได้เลย ไม่ต้องย้อนกลับมาอ่าน ticket ทีละใบ.

ต้องมี:

1. **Stack + version ที่ pin แล้ว** และคำสั่ง scaffold (`pnpm create next-app` พร้อม flag ที่ตรงกับที่ตัดสินไว้)
2. **โครงสร้างไฟล์เต็ม** แบบ feature folder ตาม Q15 - ทุกไฟล์ที่ต้องมี พร้อมหน้าที่ของแต่ละอัน
3. **`@theme` block** จาก ticket 01 วางได้ทันที
4. **สเปกราย section** 8 อัน จาก ticket 02 พร้อมพฤติกรรม responsive
5. **สัญญาของ lead form** - Zod schema, ลายเซ็น server action, template อีเมล, กติกา rate limit, ทุก state จาก ticket 03
6. **type ของ content** จาก ticket 06
7. **รายการ env var** ทั้งหมดพร้อมคำอธิบาย
8. **checklist ก่อน deploy** - verify โดเมนกับ Resend, ตั้ง env บน Vercel, `.nvmrc` = 26 (dev) แต่ Vercel Functions จะเป็น 24 - ต้อง build ทดสอบด้วย 24 ก่อน deploy

**ผลลัพธ์ที่ต้องได้**: `.scratch/landing-page/spec.md`. เขียนเสร็จเมื่อไหร่ map จบ.

## Answer

เขียนเสร็จที่ **[`.scratch/landing-page/spec.md`](../spec.md)** (565 บรรทัด, 12 หัวข้อ)

ครอบคลุมครบตามที่ ticket กำหนด: stack + version ที่ pin แล้ว · คำสั่ง scaffold · โครงสร้างไฟล์เต็ม ·
บล็อก `:root` + `@theme inline` วางได้ทันที · type scale + spacing ทั้ง 2 breakpoint ·
สเปก 8 section ของ Home + 4 route ที่เหลือ · สัญญาของ lead form ครบ (Zod, server action, a11y, rate limit, ข้อความ error) ·
content type · assets + SEO · รายการ env · และ checklist ก่อน deploy

รวมคำตอบจาก ticket 01-07 และ 09-11 ทั้งหมด **โดยใช้ค่าที่แก้ล่าสุดแล้ว** ไม่ใช่ค่าดั้งเดิมที่ถูก supersede:
- radius 2px ไม่ใช่ 12px และไม่มีเงา (01)
- `--muted-fg` = `#5c6472` ไม่ใช่ `#667085` (10 แก้ 01)
- `:root` + `@theme inline` ไม่ใช่ `@theme` ตรง ๆ (05 แก้ 01)
- `submitLead(input)` ไม่ใช่ `useActionState` (05 แก้ 03)
- thumbnail YouTube ใช้ `<img>` ไม่ต้องตั้ง `remotePatterns` (07 แก้ 06)
- Home แสดงแบรนด์ 6 ไม่ใช่ 12 (11 เบี่ยงจาก design โดยตั้งใจ)

TODO ที่ยังค้าง 2 รายการ (ดึง Figma เพิ่ม) และ gate ก่อน deploy 9 ข้อ อยู่ในหัวข้อ 12 ของสเปก
