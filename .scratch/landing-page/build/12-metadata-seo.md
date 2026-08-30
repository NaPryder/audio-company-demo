# B12 - metadata + SEO

Blocked by: B11
Status: todo

ตาม [spec §9](../spec.md)

- `layout.tsx` metadata block ตรง ๆ - `metadataBase` · title template · description · `openGraph { type, locale: "th_TH", images: ["/og.jpg"] }`
- title ต่อ route: `ผลงานติดตั้ง` · `แบรนด์คู่ค้า` · `ติดต่อเรา` · `ประกาศความเป็นส่วนตัว`
- `alternates.canonical` ทุกหน้า
- `sitemap.ts` + `robots.ts` hardcode 5 route
- JSON-LD **`Organization` ไม่ใช่ `LocalBusiness`** - `name` `url` `logo` `contactPoint` (โทร + อีเมล) `sameAs` (Facebook/IG/TikTok) อ่านจาก env
  เหตุผล: `LocalBusiness` บังคับ `address` ซึ่งยังไม่มีจริง และ Google เอาไปแสดงผลจริง
