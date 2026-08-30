import meetingPresentation from "@/features/portfolio/images/meeting-presentation.jpg";

import elegant from "./images/conference-room-elegant.jpg";
import neutral from "./images/meeting-room-neutral.jpg";
import type { Article, Video } from "./types";

/** ⚠️ หัวข้อทั้ง 3 มาจากชื่อ node ใน Figma ยังไม่ได้เทียบกับข้อความจริง */
export const ARTICLES: Article[] = [
  {
    title: "สิ่งที่ควรเตรียมก่อนออกแบบระบบ AV",
    image: neutral,
    imageAlt: "ห้องประชุมว่างก่อนเริ่มติดตั้งระบบ",
  },
  {
    title: "เลือกแนวทางระบบเสียงให้เหมาะกับพื้นที่",
    image: elegant,
    imageAlt: "ห้องประชุมที่จัดวางลำโพงตามลักษณะพื้นที่",
  },
  {
    title: "ตรวจรับระบบอย่างไรให้พร้อมใช้งาน",
    image: meetingPresentation,
    imageAlt: "การทดสอบระบบภาพและเสียงในห้องประชุม",
  },
];

/**
 * ⚠️ `youtubeId` ทั้ง 3 เป็นค่าสมมติ - สเปกไม่เคยระบุวิดีโอจริง
 * thumbnail จึงโหลดไม่ขึ้นและตกไปที่ fallback ของ VideoCard
 * ต้องใส่ id จริงก่อน production (ดู gate.md)
 */
export const VIDEOS: Video[] = [
  { youtubeId: "PLACEHOLDER01", title: "พาชมงานติดตั้งระบบเสียงห้องประชุม" },
  { youtubeId: "PLACEHOLDER02", title: "ทดสอบระบบเสียงหลังติดตั้งเสร็จ" },
  { youtubeId: "PLACEHOLDER03", title: "แนะนำการใช้งานชุดควบคุมเสียง" },
];
