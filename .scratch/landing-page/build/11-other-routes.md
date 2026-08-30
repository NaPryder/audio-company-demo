# B11 - 4 route ที่เหลือ

Blocked by: B10
Status: done

| route | โครง |
|---|---|
| `/portfolio` | Header · PageHeader · `ProjectGrid(6)` · Footer |
| `/brands` | Header · PageHeader · `BrandGrid(12)` · Footer |
| `/contact` | Header · `ContactSection` · Footer - **ไม่มี PageHeader** (ContactSection มี eyebrow + title ของตัวเองแล้ว) |
| `/privacy` | Header · prose · Footer |

- `/privacy` = ร่างจาก [ticket 04](../issues/04-real-contact-content.md) + gate ว่ายังต้องให้ผู้มีคุณสมบัติตรวจและใส่วันที่
- **ไม่ใช้ prop `variant` ที่ไหนเลย** - แชร์แค่ component เล็ก (`ProjectCard` `BrandGrid` `SectionHeading` `ContactSection`) ไม่แชร์ section wrapper
