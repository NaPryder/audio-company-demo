// ponytail: cooldown เก็บใน memory ต่อ instance. cold start ทีนึงลืมหมด
// และบอทที่หมุน IP เดินผ่านได้สบาย. ทางอัปเกรดคือ Turnstile
export const COOLDOWN_MS = 20_000;

const lastSubmit = new Map<string, number>();

/**
 * คืน true ถ้ายิงได้ (และจดเวลาไว้แล้ว) · false ถ้ายังอยู่ในช่วง cooldown
 *
 * prune ทุกครั้งที่เรียก ไม่ใช่เป็นรอบ ๆ - ไม่งั้น Map โตไม่หยุดจนกิน memory
 * ของ instance ที่รันนาน ๆ เพราะไม่มีใครมาลบ entry ที่หมดอายุแล้ว
 */
export function takeRateLimitSlot(key: string, now = Date.now()): boolean {
  for (const [k, at] of lastSubmit) {
    if (now - at >= COOLDOWN_MS) lastSubmit.delete(k);
  }

  const last = lastSubmit.get(key);
  if (last !== undefined && now - last < COOLDOWN_MS) return false;

  lastSubmit.set(key, now);
  return true;
}

/** สำหรับเทสต์เท่านั้น - ยืนยันว่า prune ลบ entry ออกจริง ไม่ใช่แค่ปล่อยผ่าน */
export function _rateLimitSize(): number {
  return lastSubmit.size;
}
