# สเปก: เว็บไซต์ The Origin Beat (v1)

เอกสารนี้คือปลายทางของ [map](map.md).
เขียนจากการตัดสินใจใน ticket 01-11 ทั้งหมด - อ่านไฟล์นี้จบแล้วลงมือได้เลย ไม่ต้องย้อนไปอ่าน ticket ทีละใบ
ลิงก์ไป ticket มีไว้เผื่ออยากรู้เหตุผลเบื้องหลัง

---

## 1. Stack

| | เวอร์ชัน | หมายเหตุ |
|---|---|---|
| Next.js | **16.3.3** | App Router, Server Actions, Turbopack (default ใน 16) |
| React | 19.x | มากับ Next 16 |
| TypeScript | 5.x | `strict: true` |
| TailwindCSS | **4.3.3** | ตั้งค่าใน CSS ไม่มี `tailwind.config.js` |
| shadcn CLI | **4.19.0** | ลง 4 component |
| Zod | **4.4.3** | `z.email()` ไม่ใช่ `z.string().email()` |
| react-hook-form | **7.86.0** | |
| @hookform/resolvers | **5.9.1** | peer รองรับ `zod ^4.0` |
| Resend | **6.24.0** | |
| pnpm | 10.x | ตรึงด้วย `packageManager` ใน `package.json` |

### ⚠️ Node - dev กับ prod ไม่ตรงกัน

- **dev = 26.8.1** (ผู้ใช้เลือก - `.nvmrc` = `26`)
- **prod = `nodejs24.x`** เพราะ Vercel Functions เลือก 26 ไม่ได้ (26 มีเฉพาะบน Vercel Sandbox)
- **ห้ามใช้ API ที่มีเฉพาะใน Node 26** และต้อง build ทดสอบด้วย 24 ก่อน deploy จริง

### Scaffold

```bash
pnpm create next-app@latest audio-meeting-room \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm
cd audio-meeting-room
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input textarea label
pnpm add zod resend react-hook-form @hookform/resolvers
```

หลัง `shadcn init`: **ลบบล็อก `.dark` ที่ generate มาทิ้งทันที** ([05](issues/05-shadcn-component-inventory.md))
ทิ้งไว้แล้วจะมีคนเผลอเขียน `dark:` เข้ามาโดยไม่มีใครทดสอบ

---

## 2. ข้อจำกัดถาวร

- **ภาษาไทยล้วน** - ไม่ลง i18n lib, `<html lang="th">`
- **light mode อย่างเดียว** - ไม่มี theme toggle ไม่มี `.dark`
- **2 breakpoint** - mobile-first ตัดที่ `lg` (1024px) ไม่มี tablet
- **ไม่มี DB** - Lead ไปเป็นอีเมลอย่างเดียว ([Q9](map.md))
- **ไม่มี CMS** - content เป็น typed array ใน repo
- **ไม่มีไฟล์แนบในฟอร์ม** - ตัด field ทิ้ง

---

## 3. โครงสร้างโปรเจ็ค

feature folder ตาม [Q15](map.md) และ [11](issues/11-new-page-layouts.md)

```
├── .env.example
├── .nvmrc                          26
├── CONTEXT.md                      อภิธานศัพท์ - Lead ห้ามสับสนกับ Project
├── next.config.ts                  ไม่ต้องตั้ง remotePatterns
├── public/
│   ├── og.jpg                      1200×630 ใช้ทุก route
│   └── logos/                      6 ไฟล์ ควรเป็น SVG จาก press kit
└── src/
    ├── app/
    │   ├── layout.tsx              metadata + font + Header/Footer
    │   ├── page.tsx                Home - 8 section
    │   ├── globals.css             :root + @theme inline
    │   ├── sitemap.ts robots.ts
    │   ├── portfolio/page.tsx
    │   ├── brands/page.tsx
    │   ├── contact/page.tsx
    │   └── privacy/page.tsx
    ├── components/
    │   ├── ui/                     shadcn: button input textarea label
    │   └── layout/
    │       ├── site-header.tsx     sticky พื้น navy
    │       ├── mobile-menu.tsx     <dialog> - "use client"
    │       ├── site-footer.tsx
    │       ├── page-header.tsx
    │       └── section-heading.tsx eyebrow + title + desc
    ├── features/
    │   ├── hero/hero.tsx
    │   ├── company-intro/company-intro.tsx
    │   ├── portfolio/
    │   │   ├── types.ts data.ts images/
    │   │   ├── project-card.tsx        ใช้ร่วม
    │   │   ├── portfolio-section.tsx   Home - กริดไม่สมมาตร
    │   │   └── project-grid.tsx        /portfolio - กริดเท่ากัน
    │   ├── brands/
    │   │   ├── types.ts data.ts
    │   │   ├── brand-item.tsx brand-grid.tsx   ใช้ร่วม
    │   │   └── brands-section.tsx      Home - 6 ตัว + ปุ่ม
    │   ├── editorial/
    │   │   ├── types.ts data.ts images/
    │   │   ├── article-card.tsx
    │   │   ├── video-card.tsx          "use client" - onError fallback
    │   │   └── editorial-section.tsx
    │   ├── contact/
    │   │   ├── company.ts              อ่านจาก env
    │   │   └── contact-section.tsx     ใช้ทั้ง Home และ /contact
    │   └── lead-form/
    │       ├── schema.ts action.ts rate-limit.ts
    │       ├── lead-form.tsx           "use client"
    │       └── lead-email.tsx
    └── lib/
        ├── env.ts                  Zod validate ตอน build
        ├── nav.ts                  config ลิงก์ร่วม header/menu/footer
        └── utils.ts                cn()
```

**หลักการ**: แชร์ component เล็ก (`ProjectCard` `BrandGrid` `SectionHeading` `ContactSection`) ไม่แชร์ section wrapper และ **ไม่ใช้ prop `variant`** ([11](issues/11-new-page-layouts.md))

---

## 4. Design tokens

`src/app/globals.css` - ค่ามาจาก [01](issues/01-token-spec.md) + [05](issues/05-shadcn-component-inventory.md) + แก้สีตาม [10](issues/10-accessibility-spec.md)

```css
@import "tailwindcss";

:root {
  --deep-navy: #030814;  --navy: #07111f;
  --burgundy:  #7f1d2d;  --maroon: #a12a3a;
  --bg:        #f6f3f2;  --surface: #ffffff;
  --success:   #16794b;  --danger: #b42318;
  --card-navy: #111a2a;  --card-meta: #c9d2df;
  --ink:       #111827;  --muted-fg: #5c6472;

  /* ชื่อที่ shadcn component ต้องการ */
  --background: var(--bg);        --foreground: var(--ink);
  --primary: var(--maroon);       --primary-foreground: var(--surface);
  --secondary: var(--burgundy);   --muted-foreground: var(--muted-fg);
  --destructive: var(--danger);   --ring: var(--maroon);
  --border: #ded7d3;              --input: #ded7d3;
  --radius: 2px;
}

@theme inline {
  --color-deep-navy: var(--deep-navy);   --color-navy: var(--navy);
  --color-burgundy: var(--burgundy);     --color-maroon: var(--maroon);
  --color-bg: var(--bg);                 --color-surface: var(--surface);
  --color-success: var(--success);       --color-danger: var(--danger);
  --color-card-navy: var(--card-navy);   --color-card-meta: var(--card-meta);
  --color-ink: var(--ink);               --color-muted: var(--muted-fg);

  --color-background: var(--background); --color-foreground: var(--foreground);
  --color-primary: var(--primary);       --color-primary-foreground: var(--primary-foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);         --color-input: var(--input);
  --color-ring: var(--ring);

  --font-sans: var(--font-noto-sans-thai), ui-sans-serif, system-ui, sans-serif;
  --radius-sm: var(--radius);  --radius-md: var(--radius);
  --radius-lg: var(--radius);  --radius-xl: var(--radius);
  --container-site: 1440px;
}

:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }
```

### สิ่งที่ต้องรู้เรื่อง token

- **radius = 2px ทุกที่** ไม่ใช่ 12px. `12px` ที่เห็นใน `Design System / Foundations` เป็น radius ของการ์ด swatch เอง ไม่ใช่ของ Redesign
- **ไม่มีเงาเลย** - Redesign ไม่ใช้ `drop-shadow` สักจุด
- `--muted-fg` เป็น `#5c6472` **ไม่ใช่ `#667085`** ตาม Figma - ค่าเดิมได้ contrast 4.5059:1 ซึ่งเกินเกณฑ์แค่ 0.006

### Font

```ts
import { Noto_Sans_Thai } from "next/font/google";
const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"], weight: ["400", "700"],
  variable: "--font-noto-sans-thai", display: "swap",
});
```
มีแค่ 2 น้ำหนัก ไม่มี font ตัวที่สอง

### Type scale

| role | desktop | mobile | weight | สี |
|---|---|---|---|---|
| hero eyebrow | 14 / 20 | 12 / 20 | Bold | white |
| hero h1 | **66 / 78** | **40 / 50** | Bold | white |
| hero body | 20 / 32 | 17 / 28 | Regular | white |
| section eyebrow | 12 / 18 | 12 / 18 | Bold | burgundy |
| section h2 | **40 / 52** | **31 / 42** | Bold | ink |
| section desc | 17 / 28 | 17 / 28 | Regular | muted |
| card meta | 11 / 16 | 11 / 16 | Bold | card-meta |
| card title (ใบใหญ่) | 25 / 34 | 25 / 34 | Bold | white |
| card title (ใบเล็ก) | **18 / 25** | 18 / 25 | Bold | white |
| card client | 13 / 19 | 13 / 19 | Regular | white |
| form label | 14 / 21 | 14 / 21 | Bold | ink |
| form input | 16 / 24 | 16 / 24 | Regular | muted (placeholder) |
| form helper | 12 / 18 | 12 / 18 | Regular | muted |
| button | 16 / 24 | 16 / 24 | Bold | white หรือ burgundy |

มีแค่ 4 role ที่เปลี่ยนข้าม breakpoint

### Spacing

| | desktop | mobile |
|---|---|---|
| container / gutter | 1440 / 150 | 390 / 24 |
| content width | 1140 | 342 |
| section padding-top | 96 (Brands 80) | 64 |
| hero content gap | 22 | 18 |
| heading stack gap | 10 | 10 |
| form field gap | 7 | 7 |
| card copy gap (ใบใหญ่ / ใบเล็ก) | 7 / **5** | 7 / 5 |
| portfolio grid gap | 24 | 24 |
| brand grid gap | 12 | 10 |

`mx-auto max-w-[1440px] px-6 lg:px-[150px]`

---

## 5. Routes

nav มี 3 อัน **เป็น route ทั้งหมด ไม่มี anchor** ([09](issues/09-header-behavior-dead-ends.md))
`ผลงาน → /portfolio` · `แบรนด์ → /brands` · `ติดต่อ → /contact`
ใช้ config เดียวจาก `lib/nav.ts` ร่วมกันทั้ง header / mobile menu / footer

| route | โครง | metadata title |
|---|---|---|
| `/` | Header · Hero · Portfolio · CompanyIntro · Brands · Editorial · Contact · Footer | (default) |
| `/portfolio` | Header · PageHeader · ProjectGrid(6) · Footer | `ผลงานติดตั้ง` |
| `/brands` | Header · PageHeader · BrandGrid(12) · Footer | `แบรนด์คู่ค้า` |
| `/contact` | Header · ContactSection · Footer | `ติดต่อเรา` |
| `/privacy` | Header · prose · Footer | `ประกาศความเป็นส่วนตัว` |

`/contact` **ไม่มี PageHeader** - `ContactSection` มี eyebrow + title ของตัวเองอยู่แล้ว

---

## 6. Section spec - Home

### Header (sticky, พื้น `--deep-navy`)

| | desktop | mobile |
|---|---|---|
| สูง | 76 | 68 |
| โลโก้ | 280×44 @ x150 | 224×44 @ x24 |
| nav | 3 อัน @ x810 | ซ่อน - ใช้ปุ่มเมนู 62×44 @ x304 |

**ไม่มีปุ่ม CTA ใน header** (design ชุดเก่ามี ชุด Redesign ตัดออก)
ทุก section ที่เป็นเป้า anchor ต้องมี `scroll-margin-top: 76px` / `68px`

**Mobile menu** = `<dialog>` + `showModal()` ไม่ใช่ shadcn `sheet`
ได้ Esc / focus trap / `::backdrop` / พื้นหลัง inert มาฟรีจาก browser
ต้องเพิ่มเอง: `aria-expanded` + `aria-controls` บนปุ่มเปิด, accessible name ของปุ่มปิด, คืน focus กลับปุ่มเปิดตอนปิด

### Hero

- desktop 1440×650 · content w=790 @ (150, 184) · ปุ่ม 186×52
- mobile 390×540 · content w=342 @ (24, 132) · ปุ่ม 178×52
- รูป full-bleed + **navy overlay เป็น CSS ไม่ใช่รูป**
- **`rgba(3, 8, 20, 0.6)` เป็นความทึบขั้นต่ำ ห้ามต่ำกว่านี้** - คำนวณจากกรณีตัวขาวตกทับส่วนสว่างสุดของรูป ([10](issues/10-accessibility-spec.md))
- `priority` + `fill` + `sizes="100vw"` + `placeholder="blur"` · **ห้าม `loading="lazy"`** - นี่คือ LCP element
- hero ใช้รูป **2 ไฟล์** desktop 2.2:1 / mobile 0.72:1 เป็นการ crop คนละแบบ
- ห้ามสร้าง badge `MOOD PLACEHOLDER` - เป็นโน้ตของคนออกแบบ

### Portfolio (Home)

**6 โครงการ** กริดไม่สมมาตร - ลำดับใน array กำหนดตำแหน่ง ตัวแรกคือใบใหญ่ (ไม่มี field `featured`)

- desktop: แถวบน 1 ใบ 752×520 + stack ขวา 2 ใบ 364×248 · แถวล่าง 3 ใบ 364×310 · gap 24
- mobile: stack เดี่ยว 6 ใบ w=342 · ใบแรก h=380 ที่เหลือ h=292

**ProjectCard**: พื้น `--card-navy` + border + radius 2px · รูป cover เต็มใบ · แผง `rgba(3,8,20,0.9)` ทับล่าง · ข้างในเรียง `category / title / client`
`client` **ซ่อนเสมอใน v1** (NDA)

หัวข้อ + ปุ่ม `ดูผลงานทั้งหมด` → `/portfolio`

### Company Intro

- desktop: 2 คอลัมน์ (heading 461 / body 638) gap 72 · capability line 4 อันเรียงนอน
- mobile: stack · capability 4 อันเรียงตั้ง

⚠️ **design mobile ขาด `ระบบภาพ` ไป** (node `36:9253` ไม่มีอยู่) - สันนิษฐานว่าลบพลาด **ให้ทำ 4 อันทั้งสอง breakpoint**

### Partner Brands

**Home แสดง 6** (เบี่ยงจาก design โดยตั้งใจ - design วาดไว้ 12)

| | desktop | mobile |
|---|---|---|
| Home (6) | 1 แถว × 6 · 180×112 · logo 156×70 · gap 12 | 3 แถว × 2 · 166×112 · gap 10 |
| `/brands` (12) | 2 แถว × 6 | 6 แถว × 2 |

6 ตัวที่มีโลโก้จริงอยู่บน Home ทั้งหมด - fallback `Logo unavailable` โผล่เฉพาะใน `/brands`
หัวข้อ + ปุ่ม `ดูแบรนด์ทั้งหมด` → `/brands`

### Editorial

- desktop: blog 1 ใหญ่ 729×460 + stack 2 ใบ 387×220 · video 3 ใบ 366×300 เรียงนอน
- mobile: blog 3 ใบ stack (360/286/286) · video 3 ใบ stack (286)
- **การ์ดบทความกดไม่ได้** - ไม่มีหน้าปลายทาง
- **การ์ดวิดีโอ** คลิกเปิด YouTube · `"use client"` เพราะต้องมี `onError`

```tsx
<img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
     onError={e => { e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg` }}
     width={366} height={300} loading="lazy" alt={title} />
```
ใช้ `<img>` ธรรมดา **ไม่ใช่ `next/image`** → ไม่ต้องตั้ง `remotePatterns` ไม่ต้องแตะ `next.config`

### Contact

- desktop: split - copy w=410 ซ้าย / form 666×901 ขวา
- mobile: stack - copy 342 บน / form 342×1002 ล่าง
- desktop จับ `อีเมล` + `เบอร์โทร` เรียงคู่ (295+295 gap 12) · mobile แยกเต็มความกว้าง
- **ตัด File Upload block ออกทั้งก้อน**

### Footer (พื้น `--deep-navy`)

- desktop: แถวเดียว - ชื่อบริษัทซ้าย (360) + nav ขวา (420) · note ล่าง
- mobile: stack 3 ชั้น
- ห้ามลอกข้อความ `ข้อมูลบริษัท ลิงก์ และข้อความทางกฎหมายต้องได้รับการอนุมัติก่อน production` - เป็นโน้ตของคนออกแบบ

---

## 7. Content model

`StaticImageData` คือ field เดียวที่ต้องแก้ตอน migrate ขึ้น Payload - จำกัดอยู่ใน `data.ts` เท่านั้น

```ts
import type { StaticImageData } from "next/image";

// ⚠️ ไม่ใช่ "ประเภทห้อง" - ค่าจริงใน Figma ปนกันระหว่างประเภทห้องกับประเภทระบบ
//    ยืนยันแล้ว 4 · ยังขาดของโครงการ 2 และ 3 (ดู TODO ข้อ 1)
export const PROJECT_CATEGORIES = [
  "ห้องประชุม",           // โครงการ 1 ✓ ยืนยันแล้ว
  "หอประชุม",             // โครงการ 2 ⚠️ จากชื่อ node
  "ระบบประชุม",           // โครงการ 3 ⚠️ จากชื่อ node
  "ห้องอบรม",             // โครงการ 4 ✓ ยืนยันแล้ว
  "พื้นที่อเนกประสงค์",    // โครงการ 5 ✓ ยืนยันแล้ว
  "ระบบควบคุม",           // โครงการ 6 ✓ ยืนยันแล้ว ← ไม่ใช่ประเภทห้อง
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  slug: string;          // ยังไม่ใช้ v1 - เตรียมไว้ให้ /portfolio/[slug]
  title: string;
  category: ProjectCategory;
  image: StaticImageData;
  imageAlt: string;
  client?: string;       // ซ่อนเสมอใน v1 (NDA)
};

export type Article = { title: string; image: StaticImageData; imageAlt: string };
export type Video   = { youtubeId: string; title: string };
export type Brand   = { name: string; logo: StaticImageData | null };
```

**แบรนด์ 12 ตัวตามลำดับ**: AUDAC · Allen & Heath · Audio-Technica · Bose · JBL · QSC · SHURE · Sennheiser · Soundcraft · TOA · VL Audio · YAMAHA
6 ตัวแรกมีโลโก้ อีก 6 เป็น `logo: null`

---

## 8. Lead form

### สถานะ

```
idle ──submit──> submitting ──ok────> success  (แทนที่การ์ดทั้งใบ ไม่ย้อนกลับ)
                     └──fail──> error (ปุ่ม disabled 20 วิ) ──> idle
```

**success แทนที่การ์ดฟอร์มทั้งใบ** ด้วยแผงขอบคุณสี `--success` - กันกดซ้ำทางกายภาพ เพราะไม่มี DB ให้ dedupe
และเพราะไม่ส่ง auto-reply หน้าเว็บคือที่เดียวที่ยืนยัน
**ต้องย้าย focus ไปที่แผงขอบคุณ** ไม่งั้นคนใช้ screen reader ไม่รู้ว่าเกิดอะไรขึ้น

### Schema

```ts
const normalizePhone = (v: string) =>
  v.replace(/[\s\-()]/g, "").replace(/^\+66/, "0");

export const leadSchema = z.object({
  companyName: z.string().trim().max(120).default(""),
  contactName: z.string().trim().min(1, "กรุณากรอกชื่อผู้ติดต่อ").max(120),
  email: z.email("รูปแบบอีเมลไม่ถูกต้อง").max(254),
  phone: z.string()
    .min(1, "กรุณากรอกเบอร์โทรศัพท์")
    .transform(normalizePhone)
    .pipe(z.string().regex(/^0\d{8,9}$/, "เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอก 9-10 หลัก")),
  details: z.string().trim().max(2000).default(""),
});
export type LeadInput = z.input<typeof leadSchema>;
```

field ไม่บังคับใช้ `.default("")` ไม่ใช่ `.optional()` - `FormData` ส่ง `""` มาอยู่แล้ว
เบอร์รับ `081-234-5678` · `081 234 5678` · `+66812345678` · `021234567` แล้วเก็บรูปแบบเดียว

### Server action

```ts
type LeadResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof LeadInput, string>> };

export async function submitLead(input: unknown): Promise<LeadResult>;
```

ฝั่ง client ใช้ `useTransition` + `form.handleSubmit` (**ไม่ใช่ `useActionState`** - ชนกับ RHF)
`isPending` → loading state + disable ปุ่ม
**server ต้อง `leadSchema.parse()` ซ้ำเสมอ** - validation ฝั่ง client เป็น UX ไม่ใช่ด่านความปลอดภัย
ใช้ `z.input<>` ไม่ใช่ `z.infer<>` เพราะ schema มี `.transform()`

⚠️ ฟอร์มไม่ทำงานถ้า JS ไม่โหลด - ผลจากการเลือก RHF แทน progressive enhancement

### a11y ของฟอร์ม

ตัด shadcn `form` ออก แปลว่า `FormMessage`/`FormControl` ที่ผูก aria ให้อัตโนมัติก็ไม่มี - **ต้องผูกเอง**

```tsx
<label htmlFor="phone">เบอร์โทรศัพท์ <span aria-hidden="true">*</span></label>
<input id="phone" {...register("phone")} required aria-required="true"
       aria-invalid={!!errors.phone}
       aria-describedby={errors.phone ? "phone-error" : undefined} />
{errors.phone && <p id="phone-error" role="alert">{errors.phone.message}</p>}
```

`*` ต้อง `aria-hidden` แล้วสื่อด้วย `aria-required` - ไม่งั้น screen reader อ่านว่า "ดอกจัน"
error ระดับฟอร์มใส่ `role="alert"` ตัวเดียวเหนือปุ่ม

### ข้อความ error

| field | ข้อความ |
|---|---|
| ชื่อผู้ติดต่อ | `กรุณากรอกชื่อผู้ติดต่อ` |
| อีเมล ว่าง / ผิดรูปแบบ | `กรุณากรอกอีเมล` / `รูปแบบอีเมลไม่ถูกต้อง` |
| เบอร์โทร ว่าง / ผิดรูปแบบ | `กรุณากรอกเบอร์โทรศัพท์` / `เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอก 9-10 หลัก` |
| ระดับฟอร์ม | `ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งในอีกสักครู่ หรือติดต่อเราโดยตรงที่ [เบอร์โทร]` |

ปุ่มตอน cooldown = disabled เฉย ๆ ไม่มีตัวนับ (ผู้ใช้เลือก) - คำอธิบายอยู่ในข้อความ error ระดับฟอร์มแทน

### Rate limit

```ts
// ponytail: cooldown เก็บใน memory ต่อ instance. cold start ทีนึงลืมหมด
// และบอทที่หมุน IP เดินผ่านได้สบาย. ทางอัปเกรดคือ Turnstile
const COOLDOWN_MS = 20_000;
const lastSubmit = new Map<string, number>();
```
key = IP จาก `x-forwarded-for`
**ต้อง prune entry ที่เก่ากว่า `COOLDOWN_MS` ทุกครั้งที่เรียก** ไม่งั้น Map โตไม่หยุดจนกิน memory

### อีเมล

Resend ส่งหา `LEAD_RECEIVER_EMAIL` **ไม่ส่ง auto-reply หาลูกค้า**

### Privacy

```
เมื่อกดส่ง ถือว่าคุณยินยอมให้เราติดต่อกลับตามข้อมูลที่กรอก
[Privacy Notice] → /privacy
```
**ลบข้อความเดิมที่อ้าง Google Workspace** - เป็นเท็จแล้วเพราะตัด upload และตัด DB

---

## 9. Assets และ SEO

### รูปที่ต้อง export จาก Figma

⚠️ asset URL หมดอายุ **7 วัน** - `curl` ลงเครื่องทันที ห้ามอ้าง URL ในโค้ด

| ไฟล์ | node | export ที่ |
|---|---|---|
| `conference-room-hero` | `36:8887` | 2880×1300 |
| `conference-room-hero-mobile` | `36:9164` | 780×1080 |
| `meeting-room-neutral` | `36:8920` | 1460×920 |
| `auditorium-red` | `36:8930` | 1460×920 |
| `meeting-presentation` | `36:8941` | 1460×920 |
| `conference-room-elegant` | `36:8951` | 1460×920 |
| `meeting-room-screen` | `36:8961` | 1460×920 |

รูป mood มีแค่ 6 ใบไม่ซ้ำกัน ใช้วนทั้งหน้า
**โลโก้ 6**: `36:8994` `36:8998` `36:9002` `36:9006` `36:9010` `36:9014` - แต่**ควรเอา SVG จาก press kit ของแบรนด์เอง** raster บนจอ retina เบลอ

### `sizes`

| ที่ใช้ | `sizes` |
|---|---|
| hero | `100vw` |
| ผลงานใบใหญ่ | `(min-width:1024px) 752px, 100vw` |
| ผลงานใบเล็ก / กริด `/portfolio` | `(min-width:1024px) 364px, 100vw` |
| บทความใบใหญ่ | `(min-width:1024px) 729px, 100vw` |
| บทความใบเล็ก | `(min-width:1024px) 387px, 100vw` |

### Metadata

```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: { default: "The Origin Beat | ระบบเสียงและภาพสำหรับห้องประชุม",
           template: "%s | The Origin Beat" },
  description: "นำเสนอผลงานติดตั้งและแนวทางการทำงาน เพื่อช่วยให้คุณเห็นภาพระบบที่เหมาะกับโครงการ",
  openGraph: { type: "website", locale: "th_TH", images: ["/og.jpg"] },
};
```
ทุกหน้ามี `alternates.canonical` · `sitemap.ts` + `robots.ts` hardcode 5 route

**JSON-LD ใช้ `Organization` ไม่ใช่ `LocalBusiness`** - `LocalBusiness` บังคับ `address` ซึ่งยังไม่มีจริง และ Google เอาไปแสดงผลจริง

---

## 10. Accessibility

contrast คำนวณครบ 19 คู่ ผ่านทั้งหมดหลังเปลี่ยน `--muted-fg` เป็น `#5c6472`

- `:focus-visible` + `outline-offset: 2px` - ring ลอยนอกขอบ เห็นชัดแม้สีเดียวกับปุ่ม
- `<html lang="th">` · `<span lang="en">` ครอบ eyebrow อังกฤษ 3 จุด (ใส่ใน `SectionHeading` ครั้งเดียวได้ทั้งหมด)
- alt text ไทยทุกรูป มาจาก `imageAlt` ใน `data.ts` · thumbnail YouTube ใช้ `title` เป็น alt
- `prefers-reduced-motion` ปิด smooth scroll

---

## 11. Environment variables

```bash
# --- Resend ---
RESEND_API_KEY=re_mock_000000000000000000
RESEND_FROM_EMAIL=noreply@example.com
LEAD_RECEIVER_EMAIL=team@example.com

# --- Site ---
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# --- Contact (server-side only ห้ามใส่ NEXT_PUBLIC_) ---
COMPANY_NAME=บริษัท ดิ ออริจิน บีท จำกัด
COMPANY_TAGLINE=ออกแบบและติดตั้งระบบเสียงและภาพ
CONTACT_EMAIL=info@example.com
CONTACT_PHONE=021234567
CONTACT_LINE_ID=@originbeat
CONTACT_FACEBOOK_URL=https://facebook.com/originbeat
CONTACT_INSTAGRAM_URL=https://instagram.com/originbeat
CONTACT_TIKTOK_URL=https://tiktok.com/@originbeat
```

ค่าปัจจุบันเป็น **mock ทั้งหมด** (11 ตัว) - validate ด้วย Zod ที่ `lib/env.ts` เพื่อให้พังตอน build ไม่ใช่ตอนลูกค้ากดส่งฟอร์ม

⚠️ **Home เป็น static page → env ถูกอ่านตอน build** แก้เบอร์โทรทีต้อง redeploy ทุกครั้ง

---

## 12. TODO ที่ยังค้าง

### ค่าที่ตัดสินไปก่อน - ยังไม่ยืนยันกับ Figma

ผู้ใช้สั่งไม่ต้องแตะ Figma อีก (ชน MCP rate limit ของ Starter plan)
ค่าด้านล่างจึงมาจากชื่อ node หรือจากการตัดสินให้เข้ากับ pattern ที่ยืนยันแล้ว

⚠️ **ชื่อ node ไม่ตรงกับข้อความจริงเสมอไป** - พิสูจน์แล้ว 2 กรณี:

| node name | ข้อความจริง |
|---|---|
| `Redesign Project / ระบบภาพและเสียงสำหรับพื้นที่อบรม` | `ระบบเสียงสำหรับพื้นที่อบรม` |
| `Redesign Project / ระบบควบคุมและจอแสดงผล` | `ระบบควบคุมเสียง` |

**ทุกแถวที่ทำเครื่องหมาย ⚠️ ต้องเทียบกับ Figma ก่อน production**

#### ผลงาน 6 ชิ้น

| # | category | title | สถานะ |
|---|---|---|---|
| 1 | `ห้องประชุม` | `ระบบ AV สำหรับห้องประชุม` | ✓ |
| 2 | `หอประชุม` | `ระบบเสียงสำหรับหอประชุม` | ⚠️ |
| 3 | `ระบบประชุม` | `ระบบประชุมและการนำเสนอ` | ⚠️ |
| 4 | `ห้องอบรม` | `ระบบเสียงสำหรับพื้นที่อบรม` | ✓ |
| 5 | `พื้นที่อเนกประสงค์` | `ระบบ AV สำหรับพื้นที่อเนกประสงค์` | ✓ |
| 6 | `ระบบควบคุม` | `ระบบควบคุมเสียง` | ✓ |

#### Eyebrow ของ section

| section | eyebrow | สถานะ |
|---|---|---|
| Portfolio | `SELECTED WORK` | ✓ |
| Company Intro | `WHAT WE DO` | ✓ |
| Contact | `START A CONVERSATION` | ✓ |
| Partner Brands | `PARTNER BRANDS` | ⚠️ ตัดสินเอง |
| Editorial | `FROM THE FIELD` | ⚠️ ตัดสินเอง |

สองอันหลังตั้งให้เข้ากับ pattern ที่ยืนยันแล้ว - วลีอังกฤษสั้น ตัวพิมพ์ใหญ่
`FROM THE FIELD` เลือกเพราะเข้ากับหัวข้อไทย `ความรู้จากการทำงานจริง`

#### หัวข้อ section (จากชื่อ node)

| section | title | สถานะ |
|---|---|---|
| Portfolio | `ผลงานติดตั้ง` | ✓ |
| Company Intro | `เชื่อมเทคโนโลยีให้ใช้งานง่าย / และเหมาะกับพื้นที่` | ✓ |
| Contact | `เล่าให้เราฟังเกี่ยวกับพื้นที่ของคุณ` | ✓ |
| Partner Brands | `แบรนด์คู่ค้าที่บริษัทสามารถจัดหาได้` | ⚠️ |
| Editorial | `ความรู้จากการทำงานจริง` | ⚠️ |

#### บทความ 3 ชิ้น (จากชื่อ node ทั้งหมด ⚠️)

1. `สิ่งที่ควรเตรียมก่อนออกแบบระบบ AV`
2. `เลือกแนวทางระบบเสียงให้เหมาะกับพื้นที่`
3. `ตรวจรับระบบอย่างไรให้พร้อมใช้งาน`

#### Header logo

`Redesign Logo Placeholder` มี 3 ส่วน: โลโก้ 44×44 + ชื่อบริษัท + บรรทัดคำอธิบาย
ใช้ `COMPANY_NAME` และ `COMPANY_TAGLINE` จาก env (ดูหัวข้อ 11) - ไม่ต้องดึงข้อความ placeholder จาก Figma เพราะยังไงก็ต้องเปลี่ยน

#### Navy overlay

ใช้ **`rgba(3, 8, 20, 0.6)`** ตามที่คำนวณไว้ใน [10](issues/10-accessibility-spec.md)
ไม่ต้องรู้ค่าจริงใน Figma - 0.6 คือขั้นต่ำที่ผ่าน contrast ในกรณีเลวร้ายสุด และรูปจะถูกเปลี่ยนอยู่ดีตาม gate

### Gate ก่อน deploy production - ห้ามข้าม

- [ ] **เปลี่ยนรูป mood ทั้ง 6 ใบเป็นรูปโครงการจริงที่ได้รับอนุญาต** - เราไม่รู้ที่มาและลิขสิทธิ์ของรูปปัจจุบัน design เขียนกำกับไว้เองว่าต้องเปลี่ยน
- [ ] เขียน alt text ไทยใหม่ให้ตรงกับรูปจริง (อยู่ใน gate เดียวกัน)
- [ ] ใส่ค่า env จริงทั้ง 10 ตัว
- [ ] verify โดเมนกับ Resend ก่อนจึงส่งเมลได้
- [ ] ให้ผู้มีคุณสมบัติตรวจร่าง Privacy Notice + ใส่วันที่
- [ ] ตัดสินใจเรื่อง `[ชื่อลูกค้า]` เป็นราย project (ตอนนี้ซ่อนทั้งหมด)
- [ ] **build ทดสอบด้วย Node 24** เพราะ prod รัน `nodejs24.x` ไม่ใช่ 26
- [ ] ตั้ง env บน Vercel ครบ
- [ ] **ยืนยัน copy ทุกแถวที่ทำเครื่องหมาย ⚠️ ในหัวข้อ 12 กับข้อความจริงใน Figma** - ชื่อ node ไม่ตรงกับข้อความจริงเสมอไป (พิสูจน์แล้ว 2 กรณี)
- [ ] ตรวจว่าไม่มีข้อความโน้ตของคนออกแบบหลุดลงเว็บ - `MOOD PLACEHOLDER` · `ภาพตัวอย่างใช้เพื่อกำหนด mood...` · `ข้อมูลบริษัท ลิงก์ และข้อความทางกฎหมาย...`
