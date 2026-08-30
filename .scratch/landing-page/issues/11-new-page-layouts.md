# 11 - โครงหน้า /portfolio /brands /contact

Type: grilling
Status: resolved
Blocked by: 06

## Question

โผล่จาก ticket 09 - สาม route นี้ไม่มี design ใน Figma และตัดสินไว้แล้วว่าออกแบบเองจากภาษา Redesign (Q5 ค).
งานคือ**ประกอบของที่มีอยู่แล้ว** ไม่ใช่ออกแบบใหม่จากศูนย์ - token ครบจาก ticket 01, component ครบจาก ticket 02.

ต้องเคาะ:

1. **หัวหน้าเพจ** - Home ขึ้นด้วย Hero รูปเต็มจอ. สามหน้านี้ใช้อะไรแทน?
   design ชุดเก่าที่ถูกลบเคยใช้ `Top bar` สูง 96px แต่นั่นคนละภาษากับ Redesign แล้ว
   ตัวเลือก: แถบ heading ธรรมดาบนพื้น Background · hero ย่อส่วน · ไม่มีหัวเลย เริ่มที่ content ทันที
2. **`/portfolio`** - การ์ด 6 ใบ. ใช้ grid ไม่สมมาตรแบบ Home (1 ใหญ่ + 2 + 3) หรือ grid เท่ากันหมด 3 คอลัมน์?
   มี filter ตามประเภทห้องไหม (ตอนนี้มี `ห้องประชุม`, `หอประชุม`, `พื้นที่อบรม`, `พื้นที่อเนกประสงค์` ฯลฯ)
3. **`/brands`** - 12 แบรนด์ (หรือ 6 ถ้าไฟล์โลโก้ยังไม่ครบ). grid เดียวกับบน Home ขยายเต็มหน้า
   หรือจัดกลุ่มตามประเภทอุปกรณ์? มีคำอธิบายต่อแบรนด์ไหม
4. **`/contact`** - reuse `ContactSection` จาก Home ตรง ๆ ได้เลยไหม หรือต้องปรับ (เช่น Home ใช้ eyebrow `START A CONVERSATION` หน้า contact อาจไม่ต้อง)
5. **section ซ้ำ** - Home มีทั้ง Portfolio, Brands, Contact อยู่แล้ว ตอนนี้มีหน้าแยกอีก
   ต้องตัดสินว่า component ตัวเดียวรับ prop `variant` หรือแยก section (Home) กับ page content ออกจากกัน
6. **`generateMetadata`** ต่อหน้า - title/description ภาษาไทยของแต่ละ route (ประสานกับ ticket 07)

**ผลลัพธ์ที่ต้องได้**: โครง layout ของทั้งสามหน้า ระบุว่าใช้ component ตัวไหนซ้ำ และตัวไหนต้องเขียนใหม่

## Answer

### โครงทั้ง 4 route ที่ไม่ใช่ Home

```
/portfolio            /brands               /contact          /privacy
─────────────         ─────────────         ─────────────     ─────────────
SiteHeader            SiteHeader            SiteHeader        SiteHeader
PageHeader            PageHeader            ContactSection    prose (ข้อความล้วน)
ProjectGrid (6)       BrandGrid (12)        SiteFooter        SiteFooter
SiteFooter            SiteFooter
```

`SiteHeader` sticky พื้น Deep Navy ทุกหน้า (ticket 09)

### 1. `PageHeader` (Q1 ก)

`SectionHeading` เดิม (eyebrow + title + desc) วางบนพื้น `--bg` ไม่มีรูป
padding-top `96px` desktop / `64px` mobile - เท่ากับ section บน Home

**`/contact` ไม่มี `PageHeader`** - `ContactSection` มี eyebrow `START A CONVERSATION` + title ของตัวเองอยู่แล้ว ใส่หัวเพจทับจะซ้ำ

### 2. `/portfolio` - กริดเท่ากัน ไม่มี filter (Q2 ข)

**เลขลงตัวพอดี**: container 1140 − gap 24 × 2 = 1092 ÷ 3 = **364px** ซึ่งเท่ากับความกว้างการ์ดใบเล็กบน Home เป๊ะ
→ ใช้ `ProjectCard` ตัวเดิมได้เลย ไม่ต้องมี variant ใหม่ ไม่ต้องคิดสัดส่วนรูปใหม่

| | desktop | mobile |
|---|---|---|
| คอลัมน์ | 3 | 1 |
| ขนาดการ์ด | 364 × 310 | 342 × 292 |
| gap | 24 | 24 |

**ไม่มี filter**. 6 ใบมองครบในจอเดียว - UI ของ filter กินที่มากกว่าประโยชน์
`roomType` เป็น union อยู่แล้ว (ticket 06) วันที่มี 15+ ชิ้นค่อยเพิ่ม โดยได้รายการตัวเลือกฟรีจาก type

### 3. แบรนด์: Home 6 / `/brands` 12 (Q3 ก)

🔧 **แก้ที่ผมเขียนผิดในคำถาม**: ผมเขียนว่า Home เป็น "2 แถว × 3" - ผิด
รูปที่ถูกคือ **Home = แถวแรกของ design ตรง ๆ**:

| | desktop | mobile |
|---|---|---|
| **Home** (6 แบรนด์) | 1 แถว × 6 · ใบละ 180×112 · gap 12 | 3 แถว × 2 · ใบละ 166×112 · gap 10 |
| **`/brands`** (12 แบรนด์) | 2 แถว × 6 (= grid เต็มตาม design) | 6 แถว × 2 |

ได้ผลพลอยได้ที่ดี: **6 ตัวที่มีโลโก้จริงอยู่บน Home ทั้งหมด** ส่วน fallback `Logo unavailable` โผล่เฉพาะใน `/brands` เท่านั้น - หน้าแรกไม่มีช่องว่างที่ดูเหมือนเว็บทำไม่เสร็จ
`BrandGrid` เป็น component เดียวรับ array - Home ส่ง 6 ตัวแรก หน้า brands ส่งทั้ง 12

ℹ️ นี่คือ**การเบี่ยงจาก design โดยตั้งใจ** - ticket 02 บันทึกไว้ถูกแล้วว่า design วาด Home ไว้ 2×6 = 12

### 4. ผลงาน: Home 6 ตาม design (Q5 ข)

`/portfolio` ซ้ำกับ Home ในตอนนี้ - ยอมรับ
เหตุผลที่ไม่ทำแบบเดียวกับแบรนด์: โลโก้แบรนด์เป็นข้อมูลอ้างอิง เห็น 6 หรือ 12 ให้ความรู้สึกเดียวกัน
แต่ผลงานคือหลักฐานว่าทำงานเป็น ซึ่งเป็นเหตุผลหลักที่คนเข้าเว็บบริษัทรับติดตั้ง - ตัดครึ่งบนหน้าแรกเพื่อให้ปุ่มดูสมเหตุสมผล ไม่คุ้ม

`/portfolio` เป็นหน้าที่**รอโต**: พอมีผลงานชิ้นที่ 7 ขึ้นไป Home แสดง 6 ชิ้นล่าสุด หน้า list แสดงครบ โดยไม่ต้องแก้โค้ดเลย
ส่วนแบรนด์ 12 ตัวคือทั้งหมดที่มี ไม่ได้รออะไร - ตรรกะจึงต่างกัน

### 5. การแชร์ component (Q4 ข)

**แชร์**: `ProjectCard` · `BrandItem` · `BrandGrid` · `SectionHeading` · `SiteHeader` · `SiteFooter` · `ContactSection`
**ไม่แชร์**: section wrapper ของ Home กับ page content

section บน Home = หัวข้อ + ปุ่ม "ดูทั้งหมด" + กริดไม่สมมาตร
หน้า list = หัวเพจ + กริดเท่ากัน ไม่มีปุ่ม
แทบไม่มีอะไรตรงกันนอกจากการ์ด - `variant` จะกลายเป็น `{variant === "home" && ...}` กระจายทั่วไฟล์ อ่านยากกว่าเขียนสอง wrapper ตรงไปตรงมาคนละ ~15 บรรทัด

**`ContactSection` ใช้ซ้ำทั้งดุ้น** ไม่ต้องแตะ - เนื้อหาบน Home กับ `/contact` เหมือนกัน 100%

### ไฟล์ที่เพิ่มจากโครงเดิม

```
src/app/
  portfolio/page.tsx
  brands/page.tsx
  contact/page.tsx
  privacy/page.tsx
src/components/layout/
  page-header.tsx
src/features/portfolio/
  project-grid.tsx        ← กริดเท่ากัน ใช้ในหน้า list
src/features/brands/
  brand-grid.tsx          ← มีอยู่แล้ว รับ array
```

### ⚠️ ยังยืนยันไม่ได้

eyebrow กับ description ของ section Partner Brands ยังไม่เคยดึงจาก Figma (ชน rate limit ตั้งแต่ ticket 04)
`/portfolio` ใช้ `SELECTED WORK` + `ผลงานติดตั้ง` ได้แน่ (ยืนยันแล้ว) แต่ `/brands` มีแค่ title `แบรนด์คู่ค้าที่บริษัทสามารถจัดหาได้` จากชื่อ node - **eyebrow ยังไม่รู้**
รวมกับสมาชิก `RoomType` อีก 5 ตัวจาก ticket 06 → เป็นรายการที่ต้องดึงเพิ่มเมื่อ Figma พร้อม
