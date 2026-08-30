import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { env } from "@/lib/env";
import { organizationJsonLd } from "@/lib/seo";

import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "The Origin Beat | ระบบเสียงและภาพสำหรับห้องประชุม",
    template: "%s | The Origin Beat",
  },
  description:
    "นำเสนอผลงานติดตั้งและแนวทางการทำงาน เพื่อช่วยให้คุณเห็นภาพระบบที่เหมาะกับโครงการ",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "th_TH", images: ["/og.jpg"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
