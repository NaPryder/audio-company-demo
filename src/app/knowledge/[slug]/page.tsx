import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/layout/section-heading";
import { ContactSection } from "@/features/contact/contact-section";
import { ArticleGrid } from "@/features/knowledge/article-grid";
import { ARTICLES } from "@/features/knowledge/data";
import { renderMarkdownFile } from "@/lib/markdown";

type PageProps = { params: Promise<{ slug: string }> };

/** โครงเดียวกับ `/portfolio/[slug]` - ข้อควรระวังเรื่อง prerender กับ `fs` อยู่ที่นั่น */
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);
  if (!article) notFound();

  return {
    title: article.title,
    alternates: { canonical: `/knowledge/${slug}` },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const index = ARTICLES.findIndex((article) => article.slug === slug);
  if (index === -1) notFound();

  const article = ARTICLES[index];
  const body = await renderMarkdownFile("src/features/knowledge/content", slug);
  const others = [...ARTICLES.slice(index + 1), ...ARTICLES.slice(0, index)].slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-site px-6 pt-16 lg:px-[150px] lg:pt-24">
        <nav aria-label="เส้นทางนำทาง" className="text-[12px]/[18px] text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="underline underline-offset-2 hover:text-ink">
                หน้าแรก
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/knowledge" className="underline underline-offset-2 hover:text-ink">
                ความรู้
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <span aria-current="page" className="text-ink">
                {article.title}
              </span>
            </li>
          </ol>
        </nav>

        <SectionHeading
          className="mt-6"
          as="h1"
          eyebrow={article.category}
          eyebrowLang="th"
          title={article.title}
          description={article.description}
        />
      </div>

      <div className="mx-auto max-w-site px-6 pt-10 lg:px-[150px]">
        <div className="relative h-[240px] overflow-hidden rounded-sm lg:h-[520px]">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            sizes="(min-width:1024px) 1140px, 100vw"
            className="object-cover"
          />
        </div>

        {/* เนื้อหามาจากไฟล์ .md ของเราเองและแปลงตอน build - ดู `src/lib/markdown.ts` */}
        <div
          className="markdown-body mt-10 max-w-[760px] lg:mt-12"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>

      <ContactSection />

      <section className="mx-auto max-w-site px-6 pb-16 lg:px-[150px] lg:pb-24">
        <SectionHeading eyebrow="MORE ARTICLES" title="บทความอื่น" />
        <div className="mt-10">
          <ArticleGrid articles={others} />
        </div>
      </section>
    </>
  );
}
