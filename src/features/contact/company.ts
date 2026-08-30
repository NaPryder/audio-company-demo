import { env } from "@/lib/env";

/** `021234567` -> `02-123-4567` · `0812345678` -> `081-234-5678` */
export function formatPhone(digits: string): string {
  if (digits.length === 9) {
    return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return digits;
}

export const company = {
  name: env.COMPANY_NAME,
  tagline: env.COMPANY_TAGLINE,
  email: env.CONTACT_EMAIL,
  phone: env.CONTACT_PHONE,
  phoneDisplay: formatPhone(env.CONTACT_PHONE),
  lineId: env.CONTACT_LINE_ID,
  social: {
    facebook: env.CONTACT_FACEBOOK_URL,
    instagram: env.CONTACT_INSTAGRAM_URL,
    tiktok: env.CONTACT_TIKTOK_URL,
  },
  siteUrl: env.NEXT_PUBLIC_SITE_URL,
} as const;
