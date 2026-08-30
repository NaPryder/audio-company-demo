// ตัวยึดระหว่างทาง - B10 เติม ContactSection ให้ครบ
import { BrandsSection } from "@/features/brands/brands-section";
import { CompanyIntro } from "@/features/company-intro/company-intro";
import { EditorialSection } from "@/features/editorial/editorial-section";
import { Hero } from "@/features/hero/hero";
import { PortfolioSection } from "@/features/portfolio/portfolio-section";

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioSection />
      <CompanyIntro />
      <BrandsSection />
      <EditorialSection />
    </>
  );
}
