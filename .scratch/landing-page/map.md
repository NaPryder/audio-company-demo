# Map: Origin Beat Landing Page

Label: `wayfinder:map`

## ✅ ถึงปลายทางแล้ว

แผนที่นี้จบแล้ว - ปลายทางคือ [`spec.md`](spec.md).
ticket ทั้ง 11 ใบ resolved. TODO เคลียร์แล้วโดยการตัดสินค่าไปก่อน (ผู้ใช้สั่งไม่แตะ Figma อีก) - ค่าที่ยังไม่ยืนยันทำเครื่องหมาย ⚠️ ไว้ในหัวข้อ 12 ของสเปก พร้อม gate ก่อน deploy 10 ข้อ

## Destination

สเปกที่เขียนเสร็จแล้ว (spec + โครงสร้างโปรเจ็ค บนกระดาษ ยังไม่มีโค้ด) ที่ agent session ใหม่หยิบไปลงมือทำ Home ของ The Origin Beat ได้ทันทีโดยไม่ต้องกลับมาถามอะไรอีก.
ปลายทางคือเอกสาร ไม่ใช่ repo ที่รันได้.

## Notes

**Domain**: เว็บบริษัทรับติดตั้งระบบเสียงห้องประชุม (The Origin Beat). ภาษาไทยล้วน.

**Figma**: `ekB4HSBNX3pRNvcCFELQQC` canvas `29:2167`.
Source of truth คือ `Home Redesign / Desktop` (`36:8873`) และ `Home Redesign / Mobile` (`36:9153`) เท่านั้น.
Token อ้างอิงจาก `Design System / Foundations` (`29:3651`).
⚠️ ไฟล์ Figma ถูกแก้ระหว่าง session แรก (metadata 656k → 108k ตัวอักษร) - frame ชุดเก่าและหน้าอื่นถูกลบไปแล้ว. เช็ค node ว่ายังอยู่ก่อนใช้เสมอ.

**Stack ที่ล็อกแล้ว**: Next.js 16.3.3 (App Router, Server Actions) · pnpm · TypeScript · TailwindCSS 4.3.3 (`@theme` ใน globals.css) · shadcn/ui · Resend 6.24.0 · Zod 4.4.3 · deploy บน Vercel.
Node = **26.8.1** ตามที่ผู้ใช้สั่ง (ผมทักว่า 26 ไม่ใช่ LTS และ Vercel Functions เลือกไม่ได้ ผู้ใช้ยืนยัน).
ผลที่ตามมาที่ต้องรู้: **dev รัน 26 แต่ prod บน Vercel จะรัน `nodejs24.x`** (สูงสุดที่ Functions เลือกได้ - 26 มีเฉพาะบน Sandbox).
ห้ามใช้ API ที่มีเฉพาะใน Node 26 และต้องทดสอบ build ด้วย 24 ก่อน deploy จริง.

**ข้อจำกัดถาวร**: ไทยอย่างเดียว ไม่มี i18n lib · light mode อย่างเดียว ไม่มี theme toggle · 2 breakpoint (mobile 390 / desktop 1440) ไม่มี tablet · ไม่มี DB · ไม่มี CMS.

**อภิธานศัพท์**: `CONTEXT.md` ที่ราก - `Lead` (คำขอติดต่อ) ห้ามสับสนกับ `Project` (งานติดตั้งที่เสร็จแล้ว).

**Skill ที่ทุก session ต้องเรียก**: `/grilling` และ `/domain-modeling`.
ห้ามยิง research subagent เองโดยที่ผู้ใช้ไม่สั่ง (คำสั่งระดับ session override wayfinder step 5).

**Palette ที่สกัดมาแล้ว** (จาก `29:3657`, ไม่ต้องหาซ้ำ):
Deep Navy `#030814` · Navy `#07111f` · Burgundy `#7f1d2d` · Maroon CTA `#a12a3a` · Background `#f6f3f2` · Surface `#ffffff` · Success `#16794b` · Danger `#b42318`.
ของแถม: border `#ded7d3` · text `#111827` · muted `#667085` · radius `12px`/`8px` · shadow `0 14px 17px rgba(8,8,13,.08)`.
Font: **Noto Sans Thai** (Regular + Bold) ผ่าน `next/font/google`.

## Decisions so far

- [Q1 design source of truth](#) - ใช้ `Home Redesign` ชุดเดียว ชุดเก่า (Desktop/Tablet/Mobile 29:xxxx) ทิ้ง
- [Q2 destination](#) - จบที่สเปกบนกระดาษ ไม่มีโค้ด
- [Q3 Payload](#) - ยังไม่ลง v1
- [Q4 file upload](#) - ตัด field ไฟล์แนบทิ้งทั้งหมด
- [Q5 hosting](#) - Vercel
- [Q7 page scope](#) - ~~Home หน้าเดียว~~ **ถูกแทนที่โดย ticket 09**: v1 มี 5 route (`/` `/portfolio` `/brands` `/contact` `/privacy`)
- [Q8 content source](#) - typed TypeScript array ในโปรเจ็ค ไม่ใช่ MDX ไม่ใช่ DB
- [Q9 DB](#) - ไม่มี DB, lead ไปเป็น email อย่างเดียว
- [Q10 email](#) - Resend, ส่งหา `LEAD_RECEIVER_EMAIL` จาก env
- [Q11 token](#) - อ่าน `Design System / Foundations` เขียนเป็น CSS var ใน `@theme`
- [Q13 auto-reply](#) - ไม่ส่งหาลูกค้า
- [Q14 form mechanism](#) - Server Action + loading state + ปุ่ม disabled
- [Q15 structure](#) - feature folder (`src/features/<feature>/`)
- [Q16 assets](#) - export รูปจาก Figma, logo 6 อันแรก, YouTube เป็น thumbnail + link
- [Q21 Node version](#) - ใช้ 26 ตอน dev ทั้งที่ prod จะเป็น 24 (ผู้ใช้ตัดสินหลังรับทราบความเสี่ยง)
- [Q18 rate limit](#) - in-memory Map ต่อ instance + `ponytail:` comment ระบุเพดาน
- [01 Token spec](issues/01-token-spec.md) - type scale ครบ 2 breakpoint, spacing, breakpoint ตัดที่ `lg` 1024px, `@theme` เขียนเสร็จแล้ว. **radius จริงคือ 2px ไม่ใช่ 12px และ Redesign ไม่ใช้เงาเลย** + เจอ 3 สีที่ Foundations ไม่ได้ประกาศ
- [02 Section inventory](issues/02-section-responsive-inventory.md) - ครบ 8 section 2 breakpoint. ผลงาน 6 · แบรนด์ 12 (เอา 6) · บทความ 3 · วิดีโอ 3. เจอบั๊ก design 3 จุด และ badge `MOOD PLACEHOLDER` ที่ห้ามสร้าง
- [03 Form states](issues/03-form-success-error-ux.md) - สำเร็จแล้วแทนที่การ์ดทั้งใบ · error ใต้ control ยอมให้ layout ขยับ · เบอร์โทร normalize ก่อน validate · Zod schema + ลายเซ็น server action เขียนเสร็จ · ปุ่ม cooldown เงียบตามที่ผู้ใช้เลือก คำอธิบายไปอยู่ที่ error ระดับฟอร์มแทน
- [04 Contact content](issues/04-real-contact-content.md) - ข้อมูลติดต่อทั้งหมดมาจาก env (ผู้ใช้เลือกกลับจากที่แนะนำ) ค่า mock ก่อน · ซ่อน `[ชื่อลูกค้า]` บนการ์ดผลงานเพราะ NDA · ร่าง copy แนะนำบริษัทและ Privacy Notice เสร็จ · **เพิ่ม route `/privacy` 1 หน้า** เกินจาก Q7 เพราะลิงก์ต้องมีปลายทาง
- [09 Header behavior](issues/09-header-behavior-dead-ends.md) - เมนู mobile ใช้ `<dialog>` เปล่าไม่ลง shadcn `sheet` · header sticky พื้น navy ทึบตลอด · **scope ขยายเป็น 5 route** · nav เหลือ 3 อันเป็น route ทั้งหมด ไม่มี anchor · `/portfolio` ทำแค่ list ใส่ `slug` เผื่อ detail
- [05 shadcn inventory](issues/05-shadcn-component-inventory.md) - ลง 4 ตัว `button input textarea label` · เอา react-hook-form แต่ไม่เอา shadcn `form` · map ชื่อ token ของ shadcn เข้า palette เรา · ลบ `.dark` · `--radius: 2px` ทุกขนาด · **แก้ย้อน 01 (รูปแบบ `@theme`) และ 03 (ลายเซ็น server action)**
- [06 Content data model](issues/06-content-data-model.md) - type ครบ 4 ตัว · รูปเป็น static import · `RoomType` เป็น union · แบรนด์ 12 ตัว 6 ตัว `logo: null` ใช้ fallback ของ design · การ์ดบทความกดไม่ได้ · วิดีโอเก็บแค่ `youtubeId` ดึง thumbnail จาก YouTube → ต้องเปิด remotePatterns + `onError` fallback + `VideoCard` เป็น client component
- [07 Asset + SEO](issues/07-asset-and-seo-strategy.md) - รูป mood มีแค่ 6 ใบไม่ซ้ำ ใช้วนทั้งหน้า · export ได้แต่ **ล็อก gate ห้าม deploy จนกว่าจะเปลี่ยนรูปจริง** · thumbnail YouTube ใช้ `<img>` เปล่า ไม่ต้องแตะ `next.config` (**ยกเลิกข้อ 1 ใน 06**) · overlay hero เป็น CSS · hero ต้อง export 2 crop · OG รูปเดียว · JSON-LD ใช้ `Organization` ไม่ใช่ `LocalBusiness` เพราะยังไม่มีที่อยู่จริง
- [10 Accessibility](issues/10-accessibility-spec.md) - คำนวณ contrast 19 คู่ ผ่านหมด · **เปลี่ยน `--muted-fg` `#667085` → `#5c6472`** เพราะค่าเดิมเกินเกณฑ์แค่ 0.006 · **navy overlay ที่ hero ขั้นต่ำ 60%** · focus ring ใช้ `outline-offset: 2px` · ต้องผูก aria ในฟอร์มเองเพราะตัด shadcn `form` ออก
- [11 โครงหน้าใหม่](issues/11-new-page-layouts.md) - `PageHeader` ใช้ `SectionHeading` บนพื้น bg ไม่มีรูป · `/portfolio` กริด 3 คอลัมน์ 364px พอดีกับการ์ดเดิม ไม่มี filter · **Home แสดงแบรนด์ 6 (เบี่ยงจาก design โดยตั้งใจ) `/brands` แสดง 12** · ผลงานคง 6 บน Home ตาม design · แชร์เฉพาะ component เล็ก ไม่ใช้ `variant` · `ContactSection` ใช้ซ้ำทั้งดุ้น
- [08 ประกอบสเปก](issues/08-assemble-spec.md) - **[`spec.md`](spec.md) เขียนเสร็จ = ปลายทางของ map นี้**

## Not yet specified

- **เส้นทาง migrate ขึ้น Payload** - data model นิ่งแล้ว (ticket 06) และระบุไว้ว่า `image: StaticImageData` เป็น field เดียวที่ต้องแก้. ที่ยังไม่รู้คือ Payload collection config หน้าตาเต็ม ๆ ซึ่งรอจนกว่าจะลง Payload จริง
- **Analytics / tracking** - ไม่มีใครพูดถึงเลย ทั้ง brief และ design. ยังไม่รู้ว่าต้องมีไหม

## Out of scope

- **Payload CMS ใน v1** (Q3) - เลื่อนไปเฟสหน้า
- **เก็บ lead ลง DB** (Q9) - brief แรกขอไว้ ผมทักว่าจะเสีย lead แต่ผู้ใช้ยืนยันตัดออก
- **ไฟล์แนบในฟอร์ม 4 ไฟล์ x 400 MB** (Q4) - design วาดไว้ ตัดทิ้งทั้ง field
- **หน้า Blog List/Detail และ Portfolio Detail** - ยังไม่มีเนื้อหาให้แสดง. `Project.slug` เตรียมไว้แล้วสำหรับเปิด `/portfolio/[slug]` ทีหลัง
- **กู้ design เก่าจาก Figma version history** (ticket 09 Q5) - เลือกออกแบบเองจากภาษา Redesign แทน
- **Admin 6 จอ** (Q20) - Dashboard, Installation Projects, Project Editor, Blog Editor, Company & Lead Settings, Publish confirmation. เป็นหน้าที่ของ Payload
- **Tablet breakpoint** (Q1) - Redesign ไม่มี 768
- **Auto-reply หาลูกค้า** (Q13)
- **Turnstile / captcha** (Q18) - เลือก in-memory rate limit แทน
