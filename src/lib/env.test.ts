import { describe, expect, it } from "vitest";
import { env, parseEnv } from "@/lib/env";

const valid = {
  RESEND_API_KEY: "re_mock_000000000000000000",
  RESEND_FROM_EMAIL: "noreply@example.com",
  LEAD_RECEIVER_EMAIL: "team@example.com",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  COMPANY_NAME: "บริษัท ดิ ออริจิน บีท จำกัด",
  COMPANY_TAGLINE: "ออกแบบและติดตั้งระบบเสียงและภาพ",
  CONTACT_EMAIL: "info@example.com",
  CONTACT_PHONE: "021234567",
  CONTACT_LINE_ID: "@originbeat",
  CONTACT_FACEBOOK_URL: "https://facebook.com/originbeat",
  CONTACT_INSTAGRAM_URL: "https://instagram.com/originbeat",
  CONTACT_TIKTOK_URL: "https://tiktok.com/@originbeat",
};

describe("parseEnv", () => {
  it("ผ่านเมื่อครบทั้ง 12 ตัว", () => {
    expect(parseEnv(valid).CONTACT_PHONE).toBe("021234567");
  });

  it("บอกชื่อตัวแปรที่ขาดในข้อความ error", () => {
    expect(() => parseEnv({ ...valid, LEAD_RECEIVER_EMAIL: undefined })).toThrow(
      /LEAD_RECEIVER_EMAIL/,
    );
  });

  it("ปฏิเสธค่าว่าง", () => {
    expect(() => parseEnv({ ...valid, COMPANY_NAME: "" })).toThrow(/COMPANY_NAME/);
  });

  it("ปฏิเสธ URL ที่ไม่ใช่ URL", () => {
    expect(() => parseEnv({ ...valid, NEXT_PUBLIC_SITE_URL: "localhost:3000" })).toThrow(
      /NEXT_PUBLIC_SITE_URL/,
    );
  });

  it("ปฏิเสธเบอร์โทรที่ไม่ขึ้นต้นด้วย 0 หรือหลักไม่ครบ", () => {
    expect(() => parseEnv({ ...valid, CONTACT_PHONE: "8123456789" })).toThrow(/CONTACT_PHONE/);
    expect(() => parseEnv({ ...valid, CONTACT_PHONE: "02123456" })).toThrow(/CONTACT_PHONE/);
  });
});

describe("env", () => {
  it("อ่าน .env.local ของโปรเจ็คได้จริง", () => {
    expect(env.NEXT_PUBLIC_SITE_URL).toBe("http://localhost:3000");
  });
});
