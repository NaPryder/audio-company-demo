"use server";

import { headers } from "next/headers";

import { company } from "@/features/contact/company";

import { sendLeadEmail } from "./lead-email";
import { takeRateLimitSlot } from "./rate-limit";
import { leadSchema, type LeadInput } from "./schema";

export type LeadResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<keyof LeadInput, string>>;
    };

const FORM_ERROR = `ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งในอีกสักครู่ หรือติดต่อเราโดยตรงที่ ${company.phoneDisplay}`;

async function clientKey(): Promise<string> {
  const forwarded = (await headers()).get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function submitLead(input: unknown): Promise<LeadResult> {
  // validate ซ้ำฝั่ง server เสมอ - ฝั่ง client เป็น UX ไม่ใช่ด่านความปลอดภัย
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof LeadInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof LeadInput | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { ok: false, message: FORM_ERROR, fieldErrors };
  }

  if (!takeRateLimitSlot(await clientKey())) {
    return { ok: false, message: FORM_ERROR };
  }

  try {
    await sendLeadEmail(parsed.data);
  } catch (error) {
    console.error("[submitLead] ส่งอีเมลไม่สำเร็จ", error);
    return { ok: false, message: FORM_ERROR };
  }

  return { ok: true };
}
