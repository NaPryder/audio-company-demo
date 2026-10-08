import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

/**
 * 7 route hardcode
 *
 * ⚠️ ไม่ครบทุก route แล้ว - `/portfolio/[slug]` 6 หน้าและ `/knowledge/[slug]` 3 หน้ายังไม่อยู่ในนี้
 * เพราะเนื้อหายังเป็น mock ทั้งหมด ยกไปรอบที่มีเนื้อหาจริงพร้อม SEO ที่เหลือ (ดู gate.md)
 * ตอนนั้นเติมด้วย `PROJECTS.map(({ slug }) => \`/portfolio/${slug}\`)` ได้เลย (บทความก็ทำแบบเดียวกัน)
 */
export const ROUTES = [
  "/",
  "/portfolio",
  "/knowledge",
  "/knowledge/videos",
  "/brands",
  "/contact",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: new URL(route, env.NEXT_PUBLIC_SITE_URL).toString(),
    lastModified: new Date(),
  }));
}
