# B01 - scaffold + toolchain

Blocked by: -
Status: done

## งาน

- `.nvmrc` = `26`, `packageManager: "pnpm@10.x"` ใน `package.json`
- scaffold ตาม [spec §1](../spec.md) - `--typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm`
- pin version ให้ตรง spec §1: next 16.3.3 · tailwind 4.3.3 · zod 4.4.3 · react-hook-form 7.86.0 · @hookform/resolvers 5.9.1 · resend 6.24.0
- `shadcn@4.19.0 init` + `add button input textarea label`
- **ลบบล็อก `.dark` ที่ shadcn generate มาทิ้งทันที** - ทิ้งไว้แล้วจะมีคนเผลอเขียน `dark:` เข้ามาโดยไม่มีใครทดสอบ
- ลง vitest + script `test`

## Done

`pnpm lint` · `pnpm test` · `pnpm build` ผ่านทั้ง 3
