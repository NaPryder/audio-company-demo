# B04 - export assets จาก Figma

Blocked by: B01
Status: todo

Figma `ekB4HSBNX3pRNvcCFELQQC`.
⚠️ asset URL หมดอายุ 7 วัน - `curl` ลงเครื่องทันที **ห้ามอ้าง URL ในโค้ด**

| ปลายทาง | node | ขนาด |
|---|---|---|
| `src/features/hero/images/conference-room-hero.jpg` | `36:8887` | 2880×1300 |
| `src/features/hero/images/conference-room-hero-mobile.jpg` | `36:9164` | 780×1080 |
| `src/features/editorial/images/meeting-room-neutral.jpg` | `36:8920` | 1460×920 |
| `src/features/portfolio/images/auditorium-red.jpg` | `36:8930` | 1460×920 |
| `src/features/portfolio/images/meeting-presentation.jpg` | `36:8941` | 1460×920 |
| `src/features/editorial/images/conference-room-elegant.jpg` | `36:8951` | 1460×920 |
| `src/features/portfolio/images/meeting-room-screen.jpg` | `36:8961` | 1460×920 |
| `public/logos/audac.png` | `36:8994` | ตามจริง |
| `public/logos/allen-heath.png` | `36:8998` | ตามจริง |
| `public/logos/audio-technica.png` | `36:9002` | ตามจริง |
| `public/logos/bose.png` | `36:9006` | ตามจริง |
| `public/logos/jbl.png` | `36:9010` | ตามจริง |
| `public/logos/qsc.png` | `36:9014` | ตามจริง |
| `public/og.jpg` | crop จาก hero | 1200×630 |

hero ต้อง 2 ไฟล์ ไม่ใช่ไฟล์เดียวย่อ - desktop 2.2:1 กับ mobile 0.72:1 เป็นการ crop คนละแบบ.
รูป mood มี 6 ใบไม่ซ้ำ ใช้วนทั้งหน้า.

node หายหรือชน MCP rate limit → สร้าง placeholder JPEG สัดส่วนเดิมแทนเฉพาะใบนั้น แล้วจดลง `gate.md`.

## Done

`sips -g pixelWidth -g pixelHeight` ทุกไฟล์ได้ขนาดตรงตาราง
