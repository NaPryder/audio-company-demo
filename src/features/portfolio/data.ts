import heroImage from "@/features/hero/images/conference-room-hero.jpg";
import elegant from "@/features/editorial/images/conference-room-elegant.jpg";
import neutral from "@/features/editorial/images/meeting-room-neutral.jpg";

import auditoriumRed from "./images/auditorium-red.jpg";
import meetingPresentation from "./images/meeting-presentation.jpg";
import meetingRoomScreen from "./images/meeting-room-screen.jpg";
import type { Project } from "./types";

/**
 * ลำดับใน array กำหนดตำแหน่งบนกริดของ Home - ตัวแรกคือใบใหญ่
 * ไม่มี field `featured` โดยตั้งใจ
 *
 * รูป mood มี 6 ใบไม่ซ้ำ ใช้วนทั้งหน้า จึงข้าม feature folder มาหยิบกันได้
 * alt text ตอนนี้กลาง ๆ ตามประเภทห้อง - เขียนใหม่พร้อมตอนเปลี่ยนรูปจริง (ดู gate.md)
 *
 * ⚠️ `description` ทั้ง 6 ตัวเป็นเนื้อหาสมมติ คู่กับไฟล์ใน `content/` - ต้องเปลี่ยนพร้อมกัน
 * เป็นเนื้อหาโครงการจริงก่อน production (ดู gate.md)
 */
export const PROJECTS: Project[] = [
  {
    slug: "conference-room-av",
    title: "ระบบ AV สำหรับห้องประชุม",
    category: "ห้องประชุม",
    description:
      "ห้องประชุมที่ต้องรองรับทั้งผู้เข้าร่วมในห้องและทางไกล โดยใช้ชุดควบคุมเดียวที่ผู้ใช้ทั่วไปเปิดใช้งานได้เอง",
    image: heroImage,
    imageAlt: "ห้องประชุมที่ติดตั้งระบบเสียงและภาพ",
  },
  {
    slug: "auditorium-sound",
    title: "ระบบเสียงสำหรับหอประชุม", // ⚠️ ยังไม่ยืนยันกับ Figma
    category: "หอประชุม",
    description:
      "หอประชุมที่ใช้ทั้งงานพิธีการ การบรรยาย และการแสดง ระบบจึงต้องสลับรูปแบบการใช้งานได้โดยไม่ต้องตั้งค่าใหม่ทุกครั้ง",
    image: auditoriumRed,
    imageAlt: "หอประชุมขนาดใหญ่ที่ติดตั้งระบบเสียง",
  },
  {
    slug: "meeting-presentation-system",
    title: "ระบบประชุมและการนำเสนอ", // ⚠️ ยังไม่ยืนยันกับ Figma
    category: "ระบบประชุม",
    description:
      "ห้องประชุมที่ใช้นำเสนอเป็นหลัก จึงให้ความสำคัญกับการต่อภาพจากเครื่องของผู้นำเสนอโดยไม่ต้องเปลี่ยนสาย",
    image: meetingPresentation,
    imageAlt: "ห้องประชุมระหว่างการนำเสนอผ่านจอแสดงผล",
  },
  {
    slug: "training-room-sound",
    title: "ระบบเสียงสำหรับพื้นที่อบรม",
    category: "ห้องอบรม",
    description:
      "พื้นที่อบรมที่ต้องได้ยินเสียงผู้สอนชัดทุกที่นั่ง และเปลี่ยนผังห้องได้ตามรูปแบบของแต่ละหลักสูตร",
    image: meetingRoomScreen,
    imageAlt: "ห้องอบรมที่ติดตั้งจอแสดงผลและลำโพง",
  },
  {
    slug: "multipurpose-av",
    title: "ระบบ AV สำหรับพื้นที่อเนกประสงค์",
    category: "พื้นที่อเนกประสงค์",
    description:
      "พื้นที่อเนกประสงค์ที่รองรับงานหลายประเภท โดยเก็บอุปกรณ์ให้พ้นทางเมื่อไม่ได้ใช้",
    image: neutral,
    imageAlt: "พื้นที่อเนกประสงค์ที่ปรับใช้ได้หลายรูปแบบ",
  },
  {
    slug: "audio-control-system",
    title: "ระบบควบคุมเสียง",
    category: "ระบบควบคุม",
    description:
      "ระบบควบคุมที่รวมการสั่งงานเสียงและภาพไว้ที่เดียว เพื่อให้ผู้ดูแลไม่ต้องจำลำดับการเปิดอุปกรณ์",
    image: elegant,
    imageAlt: "ห้องประชุมที่มีชุดควบคุมเสียงติดตั้งอยู่",
  },
];
