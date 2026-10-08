import { describe, expect, it } from "vitest";

import { renderMarkdownFile } from "@/lib/markdown";

import { PROJECTS } from "./data";

// กันเนื้อหาหายเงียบ ๆ - พิมพ์ slug ผิดหรือลืมสร้างไฟล์จะได้หน้าเปล่าที่ build ยังผ่าน
describe("เนื้อหาผลงาน", () => {
  it.each(PROJECTS.map(({ slug }) => slug))("มีเนื้อหาให้ %s", async (slug) => {
    const html = await renderMarkdownFile("src/features/portfolio/content", slug);

    expect(html).toContain("<h2");
    expect(html).not.toContain("MOCK");
  });
});
