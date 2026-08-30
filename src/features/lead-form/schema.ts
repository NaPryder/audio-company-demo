import { z } from "zod";

/** `081-234-5678` `081 234 5678` `+66812345678` `(02) 123 4567` -> เก็บรูปแบบเดียว */
export const normalizePhone = (v: string) =>
  v.replace(/[\s\-()]/g, "").replace(/^\+66/, "0");

export const leadSchema = z.object({
  // field ไม่บังคับใช้ .default("") ไม่ใช่ .optional() เพราะ FormData ส่ง "" มาอยู่แล้ว
  companyName: z.string().trim().max(120).default(""),
  contactName: z.string().trim().min(1, "กรุณากรอกชื่อผู้ติดต่อ").max(120),
  email: z
    .string()
    .trim()
    .min(1, "กรุณากรอกอีเมล")
    .max(254)
    .pipe(z.email("รูปแบบอีเมลไม่ถูกต้อง")),
  phone: z
    .string()
    .min(1, "กรุณากรอกเบอร์โทรศัพท์")
    .transform(normalizePhone)
    .pipe(
      z
        .string()
        .regex(/^0\d{8,9}$/, "เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอก 9-10 หลัก"),
    ),
  details: z.string().trim().max(2000).default(""),
});

/** ใช้ z.input ไม่ใช่ z.infer เพราะ schema มี .transform() - ฝั่งฟอร์มกรอกอะไรก็ได้ */
export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
