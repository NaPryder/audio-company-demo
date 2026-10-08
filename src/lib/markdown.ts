import { readFile } from "node:fs/promises";
import path from "node:path";

import { Marked } from "marked";

/**
 * instance ของตัวเอง ไม่ใช่ `marked.use()` ที่แก้ singleton ระดับ process
 * เพราะ singleton ทำให้การทิ้ง raw HTML ขึ้นกับลำดับ import - โมดูลอื่นที่เรียก
 * `marked.parse` ก่อนไฟล์นี้ถูก import จะได้ parser ที่ไม่ได้ override
 *
 * ทิ้ง token ชนิด `html` ทั้ง block และ inline - `marked` ถอด option `sanitize`
 * ออกตั้งแต่ v5 แล้ว จึงต้อง override renderer เอง
 *
 * ⚠️ ไม่ใช่ sanitizer - ทิ้งแค่ raw HTML ไม่ได้ตรวจ URL scheme
 * `[x](javascript:alert(1))` ยังผ่านออกมาเป็น href ตามเดิม
 * ปลอดภัยได้เพราะเนื้อหาเป็นไฟล์ใน repo ของเราเองและแปลงตอน build ไม่มี input จากผู้ใช้
 * `dangerouslySetInnerHTML` จึงใช้ได้ *ในเงื่อนไขนี้เท่านั้น*
 * วันที่เนื้อหามาจาก Payload หรือจากใครก็ตามที่ไม่ใช่คนใน repo ข้อสรุปนี้เป็นโมฆะทันที
 * ต้องเปลี่ยนไปใช้ sanitizer จริง (DOMPurify ฝั่ง server) ที่ตรวจ URL ด้วย ไม่ใช่แค่ทิ้ง token
 */
const markdown = new Marked({ renderer: { html: () => "" } });

export function renderMarkdown(raw: string) {
  return markdown.parse(raw, { async: false });
}

/**
 * อ่าน `<dir>/<slug>.md` แล้วแปลงเป็น HTML · `dir` เป็น path เทียบกับ root ของ repo
 *
 * คืน "" เมื่อไม่มีไฟล์ - หน้ายังเรนเดอร์ได้ตามปกติ แค่ไม่มีเนื้อหา
 *
 * slug ถูกจำกัดรูปแบบก่อนต่อเป็น path - `path.join` ย่อ `..` ให้เฉย ๆ ไม่ได้ปฏิเสธ
 * ตอนนี้ `dynamicParams = false` กันไว้อีกชั้นแล้ว แต่ฟังก์ชันนี้ export ออกไปรับ `string`
 * และชั้นนั้นจะหายไปทันทีที่หน้าเปลี่ยนเป็น ISR หรือ dynamic
 */
export async function renderMarkdownFile(dir: string, slug: string): Promise<string> {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    console.warn(`[markdown] slug ไม่ถูกรูปแบบ: ${slug}`);
    return "";
  }

  let raw: string;
  try {
    raw = await readFile(path.join(process.cwd(), dir, `${slug}.md`), "utf8");
  } catch {
    console.warn(`[markdown] ไม่พบ ${dir}/${slug}.md - หน้าจะไม่มีเนื้อหา`);
    return "";
  }
  return renderMarkdown(raw);
}
