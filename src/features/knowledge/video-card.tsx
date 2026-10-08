"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import type { Video } from "./types";

const thumbnail = (id: string, quality: "maxresdefault" | "hqdefault") =>
  `https://i.ytimg.com/vi/${id}/${quality}.jpg`;

/**
 * `"use client"` เพราะต้องมี `onError` · `<img>` ธรรมดาไม่ใช่ `next/image`
 * thumbnail เป็น JPEG ที่ผ่าน CDN ของ Google มาแล้ว optimize ซ้ำแทบไม่ได้อะไร
 * และ Vercel คิดเงินต่อ transformation - เลยไม่ต้องแตะ `next.config` เลย
 *
 * fallback มีสองชั้น: maxres -> hq -> แผ่นทึบพร้อมชื่อเรื่อง
 * ชั้นที่สองจำเป็นเพราะ `youtubeId` ตอนนี้ยังเป็นค่าสมมติ ทั้งสอง URL จึงโหลดไม่ขึ้น
 * ถ้าไม่มีมันหน้าแรกจะโชว์ไอคอนรูปพังสามใบ (ดู gate.md)
 */
export function VideoCard({
  video,
  as: Heading = "h3",
  className,
}: {
  video: Video;
  /** ระดับหัวข้อ - หน้า /knowledge/videos วางกริดใต้ h1 ตรง ๆ จึงต้องส่ง "h2" */
  as?: "h2" | "h3";
  className?: string;
}) {
  const [quality, setQuality] = useState<"maxresdefault" | "hqdefault">("maxresdefault");
  const [unavailable, setUnavailable] = useState(false);

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative isolate block overflow-hidden rounded-sm border border-border bg-card-navy",
        className,
      )}
    >
      {unavailable ? (
        <div aria-hidden="true" className="absolute inset-0 bg-navy" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={video.thumbnail ?? thumbnail(video.youtubeId, quality)}
          alt=""
          width={366}
          height={300}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
          onError={() => {
            if (quality === "maxresdefault") setQuality("hqdefault");
            else setUnavailable(true);
          }}
        />
      )}

      <div className="absolute inset-x-0 bottom-0 bg-[rgba(3,8,20,0.9)] px-5 py-4">
        <p className="text-[11px]/[16px] font-bold text-card-meta">
          <span lang="en">YOUTUBE</span>
        </p>
        <Heading className="mt-[5px] text-[18px]/[25px] font-bold text-surface group-hover:underline">
          {video.title}
        </Heading>
      </div>
    </a>
  );
}
