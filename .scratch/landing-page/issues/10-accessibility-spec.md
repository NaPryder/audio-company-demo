# 10 - สเปก accessibility

Type: grilling
Status: resolved
Blocked by: 03, 09

## Question

เลื่อนขึ้นมาจาก fog เพราะ ticket 01 กับ 02 ให้ค่าที่ต้องใช้ครบแล้ว.

1. **contrast** - คู่สีที่ต้องวัดจริง (มีค่า hex ครบแล้วจาก ticket 01):
   - `#667085` บน `#ffffff` (section description, form helper, placeholder) - ตัวนี้เสี่ยงสุด
   - `#c9d2df` บน `rgba(3,8,20,0.9)` (card meta 11px - ตัวเล็กมาก)
   - `#7f1d2d` บน `#f6f3f2` (section eyebrow 12px)
   - ตัวหนังสือขาวบน hero overlay - ขึ้นกับความทึบของ `36:8888` ที่ทับรูป
2. **ฟอร์ม** - ผูก label กับ input, helper กับ `aria-describedby`, error กับ `aria-invalid` + `role="alert"`, focus ring ที่มองเห็นได้บน radius 2px
3. **เมนู mobile** - focus trap, `aria-expanded`, ปิดด้วย Esc, คืน focus กลับปุ่ม (รอ ticket 09 ตัดสินรูปแบบก่อน)
4. **ภาษา** - `<html lang="th">`, alt text ไทยของทุกรูป, ตัดสินว่า eyebrow ภาษาอังกฤษ (`SELECTED WORK`) ต้องมี `lang="en"` กำกับไหม
5. **anchor scroll** - `scroll-margin-top` และเคารพ `prefers-reduced-motion` ตอน smooth scroll

**ผลลัพธ์ที่ต้องได้**: รายการที่ต้องแก้ถ้า contrast ไม่ผ่าน + สเปก a11y ของฟอร์มและเมนู.

## Answer

### 1. ผลตรวจ contrast - คำนวณเองครบ 19 คู่

ใช้สูตร WCAG 2.x relative luminance. เกณฑ์: ตัวปกติ 4.5:1 · ตัวใหญ่ (≥24px หรือ ≥18.66px bold) 3:1

| คู่ | ratio | ต้องการ | ผล |
|---|---|---|---|
| form label 14px bold `#111827` / ขาว | 17.74 | 4.5 | ✅ |
| section h2 `#111827` / `#f6f3f2` | 16.07 | 3.0 | ✅ |
| card title 25px bold ขาว / scrim | 16.13-20.13 | 3.0 | ✅ |
| card client 13px ขาว / scrim | 16.13-20.13 | 4.5 | ✅ |
| card meta 11px bold `#c9d2df` / scrim | 10.58-13.20 | 4.5 | ✅ |
| footer nav + note `#c9d2df` / `#030814` | 13.13 | 4.5 | ✅ |
| section eyebrow + ghost button `#7f1d2d` / `#f6f3f2` | 8.99 | 4.5 | ✅ |
| button label ขาว / `#a12a3a` | 7.22 | 4.5 | ✅ |
| error text `#b42318` / ขาว | 6.57 | 4.5 | ✅ |
| section desc `#667085` / ขาว | 4.97 | 4.5 | ✅ |
| **section desc + helper `#667085` / `#f6f3f2`** | **4.5059** | 4.5 | ⚠️ **เกินมา 0.006** |

scrim คำนวณสองกรณี: `rgba(3,8,20,.9)` ทับส่วนมืดของรูป = `#030712` และทับส่วนสว่างสุด = `#1c212b`

### 2. 🔧 เปลี่ยน token: `--muted-fg` `#667085` → `#5c6472` (Q1 ข)

`4.5059:1` ไม่ใช่ผ่าน มันคือบังเอิญ - browser ปัดเศษต่างกัน หรือใครขยับ `--bg` ไปหน่วยเดียวก็ตก
และสีนี้ใช้กับ **helper text 12px** ซึ่งเป็นตัวเล็กสุดในหน้า

| | บน `#f6f3f2` | บนขาว |
|---|---|---|
| `#667085` เดิม | 4.51 | 4.97 |
| **`#5c6472` ใหม่** | **5.40** | **5.96** |

ต่างทางสายตาแทบไม่เห็น (เทาอมน้ำเงินเหมือนเดิม) แต่ได้ margin จริง 0.9 แทน 0.006
**ต้องแก้ `--muted-fg` ในบล็อก `:root` ของ ticket 05**

### 3. navy overlay ที่ hero: ขั้นต่ำ 60% (Q2 ก)

ยังดึงค่าจริงของ `36:8888` ไม่ได้ (Figma rate limit) - กำหนดจากการคำนวณกรณีเลวร้ายสุดแทน คือตัวหนังสือขาวตกทับส่วนที่ขาวที่สุดของรูป

| opacity | ผลลัพธ์ | hero body 20px (4.5) | hero h1 (3.0) |
|---|---|---|---|
| 55% | `#74777e` | ❌ 4.48 | ✅ |
| **60%** | `#686b72` | ✅ **5.34** | ✅ |
| 70% | `#4f525b` | ✅ 7.81 | ✅ |

**สเปก: `rgba(3, 8, 20, 0.6)` เป็นขั้นต่ำ** ห้ามลดต่ำกว่านี้
ตัวเลขนี้ปลอดภัยไม่ว่ารูปจะเป็นอะไร ซึ่งสำคัญเพราะรูปจะถูกเปลี่ยนตาม gate ใน ticket 07 อยู่แล้ว - ค่าที่ Figma ใช้กับรูป mood ปัจจุบันไม่การันตีอะไรกับรูปจริง

### 4. Focus ring (Q3 ข)

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```
`outline-offset: 2px` ทำให้ ring ลอยออกนอกขอบ - เห็นชัดแม้ ring กับปุ่มเป็นสี maroon เหมือนกัน และไม่ต้องมีกฎพิเศษต่อ component ซึ่งเป็นจุดที่คนลืมเวลาเพิ่มปุ่มใหม่
ใช้ `:focus-visible` ไม่ใช่ `:focus` - ring จะไม่เด้งตอนคลิกเมาส์

### 5. ฟอร์ม

⚠️ **ticket 05 ตัด shadcn `form` ออก** แปลว่า `FormMessage` / `FormControl` ที่ผูก aria ให้อัตโนมัติก็ไม่มี - **ต้องผูกเอง**:

```tsx
<label htmlFor="phone">เบอร์โทรศัพท์ <span aria-hidden="true">*</span></label>
<input id="phone" {...register("phone")}
       required aria-required="true"
       aria-invalid={!!errors.phone}
       aria-describedby={errors.phone ? "phone-error" : undefined} />
{errors.phone && <p id="phone-error" role="alert">{errors.phone.message}</p>}
```

- `*` ที่ label ต้อง `aria-hidden` แล้วสื่อความบังคับด้วย `aria-required` แทน - ไม่งั้น screen reader อ่านว่า "ดอกจัน"
- error ระดับฟอร์มใส่ `role="alert"` ตัวเดียวเหนือปุ่ม
- helper text (`ไม่บังคับ`) ผูกด้วย `aria-describedby` เหมือนกัน
- แผงขอบคุณตอนสำเร็จ (ticket 03) ต้อง**ย้าย focus ไปที่มัน** ไม่งั้นคนใช้ screen reader จะไม่รู้ว่าฟอร์มหายไปไหน

### 6. เมนู mobile

`<dialog>` + `showModal()` (ticket 09) ให้ Esc / focus trap / `inert` พื้นหลัง มาฟรี. เหลือที่ต้องทำเอง:
- `aria-expanded` บนปุ่มเปิด และ `aria-controls` ชี้ไป dialog
- ปุ่มปิดต้องมี accessible name (ถ้าเป็นไอคอน)
- **คืน focus กลับปุ่มเปิดตอนปิด** - `<dialog>` ทำให้เองถ้าเรียก `close()` แต่จะหลุดถ้าเราไป re-render ทับ

### 7. ภาษาและ motion

- `<html lang="th">`
- `<span lang="en">` ครอบ eyebrow อังกฤษ 3 จุด (`SELECTED WORK` / `WHAT WE DO` / `START A CONVERSATION`) - ใส่ที่ component `SectionHeading` ที่ใช้ซ้ำ เขียนครั้งเดียวได้ทั้ง 3 (Q4 ก)
- alt text ไทยทุกรูป มาจาก `imageAlt` ใน `data.ts` (ticket 06)
- thumbnail YouTube ใช้ `title` ของวิดีโอเป็น alt
- ```css
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }
  ```
- `scroll-margin-top: 76px` / `68px` ที่ทุก section เป้าหมาย (ticket 09) - ยังจำเป็นเพราะ deep link `/#contact` และปุ่ม hero
