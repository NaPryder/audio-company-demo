import { Resend } from "resend";

import { env } from "@/lib/env";

import type { Lead } from "./schema";

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function renderLeadEmail(lead: Lead) {
  const rows: [string, string][] = [
    ["ชื่อผู้ติดต่อ", lead.contactName],
    ["บริษัท", lead.companyName || "-"],
    ["อีเมล", lead.email],
    ["เบอร์โทรศัพท์", lead.phone],
    ["รายละเอียดโครงการ", lead.details || "-"],
  ];

  const html = `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
${rows
  .map(
    ([label, value]) =>
      `<tr><th align="left" style="padding:6px 16px 6px 0;vertical-align:top">${escapeHtml(label)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
</table>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return { html, text, subject: `คำขอติดต่อใหม่จาก ${lead.contactName}` };
}

/**
 * ส่งหา LEAD_RECEIVER_EMAIL อย่างเดียว ไม่มี auto-reply หาลูกค้า (Q13)
 *
 * ponytail: key ที่ขึ้นต้น `re_mock_` จะ log ลง console แทนการยิงจริง
 * เพื่อให้เดิน success path ได้ตอน dev โดยไม่ต้องมี API key จริง
 * ค่า mock ทั้งชุดอยู่ใน .env.example
 */
export async function sendLeadEmail(lead: Lead): Promise<void> {
  const { html, text, subject } = renderLeadEmail(lead);

  if (env.RESEND_API_KEY.startsWith("re_mock_")) {
    console.log(`[lead-email mock] to=${env.LEAD_RECEIVER_EMAIL} subject=${subject}\n${text}`);
    return;
  }

  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.LEAD_RECEIVER_EMAIL,
    replyTo: lead.email,
    subject,
    html,
    text,
  });

  if (error) throw new Error(`Resend ส่งไม่สำเร็จ: ${error.message}`);
}
