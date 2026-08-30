# 02 - Section inventory และพฤติกรรม responsive

Type: research
Status: resolved
Blocked by: -

## Question

Home มี 8 section. ต้องรู้ว่าแต่ละอันมีอะไรอยู่ข้างใน และมันเปลี่ยนรูปยังไงจาก 1440 ไป 390:

| section | desktop | mobile |
|---|---|---|
| Redesign Header | `36:8874` | `36:9154` |
| Redesign Hero | `36:8886` | `36:9163` |
| Portfolio | `36:8898` | `36:9175` |
| Company Intro | `36:8970` | `36:9244` |
| Partner Brands | `36:8982` | `36:9256` |
| Editorial Content | `36:9041` | `36:9319` |
| Contact | `36:9107` | `36:9383` |
| Footer | `36:9148` | `36:9423` |

คำถามที่ต้องตอบให้ได้:

1. **mobile nav ทำยังไง** - header mobile สูงแค่ 68px กับ nav 4 อัน (`ผลงาน / บทความ / แบรนด์ / ติดต่อ`) + ปุ่ม CTA. design วาด hamburger + drawer ไว้ไหม หรือซ่อน nav ทิ้งเฉย ๆ. ถ้า design ไม่ได้ตอบ ให้เปิด grilling ticket ใหม่
2. **header sticky ไหม** และถ้า sticky ต้อง offset เท่าไหร่ตอน anchor scroll ลง section (Q7 ให้ nav เป็น anchor scroll)
3. **grid ของแต่ละ section เปลี่ยนกี่คอลัมน์** - ผลงาน / logo แบรนด์ / การ์ดบทความ / การ์ดวิดีโอ
4. **การ์ดผลงานมีกี่ใบ** บน desktop เทียบกับ mobile (mobile Portfolio สูง 2338px ซึ่งยาวผิดปกติ - อาจเป็น stack เต็มทุกใบ ไม่ได้ตัดจำนวน)
5. **Contact section** พลิกจาก 2 คอลัมน์ (ข้อมูลซ้าย / ฟอร์มขวา) เป็นอะไรบน mobile

**ผลลัพธ์ที่ต้องได้**: ตารางต่อ section ระบุ child element, layout desktop, layout mobile, และจุดที่ design ไม่ได้ตอบ.

## Answer

### 1. mobile nav - design ตอบไม่ครบ

- **desktop header** (`36:8874`, h=76): logo 280x44 ที่ x=150 + nav 4 อัน (w=480 ที่ x=810). **ไม่มีปุ่ม CTA** ใน header - ของเดิมชุดเก่ามี ชุด Redesign ตัดออก
- **mobile header** (`36:9154`, h=68): logo 224x44 ที่ x=24 + `Mobile menu affordance` (`36:9161`, 62x44) ที่ x=304 ซึ่งเป็น **text label ไม่ใช่ไอคอน hamburger**

⚠️ **design ไม่ได้วาดสถานะเปิดเมนู** - มีแต่ปุ่ม ไม่มี drawer/overlay. ต้องเปิด grilling ticket ใหม่ (ดู ticket 09)

### 2. header sticky

design เป็นภาพนิ่ง บอกไม่ได้ว่า sticky. header สูง 76 (desktop) / 68 (mobile) - ถ้าทำ sticky ต้องใช้ `scroll-margin-top` เท่านั้นกับทุก section เป้าหมาย anchor. รวมไว้ใน ticket 09

### 3-4. Portfolio

**6 โครงการทั้งสอง breakpoint** ไม่มีการตัดจำนวนบน mobile

- **desktop**: grid ไม่สมมาตร - แถวบน 1 ใบใหญ่ 752x520 + stack ขวา 2 ใบ 364x248; แถวล่าง 3 ใบ 364x310. gap 24
- **mobile**: stack เดี่ยวทั้ง 6 ใบ กว้าง 342 - ใบแรก h=380 ที่เหลือ h=292. gap 24

โครงสร้างการ์ด (`36:8908`): พื้น `#111a2a` + border `#ded7d3` + radius 2px, รูป cover เต็มใบ, แผง `rgba(3,8,20,0.9)` ทับล่าง, ข้างในเรียง `project type / project title / client` gap 7

⚠️ ทุกการ์ดมี badge `MOOD PLACEHOLDER` (`36:8915`) สีแดงมุมบนซ้าย - **เป็นหมายเหตุของคนออกแบบ ห้ามสร้างเป็น component**. ข้อความ description ของ section Portfolio ก็เขียนย้ำเรื่องนี้ว่าต้องเปลี่ยนเป็นภาพที่ได้รับอนุญาตก่อนเผยแพร่

### 5. section อื่น

| section | desktop | mobile |
|---|---|---|
| **Hero** | รูปเต็ม 1440x650 + navy overlay, content w=790 ที่ x=150 y=184 | 390x540, content w=342 ที่ x=24 y=132 |
| **Company Intro** | 2 คอลัมน์ (heading 461 / body 638), capability line **4 อัน** เรียงนอน | stack, capability **3 อัน** เรียงตั้ง |
| **Partner Brands** | grid **2 แถว x 6 = 12 แบรนด์** ใบละ 180x112 (logo 156x70) | **6 แถว x 2 = 12 แบรนด์** ใบละ 166x112 (logo 142x70) |
| **Editorial** | blog: 1 ใหญ่ 729x460 + stack 2 ใบ 387x220 · video: 3 ใบ 366x300 เรียงนอน | blog 3 ใบ stack (360/286/286) · video 3 ใบ stack (286) |
| **Contact** | split - copy w=410 ซ้าย / form 666x901 ขวา | stack - copy 342 บน / form 342x1002 ล่าง |
| **Footer** | แถวเดียว: ชื่อบริษัทซ้าย (360) + nav ขวา (420 ที่ x=720), note ล่าง | stack 3 ชั้น: ชื่อ / nav / note |

**ฟอร์ม**: desktop มี `Contact field row` (`36:9125`) จับ อีเมล + เบอร์โทร เรียงคู่กัน (295 + 295 gap 12). mobile แยกเป็น 2 field เต็มความกว้าง. field อื่นเต็มความกว้างทั้งคู่.

**รายชื่อ 12 แบรนด์ตามลำดับใน design**: AUDAC, Allen & Heath, Audio-Technica, Bose, JBL, QSC, SHURE, Sennheiser, Soundcraft, TOA, VL Audio, YAMAHA
→ **6 อันแรกที่จะทำตาม Q16**: AUDAC, Allen & Heath, Audio-Technica, Bose, JBL, QSC
→ ทุกใบมี text `Logo unavailable` ซ่อนอยู่ (`hidden="true"`) เป็น fallback state ที่คนออกแบบเตรียมไว้ - ควรทำตาม

### บั๊กใน design ที่เจอ

1. **Company Intro mobile ขาด capability 1 อัน** - desktop มี 4 (`ระบบเสียง / ระบบภาพ / ระบบประชุม / ระบบควบคุม`) แต่ mobile มี 3 (`36:9252`, `36:9254`, `36:9255`) - **`ระบบภาพ` หายไป** (node `36:9253` ไม่มีอยู่). สันนิษฐานว่าลบพลาด ให้ทำ 4 อันทั้งสอง breakpoint
2. **File Upload block ยังอยู่ใน design** (`36:9139` / `36:9414`) - ตัดทิ้งตาม Q4 พร้อมข้อความ privacy ที่อ้างถึง Google Workspace ซึ่งจะไม่จริงอีกต่อไป
3. **ปุ่ม `ดูผลงานทั้งหมด` / `ดูแบรนด์ทั้งหมด`** ชี้ไปหน้าที่ไม่มีในขอบเขต v1 (Q7) - ต้องตัดสินว่าซ่อนหรือชี้ไปไหน (ดู ticket 09)

---
ℹ️ **หมายเหตุจาก [ticket 11](11-new-page-layouts.md)**: บันทึกด้านบนว่า Home แสดงแบรนด์ 12 ตัว (2×6) **ถูกต้องตาม design**
แต่มีการตัดสินใจ**เบี่ยงจาก design โดยตั้งใจ** - Home จะแสดงแค่ 6 (แถวแรก) ส่วนอีก 6 ไปอยู่หน้า `/brands`
ผลงานยังคง 6 ชิ้นบน Home ตาม design ตามเดิม
