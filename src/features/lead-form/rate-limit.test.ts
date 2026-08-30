import { describe, expect, it } from "vitest";

import { COOLDOWN_MS, _rateLimitSize, takeRateLimitSlot } from "./rate-limit";

describe("takeRateLimitSlot", () => {
  it("ยิงครั้งแรกผ่าน ครั้งที่สองในช่วง cooldown ถูกปฏิเสธ", () => {
    const t0 = 1_000_000;
    expect(takeRateLimitSlot("1.1.1.1", t0)).toBe(true);
    expect(takeRateLimitSlot("1.1.1.1", t0 + 1)).toBe(false);
    expect(takeRateLimitSlot("1.1.1.1", t0 + COOLDOWN_MS - 1)).toBe(false);
  });

  it("พ้น cooldown แล้วยิงได้อีก", () => {
    const t0 = 2_000_000;
    expect(takeRateLimitSlot("2.2.2.2", t0)).toBe(true);
    expect(takeRateLimitSlot("2.2.2.2", t0 + COOLDOWN_MS)).toBe(true);
  });

  it("แยก key กันคนละ IP", () => {
    const t0 = 3_000_000;
    expect(takeRateLimitSlot("3.3.3.3", t0)).toBe(true);
    expect(takeRateLimitSlot("4.4.4.4", t0)).toBe(true);
  });

  it("prune ลบ entry ที่หมดอายุออกจาก Map จริง ไม่ใช่แค่ปล่อยผ่าน", () => {
    const t0 = 10_000_000;
    for (let i = 0; i < 50; i++) takeRateLimitSlot(`10.0.0.${i}`, t0);
    expect(_rateLimitSize()).toBeGreaterThanOrEqual(50);

    // ยิงครั้งเดียวหลังพ้น cooldown แล้วทุก entry เก่าต้องหายไป เหลือแค่ตัวใหม่
    takeRateLimitSlot("10.1.1.1", t0 + COOLDOWN_MS);
    expect(_rateLimitSize()).toBe(1);
  });
});
