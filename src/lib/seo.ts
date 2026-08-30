import { company } from "@/features/contact/company";

/** `021234567` -> `+6621234567` - schema.org อยากได้รูปแบบ E.164 */
const e164 = (digits: string) => `+66${digits.replace(/^0/, "")}`;

/**
 * ใช้ `Organization` ไม่ใช่ `LocalBusiness`
 * `LocalBusiness` บังคับ `address` และควรมี `openingHours` กับพิกัด ซึ่งยังไม่มีของจริงเลย
 * Google เอา structured data ไปแสดงผลจริง - ใส่ที่อยู่ปลอมแย่กว่าไม่ใส่
 *
 * ไม่มี field `logo` เพราะยังไม่มีไฟล์โลโก้จริง (ดู gate.md) - ปล่อยว่างดีกว่าชี้ไปที่ og.jpg
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  description: company.tagline,
  url: company.siteUrl,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: e164(company.phone),
    email: company.email,
    availableLanguage: ["th"],
  },
  sameAs: [company.social.facebook, company.social.instagram, company.social.tiktok],
};
