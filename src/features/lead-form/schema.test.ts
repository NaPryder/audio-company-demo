import { describe, expect, it } from "vitest";

import { leadSchema, normalizePhone } from "./schema";

const base = {
  contactName: "สมชาย ใจดี",
  email: "somchai@example.com",
  phone: "0812345678",
};

const errorFor = (input: Record<string, unknown>, field: string) => {
  const result = leadSchema.safeParse(input);
  if (result.success) return undefined;
  return result.error.issues.find((i) => i.path[0] === field)?.message;
};

describe("normalizePhone", () => {
  it("ยุบทุกรูปแบบที่คนกรอกจริงให้เหลือรูปแบบเดียว", () => {
    expect(normalizePhone("081-234-5678")).toBe("0812345678");
    expect(normalizePhone("081 234 5678")).toBe("0812345678");
    expect(normalizePhone("+66812345678")).toBe("0812345678");
    expect(normalizePhone("+66 81 234 5678")).toBe("0812345678");
    expect(normalizePhone("(02) 123-4567")).toBe("021234567");
    expect(normalizePhone("021234567")).toBe("021234567");
  });
});

describe("leadSchema", () => {
  it("เก็บเบอร์ที่ normalize แล้ว ไม่ใช่ที่ผู้ใช้พิมพ์", () => {
    const result = leadSchema.parse({ ...base, phone: "081-234-5678" });
    expect(result.phone).toBe("0812345678");
  });

  it("field ไม่บังคับว่างได้ และได้ค่าเป็น string ว่างไม่ใช่ undefined", () => {
    const result = leadSchema.parse(base);
    expect(result.companyName).toBe("");
    expect(result.details).toBe("");
  });

  it("ตัดช่องว่างหัวท้ายออกก่อนเก็บ", () => {
    const result = leadSchema.parse({ ...base, contactName: "  สมหญิง  " });
    expect(result.contactName).toBe("สมหญิง");
  });

  it("ปฏิเสธเบอร์ที่หลักไม่ครบ 9-10", () => {
    const message = "เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอก 9-10 หลัก";
    expect(errorFor({ ...base, phone: "02123456" }, "phone")).toBe(message);
    expect(errorFor({ ...base, phone: "08123456789" }, "phone")).toBe(message);
  });

  it("ปฏิเสธเบอร์ที่ไม่ขึ้นต้นด้วย 0", () => {
    expect(errorFor({ ...base, phone: "8123456789" }, "phone")).toBe(
      "เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอก 9-10 หลัก",
    );
  });

  it("แยกข้อความ ว่าง ออกจาก ผิดรูปแบบ", () => {
    expect(errorFor({ ...base, phone: "" }, "phone")).toBe("กรุณากรอกเบอร์โทรศัพท์");
    expect(errorFor({ ...base, email: "" }, "email")).toBe("กรุณากรอกอีเมล");
    expect(errorFor({ ...base, email: "somchai" }, "email")).toBe("รูปแบบอีเมลไม่ถูกต้อง");
    expect(errorFor({ ...base, contactName: "   " }, "contactName")).toBe(
      "กรุณากรอกชื่อผู้ติดต่อ",
    );
  });

  it("ปฏิเสธค่าที่ยาวเกินเพดาน", () => {
    expect(errorFor({ ...base, details: "ก".repeat(2001) }, "details")).toBeDefined();
    expect(errorFor({ ...base, contactName: "ก".repeat(121) }, "contactName")).toBeDefined();
  });
});
