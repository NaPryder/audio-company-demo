import { z } from "zod";

/**
 * env ทุกตัวถูก validate ตอน build เพราะ `env` ถูกอ่านจาก server component
 * ที่ prerender ทุกหน้า - ค่าที่หายหรือผิดรูปแบบจะทำให้ `next build` พัง
 * แทนที่จะไปพังตอนลูกค้ากดส่งฟอร์ม
 *
 * ทุกตัวยกเว้น NEXT_PUBLIC_SITE_URL เป็น server-side อย่างเดียว
 * Next ไม่ inline ตัวที่ไม่ขึ้นต้น NEXT_PUBLIC_ เข้า client bundle
 * เพราะฉะนั้น RESEND_API_KEY หลุดไปฝั่ง browser ไม่ได้
 */
const httpUrl = z.url({ protocol: /^https?$/ });

export const envSchema = z.object({
  // Resend
  RESEND_API_KEY: z.string().min(1, "ต้องมี RESEND_API_KEY"),
  RESEND_FROM_EMAIL: z.email(),
  LEAD_RECEIVER_EMAIL: z.email(),

  // Site
  NEXT_PUBLIC_SITE_URL: httpUrl,

  // Contact
  COMPANY_NAME: z.string().min(1),
  COMPANY_TAGLINE: z.string().min(1),
  CONTACT_EMAIL: z.email(),
  CONTACT_PHONE: z
    .string()
    .regex(/^0\d{8,9}$/, "CONTACT_PHONE ต้องเป็นเลข 9-10 หลักขึ้นต้นด้วย 0"),
  CONTACT_LINE_ID: z.string().min(1),
  CONTACT_FACEBOOK_URL: httpUrl,
  CONTACT_INSTAGRAM_URL: httpUrl,
  CONTACT_TIKTOK_URL: httpUrl,
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(raw: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(raw);
  if (!result.success) {
    const lines = result.error.issues.map(
      (i) => `  ${i.path.join(".")}: ${i.message}`,
    );
    throw new Error(`env ไม่ถูกต้อง\n${lines.join("\n")}`);
  }
  return result.data;
}

// อ้าง process.env.X ทีละตัวตรง ๆ ไม่ใช่ส่ง process.env ทั้งก้อน
// เพราะ Next แทนค่าให้เฉพาะตอนที่เขียนเป็น static member access
export const env = parseEnv({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  LEAD_RECEIVER_EMAIL: process.env.LEAD_RECEIVER_EMAIL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  COMPANY_NAME: process.env.COMPANY_NAME,
  COMPANY_TAGLINE: process.env.COMPANY_TAGLINE,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  CONTACT_PHONE: process.env.CONTACT_PHONE,
  CONTACT_LINE_ID: process.env.CONTACT_LINE_ID,
  CONTACT_FACEBOOK_URL: process.env.CONTACT_FACEBOOK_URL,
  CONTACT_INSTAGRAM_URL: process.env.CONTACT_INSTAGRAM_URL,
  CONTACT_TIKTOK_URL: process.env.CONTACT_TIKTOK_URL,
});
