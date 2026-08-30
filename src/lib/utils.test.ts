import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("ทิ้ง class ที่เป็น falsy", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });

  it("ให้ class ที่มาทีหลังชนะเมื่อชนกัน", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
