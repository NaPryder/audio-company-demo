import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Origin Beat | ระบบเสียงและภาพสำหรับห้องประชุม",
  description:
    "นำเสนอผลงานติดตั้งและแนวทางการทำงาน เพื่อช่วยให้คุณเห็นภาพระบบที่เหมาะกับโครงการ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
