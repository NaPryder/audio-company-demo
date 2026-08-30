import { PageHeader } from "@/components/layout/page-header";
import { BrandGrid } from "@/features/brands/brand-grid";
import { BRANDS } from "@/features/brands/data";

export default function BrandsPage() {
  return (
    <>
      <PageHeader
        eyebrow="PARTNER BRANDS"
        title="แบรนด์คู่ค้าที่บริษัทสามารถจัดหาได้"
      />
      <div className="mx-auto max-w-site px-6 pt-10 pb-16 lg:px-[150px] lg:pb-24">
        <BrandGrid brands={BRANDS} />
      </div>
    </>
  );
}
