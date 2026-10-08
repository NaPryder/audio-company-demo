import { describe, expect, it } from "vitest";

import { renderMarkdownFile } from "@/lib/markdown";

import { ARTICLES } from "./data";

describe("เนื้อหาบทความ", () => {
  // กันเนื้อหาหายเงียบ ๆ - พิมพ์ slug ผิดหรือลืมสร้างไฟล์จะได้หน้าเปล่าที่ build ยังผ่าน
  it.each(ARTICLES.map(({ slug }) => slug))("มีเนื้อหาให้ %s", async (slug) => {
    const html = await renderMarkdownFile("src/features/knowledge/content", slug);

    expect(html).toContain("<h2");
  });

  // `/knowledge/videos` เป็น route static ที่ชนกับ `/knowledge/[slug]` - static ชนะ บทความจะเปิดไม่ได้
  it("ไม่มีบทความที่ slug เป็น videos", () => {
    expect(ARTICLES.map(({ slug }) => slug)).not.toContain("videos");
  });
});
