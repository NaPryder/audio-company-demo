export type Brand = {
  name: string;
  /**
   * path ใต้ `public/logos/` เรนเดอร์ด้วย `<img>` ธรรมดา · `null` = ยังไม่มีไฟล์โลโก้
   *
   * เบี่ยงจาก spec §7 ที่เขียนไว้เป็น `StaticImageData` โดยตั้งใจ:
   * ปลายทางที่ ticket 07 กำหนดคือ SVG จาก press kit ซึ่งผ่าน `next/image` ไม่ได้
   * ถ้าไม่เปิด `images.dangerouslyAllowSVG` - ดู gate.md
   */
  logo: string | null;
};
