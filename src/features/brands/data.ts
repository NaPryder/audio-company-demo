import type { Brand } from "./types";

/**
 * เรียงตามสเปก - Home แสดง 6 ตัวแรก (ที่มีโลโก้ทั้งหมด) · `/brands` แสดงครบ 12
 * อีก 6 ตัวเป็น `null` ตั้งใจ เพื่อให้ fallback `Logo unavailable` โผล่เฉพาะใน /brands
 *
 * ⚠️ โลโก้ทั้ง 6 เป็น wordmark ตัวหนังสือชั่วคราว ไม่ใช่โลโก้จริง - ดู gate.md
 */
export const BRANDS: Brand[] = [
  { name: "AUDAC", logo: "/logos/audac.svg" },
  { name: "Allen & Heath", logo: "/logos/allen-heath.svg" },
  { name: "Audio-Technica", logo: "/logos/audio-technica.svg" },
  { name: "Bose", logo: "/logos/bose.svg" },
  { name: "JBL", logo: "/logos/jbl.svg" },
  { name: "QSC", logo: "/logos/qsc.svg" },
  { name: "SHURE", logo: null },
  { name: "Sennheiser", logo: null },
  { name: "Soundcraft", logo: null },
  { name: "TOA", logo: null },
  { name: "VL Audio", logo: null },
  { name: "YAMAHA", logo: null },
];

/** Home แสดงแค่ 6 - เบี่ยงจาก design ที่วาดไว้ 12 โดยตั้งใจ (ticket 11) */
export const HOME_BRANDS = BRANDS.slice(0, 6);
