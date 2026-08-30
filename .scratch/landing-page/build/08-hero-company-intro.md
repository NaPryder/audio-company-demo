# B08 - Hero + Company Intro

Blocked by: B05, B06
Status: done

## Hero

- desktop 1440×650 · content w=790 @ (150,184) · ปุ่ม 186×52
- mobile 390×540 · content w=342 @ (24,132) · ปุ่ม 178×52
- รูป 2 ไฟล์ (desktop 2.2:1 / mobile 0.72:1 คนละ crop) full-bleed
- overlay เป็น **CSS ไม่ใช่รูป** · `rgba(3, 8, 20, 0.6)` **เป็นความทึบขั้นต่ำ ห้ามต่ำกว่านี้**
- `priority` + `fill` + `sizes="100vw"` + `placeholder="blur"` · **ห้าม `loading="lazy"`** นี่คือ LCP element
- **ห้ามสร้าง badge `MOOD PLACEHOLDER`** - เป็นโน้ตของคนออกแบบ

## Company Intro

- desktop 2 คอลัมน์ (heading 461 / body 638) gap 72 · capability 4 อันเรียงนอน
- mobile stack · capability 4 อันเรียงตั้ง
- ⚠️ design mobile ขาด `ระบบภาพ` ไป (node `36:9253` ไม่มีอยู่) สันนิษฐานว่าลบพลาด - **ทำ 4 อันทั้งสอง breakpoint**
- eyebrow `WHAT WE DO` · title `เชื่อมเทคโนโลยีให้ใช้งานง่าย / และเหมาะกับพื้นที่`
