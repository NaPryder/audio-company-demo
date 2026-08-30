"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { submitLead } from "./action";
import { leadSchema, type Lead, type LeadInput } from "./schema";

// ตรงกับ COOLDOWN_MS ใน rate-limit.ts โดยตั้งใจซ้ำ - ไม่ import ข้ามมา
// เพราะโมดูลนั้นถือ Map ของ server ไว้ ลากเข้ามาก็ติดไปกับ client bundle เปล่า ๆ
const COOLDOWN_MS = 20_000;

const FIELD = "h-[52px] rounded-sm border-input bg-surface px-4 text-[16px]/[24px] text-ink md:text-[16px]";
const LABEL = "text-[14px]/[21px] font-bold text-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-[12px]/[18px] text-destructive">
      {message}
    </p>
  );
}

export function LeadForm({ contactPhone }: { contactPhone: string }) {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [cooling, setCooling] = useState(false);
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LeadInput, unknown, Lead>({
    resolver: zodResolver(leadSchema),
    defaultValues: { companyName: "", contactName: "", email: "", phone: "", details: "" },
  });

  // ย้าย focus ไปที่แผงขอบคุณ ไม่งั้นคนใช้ screen reader ไม่รู้ว่าเกิดอะไรขึ้น
  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  useEffect(() => {
    if (!cooling) return;
    const timer = setTimeout(() => setCooling(false), COOLDOWN_MS);
    return () => clearTimeout(timer);
  }, [cooling]);

  function onSubmit(values: Lead) {
    setFormError(null);
    startTransition(async () => {
      try {
        const result = await submitLead(values);
        if (result.ok) {
          setSent(true);
          return;
        }
        for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
          setError(field as keyof LeadInput, { message });
        }
        setFormError(result.message);
        setCooling(true);
      } catch {
        setFormError(
          `ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้งในอีกสักครู่ หรือติดต่อเราโดยตรงที่ ${contactPhone}`,
        );
        setCooling(true);
      }
    });
  }

  // สำเร็จแล้วแทนที่การ์ดทั้งใบ ไม่ย้อนกลับ - กันกดซ้ำทางกายภาพ เพราะไม่มี DB ให้ dedupe
  // และเพราะไม่ส่ง auto-reply หน้าเว็บคือที่เดียวที่ยืนยัน
  if (sent) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-sm bg-success p-8 text-surface lg:p-10"
      >
        <p className="text-[25px]/[34px] font-bold">ได้รับข้อมูลของคุณแล้ว</p>
        <p className="mt-3 text-[17px]/[28px]">
          ทีมงานจะติดต่อกลับตามข้อมูลที่คุณกรอกไว้ หากต้องการคุยทันทีโทรหาเราได้ที่ {contactPhone}
        </p>
      </div>
    );
  }

  const disabled = isPending || cooling;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-sm border border-border bg-surface p-6 lg:p-10"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-[7px]">
          <Label htmlFor="companyName" className={LABEL}>
            ชื่อบริษัท
          </Label>
          <Input id="companyName" className={FIELD} placeholder="ชื่อบริษัทหรือหน่วยงาน" {...register("companyName")} />
        </div>

        <div className="flex flex-col gap-[7px]">
          <Label htmlFor="contactName" className={LABEL}>
            ชื่อผู้ติดต่อ <span aria-hidden="true">*</span>
          </Label>
          <Input
            id="contactName"
            className={FIELD}
            placeholder="ชื่อ-นามสกุล"
            aria-required="true"
            aria-invalid={!!errors.contactName}
            aria-describedby={errors.contactName ? "contactName-error" : undefined}
            {...register("contactName")}
          />
          <FieldError id="contactName-error" message={errors.contactName?.message} />
        </div>

        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="flex flex-1 flex-col gap-[7px]">
            <Label htmlFor="email" className={LABEL}>
              อีเมล <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              className={FIELD}
              placeholder="name@company.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>

          <div className="flex flex-1 flex-col gap-[7px]">
            <Label htmlFor="phone" className={LABEL}>
              เบอร์โทรศัพท์ <span aria-hidden="true">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              className={FIELD}
              placeholder="081-234-5678"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone")}
            />
            <FieldError id="phone-error" message={errors.phone?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-[7px]">
          <Label htmlFor="details" className={LABEL}>
            รายละเอียดโครงการ
          </Label>
          <Textarea
            id="details"
            rows={6}
            className="min-h-[140px] rounded-sm border-input bg-surface px-4 py-3 text-[16px]/[24px] text-ink md:text-[16px]"
            placeholder="เล่าคร่าว ๆ เกี่ยวกับพื้นที่ จำนวนที่นั่ง และสิ่งที่อยากให้ระบบทำได้"
            {...register("details")}
          />
        </div>

        {formError ? (
          <p role="alert" className="text-[14px]/[21px] text-destructive">
            {formError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={disabled}
          className={cn(
            "h-[52px] w-full rounded-sm bg-primary text-[16px]/[24px] font-bold text-primary-foreground",
            "disabled:cursor-not-allowed disabled:opacity-60 lg:w-[186px]",
          )}
        >
          {isPending ? "กำลังส่ง..." : "ส่งข้อมูล"}
        </button>

        <p className="text-[12px]/[18px] text-muted">
          เมื่อกดส่ง ถือว่าคุณยินยอมให้เราติดต่อกลับตามข้อมูลที่กรอก{" "}
          <Link href="/privacy" className="font-bold text-burgundy underline underline-offset-2">
            ประกาศความเป็นส่วนตัว
          </Link>
        </p>
      </div>
    </form>
  );
}
