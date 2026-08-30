# B07 - lead form

Blocked by: B03
Status: todo

ตาม [spec §8](../spec.md) ทุกบรรทัด

## ไฟล์

- `features/lead-form/schema.ts` - `normalizePhone` + `leadSchema` · export `LeadInput = z.input<typeof leadSchema>` **ไม่ใช่ `z.infer<>`** เพราะ schema มี `.transform()`
  field ไม่บังคับใช้ `.default("")` **ไม่ใช่ `.optional()`**
- `features/lead-form/rate-limit.ts` - `COOLDOWN_MS = 20_000` · `Map<string, number>` key = IP จาก `x-forwarded-for`
  **prune entry ที่เก่ากว่า `COOLDOWN_MS` ทุกครั้งที่เรียก** ไม่งั้น Map โตไม่หยุดจนกิน memory
  มี `ponytail:` comment ระบุเพดาน (cold start ลืมหมด · บอทหมุน IP เดินผ่านได้ · ทางอัปเกรดคือ Turnstile)
- `features/lead-form/action.ts` - `submitLead(input: unknown): Promise<LeadResult>`
  **server ต้อง `leadSchema.parse()` ซ้ำเสมอ** - validation ฝั่ง client เป็น UX ไม่ใช่ด่านความปลอดภัย
- `features/lead-form/lead-email.tsx` - Resend ส่งหา `LEAD_RECEIVER_EMAIL` · **ไม่ส่ง auto-reply หาลูกค้า**
  `ponytail:` `RESEND_API_KEY` ขึ้นต้น `re_mock_` → log ลง console แทนการยิงจริง เพื่อให้เดิน success path ได้ตอน dev
- `features/lead-form/lead-form.tsx` - `"use client"` · RHF + `useTransition` (**ไม่ใช่ `useActionState`** - ชนกับ RHF)

## State

```
idle ──submit──> submitting ──ok────> success  (แทนที่การ์ดทั้งใบ ไม่ย้อนกลับ)
                     └──fail──> error (ปุ่ม disabled 20 วิ) ──> idle
```

success แทนที่การ์ดฟอร์มทั้งใบด้วยแผงขอบคุณสี `--success` **แล้วย้าย focus ไปที่แผง**
ปุ่มตอน cooldown = disabled เฉย ๆ ไม่มีตัวนับ - คำอธิบายอยู่ในข้อความ error ระดับฟอร์มแทน

## a11y

ตัด shadcn `form` ออก แปลว่าต้องผูก aria เอง: `aria-required` · `*` ต้อง `aria-hidden` · `aria-invalid` · `aria-describedby` · error ระดับฟอร์มใส่ `role="alert"` ตัวเดียวเหนือปุ่ม

## ข้อความ

4 แถวตาม spec §8 ตรง ๆ · ข้อความ privacy + ลิงก์ `/privacy`
**ห้ามใส่ข้อความเดิมที่อ้าง Google Workspace** - เป็นเท็จแล้วเพราะตัด upload และตัด DB

## Test (vitest)

- `081-234-5678` / `081 234 5678` / `+66812345678` / `021234567` → normalize เป็นรูปแบบเดียว
- 8 หลัก และ 11 หลัก → `เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอก 9-10 หลัก`
- `companyName` / `details` ว่าง → ผ่าน
- rate limit: กดซ้ำใน 20 วิถูกปฏิเสธ · entry เก่าถูก prune ออกจาก Map จริง
