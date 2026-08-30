# 01 - Token spec นอกเหนือจากสี

Type: research
Status: resolved
Blocked by: -

## Question

สีทั้ง 8 สกัดมาแล้วและอยู่ใน map แล้ว.
ที่ยังไม่มีคือ token ที่เหลือทั้งหมดที่ `Home Redesign / Desktop` (`36:8873`) กับ `Home Redesign / Mobile` (`36:9153`) ใช้จริง:

- **type scale**: ขนาด / น้ำหนัก / line-height ของ H1, H2, H3, body, caption, eyebrow (ตัวเล็กสีแดงเหนือหัวข้อ เช่น `START A CONVERSATION`) แยกตาม breakpoint
- **spacing**: จังหวะ padding แนวตั้งของแต่ละ section, gap ใน grid, container max-width และ gutter ซ้ายขวา ทั้ง 1440 และ 390
- **radius กับ shadow**: `12px`/`8px` มาจาก card ใน Foundations - ยืนยันว่า card ผลงาน, ปุ่ม, input ใช้ค่าเดียวกันไหม
- **breakpoint**: จุดตัดจริงระหว่าง mobile กับ desktop คือเท่าไหร่ (design มีแค่ 390 กับ 1440 ต้องเลือกจุดตัดเอง)

**ผลลัพธ์ที่ต้องได้**: บล็อก `@theme` สำหรับ `globals.css` (Tailwind 4) แบบพร้อมวาง พร้อมชื่อ token ที่ตั้งแล้ว.

หมายเหตุ: Figma ไฟล์นี้ **ไม่มี Variables** (`get_variable_defs` คืน `{}`) ต้องอ่านจาก raw style ผ่าน `get_design_context`.

## Answer

⚠️ **แก้ความเข้าใจผิดจาก map**: radius `12px` ที่จดไว้ตอนแรก **ไม่ใช่ของ Redesign** - มันคือ radius ของการ์ด swatch ใน Foundations frame เอง.
Redesign ใช้ **`2px` ทุกที่** (ปุ่ม, input, การ์ดผลงาน, การ์ดบทความ) และ `1px` เฉพาะ badge.
ไม่พบ `drop-shadow` ในทุก element ของ Redesign - เงาที่เจอใน Foundations เป็นของการ์ด swatch เช่นกัน.

### สีที่เพิ่มจาก palette เดิม

พบ 3 สีที่ Foundations ไม่ได้ประกาศไว้ แต่ Redesign ใช้จริง:

| token | hex | ใช้ที่ |
|---|---|---|
| `--color-card-navy` | `#111a2a` | พื้นการ์ดผลงาน / บทความ / วิดีโอ |
| `--color-card-meta` | `#c9d2df` | ตัวหนังสือประเภทงานบนการ์ด |
| `--color-scrim` | `rgba(3,8,20,0.9)` | แผงข้อมูลทับล่างของการ์ด |

### Type scale

font เดียวทั้งเว็บ: **Noto Sans Thai** น้ำหนัก Regular (400) + Bold (700). ไม่มีน้ำหนักอื่น ไม่มี font ตัวที่สอง.

| role | desktop | mobile | weight | สี |
|---|---|---|---|---|
| hero eyebrow | 14 / 20 | 12 / 20 | Bold | white |
| hero h1 | **66 / 78** | **40 / 50** | Bold | white |
| hero body | 20 / 32 | 17 / 28 | Regular | white |
| section eyebrow | 12 / 18 | 12 / 18 | Bold | `#7f1d2d` |
| section h2 | **40 / 52** | **31 / 42** | Bold | `#111827` |
| section desc | 17 / 28 | 17 / 28 | Regular | `#667085` |
| card meta | 11 / 16 | 11 / 16 | Bold | `#c9d2df` |
| card title (ใหญ่) | 25 / 34 | 25 / 34 | Bold | white |
| card client | 13 / 19 | 13 / 19 | Regular | white |
| form label | 14 / 21 | 14 / 21 | Bold | `#111827` |
| form input | 16 / 24 | 16 / 24 | Regular | `#667085` (placeholder) |
| form helper | 12 / 18 | 12 / 18 | Regular | `#667085` |
| button label | 16 / 24 | 16 / 24 | Bold | white หรือ `#7f1d2d` |

มีแค่ **4 role ที่เปลี่ยนค่าข้าม breakpoint** (hero eyebrow / hero h1 / hero body / section h2) ที่เหลือคงที่.

### Spacing

| อย่าง | desktop | mobile |
|---|---|---|
| container | 1440 | 390 |
| gutter | 150 | 24 |
| content width | 1140 | 342 |
| section padding-top | 96 (Brands = 80) | 64 |
| hero content gap | 22 | 18 |
| heading stack gap | 10 | 10 |
| form field gap (label/control/helper) | 7 | 7 |
| card copy gap | 7 | 7 |
| portfolio grid gap | 24 | 24 |
| brand grid gap | 12 | 10 |
| editorial blog gap | 24 | 22 |
| editorial video gap | 20 | 16 |

### Breakpoint

design มีแค่ 390 กับ 1440 ไม่ได้บอกจุดตัด. **เลือก `lg` = 1024px** เป็นจุดตัดเดียว เขียนแบบ mobile-first.
container ต้องหด gutter ในช่วง 1024-1440: `mx-auto max-w-[1440px] px-6 lg:px-[150px]`.

### `@theme` block

```css
@import "tailwindcss";

@theme {
  --color-deep-navy: #030814;
  --color-navy:      #07111f;
  --color-burgundy:  #7f1d2d;
  --color-maroon:    #a12a3a;
  --color-bg:        #f6f3f2;
  --color-surface:   #ffffff;
  --color-success:   #16794b;
  --color-danger:    #b42318;

  --color-card-navy: #111a2a;
  --color-card-meta: #c9d2df;
  --color-border:    #ded7d3;
  --color-ink:       #111827;
  --color-muted:     #667085;

  --font-sans: var(--font-noto-sans-thai), ui-sans-serif, system-ui, sans-serif;

  --radius-control: 2px;
  --radius-badge:   1px;

  --spacing-gutter:  24px;
  --spacing-gutter-lg: 150px;
  --container-site: 1440px;
}
```

`--color-scrim` เป็น rgba ใช้ตรง ๆ ที่ card component ไม่ต้องขึ้นเป็น token.
ไม่ต้องประกาศ shadow token - Redesign ไม่ใช้เงาเลย.

---
🔧 **แก้ไขโดย [ticket 05](05-shadcn-component-inventory.md)**: บล็อก `@theme` ด้านบนใช้กับ shadcn ไม่ได้.
รูปที่ถูกต้องคือ `:root` เก็บค่าดิบ + `@theme inline` map เข้า Tailwind - ดูบล็อกเต็มใน ticket 05.
ค่าสี typography spacing breakpoint ทั้งหมดยังถูกต้องตามเดิม เปลี่ยนแค่รูปแบบการประกาศ.

🔧 **แก้ไขโดย [ticket 10](10-accessibility-spec.md)**: `#667085` (muted) เปลี่ยนเป็น **`#5c6472`** ด้วยเหตุผลด้าน contrast.
ค่าอื่นทั้งหมดในตาราง type scale และ spacing ยังตรงตาม Figma ตามเดิม.

🔧 **แก้ไขจากการดึง Figma รอบเพิ่มเติม**: การ์ดผลงานมี title **2 ขนาด** ไม่ใช่ขนาดเดียว - ใบใหญ่ `25/34` ใบเล็ก **`18/25`**
และ card copy gap ใบใหญ่ `7` ใบเล็ก **`5`**
