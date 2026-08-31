import type { StaticImageData } from "next/image";

/**
 * ⚠️ ไม่ใช่ "ประเภทห้อง" - ค่าจริงใน Figma ปนกันระหว่างประเภทห้องกับประเภทระบบ
 * ยืนยันกับ Figma แล้ว 4 ตัว · `หอประชุม` กับ `ระบบประชุม` มาจากชื่อ node เท่านั้น
 */
export const PROJECT_CATEGORIES = [
  "ห้องประชุม",
  "หอประชุม", // ⚠️ ยังไม่ยืนยันกับ Figma
  "ระบบประชุม", // ⚠️ ยังไม่ยืนยันกับ Figma
  "ห้องอบรม",
  "พื้นที่อเนกประสงค์",
  "ระบบควบคุม",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  /** ใช้เป็น path ของ /portfolio/[slug] และเป็นชื่อไฟล์ใน content/ */
  slug: string;
  title: string;
  category: ProjectCategory;
  /** คำโปรย 1 ประโยค แสดงใต้ h1 ของหน้า detail - ไม่ใช่ meta description */
  description: string;
  image: StaticImageData;
  imageAlt: string;
  /** ซ่อนเสมอใน v1 เพราะ NDA - ดู gate.md */
  client?: string;
};
