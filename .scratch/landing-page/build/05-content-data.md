# B05 - content data model

Blocked by: B04
Status: done

ตาม [spec §7](../spec.md) + ตาราง ⚠️ ใน §12.
**ทุกค่าที่ทำเครื่องหมาย ⚠️ ให้ใส่ comment `// ⚠️ ยังไม่ยืนยันกับ Figma` คาไว้ในโค้ด**

- `features/portfolio/types.ts` - `PROJECT_CATEGORIES` 6 ค่า `as const` · `ProjectCategory` · `Project { slug, title, category, image, imageAlt, client? }`
- `features/portfolio/data.ts` - 6 โครงการเรียงตามตาราง §12. **ลำดับใน array กำหนดตำแหน่ง ตัวแรกคือใบใหญ่ ไม่มี field `featured`**
- `features/brands/{types,data}.ts` - `Brand { name, logo: StaticImageData | null }` · 12 ตัวเรียงตาม spec §7 · 6 ตัวแรกมี logo อีก 6 เป็น `null`
- `features/editorial/{types,data}.ts` - `Article { title, image, imageAlt }` 3 ชิ้น (⚠️ ทั้งหมด) · `Video { youtubeId, title }` 3 ชิ้น

`StaticImageData` คือ field เดียวที่ต้องแก้ตอน migrate ขึ้น Payload - จำกัดอยู่ใน `data.ts` เท่านั้น
