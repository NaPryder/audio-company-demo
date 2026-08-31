import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/layout/section-heading";
import { ContactSection } from "@/features/contact/contact-section";
import { renderProjectBody } from "@/features/portfolio/content";
import { PROJECTS } from "@/features/portfolio/data";
import { ProjectGrid } from "@/features/portfolio/project-grid";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * slug นอกลิสต์ตอบ 404 ให้เอง ไม่ต้องเรียก `notFound()`
 *
 * ⚠️ ผลพ่วง: ทั้ง 6 หน้าถูก prerender ตอน build → `fs` ใน `renderProjectBody`
 * อ่านไฟล์ตอน build เท่านั้น ไม่เคยอ่านตอน runtime
 * วันไหนเปลี่ยนหน้านี้เป็น ISR / dynamic / เปิด Cache Components (`dynamicParams` ใช้ไม่ได้เมื่อเปิด)
 * หน้าจะพังตอน runtime เพราะไฟล์ใต้ `src/` ไม่ถูกก๊อปเข้า deployment output ของ Vercel
 * ต้องไปตั้ง `outputFileTracingIncludes` ใน `next.config.ts` (ตอนนี้ยังว่างเปล่า)
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

/**
 * SEO ทั้งชุดยกไปรอบที่มีเนื้อหาจริง (ดู gate.md) - ที่นี่มีแค่ 2 อย่าง
 *
 * `title` เพราะเป็นชื่อแท็บ ไม่ใช่ SEO
 * `canonical` เพราะ metadata ของ Next สืบทอด field ที่ลูกไม่ได้ตั้ง - ไม่ใส่แปลว่า
 * ทั้ง 6 หน้าจะประกาศ canonical เป็นหน้าแรกตาม root layout ซึ่งแย่กว่าไม่มี canonical เลย
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();

  return {
    title: project.title,
    alternates: { canonical: `/portfolio/${slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  // `dynamicParams = false` กันไว้ชั้นหนึ่งแล้ว แต่ชั้นนั้นหายไปทันทีที่หน้าเปลี่ยนเป็น ISR
  // หรือ dynamic - ถ้าไม่มีบรรทัดนี้ `PROJECTS[-1]` จะทำให้หน้าโยน 500 แทนที่จะตอบ 404
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const body = await renderProjectBody(slug);
  // เรียงต่อจากตัวปัจจุบันแล้ววนกลับหัว - ตัวปัจจุบันไม่มีทางติดมาเองเพราะถูกตัดตั้งแต่ตอน slice
  // ไม่มีกรณี "หมวดนี้มีใบเดียว" ให้ต้องเขียน fallback และเหลือน้อยกว่า 3 ใบก็ยังเรนเดอร์ได้
  const others = [...PROJECTS.slice(index + 1), ...PROJECTS.slice(0, index)].slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-site px-6 pt-16 lg:px-[150px] lg:pt-24">
        {/* ตัวคั่นเป็น <li aria-hidden> ไม่ใช่ ::before เพราะ pseudo-element content
            บาง screen reader อ่านออกเสียง · ตัวสุดท้ายไม่เป็นลิงก์
            ลิงก์ขีดเส้นใต้ด้วยเหตุผลเดียวกับลิงก์ในเนื้อหา - ต่างจากตัวสุดท้ายแค่สีไม่ผ่าน WCAG 1.4.1 */}
        <nav aria-label="เส้นทางนำทาง" className="text-[12px]/[18px] text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="underline underline-offset-2 hover:text-ink">
                หน้าแรก
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/portfolio" className="underline underline-offset-2 hover:text-ink">
                ผลงาน
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <span aria-current="page" className="text-ink">
                {project.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* ไม่ใช้ `PageHeader` - มันมี pt-16 lg:pt-24 ฝังอยู่ breadcrumb ด้านบนจะได้ padding ซ้อนสองชั้น */}
        <SectionHeading
          className="mt-6"
          as="h1"
          eyebrow={project.category}
          eyebrowLang="th"
          title={project.title}
          description={project.description}
        />
      </div>

      <div className="mx-auto max-w-site px-6 pt-10 lg:px-[150px]">
        {/* ไม่ล็อกอัตราส่วน 1460:920 - บน desktop จะสูง 719px แล้วดันทุกอย่างตกจอ
            ใช้ความสูงคงที่ + object-cover เพราะวันที่รูปจริงเข้ามาอัตราส่วนจะไม่เท่ากันทุกใบอยู่ดี */}
        <div className="relative h-[240px] overflow-hidden rounded-sm lg:h-[520px]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            placeholder="blur"
            sizes="(min-width:1024px) 1140px, 100vw"
            className="object-cover"
          />
        </div>

        {/* 760 ไม่ใช่ 1140 - ค่าเดียวกับ /privacy บรรทัดยาว 1140px ที่ 17px อ่านไม่ไหว
            เนื้อหามาจากไฟล์ .md ของเราเองและแปลงตอน build ไม่มี input จากผู้ใช้ - ดู content.ts */}
        <div
          className="markdown-body mt-10 max-w-[760px] lg:mt-12"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>

      <ContactSection />

      <section className="mx-auto max-w-site px-6 pb-16 lg:px-[150px] lg:pb-24">
        <SectionHeading eyebrow="MORE WORK" title="ผลงานอื่น" />
        <div className="mt-10">
          <ProjectGrid projects={others} />
        </div>
      </section>
    </>
  );
}
