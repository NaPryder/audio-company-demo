import type { Article, Video } from "./types";

/**
 * ⚠️ หัวข้อทั้ง 3 มาจากชื่อ node ใน Figma ยังไม่ได้เทียบกับข้อความจริง
 * `category` · `description` และเนื้อหาใน `content/` เป็น mock ทั้งหมด (ดู gate.md)
 */
export const ARTICLES: Article[] = [
  {
    slug: "prepare-av-design",
    category: "การวางแผน",
    title: "สิ่งที่ควรเตรียมก่อนออกแบบระบบ AV",
    description:
      "ข้อมูลที่ควรมีในมือก่อนคุยกับผู้ออกแบบ ตั้งแต่รูปแบบการใช้ห้องไปจนถึงข้อจำกัดของอาคาร",
    image: "/editorial/prepare-av-design.webp",
    imageAlt: "ห้องประชุมว่างก่อนเริ่มติดตั้งระบบ",
  },
  {
    slug: "choose-sound-approach",
    category: "ระบบเสียง",
    title: "เลือกแนวทางระบบเสียงให้เหมาะกับพื้นที่",
    description:
      "ขนาดห้อง วัสดุผิว และลักษณะการพูดคุย กำหนดชนิดลำโพงและไมโครโฟนมากกว่ายี่ห้อหรือกำลังขับ",
    image: "/editorial/choose-sound-approach.webp",
    imageAlt: "ห้องประชุมที่จัดวางลำโพงตามลักษณะพื้นที่",
  },
  {
    slug: "system-acceptance",
    category: "ส่งมอบงาน",
    title: "ตรวจรับระบบอย่างไรให้พร้อมใช้งาน",
    description:
      "รายการที่ควรทดสอบก่อนเซ็นรับงาน เพื่อให้ห้องพร้อมใช้ตั้งแต่การประชุมครั้งแรก ไม่ใช่หลังแจ้งซ่อมรอบที่สาม",
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
