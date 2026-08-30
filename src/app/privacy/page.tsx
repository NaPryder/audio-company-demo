import { PageHeader } from "@/components/layout/page-header";
import { company } from "@/features/contact/company";

/**
 * ⚠️ เป็นร่างที่ยังไม่ผ่านการตรวจของผู้มีคุณสมบัติ และยังไม่มีวันที่ประกาศใช้
 * แถบเตือนด้านบนจึงอยู่ในหน้า ไม่ใช่แค่ใน gate.md - ประกาศความเป็นส่วนตัวที่ยังไม่ผ่านการตรวจ
 * แต่หน้าตาเหมือนฉบับจริงคือสิ่งที่ทำให้คนเข้าใจผิดว่าเว็บมีนโยบายบังคับใช้แล้ว
 *
 * เนื้อหาอิงตาม PDPA และตรงกับความจริงของระบบ: ไม่มี DB (Q9) และส่งเป็นอีเมลถึงทีมงาน (Q10)
 */
export default function PrivacyPage() {
  const sections = [
    {
      heading: "ข้อมูลที่เราเก็บ",
      body: "เมื่อคุณส่งแบบฟอร์มติดต่อ เราเก็บ ชื่อผู้ติดต่อ อีเมล เบอร์โทรศัพท์ ชื่อบริษัท (ถ้ากรอก) และรายละเอียดความต้องการที่คุณระบุ",
    },
    {
      heading: "วัตถุประสงค์",
      body: "เพื่อติดต่อกลับและประเมินแนวทางการติดตั้งระบบตามที่คุณสอบถามเท่านั้น เราไม่ใช้ข้อมูลนี้เพื่อการตลาดอื่น และไม่ขายหรือส่งต่อให้บุคคลที่สาม",
    },
    {
      heading: "การเก็บรักษา",
      body: "ข้อมูลจากแบบฟอร์มถูกส่งเป็นอีเมลมายังกล่องจดหมายของทีมงาน เราไม่ได้จัดเก็บข้อมูลนี้ในฐานข้อมูลของเว็บไซต์ ผู้ให้บริการที่เกี่ยวข้องกับการส่งอีเมลและการโฮสต์เว็บไซต์อาจเก็บบันทึกการทำงานตามนโยบายของผู้ให้บริการนั้น",
    },
    {
      heading: "ระยะเวลา",
      body: "เราเก็บอีเมลที่ได้รับไว้เท่าที่จำเป็นต่อการติดต่อและอ้างอิงงาน และลบเมื่อไม่จำเป็นอีกต่อไป",
    },
    {
      heading: "สิทธิของคุณ",
      body: "คุณมีสิทธิขอเข้าถึง ขอสำเนา ขอแก้ไข ขอลบ หรือขอให้ระงับการใช้ข้อมูลของคุณ รวมถึงถอนความยินยอมได้ตลอดเวลา โดยติดต่อเราตามช่องทางด้านล่าง",
    },
  ];

  return (
    <>
      <PageHeader eyebrow="PRIVACY" title="ประกาศความเป็นส่วนตัว" />

      <div className="mx-auto max-w-site px-6 pt-8 pb-16 lg:px-[150px] lg:pb-24">
        <div className="max-w-[760px]">
          <p className="rounded-sm border border-danger px-4 py-3 text-[14px]/[21px] font-bold text-danger">
            ฉบับร่าง ยังไม่ประกาศใช้ - รอการตรวจโดยผู้มีคุณสมบัติและกำหนดวันที่มีผลบังคับใช้
          </p>

          {sections.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="text-[18px]/[25px] font-bold text-ink">{section.heading}</h2>
              <p className="mt-2 text-[17px]/[28px] text-muted">{section.body}</p>
            </section>
          ))}

          <section className="mt-8">
            <h2 className="text-[18px]/[25px] font-bold text-ink">ติดต่อ</h2>
            <p className="mt-2 text-[17px]/[28px] text-muted">
              {company.name}
              <br />
              อีเมล:{" "}
              <a href={`mailto:${company.email}`} className="text-burgundy">
                {company.email}
              </a>
              <br />
              โทร:{" "}
              <a href={`tel:${company.phone}`} className="text-burgundy">
                {company.phoneDisplay}
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
