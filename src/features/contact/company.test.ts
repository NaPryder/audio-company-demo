import { describe, expect, it } from "vitest";
import { formatPhone } from "@/features/contact/company";

describe("formatPhone", () => {
  it("เบอร์บ้าน 9 หลักตัดเป็น 2-3-4", () => {
    expect(formatPhone("021234567")).toBe("02-123-4567");
  });

  it("เบอร์มือถือ 10 หลักตัดเป็น 3-3-4", () => {
    expect(formatPhone("0812345678")).toBe("081-234-5678");
  });
});
