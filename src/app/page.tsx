// ตัวยึดระหว่างทาง - B10 เติม Portfolio, Brands, Editorial และ Contact ให้ครบ 8 ส่วน
import { CompanyIntro } from "@/features/company-intro/company-intro";
import { Hero } from "@/features/hero/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <CompanyIntro />
    </>
  );
}
