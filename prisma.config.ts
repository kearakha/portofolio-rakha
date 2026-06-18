import path from "node:path";
import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Prisma reads .env by default; this project keeps secrets in .env.local (Next.js convention).
config({ path: ".env.local" });

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  // CLI/migrate uses the direct (session) connection.
  datasource: {
    url: env("DIRECT_URL"),
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
