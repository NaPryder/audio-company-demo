import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

/**
 * 5 route hardcode
 *
 * ⚠️ ไม่ครบทุก route แล้ว - `/portfolio/[slug]` อีก 6 หน้ายังไม่อยู่ในนี้
 * เพราะเนื้อหายังเป็น mock ทั้งหมด ยกไปรอบที่มีเนื้อหาจริงพร้อม SEO ที่เหลือ (ดู gate.md)
 * ตอนนั้นเติมด้วย `PROJECTS.map(({ slug }) => \`/portfolio/${slug}\`)` ได้เลย
 */
export const ROUTES = ["/", "/portfolio", "/brands", "/contact", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: new URL(route, env.NEXT_PUBLIC_SITE_URL).toString(),
    lastModified: new Date(),
  }));
}
