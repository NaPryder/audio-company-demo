export type Article = {
  /** ใช้เป็น path `/knowledge/[slug]` และชื่อไฟล์ใน `content/` - ห้ามเป็น `videos` */
  slug: string;
  /** หมวดภาษาไทย แสดงเป็น eyebrow บนหน้าบทความ */
  category: string;
  title: string;
  /** คำโปรย 1-2 บรรทัดใต้หัวเรื่อง */
  description: string;
  /** path ใต้ `public/` */
  image: string;
  imageAlt: string;
};

/** เก็บแค่ id - thumbnail ดึงจาก YouTube ตอนเรนเดอร์ ไม่ฝัง player */
export type Video = {
  youtubeId: string;
  title: string;
  /** รูปปกของเราเอง (path ใต้ `public/`) - ไม่มีก็ใช้ thumbnail ของ YouTube */
  thumbnail?: string;
};
