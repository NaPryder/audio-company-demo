# 09 - พฤติกรรม header และปุ่มที่ชี้ไปหน้าที่ไม่มี

Type: grilling
Status: resolved
Blocked by: -

## Question

โผล่มาจากคำตอบของ ticket 02 - เป็นสามเรื่องที่ design วาดปุ่มไว้ แต่ไม่ได้วาดว่ากดแล้วเกิดอะไร.

1. **เมนู mobile เปิดแล้วหน้าตายังไง** - `36:9161` เป็นแค่ text label 62x44 ไม่มีสถานะเปิดใน design เลย. เต็มจอ / drawer เลื่อนจากขวา / dropdown ใต้ header. ปิดยังไง มี backdrop ไหม แล้ว lock scroll ไหม
2. **header sticky หรือไม่** - ถ้า sticky ทุก section ที่เป็นเป้า anchor ต้องมี `scroll-margin-top` = 76 (desktop) / 68 (mobile) ไม่งั้นหัวข้อโดน header บัง. ถ้าไม่ sticky nav หายไปตั้งแต่ scroll ผ่าน hero ซึ่งหน้ายาว 5330px
3. **ปุ่มที่ชี้ไปหน้าที่ไม่มีใน v1** - Q7 ตัดเหลือหน้าเดียว แต่ design มีปุ่ม `ดูผลงานทั้งหมด` (`36:8904`), `ดูแบรนด์ทั้งหมด` (`36:8988`) และ nav 4 อันที่ชื่อ `ผลงาน / บทความ / แบรนด์ / ติดต่อ`
   - nav 4 อัน → anchor scroll ตาม Q7 ชัดแล้ว
   - แต่ปุ่ม "ดูทั้งหมด" 2 อันชี้ไปไหน? ซ่อนทิ้ง / ให้ scroll ไปที่ contact / คงไว้แต่ disable

**ผลลัพธ์ที่ต้องได้**: สเปกพฤติกรรม header ทั้ง 2 breakpoint และคำตอบว่าปุ่ม "ดูทั้งหมด" ทำอะไร.

## Answer

### 1. เมนู mobile = `<dialog>` + `showModal()` (Q1 ก)

ใช้ element ของ browser ตรง ๆ ไม่ลง `sheet` ของ shadcn.
`showModal()` ให้ **Esc ปิด · focus trap · `::backdrop` · พื้นหลัง inert** มาครบโดยไม่ต้องเขียนเอง - สี่อย่างนี้คือสิ่งที่คนทำหล่นบ่อยที่สุดจนกลายเป็นบั๊ก a11y.
→ ตัด `sheet` ออกจาก inventory ของ ticket 05

### 2. header sticky พื้น Deep Navy ทึบตลอด (Q2 ก)

ไม่มี scroll listener ไม่มี state ไม่มีจังหวะสลับสี.
hero มี navy overlay ทับรูปอยู่แล้ว header navy จึงกลืนกับ hero ตอนอยู่บนสุดเองโดยไม่ต้องทำอะไร และเป็นสีเดียวกับ footer.
ทุก section ที่เป็นเป้า anchor ต้องมี `scroll-margin-top`: `76px` desktop / `68px` mobile.

### 3. ⚠️ scope ขยาย - ย้อนคำตอบ Q7 เดิม

Q7 เดิมบอก "Home หน้าเดียว nav เป็น anchor". **ไม่จริงอีกต่อไป**. v1 มี **5 route**:

| route | ที่มา | design |
|---|---|---|
| `/` | Home 8 section | Figma `36:8873` / `36:9153` |
| `/portfolio` | ปุ่ม `ดูผลงานทั้งหมด` + nav `ผลงาน` | **ไม่มี - ต้องออกแบบเอง** |
| `/brands` | ปุ่ม `ดูแบรนด์ทั้งหมด` + nav `แบรนด์` | **ไม่มี - ต้องออกแบบเอง** |
| `/contact` | nav `ติดต่อ` | reuse Contact section จาก Home |
| `/privacy` | ลิงก์ใน form (ticket 04) | ข้อความล้วน |

**Q5 = (ค)**: ไม่กู้จาก Figma version history. ออกแบบเองโดยต่อยอดจาก token (ticket 01) และ component ที่มีอยู่แล้ว (ticket 02).
เหตุผลที่ยอมทิ้ง `Brands All` ที่เคยเป็นงาน Redesign เต็มตัว: มันหายไปแล้วจริง ๆ และการ์ดแบรนด์กับการ์ดผลงานบน Home ใช้ซ้ำได้ทั้งคู่ - หน้า list ไม่ต้องการอะไรมากกว่านั้น

### 4. nav (Q6 - ตีความจากที่ผู้ใช้ restructure)

ผู้ใช้เอา `บทความ` ออกจากเมนู และสั่งให้ทำหน้าให้ `ติดต่อ` - สอง item ที่ไม่มีหน้าจริงถูกกำจัดออกไปทั้งคู่
→ **nav เหลือ 3 อัน เป็น route ทั้งหมด ไม่มี anchor**

```
ผลงาน  → /portfolio
แบรนด์  → /brands
ติดต่อ  → /contact
```

ใช้ config ลิงก์ตัวเดียวร่วมกันระหว่าง header / mobile dialog / footer (Q4 - ทำเหมือนกันหมด).

**ที่ตีความไว้ - ทักท้วงได้**:
- `บทความ` ออกจาก**เมนู**เท่านั้น - section Editorial (บทความ 3 + วิดีโอ 3) ยังอยู่บน Home
- `/contact` = หน้าที่มีแค่ Contact section เต็ม ๆ (ข้อมูลติดต่อ + ฟอร์ม) ไม่ใช่ฟอร์มลอย

หมายเหตุ: `scroll-margin-top` ยังต้องมีอยู่ เผื่อ deep link แบบ `/#contact` และปุ่ม hero `ดูผลงานติดตั้ง` ที่อาจ scroll ลง section

### 5. `/portfolio` = list อย่างเดียว (Q7 ก)

การ์ด 6 ใบ grid ไม่มีหน้า detail.
แต่ **ใส่ `slug` ใน type `Project` ตั้งแต่ตอนนี้** (ticket 06) วันที่มีเนื้อหาราย project ค่อยเปิด `/portfolio/[slug]` โดยไม่ต้องแก้ data model.
เหตุผลที่ยังไม่ทำ detail: ไม่มีเนื้อหาต่อ project สักชิ้น และ `[ชื่อลูกค้า]` ถูกซ่อนเพราะ NDA ตาม ticket 04 - หน้า detail จะว่างเปล่า

### ผลกระทบต่อ ticket อื่น

- **05** ตัด `sheet` ออก / เพิ่มการตัดสินใจว่าจะใช้ `dialog` เปล่าหรือห่อเป็น component
- **06** `Project` ต้องมี `slug`
- **07** metadata ต้องทำ 5 route ไม่ใช่ 1
- **10** เมนูเป็น `<dialog>` แล้ว a11y ส่วนใหญ่ได้ฟรี เหลือ `aria-expanded` กับการคืน focus
- **ใหม่: 11** โครงหน้า `/portfolio` `/brands` `/contact`
