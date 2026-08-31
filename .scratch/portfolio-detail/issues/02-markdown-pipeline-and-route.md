# 02 - ท่อ markdown และกลไกของ route

Type: grilling
Status: resolved
Assignee: Nachai
Blocked by: -

## Question

Q2 เลือก `.md` + `marked`, Q3 เลือกไม่มี frontmatter, Q10 เลือกเขียน CSS เอง. เหลือรายละเอียดที่ build session ต้องใช้:

1. **ไฟล์ `.md` วางที่ไหน** — `src/features/portfolio/content/<slug>.md` (ข้างๆ `data.ts` เหมือนที่ `images/` ทำ) หรือ `content/portfolio/` ที่ราก. กระทบว่า Payload จะกลืนยังไงทีหลัง
2. **อ่านไฟล์ยังไง** — `fs.readFileSync` ใน server component ตอน build (ยืนยันแล้วว่าใช้ได้ ไม่ต้องแตะ bundler config) vs วิธีอื่น. แล้วไฟล์หายทำยังไง — `notFound()` หรือเรนเดอร์หน้าเปล่า
3. **`generateStaticParams`** — สร้างจาก `PROJECTS` ทั้ง 6. แล้ว slug ที่ไม่มีใน array ต้อง 404 → ตั้ง `dynamicParams` ยังไง
4. **element ที่รองรับ** — markdown เขียนได้แค่ไหน. ยิ่งรองรับน้อย CSS ยิ่งสั้นและหน้าตายิ่งคุมได้. เสนอชุดปิด: `h2` `h3` `p` `ul` `ol` `li` `strong` `em` `a`. **ห้าม raw HTML ใน `.md`** — `marked` ปล่อยผ่านโดย default ต้องปิด.
   **ticket 01 ยืนยันแล้วว่า `h2` กับ `h3` ไม่ชนกับอะไร** — หน้าไม่เรนเดอร์หัวข้อของโซนเนื้อหาเอง `.md` เปิดด้วย `## ภาพรวมโครงการ`
5. **CSS ~25 บรรทัด** — เขียนที่ไหนใน `globals.css`, ใช้ชื่อ class อะไร, ค่าทุกตัวต้องมาจาก type scale ที่ล็อกไว้แล้ว ห้ามตั้งค่าใหม่
6. **`dangerouslySetInnerHTML`** — เนื้อหาเป็นของเราเอง แปลงตอน build ไม่มี user input → ปลอดภัยในบริบทนี้ แต่ต้องเขียนเงื่อนไขนั้นลงสเปกให้ชัด ว่าวันไหนที่ content มาจาก Payload/ผู้ใช้ ข้อสรุปนี้เป็นโมฆะทันทีและต้อง sanitize
7. **`metadata`** — Q15 ตัด SEO ทิ้ง เหลืออะไรบ้าง. `generateMetadata` ที่ใส่แค่ `title` ยังต้องมีอยู่ไหม หรือปล่อยให้ตกไปที่ template ของ layout
8. ~~**`Project.description` (Q11)**~~ — **ปิดแล้วโดย ticket 01**: field นี้อยู่ต่อ แสดงเป็นคำโปรยใต้ `h1`. `.md` ทำหน้าที่เนื้อหาอย่างเดียว

**ผลลัพธ์ที่ต้องได้**: โครงไฟล์ + ฟังก์ชันอ่าน/แปลง markdown พร้อมลายเซ็น + ชุด element ที่รองรับ + CSS ที่เขียนเสร็จแล้ว + `page.tsx` ระดับ pseudo-code.

## Answer

### สรุป decision

| | ตัดสิน |
|---|---|
| 2.1 ที่วางไฟล์ | `src/features/portfolio/content/<slug>.md` ข้าง `data.ts` |
| 2.2 lib | **`marked@18.0.11`** + override renderer ทิ้ง raw HTML (0 transitive dep) |
| 2.3 slug ไม่มี | `export const dynamicParams = false` → Next คืน 404 เอง |
| 2.4 `.md` หาย | **เรนเดอร์หัวเพจไปตามปกติ เนื้อหาว่าง** (ไม่ให้ build ตาย) |
| 2.5 element | `h2` `h3` `p` `ul` `ol` `li` `strong` `em` `a` เท่านั้น |
| 2.6 CSS | `@layer components` ใน `globals.css` class **`.markdown-body`** |
| 2.7 `<title>` | มี `generateMetadata` ใส่ `title` อย่างเดียว |

### ข้อเท็จจริงที่พลิกคำถามเดิม

**`marked` ถอด option `sanitize` ออกตั้งแต่ v5** — v18.0.11 ไม่มีสวิตช์ปิด raw HTML ให้แล้ว
(ตอนเขียน ticket เข้าใจว่ายังมี). ต้อง override renderer เอง 1 บรรทัด.

เทียบกับ `markdown-it@15.0.1` ที่ `html: false` เป็น default: ทั้งคู่รันตอน build ไม่ขึ้น client bundle
→ เหลือให้เทียบแค่ `node_modules` ซึ่ง **`marked` = 0 dependency** ส่วน `markdown-it` ลาก 6 ตัว
(`mdurl` `argparse` `entities` `uc.micro` `linkify-it` `punycode.js`). เลือก `marked`.

### ผลพ่วงของ 2.3 ที่ต้องเขียนเตือนไว้

`dynamicParams = false` + `generateStaticParams` → ทั้ง 6 หน้าถูก prerender ตอน build
→ **`fs` อ่านไฟล์ตอน build เท่านั้น ไม่เคยอ่านตอน runtime**

สำคัญเพราะ **ไฟล์ใต้ `src/` ไม่ถูกก๊อปเข้า deployment output ของ Vercel**.
วันไหนเปลี่ยนหน้านี้เป็น ISR / dynamic / เปิด Cache Components (`dynamicParams` ใช้ไม่ได้เมื่อเปิด)
หน้าจะพังตอน runtime หาไฟล์ไม่เจอ — ต้องไปตั้ง `outputFileTracingIncludes` ใน `next.config.ts`
(ตอนนี้ `next.config.ts` ยังว่างเปล่า)

### ผลพ่วงของ 2.4 และสิ่งที่ทำเพิ่ม

เลือกไม่ให้ build ตาย → **ไฟล์หายจะเงียบสนิทบน production**.
กัน 2 ชั้นแทน: `console.warn` ตอน build (ขึ้นใน build log) + checklist ตรวจ 6 ไฟล์ตอน build

### `src/features/portfolio/content.ts`

```ts
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

/** คืน "" เมื่อไม่มีไฟล์ - หน้ายังเรนเดอร์ได้ตามปกติ แค่ไม่มีเนื้อหา (2.4) */
export async function renderProjectBody(slug: string): Promise<string> {
  let raw: string;
  try {
    raw = await readFile(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
  } catch {
    console.warn(`[portfolio] ไม่พบ ${slug}.md - หน้าจะไม่มีเนื้อหา`);
    return "";
  }
  return marked.parse(raw);
}
```

⚠️ **ต้องยืนยันตอน build**: hook ที่ทิ้ง raw HTML ใน `marked` v18 ชื่อ `renderer.html` และครอบคลุม
**ทั้ง block และ inline** หรือไม่. ถ้าไม่ครอบทั้งคู่ ต้องเพิ่ม `tokenizer` override.
มีเทสต์รองรับข้อนี้อยู่ (ด้านล่าง) — ถ้าชื่อ hook เปลี่ยน เทสต์จะแดง

### `src/features/portfolio/content.test.ts`

```ts
// เทสต์เดียวที่ต้องมี: ยืนยันว่า raw HTML ถูกทิ้งจริง
// ถ้าข้อนี้พัง `dangerouslySetInnerHTML` ในหน้ากลายเป็นช่องโหว่ทันที
it("ทิ้ง raw HTML ทั้ง block และ inline", async () => {
  const html = await renderMarkdown("<script>alert(1)</script>\n\nข้อความ <img src=x onerror=alert(1)> ต่อ");
  expect(html).not.toContain("<script");
  expect(html).not.toContain("onerror");
});
```
→ ต้องแยกฟังก์ชัน `renderMarkdown(raw: string)` ออกจาก `renderProjectBody(slug)` เพื่อเทสต์ได้โดยไม่แตะ `fs`

### `src/app/portfolio/[slug]/page.tsx`

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
// ไม่มี description / openGraph / canonical / JSON-LD - Q15 ตัด SEO ออกจาก map นี้

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
        {/* breadcrumb - โครงเต็มอยู่ที่ ticket 01 */}
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

`max-w-[760px]` ของโซนเนื้อหา — ค่าเดียวกับ `/privacy` ไม่ใช่ 1140 ของแบนเนอร์.
บรรทัดยาว 1140px ที่ 17px อ่านไม่ไหว ส่วนแบนเนอร์เป็นรูปไม่มีปัญหานั้น

### CSS ใน `globals.css`

ตาราง type scale ในสเปกเดิม**ไม่มี role สำหรับหัวข้อในเนื้อหา** — มีแต่ `section h2` 40/52 ซึ่งใหญ่เกินไป.
แต่ `/privacy` ตัดสินค่าไปแล้วในโค้ด (`h2` 18/25 bold ink · `p` 17/28 muted · link burgundy · กว้าง 760).
`.markdown-body` ถอดค่าจากตรงนั้นมาใช้ → หน้าเนื้อหายาวทั้งเว็บหน้าตาเหมือนกันโดยไม่ต้องตั้งค่าใหม่

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

**ลิงก์ใน `.markdown-body` ขีดเส้นใต้ ต่างจาก `/privacy` ที่ใช้สีอย่างเดียว** — ที่ `/privacy` ลิงก์อยู่
ท้ายบรรทัดของตัวเองหลังคำว่า "อีเมล:" แต่ในเนื้อหา markdown ลิงก์จะอยู่กลางย่อหน้า
แยกด้วยสีอย่างเดียวไม่ผ่าน WCAG 1.4.1 (Use of Color)

### ชุด element ที่รองรับ (2.5)

รองรับ: `h2` `h3` `p` `ul` `ol` `li` `strong` `em` `a`

ตัดออกและเหตุผล:
- `h1` — หน้ามีอยู่แล้ว 1 อัน (ticket 01) เพิ่มอีกคือทำลำดับหัวข้อพัง
- `img` — รูปมาจาก `data.ts` เป็น static import ที่มี blur placeholder. รูปใน markdown จะไม่ได้ optimize
- `blockquote` — เดาว่าจะถูกใช้เป็นคำพูดลูกค้า ซึ่ง Q8 ซ่อนลูกค้าอยู่ทั้งหมด เปิดไว้ = เชิญให้เขียนสิ่งที่ต้องลบทีหลัง
- `code` / `pre` / `table` / `hr` — ไม่มีที่ใช้ในเนื้อหาแนวนี้ และแต่ละตัวลาก CSS ตามมา

element นอกชุดนี้ไม่ได้ถูกบล็อก — แค่ไม่มี CSS รองรับ จะออกมาเป็น default ที่ preflight reset แล้ว.
กติกาอยู่ที่ ticket 03 (คนเขียนเนื้อหา) ไม่ใช่ที่ท่อ

### ไฟล์ที่เพิ่ม/แก้

| ไฟล์ | ทำอะไร |
|---|---|
| `package.json` | `+ marked@18.0.11` (dependency ตัวเดียว ไม่มี transitive) |
| `features/portfolio/content.ts` | **ใหม่** — `renderMarkdown` + `renderProjectBody` |
| `features/portfolio/content.test.ts` | **ใหม่** — เทสต์ raw HTML ถูกทิ้ง |
| `features/portfolio/content/<slug>.md` × 6 | **ใหม่** — เนื้อหาจาก ticket 03 |
| `features/portfolio/types.ts` | `+ description: string` |
| `features/portfolio/data.ts` | เติม `description` 6 ตัว |
| `app/portfolio/[slug]/page.tsx` | **ใหม่** |
| `app/globals.css` | `+ .markdown-body` ใน `@layer components` |

### ตรวจตอน build

- [ ] `pnpm build` prerender ครบ 6 หน้า
- [ ] มี `.md` ครบ 6 ไฟล์ — build log ไม่มี `[portfolio] ไม่พบ`
- [ ] slug มั่ว เช่น `/portfolio/xxx` → 404
- [ ] เทสต์ raw HTML ผ่าน (ยืนยันชื่อ hook ของ marked v18 ไปในตัว)
- [ ] `<title>` ของ 6 หน้าไม่ซ้ำกัน
- [ ] เนื้อหามีระยะห่างจริง ไม่ใช่ตัวหนังสือติดกัน (preflight reset)
