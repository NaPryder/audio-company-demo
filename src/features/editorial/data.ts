import type { Article, Video } from "./types";

/** ⚠️ หัวข้อทั้ง 3 มาจากชื่อ node ใน Figma ยังไม่ได้เทียบกับข้อความจริง */
export const ARTICLES: Article[] = [
  {
    title: "สิ่งที่ควรเตรียมก่อนออกแบบระบบ AV",
    image: "/editorial/prepare-av-design.webp",
    imageAlt: "ห้องประชุมว่างก่อนเริ่มติดตั้งระบบ",
  },
  {
    title: "เลือกแนวทางระบบเสียงให้เหมาะกับพื้นที่",
    image: "/editorial/choose-sound-approach.webp",
    imageAlt: "ห้องประชุมที่จัดวางลำโพงตามลักษณะพื้นที่",
  },
  {
    title: "ตรวจรับระบบอย่างไรให้พร้อมใช้งาน",
    image: "/editorial/system-acceptance.webp",
    imageAlt: "การทดสอบระบบภาพและเสียงในห้องประชุม",
  },
];

/**
 * ⚠️ `youtubeId` ทั้ง 3 เป็นค่าสมมติ - สเปกไม่เคยระบุวิดีโอจริง
 * ทุกคลิปใช้รูปปกของเราเองใน `public/editorial` แทน thumbnail ของ YouTube
 * ต้องใส่ id จริงก่อน production (ดู gate.md)
 */
export const VIDEOS: Video[] = [
  {
    youtubeId: "PLACEHOLDER01",
    title: "พาชมงานติดตั้งระบบเสียงห้องประชุม",
    thumbnail: "/editorial/meeting-room-install-tour.webp",
  },
  {
    youtubeId: "PLACEHOLDER02",
    title: "ทดสอบระบบเสียงหลังติดตั้งเสร็จ",
    thumbnail: "/editorial/post-install-sound-test.webp",
  },
  {
    youtubeId: "PLACEHOLDER03",
    title: "แนะนำการใช้งานชุดควบคุมเสียง",
    thumbnail: "/editorial/sound-control-guide.webp",
  },
];
