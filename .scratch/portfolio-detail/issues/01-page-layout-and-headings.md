# 01 - โครงหน้า `/portfolio/[slug]` และลำดับหัวข้อ

Type: grilling
Status: resolved
Assignee: Nachai
Blocked by: -

## Question

Q5 ล็อก section ไว้แล้ว 5 อัน — hero (รูป + หมวด + ชื่อ) → ภาพรวมโครงการ → ขอบเขตงาน → `ContactSection` → ผลงานอื่น 3 ใบ — แต่ยังไม่มีอะไรที่ build ตามได้จริง. Figma **ไม่มีจอนี้** (frame ชุดเก่าถูกลบไปแล้วตั้งแต่ map ที่แล้ว) → ต้องออกแบบเองจากภาษาของ `Home Redesign` เหมือนที่ ticket 11 ของ map เก่าทำกับ `/portfolio` `/brands` `/privacy`.

ต้องเคาะ:

1. **hero** — สูงเท่าไรทั้ง 2 breakpoint, crop รูปยังไง (มีรูปเดียวต่อโครงการ ไม่มี crop mobile แยกเหมือน Home hero), overlay navy กี่ % (ticket 10 ของ map เก่าบังคับขั้นต่ำ 60% ที่ Home hero — ที่นี่เหมือนกันไหม), `sizes` ค่าอะไร, ตัวหนังสือทับบนรูปหรืออยู่ใต้รูป
2. **ลำดับหัวข้อ** — `SectionHeading` hardcode `<h2>` ทำให้ตอนนี้ **4 route ไม่มี `<h1>` เลย**. Q13 ตัดสินให้เพิ่ม prop เลือกระดับหัวข้อได้ แล้ว `PageHeader` ส่ง `h1`. ต้องเคาะ: prop ชื่ออะไร รับค่าอะไรได้บ้าง, default เป็นอะไรเพื่อไม่ให้ 8 จุดที่เรียกอยู่แล้วพัง, แล้วในหน้า detail หัวข้อ `ภาพรวมโครงการ` / `ขอบเขตงาน` / `ผลงานอื่น` เป็นระดับไหน (ระวัง: `## ` ใน markdown จะพ่น `<h2>` ออกมาด้วย ต้องไม่ชนกัน — ดู ticket 02)
3. **hero ใช้ component อะไร** — `PageHeader` เดิมเป็นพื้น bg ไม่มีรูป. ทำตัวใหม่แยก, หรือเพิ่ม prop รูปให้ `PageHeader`. ticket 11 ของ map เก่าวางหลักไว้ว่า **แชร์เฉพาะ component เล็ก ไม่ใช้ `variant`**
4. **ผลงานอื่น 3 ใบ** — เลือกยังไง (3 ตัวถัดไปใน array วนกลับ / สุ่ม / หมวดเดียวกัน), หัวข้อว่าอะไร, ใช้ `ProjectGrid` เดิมได้เลยไหม
5. **ลิงก์กลับ** — Q15 ตัด breadcrumb JSON-LD ทิ้ง แต่ breadcrumb ที่**มองเห็น**หรือปุ่ม `← กลับไปหน้าผลงาน` ยังต้องตัดสินว่ามีไหม อยู่ตรงไหน
6. **spacing ทุก section 2 breakpoint** — ให้ตรงกับตารางใน `../../landing-page/spec.md` §ระยะ
7. **การ์ดกดได้ (Q6)** — `<article>` ห่อด้วย `<Link>` ทั้งใบ → ต้องเคาะ hover / `:focus-visible` (ticket 10 ของ map เก่าบังคับ `outline-offset: 2px`) และ `ProjectCard` ยังคงเป็น `<article>` อยู่ไหม

**ผลลัพธ์ที่ต้องได้**: ตารางโครงหน้าครบ 2 breakpoint + ลายเซ็น component ที่แตะ (`SectionHeading`, `PageHeader`, hero ตัวใหม่, `ProjectCard`) + รายการหน้าเดิมที่กระทบจากการแก้ `SectionHeading`.

## Answer

### สรุป decision (grilling 2 รอบ 8 คำถาม)

| | ตัดสิน |
|---|---|
| 1.1 hero | ตัวหนังสือบนพื้น `bg` แล้ว**รูปเป็นแบนเนอร์อยู่ใต้ลงมา** ไม่มี overlay ไม่ทับตัวหนังสือ |
| 1.2 prop ระดับหัวข้อ | `as?: "h1" \| "h2" \| "h3"` default `"h2"` |
| 1.3 `/contact` | `ContactSection` รับ prop `as` ส่งต่อ → `/contact` ได้ `h1` ติดมาด้วย |
| 1.4 หัวข้อในโซนเนื้อหา | **markdown คุมทั้งโซน** หน้าไม่เรนเดอร์หัวข้อของ body เอง |
| 1.5 ผลงานอื่น | 3 ตัวถัดไปใน `PROJECTS` วนกลับหัว ใช้ `ProjectGrid` เดิม |
| 1.6 ลิงก์กลับ | **breadcrumb ที่มองเห็น** `หน้าแรก › ผลงาน › ชื่อโครงการ` เหนือหัวเพจ |
| 1.7 การ์ดกดได้ | `<Link>` ครอบเฉพาะ `<h3>` แล้วยืดด้วย `::after` |
| 1.8 หมวด | เพิ่ม prop `eyebrowLang` default `"en"` → หน้า detail ส่ง `"th"` แล้วใช้**หมวดเป็น eyebrow** |

### สิ่งที่เจอระหว่างทำ ที่ ticket เขียนไว้ผิด

**`/contact` ไม่ได้ใช้ `PageHeader`** — มันเรนเดอร์ `ContactSection` ตรง ๆ ซึ่งมี `SectionHeading` ของตัวเอง.
แก้ `PageHeader` จึงได้ `<h1>` แค่ **3 หน้า** (`/portfolio` `/brands` `/privacy`) ไม่ใช่ 4 ตามที่ ticket เขียน.
`/contact` ต้องแก้แยกผ่าน prop ของ `ContactSection` (1.3) เพราะ component ตัวเดียวกันถูกใช้บน Home ด้วย ซึ่งที่นั่นต้องเป็น `h2`.

**หน้า detail ไม่ใช้ `PageHeader`** — `PageHeader` มี `pt-16 lg:pt-24` ฝังอยู่ ถ้าเอา breadcrumb ไปวางเหนือมันจะได้ padding ซ้อนสองชั้น.
ทางแก้ที่ถูกกว่าการเพิ่ม prop `className` คือให้หน้า detail เรียก `SectionHeading` ตรง ๆ — `PageHeader` เป็น wrapper 5 บรรทัดอยู่แล้ว ไม่ได้ประหยัดอะไรในเคสนี้.

### ลายเซ็น component

```tsx
// components/layout/section-heading.tsx — เพิ่ม 2 prop ไม่แตะ call site เดิม 5 จุด
type SectionHeadingProps = {
  eyebrow: string;
  /** ภาษาของ eyebrow - default อังกฤษเพราะทุกจุดเดิมเป็นวลีอังกฤษ
   *  หน้า detail ส่ง "th" เพราะ eyebrow ที่นั่นคือหมวดภาษาไทย */
  eyebrowLang?: string;   // default "en"
  /** ระดับหัวข้อ - default h2 เพราะ 5 จุดเดิมเป็น section ทั้งหมด */
  as?: "h1" | "h2" | "h3";  // default "h2"
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};
// ข้างใน: const Heading = as; ... <span lang={eyebrowLang}>{eyebrow}</span>
```

```tsx
// components/layout/page-header.tsx — หัวเพจของ route ที่ไม่ใช่ Home ต้องเป็น h1 เสมอ
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mx-auto max-w-site px-6 pt-16 lg:px-[150px] lg:pt-24">
      <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
    </div>
  );
}
// → /portfolio /brands /privacy ได้ h1 โดยไม่ต้องแก้ไฟล์ตัวเอง
```

```tsx
// features/contact/contact-section.tsx
export function ContactSection({ as = "h2" }: { as?: "h1" | "h2" }) { ... }
// app/contact/page.tsx → <ContactSection as="h1" />
// Home และหน้า detail → <ContactSection />
```

### `ProjectCard` — กดได้ทั้งใบ

ปัญหาที่ต้องแก้ก่อน: แถบทึบล่างตอนนี้เป็น `absolute` → ถ้า `::after` ของลิงก์อยู่ข้างใน มันจะยึดกับ**แถบ** ไม่ใช่ทั้งการ์ด แล้วพื้นที่กดจะเหลือแค่แถบ.

ทางแก้: เอา `absolute` ออกจากแถบ แล้วดัน `<Image>` ลงหลังด้วย `-z-10` แทน (การ์ดมี `isolate` อยู่แล้ว z-index จึงไม่รั่วออกไปนอกการ์ด)

```tsx
<article className="group relative isolate flex flex-col justify-end overflow-hidden
                    rounded-sm border border-border bg-card-navy
                    has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2
                    has-[:focus-visible]:outline-ring">
  <Image ... className="-z-10 object-cover" />        {/* fill + absolute อยู่แล้ว */}
  <div className="bg-[rgba(3,8,20,0.9)] px-5 py-4 transition-colors
                  group-hover:bg-[rgba(3,8,20,0.96)]">   {/* static ไม่ absolute แล้ว */}
    <p ...>{project.category}</p>
    <h3 ...>
      <Link href={`/portfolio/${project.slug}`} className="outline-none after:absolute after:inset-0">
        {project.title}
      </Link>
    </h3>
  </div>
</article>
```

- accessible name ของลิงก์ = **ชื่อโครงการล้วน** ไม่ใช่ alt รูป + หมวด + ชื่อ ปนกันแบบที่ `<Link>` ห่อทั้งใบจะให้
- focus ring วาดที่ขอบการ์ดด้วย `has-[:focus-visible]` + `outline-offset: 2px` ตามที่ ticket 10 ของ map เก่าบังคับ
- hover เปลี่ยนแค่ความทึบของแถบ **ไม่มี transform บนรูป** — ไม่มีอะไรในดีไซน์เดิมที่ขยับ
- กระทบทั้ง Home และ `/portfolio` พร้อมกันตาม Q6 ไม่มี prop เปิด/ปิด

### โครงหน้า `/portfolio/[slug]`

```
┌ breadcrumb            หน้าแรก › ผลงาน › ชื่อโครงการ
├ eyebrow               หมวด (ไทย, lang="th")
├ h1                    ชื่อโครงการ
├ description           คำโปรย 1 ประโยคจาก data.ts
├ แบนเนอร์รูป           กว้างเท่า content, object-cover
├ เนื้อหา markdown      ## ภาพรวมโครงการ / ## ขอบเขตงาน  ← h2 มาจาก .md
├ ContactSection        reuse ทั้งดุ้น (as="h2")
└ ผลงานอื่น             h2 + ProjectGrid 3 ใบ
```

| | mobile (390) | desktop (1440) |
|---|---|---|
| container | `px-6` content 342 | `px-[150px]` content 1140 |
| padding-top ของบล็อกแรก | 64 | 96 |
| breadcrumb → eyebrow | 24 | 24 |
| eyebrow / h1 / description | gap 10 (ของ `SectionHeading`) | 10 |
| หัวเพจ → แบนเนอร์ | 40 | 40 |
| ความสูงแบนเนอร์ | **240** | **520** |
| แบนเนอร์ → เนื้อหา | 40 | 48 |
| เนื้อหา → `ContactSection` | 0 (`ContactSection` มี `pt-16`/`lg:pt-24` ของตัวเอง) | 0 |
| `ContactSection` → ผลงานอื่น | 0 (มี `pb-16`/`lg:pb-24` ของตัวเอง) | 0 |
| padding-bottom ของหน้า | 64 | 96 |

`sizes` ของแบนเนอร์: `(min-width:1024px) 1140px, 100vw`

**ไม่ล็อกอัตราส่วน 1460:920** ทั้งที่ไฟล์เป็นขนาดนั้น — จะได้สูง 719px บน desktop ดันทุกอย่างตกจอ. ใช้ความสูงคงที่ + `object-cover` แทน เพราะวันที่รูปโครงการจริงเข้ามาอัตราส่วนจะไม่เท่ากันทุกใบอยู่ดี.

### breadcrumb

เขียนในหน้า detail ตรง ๆ ไม่ทำเป็น component — ใช้ที่เดียว

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

- ตัวสุดท้าย**ไม่เป็นลิงก์** และมี `aria-current="page"`
- ตัวคั่นเป็น `<li aria-hidden="true">` ไม่ใช่ `::before` — pseudo-element content บาง screen reader อ่านออกเสียง
- **ปล่อยตกบรรทัดบนมือถือ ไม่ truncate** (`flex-wrap`) — ชื่อโครงการยาวสุดคือ `ระบบ AV สำหรับพื้นที่อเนกประสงค์` ตัดครึ่งแล้ว breadcrumb หมดประโยชน์
- **ไม่มี `BreadcrumbList` JSON-LD** — Q15 ตัด SEO ออกจาก map นี้

### ผลงานอื่น

```tsx
const others = [1, 2, 3].map((n) => PROJECTS[(index + n) % PROJECTS.length]);
```
3 ตัวถัดไปวนกลับหัว — deterministic ไม่มีกรณี "หมวดนี้มีใบเดียว" ให้ต้องเขียน fallback.
`<SectionHeading eyebrow="MORE WORK" title="ผลงานอื่น" />` (`as` default `h2`) + `<ProjectGrid projects={others} />` ตัวเดิมไม่ต้องแก้.

### ลำดับหัวข้อของหน้า detail

```
h1  ชื่อโครงการ
├ h2  ภาพรวมโครงการ      ← จาก .md
├ h2  ขอบเขตงาน          ← จาก .md
├ h2  เล่าให้เราฟัง...     ← ContactSection
└ h2  ผลงานอื่น
   └ h3  ชื่อโครงการ × 3   ← ProjectCard
```
ไม่มีระดับข้าม. `.md` ใช้ได้ถึง `h3` โดยไม่ชนกับอะไร (ticket 02 กำหนดชุด element)

### ไฟล์ที่กระทบ

| ไฟล์ | ทำอะไร |
|---|---|
| `components/layout/section-heading.tsx` | เพิ่ม `as` + `eyebrowLang` |
| `components/layout/page-header.tsx` | ส่ง `as="h1"` |
| `features/contact/contact-section.tsx` | เพิ่ม prop `as` default `"h2"` |
| `app/contact/page.tsx` | ส่ง `as="h1"` |
| `features/portfolio/project-card.tsx` | ลิงก์ทั้งใบ + สลับ `absolute` เป็น `-z-10` |
| `app/portfolio/[slug]/page.tsx` | **ไฟล์ใหม่** (โครงเต็มอยู่ที่ ticket 02) |

ได้ `<h1>` เพิ่มโดยไม่ต้องแก้ไฟล์ตัวเอง: `/portfolio` `/brands` `/privacy`
ได้ `<h1>` ผ่าน prop: `/contact`
**หลังงานนี้ทั้ง 6 route มี `<h1>` ครบ** จากเดิมที่มีแค่ Home

### ตรวจตอน build

- [ ] ทั้ง 6 route มี `<h1>` หน้าละ 1 อันพอดี
- [ ] Home ยังเป็น `h2` ทุก section (ไม่มี `h1` ซ้อนจาก `ContactSection`)
- [ ] Tab เข้าการ์ด → ring ล้อมทั้งใบ ไม่ใช่แค่ตัวหนังสือ
- [ ] screen reader อ่านลิงก์การ์ดว่าชื่อโครงการเท่านั้น
- [ ] breadcrumb ตัวสุดท้ายกดไม่ได้
