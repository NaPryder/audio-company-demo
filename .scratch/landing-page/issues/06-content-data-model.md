# 06 - หน้าตา TypeScript ของ content

Type: grilling
Status: resolved
Blocked by: 02

## Question

Q8 ล็อกไว้ว่า content เป็น typed array ใน `src/features/<feature>/data.ts`.
แต่ยังไม่ได้เคาะว่า type หน้าตายังไง - และ type พวกนี้คือ seam เดียวที่กันไม่ให้ต้องรื้อ component ตอนขึ้น Payload ทีหลัง ดังนั้นตั้งชื่อ field ผิดตอนนี้ = เจ็บตอนนั้น.

ต้องเคาะ shape ของ:

1. **PortfolioItem** - รูป, ชื่อโครงการ, ประเภทห้อง, tag/หมวด (design มี chip สีบนการ์ด), สถานที่, คำบรรยายสั้น. มี `slug` เผื่อหน้า detail ในอนาคตไหม
2. **Article** - ชื่อ, thumbnail, วันที่, หมวด, ลิงก์ปลายทาง (ยังไม่มีหน้า detail ตอนนี้ - ลิงก์ไปไหน)
3. **Video** - YouTube video id, ชื่อ, thumbnail. Q16 เลือก thumbnail + link ดังนั้นต้องมี id ไว้ประกอบ URL และรูป thumbnail
4. **Brand** - ชื่อ, ไฟล์ logo, alt text ภาษาไทย. เอา 6 อันแรก
5. **Company** - ข้อมูลติดต่อจาก ticket 04

คำถามที่คร่อมทุกตัว: **ตอนขึ้น Payload field พวกนี้กลายเป็น collection field ตรง ๆ ได้ไหม** หรือมี field ไหนที่ตอนนี้สะดวกแต่จะเป็นหนี้ทีหลัง (เช่น เก็บ path รูปเป็น string แทนที่จะเป็น media reference).

**ผลลัพธ์ที่ต้องได้**: TypeScript type ทุกตัวเขียนเสร็จ พร้อมหมายเหตุ mapping ไป Payload collection.

## Answer

### ที่อยู่ของไฟล์ (ตาม Q15 feature folder)

```
src/features/
  portfolio/  types.ts  data.ts  project-card.tsx  portfolio-section.tsx
  brands/     types.ts  data.ts  brand-grid.tsx    brands-section.tsx
  editorial/  types.ts  data.ts  article-card.tsx  video-card.tsx  editorial-section.tsx
  contact/    company.ts  contact-section.tsx
  lead-form/  schema.ts  action.ts  rate-limit.ts  lead-form.tsx  lead-email.tsx
```

รูปวางไว้ข้าง `data.ts` ที่ import มัน (`src/features/portfolio/images/`) ไม่ใช่ `public/` - เพราะ Q3 เลือก static import.
ยกเว้นโลโก้แบรนด์กับ favicon ที่อยู่ `public/` ตามปกติ.

### Types

```ts
import type { StaticImageData } from "next/image";

/* ---------- Portfolio ---------- */
export const ROOM_TYPES = [
  "ห้องประชุม",
  "หอประชุม",
  "พื้นที่อบรม",
  "พื้นที่อเนกประสงค์",
] as const;
export type RoomType = (typeof ROOM_TYPES)[number];

export type Project = {
  slug: string;          // ยังไม่ใช้ v1 - เตรียมไว้ให้ /portfolio/[slug] (ticket 09)
  title: string;
  roomType: RoomType;
  image: StaticImageData;
  imageAlt: string;
  client?: string;       // ซ่อนเสมอใน v1 เพราะ NDA (ticket 04)
};

/* ---------- Editorial ---------- */
export type Article = {
  title: string;
  image: StaticImageData;
  imageAlt: string;
};                       // ไม่มี url / slug - Q1 เลือกกดไม่ได้

export type Video = {
  youtubeId: string;
  title: string;
};                       // thumbnail มาจาก YouTube (Q2 ก)

/* ---------- Brands ---------- */
export type Brand = {
  name: string;
  logo: StaticImageData | null;   // null → ใช้ fallback ที่ design เตรียมไว้
};
```

**ไม่มี field `featured`**. กริดไม่สมมาตรบน Home (1 ใหญ่ + 2 + 3) ใช้**ลำดับใน array** - ตัวแรกคือใบใหญ่.
เพิ่ม boolean เข้ามาจะเปิดโอกาสให้มีสองตัว หรือไม่มีเลย ซึ่งเป็นสถานะที่ layout รับไม่ได้อยู่ดี.

### Q2 = (ก) `youtubeId` - ผลที่ตามมาที่ต้องจัดการ

ผมแนะนำ (ข) ผู้ใช้เลือก (ก). บันทึกพร้อมสิ่งที่ต้องเพิ่มเพราะการเลือกนี้:

1. **`next.config.ts` ต้องเปิด remote pattern**
```ts
images: { remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }] }
```

2. **`maxresdefault.jpg` ไม่มีทุกวิดีโอ** - มีเฉพาะที่อัปโหลดเป็น HD. วิดีโอเก่าจะได้ 404 แล้วการ์ดว่าง

| ไฟล์ | ขนาด | สัดส่วน | มีเสมอ |
|---|---|---|---|
| `maxresdefault.jpg` | 1280×720 | 16:9 | ❌ |
| `sddefault.jpg` | 640×480 | 4:3 | ❌ |
| `hqdefault.jpg` | 480×360 | **4:3 มีแถบดำ** | ✅ |
| `mqdefault.jpg` | 320×180 | 16:9 | ✅ |

การ์ดวิดีโอกว้าง 366 (desktop) / 342 (mobile) → `mqdefault` 320px **เล็กเกินไป** และ `hqdefault` มีแถบดำที่จะโผล่เข้ามาในกรอบ `object-cover`

**ทางที่เลือก**: ใช้ `maxresdefault.jpg` เป็นหลัก + `onError` ฝั่ง client ตกไปที่ `hqdefault.jpg`
ยอมรับได้เพราะวิดีโอเป็นของบริษัทเองที่อัปโหลดยุคนี้ - เกือบทั้งหมดจะมี `maxresdefault`
→ ทำให้ `VideoCard` ต้องเป็น client component (`"use client"`) ตัวเดียวในหน้า

3. **ต้นทุน image optimization** - รูป YouTube ผ่าน `next/image` จะถูก Vercel optimize ซึ่งคิดเงิน. ตัดสินใน ticket 07 ว่าจะ `unoptimized` ไหม

### Q3 = static import - เหตุผลที่คุ้ม

`next/image` ได้ `width` / `height` / `blurDataURL` มาเองอัตโนมัติ ไม่ต้องพิมพ์ขนาด ไม่มี layout shift ได้ blur placeholder ฟรี
และ **path ผิดจะพังตอน build ไม่ใช่ตอนลูกค้าเปิดหน้าแล้วเจอรูปแตก**

### ⚠️ ยังยืนยันไม่ได้: สมาชิกของ `RoomType`

ยืนยันจาก Figma ได้แค่ตัวเดียวคือ `ห้องประชุม` (`36:8912`) ก่อนชน rate limit.
อีก 5 ตัวเดาจากชื่อ node (`หอประชุม`, `พื้นที่อบรม`, `พื้นที่อเนกประสงค์` ...) - **ต้องดึง `Project type` ของ `36:8923` `36:8933` `36:8944` `36:8954` `36:8964` มายืนยันก่อนเขียนจริง**
โครงสร้าง (union) ตัดสินแล้ว เหลือแค่รายชื่อสมาชิก

### แผนขึ้น Payload

| field | ไปเป็นอะไรใน Payload | เจ็บไหม |
|---|---|---|
| `slug` | text + unique index | ไม่ |
| `title` `imageAlt` `name` | text | ไม่ |
| `roomType` | select ใช้ option ชุดเดียวกับ `ROOM_TYPES` | ไม่ |
| `youtubeId` | text | ไม่ |
| `client` | text optional | ไม่ |
| **`image: StaticImageData`** | **upload relation → เปลี่ยนเป็น URL string** | **ใช่ - จุดเดียว** |

`StaticImageData` คือ field เดียวที่ต้องแก้ตอน migrate. มันถูกจำกัดอยู่ใน `data.ts` เท่านั้น
ส่วน component รับผ่าน prop ที่ประกาศ type ไว้ - เปลี่ยน type ที่ `types.ts` จุดเดียว TypeScript จะชี้ทุกที่ที่ต้องตามแก้ให้เอง.
นี่คือ seam ที่ตั้งใจไว้ตั้งแต่ Q8 และมันทำงานตามที่ออกแบบ.

---
🔧 **แก้ไขโดย [ticket 07](07-asset-and-seo-strategy.md)**: ข้อ 1 ของหัวข้อ "Q2 = (ก) ผลที่ตามมา" **ยกเลิก** - thumbnail YouTube ใช้ `<img>` ธรรมดาไม่ใช่ `next/image` จึง**ไม่ต้องเปิด `images.remotePatterns` และไม่ต้องแตะ `next.config`**.
ข้อ 2 (`onError` fallback) และข้อ 3 (`VideoCard` เป็น client component) ยังใช้ตามเดิม.

---
🔧 **แก้ไขจากการดึง Figma รอบเพิ่มเติม**:
1. **`RoomType` ตั้งชื่อผิด** - ค่าจริงปนกันระหว่างประเภทห้อง (`ห้องประชุม`, `ห้องอบรม`) กับประเภทระบบ (`ระบบควบคุม`) → เปลี่ยนเป็น **`ProjectCategory`** และ field เป็น `category`
2. **`พื้นที่อบรม` ที่เดาไว้ผิด** - ค่าจริงคือ **`ห้องอบรม`**
3. **ชื่อ node ไม่ตรงกับข้อความจริง** - `Redesign Project / ระบบควบคุมและจอแสดงผล` มีข้อความจริงว่า `ระบบควบคุมเสียง` → copy ทุกจุดที่บันทึกจากชื่อ node ต้องยืนยันใหม่
