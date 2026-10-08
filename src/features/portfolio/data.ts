import auditoriumSound from "../../../public/portfolio/auditorium-sound.webp";
import audioControlSystem from "../../../public/portfolio/audio-control-system.webp";
import conferenceRoomAv from "../../../public/portfolio/conference-room-av.webp";
import meetingPresentationSystem from "../../../public/portfolio/meeting-presentation-system.webp";
import multipurposeAv from "../../../public/portfolio/multipurpose-av.webp";
import trainingRoomSound from "../../../public/portfolio/training-room-sound.webp";

import type { Project } from "./types";

/**
 * ลำดับใน array กำหนดตำแหน่งบนกริดของ Home - ตัวแรกคือใบใหญ่
 * ไม่มี field `featured` โดยตั้งใจ
 *
 * รูปผลงานจริงอยู่ที่ `public/portfolio/` (webp) - import แบบ static เพื่อให้ได้ขนาดและ blur placeholder
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
    image: conferenceRoomAv,
    imageAlt: "ห้องประชุมผนังไม้ ไมโครโฟนตั้งโต๊ะประจำที่นั่ง จอแสดงผลสองจอ และลำโพงติดผนัง",
  },
  {
    slug: "auditorium-sound",
    title: "ระบบเสียงสำหรับหอประชุม", // ⚠️ ยังไม่ยืนยันกับ Figma
    category: "หอประชุม",
    description:
      "หอประชุมที่ใช้ทั้งงานพิธีการ การบรรยาย และการแสดง ระบบจึงต้องสลับรูปแบบการใช้งานได้โดยไม่ต้องตั้งค่าใหม่ทุกครั้ง",
    image: auditoriumSound,
    imageAlt: "หอประชุมขนาดใหญ่ ลำโพง line array แขวนสองข้างเวที และลำโพงซับวูฟเฟอร์หน้าเวที",
  },
  {
    slug: "meeting-presentation-system",
    title: "ระบบประชุมและการนำเสนอ", // ⚠️ ยังไม่ยืนยันกับ Figma
    category: "ระบบประชุม",
    description:
      "ห้องประชุมที่ใช้นำเสนอเป็นหลัก จึงให้ความสำคัญกับการต่อภาพจากเครื่องของผู้นำเสนอโดยไม่ต้องเปลี่ยนสาย",
    image: meetingPresentationSystem,
    imageAlt: "ชุดไมโครโฟนประชุมบนโต๊ะ ด้านหลังเป็นจอแสดงผลงานนำเสนอ",
  },
  {
    slug: "training-room-sound",
    title: "ระบบเสียงสำหรับพื้นที่อบรม",
    category: "ห้องอบรม",
    description:
      "พื้นที่อบรมที่ต้องได้ยินเสียงผู้สอนชัดทุกที่นั่ง และเปลี่ยนผังห้องได้ตามรูปแบบของแต่ละหลักสูตร",
    image: trainingRoomSound,
    imageAlt: "ห้องอบรมจัดเก้าอี้เป็นแถว หันหน้าเข้าหาจอแสดงผลบนผนังไม้",
  },
  {
    slug: "multipurpose-av",
    title: "ระบบ AV สำหรับพื้นที่อเนกประสงค์",
    category: "พื้นที่อเนกประสงค์",
    description:
      "พื้นที่อเนกประสงค์ที่รองรับงานหลายประเภท โดยเก็บอุปกรณ์ให้พ้นทางเมื่อไม่ได้ใช้",
    image: multipurposeAv,
    imageAlt: "พื้นที่อเนกประสงค์ จอโปรเจกเตอร์ ลำโพงบนขาตั้ง และเก้าอี้จัดเป็นแถว",
  },
  {
    slug: "audio-control-system",
    title: "ระบบควบคุมเสียง",
    category: "ระบบควบคุม",
    description:
      "ระบบควบคุมที่รวมการสั่งงานเสียงและภาพไว้ที่เดียว เพื่อให้ผู้ดูแลไม่ต้องจำลำดับการเปิดอุปกรณ์",
    image: audioControlSystem,
    imageAlt: "มิกเซอร์ Yamaha MG10X และเครื่องรับไมโครโฟนไร้สาย ต่อเข้าเต้ารับสัญญาณบนผนัง",
  },
];
