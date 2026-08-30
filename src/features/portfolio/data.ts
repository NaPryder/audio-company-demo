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
 */
export const PROJECTS: Project[] = [
  {
    slug: "conference-room-av",
    title: "ระบบ AV สำหรับห้องประชุม",
    category: "ห้องประชุม",
    image: heroImage,
    imageAlt: "ห้องประชุมที่ติดตั้งระบบเสียงและภาพ",
  },
  {
    slug: "auditorium-sound",
    title: "ระบบเสียงสำหรับหอประชุม", // ⚠️ ยังไม่ยืนยันกับ Figma
    category: "หอประชุม",
    image: auditoriumRed,
    imageAlt: "หอประชุมขนาดใหญ่ที่ติดตั้งระบบเสียง",
  },
  {
    slug: "meeting-presentation-system",
    title: "ระบบประชุมและการนำเสนอ", // ⚠️ ยังไม่ยืนยันกับ Figma
    category: "ระบบประชุม",
    image: meetingPresentation,
    imageAlt: "ห้องประชุมระหว่างการนำเสนอผ่านจอแสดงผล",
  },
  {
    slug: "training-room-sound",
    title: "ระบบเสียงสำหรับพื้นที่อบรม",
    category: "ห้องอบรม",
    image: meetingRoomScreen,
    imageAlt: "ห้องอบรมที่ติดตั้งจอแสดงผลและลำโพง",
  },
  {
    slug: "multipurpose-av",
    title: "ระบบ AV สำหรับพื้นที่อเนกประสงค์",
    category: "พื้นที่อเนกประสงค์",
    image: neutral,
    imageAlt: "พื้นที่อเนกประสงค์ที่ปรับใช้ได้หลายรูปแบบ",
  },
  {
    slug: "audio-control-system",
    title: "ระบบควบคุมเสียง",
    category: "ระบบควบคุม",
    image: elegant,
    imageAlt: "ห้องประชุมที่มีชุดควบคุมเสียงติดตั้งอยู่",
  },
];
