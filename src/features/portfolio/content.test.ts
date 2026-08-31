import { describe, expect, it } from "vitest";

import { renderMarkdown, renderProjectBody } from "./content";

describe("renderMarkdown", () => {
  // เทสต์ที่ต้องมี - ถ้าข้อนี้พัง `dangerouslySetInnerHTML` ในหน้ากลายเป็นช่องโหว่ทันที
  it("ทิ้ง raw HTML ทั้ง block และ inline", async () => {
    const html = await renderMarkdown(
      "<script>alert(1)</script>\n\nข้อความ <img src=x onerror=alert(1)> ต่อ",
    );

    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
  });

  it("ทิ้ง HTML comment ที่ใช้ทำเครื่องหมาย mock", async () => {
    const html = await renderMarkdown("<!-- MOCK: เนื้อหาสมมติ -->\n\n## หัวข้อ");

    expect(html).not.toContain("MOCK");
    expect(html).toContain("<h2");
  });
});

describe("renderProjectBody", () => {
  it("คืนค่าว่างเมื่อไม่มีไฟล์ - หน้ายังเรนเดอร์ได้ตามปกติ", async () => {
    await expect(renderProjectBody("ไม่มีโครงการนี้")).resolves.toBe("");
  });
});
