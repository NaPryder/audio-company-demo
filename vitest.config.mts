import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { loadEnvFile } from "node:process";

// ใช้ .env.local ชุดเดียวกับที่ dev ใช้ แทนที่จะ hardcode ค่า mock ซ้ำในเทสต์
// ไม่มีไฟล์ก็ปล่อยผ่าน - บน CI ค่าจะมาจาก env ของ runner เอง
try {
  loadEnvFile(".env.local");
} catch {
  // ไม่มี .env.local
}

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
