import { BrandsSection } from "@/features/brands/brands-section";
import { CompanyIntro } from "@/features/company-intro/company-intro";
import { ContactSection } from "@/features/contact/contact-section";
import { KnowledgeSection } from "@/features/knowledge/knowledge-section";
import { Hero } from "@/features/hero/hero";
import { PortfolioSection } from "@/features/portfolio/portfolio-section";

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioSection />
      <CompanyIntro />
      <BrandsSection />
      <KnowledgeSection />
      <ContactSection />
    </>
  );
}
