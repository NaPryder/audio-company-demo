/** nav ชุดเดียวที่ SiteHeader, MobileMenu และ SiteFooter ใช้ร่วมกัน */
export const NAV_LINKS = [
  { href: "/portfolio", label: "ผลงาน" },
  { href: "/knowledge", label: "ความรู้" },
  { href: "/brands", label: "แบรนด์" },
  { href: "/contact", label: "ติดต่อ" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
