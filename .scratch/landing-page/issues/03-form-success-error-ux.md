# 03 - Success และ error state ของ lead form

Type: grilling
Status: resolved
Blocked by: -

## Question

Figma วาดฟอร์มไว้แค่สถานะว่าง. ไม่มีจอ success ไม่มี error state.
และเพราะ Q13 ตัด auto-reply ทิ้ง หน้าเว็บคือ **ที่เดียว**ที่ลูกค้าจะรู้ว่าส่งสำเร็จ - ถ้าตรงนี้กำกวม ลูกค้าจะกรอกซ้ำ แล้วทีมงานได้ lead ซ้ำ.

ต้องเคาะ:

1. **ส่งสำเร็จแล้วเห็นอะไร** - ข้อความ inline ใต้ปุ่ม / แทนที่ทั้งการ์ดฟอร์มด้วยข้อความขอบคุณ / toast
2. **error ราย field หน้าตายังไง** - อีเมลผิดรูปแบบ, เบอร์โทรผิดรูปแบบ, field บังคับว่าง. ใช้สี Danger `#b42318` ที่มีใน palette
3. **error ระดับฟอร์ม** - Resend ล่ม, โดน rate limit 20 วิ. ข้อความว่าอะไร บอกเบอร์โทรสำรองไหม
4. **validation ภาษาไทย** - เบอร์โทรไทยรับรูปแบบไหนบ้าง (`0812345678`, `081-234-5678`, `+66812345678`)
5. **ตอนโดน rate limit** ปุ่มบอกอะไร (Q14 สั่ง disabled + loading อยู่แล้ว แต่ 20 วินาทีเงียบ ๆ ลูกค้าจะงง)

**ผลลัพธ์ที่ต้องได้**: สเปกทุก state ของฟอร์ม พร้อมข้อความไทยจริงที่จะใช้ และ Zod schema ที่ตกลงกันแล้ว.

## Answer

**ศัพท์**: สิ่งที่ถูกส่งเรียกว่า **`Lead`** (Q6 ก) - เลือกเพราะคำนี้มีอยู่แล้วในจอ `Admin / Company and Lead Settings` ของ Figma.
บันทึกใน `CONTEXT.md` พร้อมคำเตือนว่าอย่าสับสนกับ `Project` - หัวฟอร์มเขียน `รายละเอียดโครงการ` ซึ่งใช้คำว่า "โครงการ" ชนกับ Project ที่แปลว่างานติดตั้งที่เสร็จแล้ว.

### สถานะของฟอร์ม

```
idle ──submit──> submitting ──ok────> success   (การ์ดฟอร์มถูกแทนที่ ไม่ย้อนกลับ)
                     │
                     └──fail──> error (ปุ่ม disabled 20 วิ) ──> idle
```

**success (Q1 ก)**: แทนที่การ์ดฟอร์มทั้งใบด้วยแผงขอบคุณ ใช้ `--color-success` `#16794b`.
เลือกแบบนี้เพราะ Q13 ตัด auto-reply ทิ้ง หน้าเว็บจึงเป็นที่เดียวที่ยืนยัน และการ์ดที่หายไปกันกดซ้ำทางกายภาพ - เราไม่มี DB ที่จะ dedupe.
ฟอร์มไม่กลับมาอีกใน session นั้น.

### error ราย field (Q2 ก)

บรรทัด error โผล่ใต้ control สี `--color-danger` `#b42318` ขนาด 12/18 (ตำแหน่งเดียวกับ slot `Helper` ที่มีอยู่แล้ว).
**ฟอร์มจะขยับตอน validate** - ยอมรับ เพราะเกิดตอนกด submit ไม่ใช่ตอนพิมพ์ และการจองที่ว่างตลอดเวลาทำให้ฟอร์ม mobile ที่ยาว 1002px ยาวขึ้นอีก ~75px
field ที่มี `Helper` อยู่แล้ว (`ชื่อบริษัท`, `รายละเอียด`): error แทนที่ข้อความ `ไม่บังคับ` ชั่วคราว ไม่เพิ่มบรรทัด.

| field | ข้อความ error |
|---|---|
| ชื่อผู้ติดต่อ | `กรุณากรอกชื่อผู้ติดต่อ` |
| อีเมล (ว่าง) | `กรุณากรอกอีเมล` |
| อีเมล (ผิดรูปแบบ) | `รูปแบบอีเมลไม่ถูกต้อง` |
| เบอร์โทรศัพท์ (ว่าง) | `กรุณากรอกเบอร์โทรศัพท์` |
| เบอร์โทรศัพท์ (ผิดรูปแบบ) | `เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอก 9-10 หลัก` |

### error ระดับฟอร์ม

แสดงเหนือปุ่ม สี Danger. ข้อความเดียวใช้ได้ทุกกรณี (Resend ล่ม / ติด cooldown / error ไม่คาดคิด):

`ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งในอีกสักครู่ หรือติดต่อเราโดยตรงที่ [เบอร์โทรจาก ticket 04]`

⚠️ **Q4 ผู้ใช้เลือก (ข)** - ปุ่มตอนติด cooldown ให้ disabled เฉย ๆ ไม่มีตัวนับถอยหลัง.
ผมทักว่าปุ่มที่กดไม่ได้โดยไม่บอกอะไรทำให้คนคิดว่าเว็บพัง ผู้ใช้ยืนยัน.
เพื่อไม่ให้เงียบสนิท คำอธิบายไปอยู่ในข้อความ error ระดับฟอร์มข้างบนแทน ซึ่งเป็นที่ที่มันควรอยู่อยู่แล้ว.

### เบอร์โทร (Q3 ก) - normalize ก่อน validate

```ts
const normalizePhone = (v: string) =>
  v.replace(/[\s\-()]/g, "").replace(/^\+66/, "0");
// ผ่าน: 081-234-5678 · 081 234 5678 · +66812345678 · 021234567
// เก็บเป็น: 0812345678 · 021234567
```
เช็คด้วย `^0\d{8,9}$` - ครอบคลุมมือถือ 10 หลัก (`06/08/09`) และเบอร์บ้าน 9 หลัก (`02`-`07`).
ทีมงานได้เบอร์รูปแบบเดียวที่กดโทรได้เลย.

### Zod schema

```ts
import { z } from "zod";

export const leadSchema = z.object({
  companyName: z.string().trim().max(120).default(""),
  contactName: z.string().trim().min(1, "กรุณากรอกชื่อผู้ติดต่อ").max(120),
  email: z.email("รูปแบบอีเมลไม่ถูกต้อง").max(254),
  phone: z
    .string()
    .min(1, "กรุณากรอกเบอร์โทรศัพท์")
    .transform(normalizePhone)
    .pipe(z.string().regex(/^0\d{8,9}$/, "เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอก 9-10 หลัก")),
  details: z.string().trim().max(2000).default(""),
});

export type Lead = z.infer<typeof leadSchema>;
```

`companyName` / `details` ใช้ `.default("")` แทน `.optional()` เพราะ `FormData` ส่ง `""` มาอยู่แล้วตอนไม่กรอก - ไม่ต้องแปลง undefined ไปมา.
Zod 4 ย้าย email มาเป็น `z.email()` ระดับบนสุด ไม่ใช่ `z.string().email()`.

### Server action

```ts
type LeadFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Partial<Record<keyof Lead, string>> };

export async function submitLead(
  prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState>;
```

ใช้กับ `useActionState` - ได้ `isPending` มาทำ loading state และ disabled ปุ่มตาม Q14 โดยไม่ต้องถือ state เอง.

### Rate limit

```ts
// ponytail: cooldown เก็บใน memory ต่อ instance. cold start ทีนึงลืมหมด
// และบอทที่หมุน IP เดินผ่านได้สบาย. ทางอัปเกรดคือ Turnstile (ดู Out of scope ใน map)
const COOLDOWN_MS = 20_000;
const lastSubmit = new Map<string, number>();
```

key คือ IP จาก `x-forwarded-for`.
**ต้อง prune ทุกครั้งที่เรียก** ทิ้ง entry ที่เก่ากว่า `COOLDOWN_MS` ไม่งั้น Map โตไม่หยุดจนกิน memory ของ instance.

### Privacy (Q5 ค)

ผู้ใช้เลือกเก็บบล็อกไว้แบบกลาง ๆ + ลิงก์ Privacy Notice.
ข้อความเดิมใน design `เมื่อกดส่ง ถือว่าคุณรับทราบการจัดเก็บไฟล์ใน Google Workspace` **ต้องถูกลบ** เพราะเป็นเท็จแล้ว - Q4 ตัด file upload และ Q9 ตัด DB.

ข้อความใหม่:
```
เมื่อกดส่ง ถือว่าคุณยินยอมให้เราติดต่อกลับตามข้อมูลที่กรอก
[Privacy Notice]  ← ลิงก์จาก ticket 04
```

### ที่ยังค้าง

copy ในแผงขอบคุณ (Q1 ก) และเบอร์โทรในข้อความ error ระดับฟอร์ม ต้องรอค่าจริงจาก ticket 04.

---
🔧 **แก้ไขโดย [ticket 05](05-shadcn-component-inventory.md)**: ลายเซ็น `submitLead(prev, formData)` แบบ `useActionState` **ยกเลิก**.
Q1 ของ ticket 05 เลือกใช้ react-hook-form ซึ่ง `handleSubmit` ชนกับ form action - ลายเซ็นใหม่คือ `submitLead(input: unknown): Promise<LeadResult>` ดู ticket 05.
สถานะฟอร์ม ข้อความ error Zod schema และกติกา rate limit ทั้งหมดยังใช้ตามเดิม.
