# Build tickets

แตกจาก [`../spec.md`](../spec.md) - ใบละ 1 หน่วยงานที่ commit ได้จบในตัว.
ticket `../issues/01-11` เป็น **decision ticket** ที่ resolved ไปแล้ว ไม่ใช่ของชุดนี้.

ลำดับ blocker:

```
B01 ─┬─ B02 ─┐
     ├─ B03 ─┼─ B06 ─┬─ B08 ─┐
     └─ B04 ─── B05 ─┘        ├─ B10 ─ B11 ─ B12 ─ B13
                  └─ B09 ─────┘
        B03 ─ B07 ─────────────┘
```
