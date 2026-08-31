import { beforeEach, describe, expect, it, vi } from "vitest";

import { company } from "@/features/contact/company";

const sendLeadEmail = vi.fn();
let clientIp = "5.5.5.5";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": `${clientIp}, 10.0.0.1` }),
}));
vi.mock("./lead-email", () => ({ sendLeadEmail: (...args: unknown[]) => sendLeadEmail(...args) }));

const { submitLead } = await import("./action");

const valid = {
  companyName: "",
  contactName: "สมชาย ใจดี",
  email: "somchai@example.com",
  phone: "081-234-5678",
  details: "",
};

beforeEach(() => {
  sendLeadEmail.mockReset();
});

describe("submitLead", () => {
  it("ส่งอีเมลด้วยเบอร์ที่ normalize แล้ว ไม่ใช่ที่ผู้ใช้พิมพ์", async () => {
    clientIp = "5.5.5.1";
    await expect(submitLead(valid)).resolves.toEqual({ ok: true });
    expect(sendLeadEmail).toHaveBeenCalledWith(
      expect.objectContaining({ phone: "0812345678" }),
    );
  });

  it("validate ซ้ำฝั่ง server แม้ client จะปล่อยผ่าน", async () => {
    clientIp = "5.5.5.2";
    const result = await submitLead({ ...valid, email: "ไม่ใช่อีเมล", phone: "123" });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.fieldErrors).toEqual({
      email: "รูปแบบอีเมลไม่ถูกต้อง",
      phone: "เบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอก 9-10 หลัก",
    });
    expect(sendLeadEmail).not.toHaveBeenCalled();
  });

  it("ปฏิเสธการยิงซ้ำจาก IP เดิมภายใน cooldown", async () => {
    clientIp = "5.5.5.3";
    await expect(submitLead(valid)).resolves.toEqual({ ok: true });

    const second = await submitLead(valid);
    expect(second.ok).toBe(false);
    if (second.ok) return;
    expect(second.fieldErrors).toBeUndefined();
    // อ่านจาก env ชุดเดียวกับที่ action ใช้ - hardcode ไว้แล้วเทสต์พังทุกครั้งที่ CONTACT_PHONE เปลี่ยน
    expect(second.message).toContain(company.phoneDisplay);
    expect(sendLeadEmail).toHaveBeenCalledTimes(1);
  });

  it("อีเมลส่งไม่ออกแล้วตอบ ok:false ไม่ใช่โยน error ออกไป", async () => {
    clientIp = "5.5.5.4";
    sendLeadEmail.mockRejectedValueOnce(new Error("Resend ล่ม"));
    const result = await submitLead(valid);
    expect(result.ok).toBe(false);
  });
});
