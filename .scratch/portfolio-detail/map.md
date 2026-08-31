# Map: Portfolio Detail (`/portfolio/[slug]`)

Label: `wayfinder:map`

## ✅ ถึงปลายทางแล้ว

แผนที่นี้จบแล้ว - ปลายทางคือ [`spec.md`](spec.md). ticket ทั้ง 4 ใบ resolved.

## Destination

สเปกที่เขียนเสร็จแล้ว ([`spec.md`](spec.md) — ยังไม่มี) ที่ agent session ใหม่หยิบไปสร้าง route
`/portfolio/[slug]` ได้ทันทีโดยไม่ต้องกลับมาถามอะไรอีก — รวมโครงหน้า 2 breakpoint,
ท่อ markdown, และ **ตัวเนื้อหา mock ทั้ง 6 โครงการเขียนเสร็จอยู่ในสเปก**.

ปลายทางคือเอกสาร ไม่ใช่โค้ดที่รันได้ (เหมือน map `landing-page`).

## Notes

**Effort นี้คืออะไร**: `landing-page/map.md` เคยจัด Portfolio Detail ไว้ใน Out of scope
ด้วยเหตุผล "ยังไม่มีเนื้อหาให้แสดง" และเตรียม `Project.slug` ไว้แล้ว.
ผู้ใช้วาด destination ใหม่ → effort ใหม่ ไม่ใช่การรื้อ map เก่ามาต่อ.

**อ่านก่อนเริ่มทุก session**:
- [`../landing-page/spec.md`](../landing-page/spec.md) — token, type scale, `sizes`, โครง 5 route เดิม
- [`../landing-page/build/gate.md`](../landing-page/build/gate.md) — gate ห้าม deploy 14 ข้อ ยังค้างอยู่ทั้งหมด
- [`../../CONTEXT.md`](../../CONTEXT.md) — `Project` = งานติดตั้งที่เสร็จแล้ว ห้ามสับสนกับ `Lead`

**ข้อจำกัดที่ยกมาจาก map เก่าทั้งดุ้น**: ไทยล้วน · light mode อย่างเดียว · 2 breakpoint (390 / 1440, ตัดที่ `lg` 1024) · ไม่มี DB ไม่มี CMS · radius 2px ไม่มีเงา · Node dev 26 / prod `nodejs24.x`.

**Skill ที่ทุก session ต้องเรียก**: `/grilling` และ `/domain-modeling`.
**ห้ามยิง research subagent เองโดยที่ผู้ใช้ไม่สั่ง** (คำสั่งระดับ session override wayfinder step 5).

**รูป**: ยังเป็นชุด mood 6 ใบเดิมที่ generate เอง ติด gate อยู่ ห้ามสร้างรูปใหม่เพิ่ม.

## Decisions so far

ตัดสินระหว่างวาดแผนที่ (grilling 3 รอบ 16 คำถาม):

- **Q1 ปลายทาง** — สเปกบนกระดาษก่อน แล้วค่อย build (ไม่ใช่โค้ดรันได้จบใน map นี้)
- **Q2 ท่อ markdown** — `.md` + `marked` 1 dep แปลงเป็น HTML string. **ไม่เอา MDX** และ 3 dep ที่พ่วงมา
- **Q3 source of truth** — `data.ts` คุม field มีโครงสร้าง, `.md` เก็บ**เนื้อความล้วน ไม่มี frontmatter** → ไม่ต้องมี parser frontmatter และ `image: StaticImageData` (static import + blur) ยังอยู่ครบ
- **Q4 ขอบเขต SEO** — ~~meta tag เต็มชุด + JSON-LD + breadcrumb~~ **ถูกยกเลิกโดย Q15**
- **Q5 section ของหน้า** — hero (รูป + หมวด + ชื่อ) → ภาพรวมโครงการ → ขอบเขตงาน (list) → `ContactSection` reuse ทั้งดุ้น → ผลงานอื่น 3 ใบ. **ไม่มี gallery** เพราะรูปจริงยังไม่มีสักใบ
- **Q6 การ์ดกดได้** — `ProjectCard` ทั้งใบเป็น `<Link>` → กดได้ทั้ง Home และ `/portfolio` พร้อมกัน ไม่มี prop ควบคุม
- **Q7 ความลึกของเนื้อหา** — เขียนเต็ม 2 ใบ อีก 4 ใบสั้น
- **Q8 `client`** — ซ่อนต่อทุกใบเพราะ NDA (gate เดิมข้อ "ตัดสินใจ `client` ราย project" ยังค้าง)
- **Q9 ที่อยู่ของสเปก** — `.scratch/portfolio-detail/` โครงเดียวกับ map เก่า จบเมื่อ `spec.md` เขียนเสร็จ
- **Q10 style ของ HTML ที่ marked พ่นออกมา** — เขียน CSS เองใน `globals.css` **ไม่ลง `@tailwindcss/typography`** เพราะ type scale ล็อกไว้ตั้งแต่ ticket 01 ของ map เก่า → plugin ต้อง override เกือบทุกบรรทัดอยู่ดี
- **Q11 field ใหม่ใน `data.ts`** — เพิ่ม `description: string` ตัวเดียว. **ขอบเขตงานอยู่ใน `.md`** เป็นหัวข้อ `## ขอบเขตงาน` + bullet ไม่ทำเป็น field. ไม่เพิ่ม `year` / `location` เพราะไม่มีข้อมูลจริง
- **Q12 JSON-LD** — ~~`CreativeWork` + `BreadcrumbList`~~ **ถูกยกเลิกโดย Q15**
- **Q13 hero + ลำดับหัวข้อ** — hero มีรูปเฉพาะหน้า detail **และ** แก้ `SectionHeading` ให้เลือกระดับหัวข้อได้ แล้ว `PageHeader` ส่ง `h1`. เจอระหว่างวาดแผนที่ว่า **ทั้ง repo มี `<h1>` แค่ที่ Home** — `/portfolio` `/brands` `/contact` `/privacy` ไม่มีเลยสักหน้า เพราะ `SectionHeading` hardcode `<h2>`. เหตุผลตอนถามอ้าง SEO แต่ Q15 ตัด SEO ทิ้ง — **ข้อนี้ยังอยู่เพราะ accessibility** ไม่ใช่เพราะ SEO
- **Q14 นโยบาย index** — ไม่ต้องใส่ `noindex` ไม่เพิ่ม gate. เป็นแค่ mock content และ gate เดิมห้าม deploy อยู่แล้ว
- **Q15 SEO ทั้งก้อน** — **ตัดออกจาก map นี้ทั้งหมด** ยกไปรอบที่มี content จริง (ดู Out of scope). หน้า detail มีแค่ `title` พื้นฐาน
- **Q16 สองใบที่เขียนเต็ม** — `conference-room-av` (ใบใหญ่บน Home ใช้ hero image) และ `auditorium-sound` (หมวด `หอประชุม` ต่างจากใบแรกชัดที่สุด)

จาก ticket:

- [01 โครงหน้า detail และลำดับหัวข้อ](issues/01-page-layout-and-headings.md) - hero เป็น**ตัวหนังสือบนพื้น bg + แบนเนอร์รูปอยู่ใต้** ไม่ทับกัน (รูปมีใบเดียวไม่มี crop มือถือ และ overlay 0.6 จะกินรูปหมด) · `SectionHeading` เพิ่ม `as` + `eyebrowLang` · **หมวดขึ้นเป็น eyebrow ภาษาไทย** แทน `SELECTED WORK` · markdown คุมหัวข้อในโซนเนื้อหาเอง หน้าไม่เรนเดอร์ให้ · breadcrumb ที่มองเห็น 3 ระดับ (ไม่มี JSON-LD) · การ์ดใช้ stretched link ครอบ `<h3>` ต้องสลับแถบล่างจาก `absolute` เป็น `-z-10` ก่อน · **แก้ ticket ที่เขียนไว้ผิด: `/contact` ไม่ได้ใช้ `PageHeader` → `PageHeader` แก้ได้แค่ 3 หน้า `/contact` ต้องแก้แยกผ่าน prop ของ `ContactSection`** · หน้า detail ไม่ใช้ `PageHeader` เพราะ padding ซ้อน · **หลังงานนี้ทั้ง 6 route มี `<h1>` ครบ จากเดิมมีแค่ Home**
- [02 ท่อ markdown และกลไก route](issues/02-markdown-pipeline-and-route.md) - `.md` อยู่ `src/features/portfolio/content/` · **`marked@18.0.11` ถอด `sanitize` ออกตั้งแต่ v5** ต้อง override `renderer.html` เอง แต่ยังเลือก `marked` เพราะ **0 transitive dep** ส่วน `markdown-it` ลาก 6 · `dynamicParams = false` → 404 ให้เอง **ผลพ่วง: `fs` อ่านตอน build เท่านั้น วันเปลี่ยนเป็น ISR จะพังเพราะไฟล์ใต้ `src/` ไม่เข้า deployment output** · `.md` หาย → หน้าเรนเดอร์ต่อ เนื้อหาว่าง + `console.warn` · element ปิด 9 ตัว ไม่มี `img` `blockquote` `code` · **`.markdown-body` ถอดค่าจาก `/privacy` ที่ตัดสินไปแล้วในโค้ด** (ตาราง type scale ในสเปกไม่มี role หัวข้อในเนื้อหา) · ลิงก์ในเนื้อหาขีดเส้นใต้ด้วย ต่างจาก `/privacy` เพราะ WCAG 1.4.1 · มีเทสต์ 1 ตัวยืนยันว่า raw HTML ถูกทิ้ง
- [03 เนื้อหา mock 6 โครงการ](issues/03-mock-content.md) - เขียนครบ 6 ชุด + `description` 6 ตัว. ทำเครื่องหมาย mock ด้วย `<!-- MOCK -->` บรรทัดแรก ซึ่ง `renderer.html` ของ ticket 02 ทิ้งอยู่แล้ว → คนเปิดไฟล์เห็น หน้าเว็บไม่เห็น · **ไม่มีตัวเลข ชื่อสถานที่ ปี หรือยี่ห้อในเนื้อหาเลยสักตัว** เพราะของแต่งที่หน้าตาเหมือนของจริงคือสิ่งที่หลุดขึ้น production ง่ายที่สุด · `h3` ไม่ถูกใช้เลย (เนื้อหาไม่ลึกพอ) · เพิ่ม gate 3 ข้อ
- [04 ประกอบสเปก](issues/04-assemble-spec.md) - **[`spec.md`](spec.md) เขียนเสร็จ = ปลายทางของ map นี้** · ไม่ก๊อปเนื้อหา 180 บรรทัดมาไว้ในสเปก ชี้ไปที่ ticket 03 แทนเพื่อไม่ให้มีสองสำเนา · เพิ่ม §10 ลำดับที่แนะนำที่ ticket ไม่ได้ขอ (ทำ `content.ts` + เทสต์ก่อน เพราะชื่อ hook ของ marked v18 เป็นข้อสมมติเดียวที่ยังไม่ยืนยันกับของจริง) · gate เพิ่ม 5 ข้อ ไม่ใช่ 3 — เติมงาน SEO ที่ยกไว้กับ `noindex` เข้าไป เพราะทั้งคู่คือ "ทีหลัง" ไม่ใช่ "ไม่ทำ" ถ้าไม่ลง gate จะหายไปพร้อม map นี้

## Not yet specified

- **รูปเฉพาะของแต่ละโครงการ** — ตอนนี้ทั้ง 6 หน้าจะใช้รูป mood ชุดเดิมซ้ำกับที่ใช้บน Home. หน้า detail ควรมีรูปของตัวเองกี่ใบ ขนาดเท่าไร ยังตอบไม่ได้จนกว่าจะมีรูปโครงการจริง (gate เดิม)
- **หน้า detail ของ Article** — `landing-page` ทิ้งไว้คู่กัน. ถ้าท่อ markdown ใน map นี้ใช้ได้ดี บทความน่าจะใช้ท่อเดียวกัน แต่ยังไม่รู้ว่าจะทำเมื่อไรและ `Article` ต้องมี field อะไรเพิ่ม
- **filter / หมวดหมู่บน `/portfolio`** — ticket 11 ของ map เก่าตัดสินว่า "ไม่มี filter" ตอนมี 6 ใบ. พอมีหน้า detail และ `category` ถูกใช้จริงขึ้น อาจต้องกลับมาดู แต่ยังไม่มีใครขอ

## Out of scope

- **SEO ทั้งชุดของหน้า detail** (Q15) — meta description, `openGraph`, `alternates.canonical`, JSON-LD `CreativeWork`, `BreadcrumbList`, เพิ่ม 6 route ใน `sitemap.ts`. ผู้ใช้ยกไปรอบที่มี content จริง. ผมทักว่าเขียนตอนสร้างหน้าถูกกว่ามาไล่เติมทีหลัง 6 หน้า ผู้ใช้ยืนยัน
- **`noindex` + gate เรื่อง thin content** (Q14) — 4 หน้าที่เนื้อหาสั้นจะโครงเหมือนกันและรูปซ้ำ เข้าข่าย near-duplicate ที่ลาก quality ทั้งโดเมน. ผู้ใช้รับทราบแล้วเลือกไม่ทำ เพราะ gate เดิมห้าม deploy อยู่แล้ว
- **หน้า tag archive `/portfolio/tag/[tag]`** (Q4) — route ใหม่ทั้งชุด คนละงาน
- **MDX และ `@next/mdx` + 3 dep พ่วง** (Q2)
- **frontmatter ใน `.md`** (Q3) — field มีโครงสร้างอยู่ `data.ts` หมด
- **gallery รูปในหน้า detail** (Q5) — รูปจริงยังไม่มีสักใบ
- **เปิด `client` เป็นราย project** (Q8) — ยังไม่มีใครไปขออนุญาตลูกค้า
- **`year` / `location` ใน `Project`** (Q11) — ไม่มีข้อมูลจริง แต่งขึ้นมาแล้ววันหลังแยกไม่ออกว่าอันไหนของจริง
