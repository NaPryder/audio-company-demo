# B10 - Contact section + ประกอบหน้า Home

Blocked by: B07, B09
Status: done

## ContactSection (ใช้ทั้ง Home และ `/contact` ทั้งดุ้น ไม่ต้องแตะ)

- desktop: split - copy w=410 ซ้าย / form 666×901 ขวา · จับ `อีเมล` + `เบอร์โทร` เรียงคู่ (295+295 gap 12)
- mobile: stack - copy 342 บน / form 342×1002 ล่าง · แยกเต็มความกว้าง
- **ตัด File Upload block ออกทั้งก้อน**
- eyebrow `START A CONVERSATION` · title `เล่าให้เราฟังเกี่ยวกับพื้นที่ของคุณ`

## Home

`src/app/page.tsx` เรียง: Hero · Portfolio · CompanyIntro · Brands · Editorial · Contact
ทุก section ที่เป็นเป้า anchor ต้องมี `scroll-margin-top: 76px` / `68px`
