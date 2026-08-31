import type { Metadata } from "next";

import { ContactSection } from "@/features/contact/contact-section";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description:
    "เล่าให้เราฟังเกี่ยวกับพื้นที่ของคุณ แล้วทีมงานจะติดต่อกลับเพื่อช่วยประเมินแนวทาง",
  alternates: { canonical: "/contact" },
};

/**
 * ไม่มี PageHeader - `ContactSection` มี eyebrow กับ title ของตัวเองอยู่แล้ว ใส่ทับจะซ้ำ
 * h1 ของหน้านี้จึงมาจาก prop `as` ไม่ใช่จาก `PageHeader` เหมือน route อื่น
 */
export default function ContactPage() {
  return <ContactSection as="h1" />;
}
