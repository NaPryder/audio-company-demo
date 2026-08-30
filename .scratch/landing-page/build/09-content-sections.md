# B09 - Portfolio / Brands / Editorial sections

Blocked by: B05, B06
Status: done

`sizes` ทุกจุดตาม [spec §9](../spec.md)

## Portfolio

- `project-card.tsx` (ใช้ร่วม) - พื้น `--card-navy` + border + radius 2px · รูป cover เต็มใบ · แผง `rgba(3,8,20,0.9)` ทับล่าง · เรียง `category / title / client`
  **`client` ซ่อนเสมอใน v1 (NDA)**
- `portfolio-section.tsx` (Home) - กริดไม่สมมาตร
  desktop: แถวบน 1 ใบ 752×520 + stack ขวา 2 ใบ 364×248 · แถวล่าง 3 ใบ 364×310 · gap 24
  mobile: stack เดี่ยว 6 ใบ w=342 · ใบแรก h=380 ที่เหลือ h=292
  หัวข้อ + ปุ่ม `ดูผลงานทั้งหมด` → `/portfolio`
- `project-grid.tsx` - กริดเท่ากัน 3 คอลัมน์ 364px **ไม่มี filter** (ใช้ใน `/portfolio`)

## Brands

- `brand-item.tsx` + `brand-grid.tsx` (ใช้ร่วม) - `logo: null` → fallback `Logo unavailable`
- `brands-section.tsx` (Home) - **6 ตัว** (เบี่ยงจาก design โดยตั้งใจ design วาดไว้ 12)
  desktop 1 แถว × 6 · 180×112 · logo 156×70 · gap 12
  mobile 3 แถว × 2 · 166×112 · gap 10
  **padding-top 80 ไม่ใช่ 96** · ปุ่ม `ดูแบรนด์ทั้งหมด` → `/brands`

## Editorial

- `article-card.tsx` - **กดไม่ได้** ไม่มีหน้าปลายทาง
- `video-card.tsx` - `"use client"` เพราะต้องมี `onError` · `<img>` ธรรมดา **ไม่ใช่ `next/image`** → ไม่ต้องตั้ง `remotePatterns` ไม่ต้องแตะ `next.config`
  `maxresdefault` → `onError` fallback `hqdefault` · คลิกเปิด YouTube · alt = `title`
- `editorial-section.tsx`
  desktop: blog 1 ใหญ่ 729×460 + stack 2 ใบ 387×220 · video 3 ใบ 366×300 เรียงนอน
  mobile: blog 3 ใบ stack (360/286/286) · video 3 ใบ stack (286)
