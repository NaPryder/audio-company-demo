# Spec: Portfolio Detail (`/portfolio/[slug]`)

ปลายทางของ [`map.md`](map.md). เขียนจาก ticket 01-03 + decision Q1-Q16.

**อ่านคู่กัน**: [`../landing-page/spec.md`](../landing-page/spec.md) (token, type scale, spacing, โครง 5 route เดิม) · [`../landing-page/build/gate.md`](../landing-page/build/gate.md) (gate ห้าม deploy ที่ยังค้างทั้งหมด) · [`../../CONTEXT.md`](../../CONTEXT.md)

---

## 1. ขอบเขต

เพิ่ม route ที่ 6 คือ `/portfolio/[slug]` — หน้ารายละเอียดของ `Project` ทั้ง 6 ตัวที่มีอยู่แล้วใน `PROJECTS`
พร้อมทำให้การ์ดผลงานบน Home และ `/portfolio` กดเข้าไปได้

**เนื้อหาเป็นของสมมติทั้งหมด** งานนี้ทำโครงและท่อ ไม่ได้ทำเนื้อหาจริง

### ตัดออกโดยตั้งใจ

| ตัดอะไร | ทำไม |
|---|---|
| **SEO ทั้งชุด** — `description`, `openGraph`, `alternates.canonical`, JSON-LD, เพิ่ม route ใน `sitemap.ts` | Q15 ผู้ใช้ยกไปรอบที่มีเนื้อหาจริง. ผมทักว่าเขียนตอนสร้างหน้าถูกกว่ามาไล่เติมทีหลัง 6 หน้า ผู้ใช้ยืนยัน. **`<title>` ยังมี** เพราะเป็นชื่อแท็บ ไม่ใช่ SEO |
| `noindex` + gate เรื่อง thin content | Q14 4 หน้าเนื้อหาสั้นเข้าข่าย near-duplicate ที่ลาก quality ทั้งโดเมน ผู้ใช้รับทราบแล้วเลือกไม่ทำ เพราะ gate เดิมห้าม deploy อยู่แล้ว |
| MDX + `@next/mdx` และ 3 dep พ่วง | Q2 เนื้อหายังไม่ต้องฝัง component |
| frontmatter ใน `.md` | Q3 field มีโครงสร้างอยู่ `data.ts` หมด → ไม่ต้องมี parser และรักษา static image import ไว้ได้ |
| `@tailwindcss/typography` | Q10 type scale ล็อกแล้วตั้งแต่ ticket 01 ของ map เก่า plugin ต้อง override เกือบทุกบรรทัดอยู่ดี |
| gallery รูปในหน้า detail | Q5 รูปจริงยังไม่มีสักใบ |
| เปิด `client` ราย project | Q8 ยังไม่มีใครไปขออนุญาตลูกค้า |
| `year` / `location` ใน `Project` | Q11 ไม่มีข้อมูลจริง แต่งขึ้นมาแล้ววันหลังแยกไม่ออกว่าอันไหนของจริง |
| หน้า tag archive `/portfolio/tag/[tag]` | Q4 route ใหม่ทั้งชุด คนละงาน |

---

## 2. ไฟล์ที่เพิ่มและแก้

```
package.json                                  + marked@18.0.11  (0 transitive dep)

src/app/portfolio/[slug]/page.tsx             ใหม่
src/app/globals.css                           + .markdown-body ใน @layer components
src/app/contact/page.tsx                      ส่ง as="h1"

src/components/layout/section-heading.tsx     + prop `as` และ `eyebrowLang`
src/components/layout/page-header.tsx         ส่ง as="h1"

src/features/contact/contact-section.tsx      + prop `as` default "h2"
src/features/portfolio/types.ts               + description: string
src/features/portfolio/data.ts                เติม description 6 ตัว
src/features/portfolio/project-card.tsx       ลิงก์ทั้งใบ + สลับ absolute เป็น -z-10
src/features/portfolio/content.ts             ใหม่
src/features/portfolio/content.test.ts        ใหม่
src/features/portfolio/content/*.md × 6       ใหม่
```

`.md` วางข้าง `data.ts` ตามหลักเดียวกับ `images/` (Q2.1) — วัน migrate ไป Payload รื้อ feature folder เดียวจบ

**ไม่แตะ**: `next.config.ts` · `sitemap.ts` · `robots.ts` · `lib/seo.ts` · `project-grid.tsx` · หน้า `/portfolio` `/brands` `/privacy` (ได้ `<h1>` ผ่าน `PageHeader` โดยไม่ต้องแก้ตัวเอง)

---

## 3. โครงหน้า

```
breadcrumb            หน้าแรก › ผลงาน › ชื่อโครงการ
eyebrow               หมวด (ไทย, lang="th")
h1                    ชื่อโครงการ
description            คำโปรย 1 ประโยคจาก data.ts
แบนเนอร์รูป            กว้างเท่า content, object-cover
เนื้อหา markdown       ## ภาพรวมโครงการ / ## ขอบเขตงาน   ← h2 มาจาก .md
ContactSection        reuse ทั้งดุ้น (as="h2")
ผลงานอื่น              h2 + ProjectGrid 3 ใบ
```

| | mobile (390) | desktop (1440) |
|---|---|---|
| container | `px-6` content 342 | `px-[150px]` content 1140 |
| padding-top ของบล็อกแรก | 64 | 96 |
| breadcrumb → eyebrow | 24 | 24 |
| eyebrow / h1 / description | gap 10 (ของ `SectionHeading`) | 10 |
| หัวเพจ → แบนเนอร์ | 40 | 40 |
| ความสูงแบนเนอร์ | 240 | 520 |
| แบนเนอร์ → เนื้อหา | 40 | 48 |
| ความกว้างโซนเนื้อหา | 342 | **760** (ไม่ใช่ 1140) |
| เนื้อหา → `ContactSection` | 0 — `ContactSection` มี `pt-16`/`lg:pt-24` ของตัวเอง | 0 |
| `ContactSection` → ผลงานอื่น | 0 — มี `pb-16`/`lg:pb-24` ของตัวเอง | 0 |
| padding-bottom ของหน้า | 64 | 96 |

`sizes` ของแบนเนอร์: `(min-width:1024px) 1140px, 100vw`

**hero ไม่ทับตัวหนังสือ** (Q1.1) — แต่ละโครงการมีรูปใบเดียว 1460×920 ไม่มี crop มือถือแบบ Home hero
และ overlay ขั้นต่ำ 0.6 ที่ ticket 10 ของ map เก่าบังคับ จะกินรูปจนไม่เหลืออะไร

**ไม่ล็อกอัตราส่วน 1460:920** — จะได้สูง 719px บน desktop ดันทุกอย่างตกจอ.
ใช้ความสูงคงที่ + `object-cover` เพราะวันที่รูปจริงเข้ามาอัตราส่วนจะไม่เท่ากันทุกใบอยู่ดี

**โซนเนื้อหากว้าง 760 ไม่ใช่ 1140** — ค่าเดียวกับ `/privacy`. บรรทัดยาว 1140px ที่ 17px อ่านไม่ไหว

### breadcrumb

```tsx
<nav aria-label="เส้นทางนำทาง" className="text-[12px]/[18px] text-muted">
  <ol className="flex flex-wrap items-center gap-2">
    <li><Link href="/">หน้าแรก</Link></li>
    <li aria-hidden="true">›</li>
    <li><Link href="/portfolio">ผลงาน</Link></li>
    <li aria-hidden="true">›</li>
    <li><span aria-current="page" className="text-ink">{project.title}</span></li>
  </ol>
</nav>
```

เขียนในหน้าตรง ๆ ไม่ทำเป็น component ใช้ที่เดียว · ตัวสุดท้ายไม่เป็นลิงก์ · ตัวคั่นเป็น `<li aria-hidden>`
ไม่ใช่ `::before` เพราะ pseudo-element content บาง screen reader อ่านออกเสียง · `flex-wrap` ปล่อยตกบรรทัด
ไม่ truncate · **ไม่มี `BreadcrumbList` JSON-LD** (Q15)

### ผลงานอื่น

```ts
const others = [1, 2, 3].map((n) => PROJECTS[(index + n) % PROJECTS.length]);
```

3 ตัวถัดไปวนกลับหัว — deterministic ไม่มีกรณี "หมวดนี้มีใบเดียว" ให้ต้องเขียน fallback
`<SectionHeading eyebrow="MORE WORK" title="ผลงานอื่น" />` + `<ProjectGrid projects={others} />` ตัวเดิมไม่ต้องแก้

---

## 4. ลำดับหัวข้อ

**ก่อนงานนี้ทั้ง repo มี `<h1>` แค่ที่ Home** เพราะ `SectionHeading` hardcode `<h2>` (เจอตอนทำ ticket 01)

```tsx
// section-heading.tsx
type SectionHeadingProps = {
  eyebrow: string;
  eyebrowLang?: string;      // default "en" - หน้า detail ส่ง "th" เพราะ eyebrow ที่นั่นคือหมวดภาษาไทย
  as?: "h1" | "h2" | "h3";   // default "h2" - 5 call site เดิมเป็น section ทั้งหมด ไม่ต้องแก้สักจุด
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};
```

```tsx
// page-header.tsx — หัวเพจของ route ที่ไม่ใช่ Home ต้องเป็น h1 เสมอ
<SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />

// contact-section.tsx
export function ContactSection({ as = "h2" }: { as?: "h1" | "h2" }) { ... }
// app/contact/page.tsx → <ContactSection as="h1" />
```

| route | ได้ `h1` ยังไง |
|---|---|
| `/` | มีอยู่แล้วที่ `Hero` |
| `/portfolio` `/brands` `/privacy` | ผ่าน `PageHeader` **ไม่ต้องแก้ไฟล์ตัวเอง** |
| `/contact` | ผ่าน prop `as` ของ `ContactSection` — **ไม่ได้ใช้ `PageHeader`** |
| `/portfolio/[slug]` | เรียก `SectionHeading as="h1"` ตรง ๆ |

**หน้า detail ไม่ใช้ `PageHeader`** — `PageHeader` มี `pt-16 lg:pt-24` ฝังอยู่ ถ้าเอา breadcrumb ไปวางเหนือ
จะได้ padding ซ้อนสองชั้น. เรียก `SectionHeading` ตรง ๆ ถูกกว่าการเพิ่ม prop `className`

ลำดับหัวข้อของหน้า detail:

```
h1  ชื่อโครงการ
├ h2  ภาพรวมโครงการ      ← จาก .md
├ h2  ขอบเขตงาน          ← จาก .md
├ h2  เล่าให้เราฟัง...     ← ContactSection
└ h2  ผลงานอื่น
   └ h3  ชื่อโครงการ × 3   ← ProjectCard
```

**หลังงานนี้ทั้ง 6 route มี `<h1>` ครบหน้าละ 1 อัน**

---

## 5. `ProjectCard` — กดได้ทั้งใบ

Q6: การ์ดตัวเดียวใช้ทั้ง Home และ `/portfolio` → กดได้ทั้งสองที่พร้อมกัน ไม่มี prop เปิด/ปิด

**ต้องแก้โครงก่อน**: แถบทึบล่างตอนนี้เป็น `absolute` → `::after` ของ stretched link จะยึดกับ**แถบ**
ไม่ใช่ทั้งการ์ด พื้นที่กดจะเหลือแค่แถบ. ทางแก้คือถอด `absolute` ออกจากแถบ แล้วดัน `<Image>`
ไปหลังด้วย `-z-10` แทน (การ์ดมี `isolate` อยู่แล้ว z-index ไม่รั่วออกนอกการ์ด)

```tsx
<article className="group relative isolate flex flex-col justify-end overflow-hidden
                    rounded-sm border border-border bg-card-navy
                    has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2
                    has-[:focus-visible]:outline-ring">
  <Image ... className="-z-10 object-cover" />
  <div className="bg-[rgba(3,8,20,0.9)] px-5 py-4 transition-colors
                  group-hover:bg-[rgba(3,8,20,0.96)]">
    <p ...>{project.category}</p>
    <h3 ...>
      <Link href={`/portfolio/${project.slug}`} className="outline-none after:absolute after:inset-0">
        {project.title}
      </Link>
    </h3>
  </div>
</article>
```

`<Link>` ครอบเฉพาะ `<h3>` ไม่ใช่ห่อทั้งใบ — accessible name ของลิงก์เป็น**ชื่อโครงการล้วน**
ไม่ใช่ alt รูป + หมวด + ชื่อ ปนกัน · focus ring ที่ขอบการ์ดด้วย `has-[:focus-visible]` + `outline-offset: 2px`
ตาม ticket 10 ของ map เก่า · hover เปลี่ยนแค่ความทึบของแถบ **ไม่มี transform บนรูป**
ไม่มีอะไรในดีไซน์เดิมที่ขยับ

---

## 6. ท่อ markdown

`marked@18.0.11` — **ถอด option `sanitize` ออกตั้งแต่ v5** ต้อง override renderer เอง.
เลือกทับ `markdown-it` (ที่ `html: false` เป็น default) เพราะ **0 transitive dep** ส่วน `markdown-it` ลาก 6 ตัว
และทั้งคู่รันตอน build ไม่ขึ้น client bundle → เหลือให้เทียบแค่ขนาด `node_modules`

```ts
// src/features/portfolio/content.ts
import { readFile } from "node:fs/promises";
import path from "node:path";

import { marked } from "marked";

/**
 * ทิ้ง raw HTML ทั้งหมด - `marked` ถอด option `sanitize` ออกตั้งแต่ v5 แล้ว
 *
 * เนื้อหาเป็นไฟล์ของเราเองและแปลงตอน build ไม่มี input จากผู้ใช้เลย
 * `dangerouslySetInnerHTML` จึงปลอดภัย *ในเงื่อนไขนี้เท่านั้น*
 * วันที่เนื้อหามาจาก Payload หรือจากใครก็ตามที่ไม่ใช่คนใน repo ข้อสรุปนี้เป็นโมฆะทันที
 * ต้องเปลี่ยนไปใช้ sanitizer จริง (DOMPurify ฝั่ง server) ไม่ใช่แค่ทิ้ง token
 */
marked.use({ renderer: { html: () => "" } });

const CONTENT_DIR = path.join(process.cwd(), "src/features/portfolio/content");

export function renderMarkdown(raw: string) {
  return marked.parse(raw);
}

/** คืน "" เมื่อไม่มีไฟล์ - หน้ายังเรนเดอร์ได้ตามปกติ แค่ไม่มีเนื้อหา (Q2.4) */
export async function renderProjectBody(slug: string): Promise<string> {
  let raw: string;
  try {
    raw = await readFile(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
  } catch {
    console.warn(`[portfolio] ไม่พบ ${slug}.md - หน้าจะไม่มีเนื้อหา`);
    return "";
  }
  return renderMarkdown(raw);
}
```

⚠️ **ต้องยืนยันตอน build**: hook ที่ทิ้ง raw HTML ใน marked v18 ชื่อ `renderer.html` และครอบคลุม
**ทั้ง block และ inline** หรือไม่ ถ้าไม่ครอบทั้งคู่ต้องเพิ่ม `tokenizer` override.
เทสต์ข้างล่างจับข้อนี้ให้

```ts
// src/features/portfolio/content.test.ts
// เทสต์เดียวที่ต้องมี - ถ้าข้อนี้พัง dangerouslySetInnerHTML ในหน้ากลายเป็นช่องโหว่ทันที
it("ทิ้ง raw HTML ทั้ง block และ inline", async () => {
  const html = await renderMarkdown("<script>alert(1)</script>\n\nข้อความ <img src=x onerror=alert(1)> ต่อ");
  expect(html).not.toContain("<script");
  expect(html).not.toContain("onerror");
});
```

### element ที่รองรับ

`h2` `h3` `p` `ul` `ol` `li` `strong` `em` `a`

ตัดออก: `h1` (หน้ามีแล้ว เพิ่มอีกคือทำลำดับหัวข้อพัง) · `img` (รูปมาจาก `data.ts` เป็น static import
ที่มี blur placeholder รูปใน markdown จะไม่ได้ optimize) · `blockquote` (เดาว่าจะถูกใช้เป็นคำพูดลูกค้า
ซึ่ง Q8 ซ่อนลูกค้าทั้งหมด เปิดไว้ = เชิญให้เขียนสิ่งที่ต้องลบทีหลัง) · `code`/`pre`/`table`/`hr`

element นอกชุดนี้ไม่ได้ถูกบล็อก แค่ไม่มี CSS รองรับ — กติกาอยู่ที่คนเขียนเนื้อหา ไม่ใช่ที่ท่อ

---

## 7. `page.tsx`

```tsx
export const dynamicParams = false;   // slug นอกลิสต์ → 404 ให้เอง ไม่ต้องเรียก notFound()

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

// Next 16: `params` เป็น Promise ต้อง await
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  return { title: PROJECTS.find((p) => p.slug === slug)!.title };
}
// ไม่มี description / openGraph / canonical / JSON-LD - Q15

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  const body = await renderProjectBody(slug);
  const others = [1, 2, 3].map((n) => PROJECTS[(index + n) % PROJECTS.length]);

  return (
    <>
      <div className="mx-auto max-w-site px-6 pt-16 lg:px-[150px] lg:pt-24">
        {/* breadcrumb - §3 */}
        <SectionHeading
          className="mt-6" as="h1"
          eyebrow={project.category} eyebrowLang="th"
          title={project.title} description={project.description}
        />
      </div>

      <div className="mx-auto max-w-site px-6 pt-10 lg:px-[150px]">
        <div className="relative h-[240px] overflow-hidden rounded-sm lg:h-[520px]">
          <Image src={project.image} alt={project.imageAlt} fill placeholder="blur"
                 sizes="(min-width:1024px) 1140px, 100vw" className="object-cover" />
        </div>
        <div className="markdown-body mt-10 max-w-[760px] lg:mt-12"
             dangerouslySetInnerHTML={{ __html: body }} />
      </div>

      <ContactSection />

      <section className="mx-auto max-w-site px-6 pb-16 lg:px-[150px] lg:pb-24">
        <SectionHeading eyebrow="MORE WORK" title="ผลงานอื่น" />
        <div className="mt-10"><ProjectGrid projects={others} /></div>
      </section>
    </>
  );
}
```

### 🚨 ผลพ่วงของ `dynamicParams = false` ที่ต้องรู้

ทั้ง 6 หน้าถูก prerender ตอน build → **`fs` อ่านไฟล์ตอน build เท่านั้น ไม่เคยอ่านตอน runtime**

สำคัญเพราะ **ไฟล์ใต้ `src/` ไม่ถูกก๊อปเข้า deployment output ของ Vercel**.
วันไหนเปลี่ยนหน้านี้เป็น ISR / dynamic / เปิด Cache Components (`dynamicParams` ใช้ไม่ได้เมื่อเปิด)
หน้าจะพังตอน runtime หาไฟล์ไม่เจอ — ต้องไปตั้ง `outputFileTracingIncludes` ใน `next.config.ts`
(ตอนนี้ `next.config.ts` ยังว่างเปล่า)

---

## 8. CSS

ตาราง type scale ในสเปกเดิม**ไม่มี role สำหรับหัวข้อในเนื้อหา** — มีแต่ `section h2` 40/52 ซึ่งใหญ่เกินไป
แต่ `/privacy` ตัดสินค่าไปแล้วในโค้ด. `.markdown-body` ถอดค่าจากตรงนั้นมา **ไม่ตั้งค่าใหม่สักตัว**

```css
@layer components {
  /* ชื่อไม่ใช่ .prose เพราะกันชนกับ @tailwindcss/typography วันที่ลง (Q10 ไม่ลงตอนนี้ ไม่ได้ห้ามตลอดไป)
     ค่าทั้งหมดถอดมาจากหน้า /privacy ไม่มีค่าไหนตั้งใหม่ */
  .markdown-body { font-size: 17px; line-height: 28px; color: var(--muted-fg); }
  .markdown-body > * + * { margin-top: 16px; }
  .markdown-body > :first-child { margin-top: 0; }
  .markdown-body h2 { margin-top: 32px; font-size: 18px; line-height: 25px; font-weight: 700; color: var(--ink); }
  .markdown-body h3 { margin-top: 24px; font-size: 17px; line-height: 28px; font-weight: 700; color: var(--ink); }
  .markdown-body h2 + *, .markdown-body h3 + * { margin-top: 8px; }
  .markdown-body ul { list-style: disc; padding-left: 24px; }
  .markdown-body ol { list-style: decimal; padding-left: 24px; }
  .markdown-body li + li { margin-top: 4px; }
  .markdown-body strong { font-weight: 700; color: var(--ink); }
  .markdown-body a { color: var(--burgundy); text-decoration: underline; text-underline-offset: 2px; }
}
```

**ลิงก์ขีดเส้นใต้ ต่างจาก `/privacy` ที่ใช้สีอย่างเดียว** — ที่ `/privacy` ลิงก์อยู่ท้ายบรรทัดของตัวเอง
หลังคำว่า "อีเมล:" แต่ในเนื้อหา markdown ลิงก์อยู่กลางย่อหน้า แยกด้วยสีอย่างเดียวไม่ผ่าน WCAG 1.4.1

---

## 9. Data model และเนื้อหา

```ts
export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** คำโปรย 1 ประโยค แสดงใต้ h1 ของหน้า detail - ไม่ใช่ meta description (Q15 ตัด SEO) */
  description: string;
  image: StaticImageData;
  imageAlt: string;
  client?: string;   // ซ่อนเสมอเพราะ NDA - ไม่แสดงบนหน้า detail เช่นกัน (Q8)
};
```

`ขอบเขตงาน` **ไม่เป็น field** — อยู่ใน `.md` เป็นหัวข้อ `## ขอบเขตงาน` + bullet (Q11).
เป็น field แปลว่าต้องมี component แยก + array field ใน Payload ทีหลัง เพื่อแลกกับสิ่งที่ `<ul>` ทำได้อยู่แล้ว

**เนื้อหา 6 ชุดกับ `description` 6 ตัวอยู่ที่ [`issues/03-mock-content.md`](issues/03-mock-content.md) แบบยกไปวางได้เลย**
จงใจไม่ก๊อปมาไว้ที่นี่ — 180 บรรทัดที่มีสองสำเนาคือ 180 บรรทัดที่รอวันไม่ตรงกัน

ทุกไฟล์ขึ้นต้นด้วย `<!-- MOCK: ... -->` ซึ่ง `renderer.html` ทิ้งอยู่แล้ว → คนเปิดไฟล์เห็นทันที หน้าเว็บไม่เห็น

---

## 10. ลำดับที่แนะนำ

1. `marked` + `content.ts` + `content.test.ts` — **ทำก่อน** เพราะถ้าชื่อ hook ของ marked v18 ไม่ใช่ที่คาด ต้องรู้ตั้งแต่ต้น
2. `SectionHeading` + `PageHeader` + `ContactSection` + `/contact` — 4 route ได้ `h1`
3. `ProjectCard` ลิงก์ทั้งใบ — ตรวจว่า Home กับ `/portfolio` ยังไม่พัง
4. `types.ts` + `data.ts` + 6 ไฟล์ `.md`
5. `.markdown-body` ใน `globals.css`
6. `app/portfolio/[slug]/page.tsx`

---

## 11. Checklist หลัง build

**ระบบ**
- [ ] `pnpm lint` · `pnpm test` · `pnpm build` ผ่านบน Node 26 **และ Node 24** (prod รัน `nodejs24.x`)
- [ ] `pnpm build` prerender ครบ 6 หน้า
- [ ] build log ไม่มี `[portfolio] ไม่พบ`
- [ ] `/portfolio/xxx` ที่ไม่มีจริง → 404
- [ ] เทสต์ raw HTML ผ่าน (ยืนยันชื่อ hook ของ marked v18 ไปในตัว)
- [ ] `<title>` ของ 6 หน้าไม่ซ้ำกัน

**หัวข้อ**
- [ ] ทั้ง 6 route มี `<h1>` หน้าละ 1 อันพอดี
- [ ] Home ยังเป็น `h2` ทุก section — ไม่มี `h1` ซ้อนจาก `ContactSection`
- [ ] หน้า detail ไม่มีระดับหัวข้อข้าม

**การ์ด**
- [ ] Tab เข้าการ์ด → ring ล้อมทั้งใบ ไม่ใช่แค่ตัวหนังสือ
- [ ] screen reader อ่านลิงก์การ์ดว่าชื่อโครงการเท่านั้น
- [ ] กดได้ทั้ง Home และ `/portfolio`

**เนื้อหา**
- [ ] เนื้อหามีระยะห่างจริง ไม่ใช่ตัวหนังสือติดกัน (preflight reset)
- [ ] `<!-- MOCK -->` ไม่ปรากฏใน HTML ที่เรนเดอร์ออกมา
- [ ] breadcrumb ตัวสุดท้ายกดไม่ได้
- [ ] ไม่มีชื่อลูกค้า ชื่อสถานที่ ปี จำนวนอุปกรณ์ หรือยี่ห้อในไฟล์ไหนเลย
- [ ] ดู `em` ในภาษาไทยแล้วตัดสินว่าเก็บไว้ไหม (synthetic oblique อ่านยากกว่าอังกฤษมาก)

---

## 12. Gate ที่ต้องเพิ่มเข้า `../landing-page/build/gate.md`

- [ ] **เปลี่ยนเนื้อหา 6 ไฟล์ใน `src/features/portfolio/content/` เป็นเนื้อหาโครงการจริง** — ตอนนี้เป็นเรื่องแต่งทั้งหมด ไม่มีโครงการไหนอ้างอิงงานที่เกิดขึ้นจริง
- [ ] เปลี่ยน `description` 6 ตัวใน `data.ts` พร้อมกัน
- [ ] ลบ `<!-- MOCK: ... -->` บรรทัดแรกของทุกไฟล์เมื่อเนื้อหาจริงเข้ามา — comment ที่ค้างอยู่กับเนื้อหาจริงจะทำให้คนอ่านเข้าใจผิดกลับด้าน
- [ ] **ทำ SEO ของ 6 หน้าที่ยกไว้** (Q15) — `description`, `openGraph`, `alternates.canonical`, JSON-LD `CreativeWork`, `BreadcrumbList`, เพิ่ม 6 route ใน `sitemap.ts`
- [ ] ทบทวนว่าหน้าที่เนื้อหายังบางควร `noindex` ไหม (Q14 เลื่อนไว้)
