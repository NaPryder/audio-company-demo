import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

/** 5 route hardcode - ไม่มี dynamic route ใน v1 จึงไม่ต้อง generate */
export const ROUTES = ["/", "/portfolio", "/brands", "/contact", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: new URL(route, env.NEXT_PUBLIC_SITE_URL).toString(),
    lastModified: new Date(),
  }));
}
