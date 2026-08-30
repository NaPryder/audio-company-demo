# 05 - รายการ component ที่จะลง shadcn เทียบกับเขียนเอง

Type: grilling
Status: resolved
Blocked by: 01, 02

## Question

brief สั่งใช้ shadcn/ui แต่ shadcn คือการ copy โค้ดเข้ามาในโปรเจ็ค ไม่ใช่ dependency - ทุกตัวที่ลงคือโค้ดที่เราต้องดูแลเอง.
Home เป็นหน้า marketing หน้าเดียว ซึ่งใช้ primitive น้อยกว่าที่คนคิด.

ต้องเคาะ:

1. **ลงตัวไหนบ้างจริง ๆ** - ตัวที่น่าจะได้ใช้: `button`, `input`, `textarea`, `label`, `form`. ตัวที่อาจได้ใช้ขึ้นกับผล ticket 02: `sheet` (mobile drawer), `sonner` (toast - ขึ้นกับผล ticket 03)
2. **อันไหนไม่ต้องพึ่ง shadcn** - การ์ดผลงาน / การ์ดบทความ / การ์ดวิดีโอ / logo grid เป็น layout เฉพาะของ design นี้ ไม่ใช่ primitive ที่ reuse ข้ามที่ - `Card` ของ shadcn อาจจะเป็นชั้นที่เกินมา
3. **ปรับ shadcn ให้เข้า token ยังไง** - shadcn มาพร้อม token ชุดของมัน (`--primary`, `--muted` ...) ซึ่งชนกับ palette จาก ticket 01. จะ map ชื่อเข้าหากัน หรือเขียนทับ
4. **light mode อย่างเดียว** - ตัด `.dark` ที่ shadcn generate มาให้หมดตั้งแต่แรกไหม

**ผลลัพธ์ที่ต้องได้**: รายชื่อ component ที่จะ `pnpm dlx shadcn@latest add` พร้อมเหตุผลของแต่ละตัว และรายชื่อที่ตั้งใจเขียนเอง.

## Answer

### รายการที่ลง

```bash
pnpm dlx shadcn@latest add button input textarea label
```

**4 ตัวเท่านั้น** (Q2 ก). พ่วง `clsx` + `tailwind-merge` + `class-variance-authority` มาตามระบบของ shadcn.

| ตัดออก | เหตุผล |
|---|---|
| `sheet` | ticket 09 เลือก `<dialog>` + `showModal()` ของ browser |
| `sonner` | ticket 03 เลือกแทนที่การ์ดฟอร์ม ไม่ใช้ toast |
| `card` | การ์ดในงานนี้คือรูป cover เต็มใบ + แผง `rgba(3,8,20,.9)` ทับล่าง ไม่ใช่กล่อง border+padding ต้องรื้อ class ทิ้งเกือบหมด |
| `form` | ดูหัวข้อถัดไป |

`button` คุ้มที่จะเก็บเพราะมี CVA variant ตรงกับ 2 แบบที่ design มีจริง - maroon ทึบ (`36:8893`) และ ghost สี burgundy (`36:8904`)

### react-hook-form: เอา แต่ไม่เอา shadcn `form` (Q1 ข + Q2 ก)

คำตอบสองข้อรวมกันได้ผลเท่ากับ Q1 ตัวเลือก (ค) - ใช้ react-hook-form ตรง ๆ กับ `input`/`textarea`/`label` ที่ copy มา
ไม่ผ่าน `FormField`/`FormItem`/`FormControl`/`FormMessage` ของ shadcn ซึ่งลาก Radix `Slot` มาด้วยโดยไม่ได้เพิ่มอะไรให้ฟอร์ม 5 field

```
react-hook-form      7.86.0
@hookform/resolvers  5.9.1   peer: zod ^3.25 || ^4.0 ✅  rhf ^7.55 ✅
```

⚠️ **สิ่งที่เสียไปจากการเลือก (ข)**: ฟอร์มจะไม่ทำงานถ้า JS ไม่โหลด.
`useActionState` + `<form action={...}>` เดิมมี progressive enhancement ฟรี - พอย้ายมา `handleSubmit` ก็หมดไป. บันทึกไว้ ไม่ได้แปลว่าผิด

### 🔧 แก้ย้อน ticket 03 - ลายเซ็น server action

ลายเซ็นเดิม `(prev: LeadFormState, formData: FormData)` ใช้กับ `useActionState` ซึ่งชนกับ `handleSubmit` ของ RHF. **ยกเลิก ใช้อันนี้แทน**:

```ts
type LeadResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof LeadInput, string>> };

export async function submitLead(input: unknown): Promise<LeadResult>;
```

ฝั่ง client:
```tsx
const [isPending, startTransition] = useTransition();
const form = useForm<z.input<typeof leadSchema>>({
  resolver: zodResolver(leadSchema),
});

const onSubmit = form.handleSubmit((values) =>
  startTransition(async () => {
    const res = await submitLead(values);
    if (res.ok) return setSubmitted(true);
    if (res.fieldErrors)
      for (const [k, m] of Object.entries(res.fieldErrors))
        form.setError(k as keyof LeadInput, { message: m });
    else setFormError(res.message);
  }),
);
```

`isPending` ใช้ทำ loading state + disable ปุ่มตาม Q14.
ใช้ `z.input<>` ไม่ใช่ `z.infer<>` เพราะ schema มี `.transform()` ที่เบอร์โทร - type ขาเข้ากับขาออกไม่เท่ากัน.
**server ยัง `leadSchema.parse()` ซ้ำเสมอ** - validation ฝั่ง client เป็นแค่ UX ไม่ใช่ด่านความปลอดภัย.

### 🔧 แก้ย้อน ticket 01 - รูปแบบ `@theme`

บล็อกเดิมเป็น `@theme` ตรง ๆ ซึ่งใช้กับ shadcn ไม่ได้. รูปที่ถูกคือ `:root` เก็บค่าดิบ + `@theme inline` map (Q3 ก):

```css
@import "tailwindcss";

:root {
  --deep-navy: #030814;  --navy: #07111f;
  --burgundy:  #7f1d2d;  --maroon: #a12a3a;
  --bg:        #f6f3f2;  --surface: #ffffff;
  --success:   #16794b;  --danger: #b42318;
  --card-navy: #111a2a;  --card-meta: #c9d2df;
  --ink:       #111827;  --muted-fg: #667085;

  /* ชื่อที่ shadcn component ต้องการ - ชี้กลับ palette เดียวกัน */
  --background: var(--bg);          --foreground: var(--ink);
  --primary: var(--maroon);         --primary-foreground: var(--surface);
  --secondary: var(--burgundy);     --muted-foreground: var(--muted-fg);
  --destructive: var(--danger);     --ring: var(--maroon);
  --border: #ded7d3;                --input: #ded7d3;
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
```

### `.dark` และ radius (Q4)

- **ลบบล็อก `.dark` ที่ `shadcn init` generate มาให้ ตั้งแต่วันแรก** - ทิ้งไว้แล้วจะมีคนเผลอเขียน `dark:` เข้ามาโดยไม่มีใครทดสอบ
- **`--radius: 2px`** และ map `--radius-sm/md/lg/xl` เป็น 2px เท่ากันหมด → `rounded-md` ใน component ที่ copy มาจะได้ 2px อัตโนมัติ ไม่ต้องไล่แก้ทีละตัว

---
🔧 **แก้ไขโดย [ticket 10](10-accessibility-spec.md)**: ในบล็อก `:root` ด้านบน เปลี่ยน `--muted-fg: #667085` เป็น **`--muted-fg: #5c6472`**.
ค่าเดิมได้ contrast 4.5059:1 บน `#f6f3f2` ซึ่งเกินเกณฑ์มาแค่ 0.006 - ค่าใหม่ได้ 5.40:1.
