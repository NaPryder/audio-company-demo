# 07 - กลยุทธ์รูปภาพและ SEO

Type: grilling
Status: resolved
Blocked by: 02

## Question

Q16 ตัดสินว่า export รูปจาก Figma. แต่ยังไม่ได้ตัดสินว่าจัดการมันยังไง - และ hero คือ LCP element ของหน้า ตัดสินผิดตรงนี้เว็บช้าทั้งหน้า.

ต้องเคาะ:

1. **`next/image` หรือ `<img>`** - Vercel คิดเงินตาม image optimization. รูปที่ export มาแล้วขนาดคงที่ตายตัว การ optimize ตอน runtime อาจไม่ได้อะไรกลับมา เทียบกับ export เป็น WebP ขนาดถูกต้องตั้งแต่แรกแล้วเสิร์ฟตรง
2. **commit รูปเข้า repo ไหม** - รูปห้องประชุมความละเอียดสูงหลายใบ + logo 6 + thumbnail. ประเมินขนาดรวมก่อนตัดสิน
3. **hero ทำ priority / preload ยังไง** และมี LQIP หรือ blur placeholder ไหม
4. **alt text ภาษาไทย** ของทุกรูป - ใครเขียน เก็บไว้ใน data.ts ใช่ไหม
5. **metadata** - title, description, `lang="th"`, canonical, OG image. OG image export จาก Figma เป็นรูปนิ่ง หรือ generate ด้วย `next/og`
6. **structured data** - `LocalBusiness` schema คุ้มไหมสำหรับบริษัทติดตั้งที่ลูกค้าน่าจะหาผ่าน Google

⚠️ asset URL จาก Figma MCP **หมดอายุ 7 วัน** - ต้อง `curl` ลงเครื่องตอน export ห้ามอ้าง URL ตรง ๆ ในโค้ด.

**ผลลัพธ์ที่ต้องได้**: กลยุทธ์รูป, รายการรูปที่ต้อง export พร้อม node id, และบล็อก metadata ที่จะใส่ใน `layout.tsx`.

## Answer

### 1. รูป mood 6 ใบ - export + ล็อก gate (Q1 ก)

design เขียนกำกับตัวเองว่าเป็นภาพชั่วคราวและ **เราไม่รู้ที่มาหรือลิขสิทธิ์**
→ export ลง repo เพื่อพัฒนาและทดสอบ layout ได้ แต่ **ล็อกเป็น gate ใน checklist ของ ticket 08 ว่าห้าม deploy production จนกว่าจะเปลี่ยนครบ**

**รายการ export** (asset URL จาก Figma MCP หมดอายุ 7 วัน - ต้อง `curl` ลงเครื่องทันที ห้ามอ้าง URL ในโค้ด):

| ไฟล์ | node | ขนาดใหญ่สุดที่ถูกใช้ | export ที่ |
|---|---|---|---|
| `conference-room-hero` | `36:8887` | hero 1440×650 | 2880×1300 |
| `conference-room-hero-mobile` | `36:9164` | hero 390×540 | 780×1080 |
| `meeting-room-neutral` | `36:8920` | บทความ 729×460 | 1460×920 |
| `auditorium-red` | `36:8930` | ผลงาน 364×310 | 1460×920 |
| `meeting-presentation` | `36:8941` | ผลงาน 364×310 | 1460×920 |
| `conference-room-elegant` | `36:8951` | บทความ 387×220 | 1460×920 |
| `meeting-room-screen` | `36:8961` | ผลงาน 364×310 | 1460×920 |

hero ต้อง **2 ไฟล์** ไม่ใช่ไฟล์เดียวย่อ - desktop 2.2:1 กับ mobile 0.72:1 เป็นการ crop คนละแบบ ไม่ใช่แค่ย่อขนาด

**โลโก้แบรนด์ 6**: `36:8994` audac · `36:8998` allen-heath · `36:9002` audio-technica · `36:9006` bose · `36:9010` jbl · `36:9014` qsc
⚠️ Figma ให้มาเป็น raster - **โลโก้ควรเอา SVG จาก press kit ของแบรนด์เอง** ไม่ใช่ export จาก Figma. โลโก้ raster บนจอ retina จะเบลอเห็นชัด และ 6 ไฟล์ SVG เล็กกว่า PNG มาก

### 2. thumbnail YouTube = `<img>` ธรรมดา (Q2 ข)

```tsx
<img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
     onError={e => { e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }}
     width={366} height={300} loading="lazy" alt={title} />
```

🔧 **ยกเลิกที่จดไว้ใน ticket 06**: ไม่ต้องเปิด `images.remotePatterns` และไม่ต้องแตะ `next.config` เลย
เหตุผล: thumbnail เป็น JPEG ที่ผ่าน CDN ของ Google มาแล้ว optimize ซ้ำแทบไม่ได้อะไร · Vercel คิดเงินต่อ transformation · และ `VideoCard` ต้องเป็น client component อยู่แล้วเพราะ `onError`

### 3. Hero

- **overlay เป็น CSS ไม่ใช่รูป** - รูปเดียวกันถูกใช้ในการ์ดผลงาน#1 กับวิดีโอ#2 ที่ไม่มี overlay ถ้า merge ลงรูปต้องเก็บสองไฟล์ และแก้ความทึบทีหลังไม่ได้
- `priority` + `fill` + `sizes="100vw"` + `placeholder="blur"` (ได้ฟรีจาก static import ตาม ticket 06)
- ห้ามใส่ `loading="lazy"` ที่ hero - มันคือ LCP element

**ตาราง `sizes`** (container 1140 ใน viewport 1440, ตัดที่ `lg` 1024 ตาม ticket 01):

| ที่ใช้ | `sizes` |
|---|---|
| hero | `100vw` |
| ผลงานใบใหญ่ | `(min-width:1024px) 752px, 100vw` |
| ผลงานใบเล็ก | `(min-width:1024px) 364px, 100vw` |
| บทความใบใหญ่ | `(min-width:1024px) 729px, 100vw` |
| บทความใบเล็ก | `(min-width:1024px) 387px, 100vw` |

### 4. OG image เดียว static (Q4 ก)

1200×630 export จาก Figma ใช้ทุก route.
`next/og` คุ้มตอนมีเนื้อหาเปลี่ยนตาม data (เช่น `/articles/[slug]`) ซึ่งตัดออกไปแล้วตั้งแต่ ticket 09

### 5. Metadata 5 route

`layout.tsx`:
```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: { default: "The Origin Beat | ระบบเสียงและภาพสำหรับห้องประชุม",
           template: "%s | The Origin Beat" },
  description: "นำเสนอผลงานติดตั้งและแนวทางการทำงาน เพื่อช่วยให้คุณเห็นภาพระบบที่เหมาะกับโครงการ",
  openGraph: { type: "website", locale: "th_TH", images: ["/og.jpg"] },
};
```
`<html lang="th">` และ `locale: "th_TH"` - ไม่ลง i18n lib ตาม brief

| route | title |
|---|---|
| `/` | (default ข้างบน) |
| `/portfolio` | `ผลงานติดตั้ง` |
| `/brands` | `แบรนด์คู่ค้า` |
| `/contact` | `ติดต่อเรา` |
| `/privacy` | `ประกาศความเป็นส่วนตัว` |

ทุกหน้ามี `alternates.canonical`. `/privacy` ยัง index ตามปกติ.
`sitemap.ts` + `robots.ts` ของ Next - 5 route hardcode ไม่ต้อง generate

### 6. JSON-LD = `Organization` ไม่ใช่ `LocalBusiness` (Q5)

```
Organization: name, url, logo, contactPoint (โทร + อีเมล), sameAs (Facebook/IG/TikTok)
```
ค่าอ่านจาก env ชุดเดียวกับ ticket 04.

**เหตุผลที่ยังไม่ใช้ `LocalBusiness`**: มันบังคับ `address` และควรมี `openingHours` กับพิกัด ซึ่ง ticket 04 ยังเป็น mock ทั้งหมดและยังไม่มีที่อยู่จริงเลย
Google เอา structured data ไปแสดงผลจริง - ใส่ที่อยู่ปลอมแย่กว่าไม่ใส่. อัปเป็น `LocalBusiness` วันที่ได้ที่อยู่จริง

### 7. alt text

เขียนเป็นไทย เก็บใน `imageAlt` ของ `data.ts` (ticket 06) ไม่ใช่ hardcode ใน component
รูป mood ตอนนี้ยังบรรยายของจริงไม่ได้ - ใช้ alt กลาง ๆ ตามประเภทห้องไปก่อน แล้วเขียนใหม่พร้อมกับตอนเปลี่ยนรูปจริง (อยู่ใน gate เดียวกัน)
