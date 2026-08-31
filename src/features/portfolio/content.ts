import { readFile } from "node:fs/promises";
import path from "node:path";

import { marked } from "marked";

/**
 * ทิ้ง raw HTML ทั้งหมด - `marked` ถอด option `sanitize` ออกตั้งแต่ v5 แล้ว
 *
 * เนื้อหาเป็นไฟล์ของเราเองและแปลงตอน build ไม่มี input จากผู้ใช้เลย
 * `dangerouslySetInnerHTML` จึงปลอดภัย *ในเงื่อนไขนี้เท่านั้น*
 * วันที่เนื้อหามาจาก Payload หรือจากใครก็ตามที่ไม่ใช่คนใน repo ข้อสรุปนี้เป็นโมฆะทันที
 * ต้องเปลี่ยนไปใช้ sanitizer จริง (DOMPurify ฝั่ง server) ไม่ใช่แค่ทิ้ง token
 */
marked.use({ renderer: { html: () => "" } });

const CONTENT_DIR = path.join(process.cwd(), "src/features/portfolio/content");

export function renderMarkdown(raw: string) {
  return marked.parse(raw, { async: false });
}

/** คืน "" เมื่อไม่มีไฟล์ - หน้ายังเรนเดอร์ได้ตามปกติ แค่ไม่มีเนื้อหา */
export async function renderProjectBody(slug: string): Promise<string> {
  let raw: string;
  try {
    raw = await readFile(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
  } catch {
    console.warn(`[portfolio] ไม่พบ ${slug}.md - หน้าจะไม่มีเนื้อหา`);
    return "";
  }
  return renderMarkdown(raw);
}
