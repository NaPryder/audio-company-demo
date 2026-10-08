/** การ์ดบทความกดไม่ได้ใน v1 - ยังไม่มีหน้าปลายทาง จึงไม่มี slug หรือ href */
export type Article = {
  title: string;
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
