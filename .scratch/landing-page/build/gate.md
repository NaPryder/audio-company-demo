# Gate ก่อน deploy production

รวม gate 10 ข้อจาก [`spec.md` §12](../spec.md) กับสิ่งที่เกิดขึ้นจริงระหว่าง build.
**ห้าม deploy จนกว่าจะเคลียร์ครบ**

## 🚨 รูปทั้งหมดเป็น placeholder ที่ generate เอง ไม่ใช่รูปจาก Figma

Figma MCP ชน rate limit ของ Starter plan **ตั้งแต่ call แรกของ B04** - โควต้าหมด ไม่ใช่แค่ throttle
ทำให้ export ตามตารางใน [04-figma-assets.md](04-figma-assets.md) ไม่ได้เลยสักใบ

แทนที่ด้วย JPEG ไล่เฉดที่ generate เอง **ขนาดตรงตามสเปกทุกใบ** เพื่อให้ layout, `sizes`,
blur placeholder และ LCP ทดสอบได้จริง แต่**เนื้อภาพไม่มีความหมาย**

| ไฟล์ | ขนาด | node ที่ต้องไปดึงมาแทน |
|---|---|---|
| `src/features/hero/images/conference-room-hero.jpg` | 2880×1300 | `36:8887` |
| `src/features/hero/images/conference-room-hero-mobile.jpg` | 780×1080 | `36:9164` |
| `src/features/editorial/images/meeting-room-neutral.jpg` | 1460×920 | `36:8920` |
| `src/features/portfolio/images/auditorium-red.jpg` | 1460×920 | `36:8930` |
| `src/features/portfolio/images/meeting-presentation.jpg` | 1460×920 | `36:8941` |
| `src/features/editorial/images/conference-room-elegant.jpg` | 1460×920 | `36:8951` |
| `src/features/portfolio/images/meeting-room-screen.jpg` | 1460×920 | `36:8961` |
| `public/og.jpg` | 1200×630 | crop จาก hero |

⚠️ **ต่อให้ดึงจาก Figma ได้ ก็ยัง deploy ไม่ได้อยู่ดี** - รูป mood 6 ใบใน Figma เป็นภาพที่
design เขียนกำกับตัวเองว่าเป็นของชั่วคราวและเราไม่รู้ที่มาหรือลิขสิทธิ์
gate ตัวจริงคือ **เปลี่ยนเป็นรูปโครงการจริงที่ได้รับอนุญาต** ไม่ใช่แค่ดึงจาก Figma ให้ได้

## 🚨 โลโก้แบรนด์เป็น wordmark ตัวหนังสือล้วน

`public/logos/*.svg` 6 ไฟล์เป็น SVG ที่มีแค่ชื่อแบรนด์เป็นตัวหนังสือสีเทา
ตั้งใจให้ดูไม่เหมือนโลโก้จริงเพื่อไม่ให้ใครเผลอคิดว่าใช้ได้แล้ว

ของจริงต้องเป็น **SVG จาก press kit ของแต่ละแบรนด์** ตามที่
[ticket 07](../issues/07-asset-and-seo-strategy.md) สรุปไว้ - ไม่ใช่ raster จาก Figma
เพราะ raster บนจอ retina เบลอเห็นชัด

## 🚨 `youtubeId` ทั้ง 3 เป็นค่าสมมติ

สเปกไม่เคยระบุวิดีโอจริงสักตัว `src/features/editorial/data.ts` จึงใส่ `PLACEHOLDER01-03` ไว้
thumbnail จาก `i.ytimg.com` จะโหลดไม่ขึ้นทั้ง `maxresdefault` และ `hqdefault`
`VideoCard` มี fallback ชั้นที่สองเป็นแผ่นทึบพร้อมชื่อเรื่องรองรับไว้แล้ว แต่**ต้องใส่ id จริงก่อน production**
ชื่อเรื่องทั้ง 3 ก็เป็นค่าสมมติเช่นกัน

## เบี่ยงจากสเปก: `Brand.logo` เป็น path ไม่ใช่ `StaticImageData`

spec §7 เขียน `logo: StaticImageData | null`
เปลี่ยนเป็น `logo: string | null` (path ใต้ `/logos/`) เรนเดอร์ด้วย `<img>` ธรรมดา

เหตุผล: ปลายทางที่ ticket 07 กำหนดคือ SVG จาก press kit ซึ่งผ่าน `next/image` ไม่ได้อยู่แล้ว
ถ้าไม่เปิด `images.dangerouslyAllowSVG` - เปิดแล้วเท่ากับยอมให้ SVG ที่มี script วิ่งผ่าน optimizer
type ใหม่จึงตรงกับปลายทางมากกว่าของเดิม และวันเปลี่ยนโลโก้จริงคือแทนที่ไฟล์ตรง ๆ ไม่ต้องแก้โค้ด

## Checklist

- [ ] **เปลี่ยนรูป 8 ใบเป็นรูปโครงการจริงที่ได้รับอนุญาต** (ไม่ใช่แค่ดึงจาก Figma)
- [ ] เขียน alt text ไทยใหม่ให้ตรงกับรูปจริง
- [ ] **เปลี่ยนโลโก้ 6 ไฟล์เป็น SVG จาก press kit ของแบรนด์**
- [ ] **ใส่ `youtubeId` และชื่อวิดีโอจริงทั้ง 3 ตัว**
- [ ] ใส่ค่า env จริงทั้ง 12 ตัว (ตอนนี้ mock หมด)
- [ ] verify โดเมนกับ Resend ก่อนจึงส่งเมลได้
- [ ] ให้ผู้มีคุณสมบัติตรวจร่าง Privacy Notice + ใส่วันที่
- [ ] ตัดสินใจเรื่อง `client` เป็นราย project (ตอนนี้ซ่อนทั้งหมดเพราะ NDA)
- [ ] **build ทดสอบด้วย Node 24** เพราะ prod รัน `nodejs24.x` ไม่ใช่ 26
- [ ] ตั้ง env บน Vercel ครบ
- [ ] **ยืนยัน copy ทุกแถวที่ทำเครื่องหมาย ⚠️ ในสเปกหัวข้อ 12 กับข้อความจริงใน Figma** - ชื่อ node ไม่ตรงกับข้อความจริงเสมอไป (พิสูจน์แล้ว 2 กรณี)
- [ ] ตรวจว่าไม่มีข้อความโน้ตของคนออกแบบหลุดลงเว็บ
