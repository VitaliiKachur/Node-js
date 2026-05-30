import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { defineConfig } from "prisma/config";

const databaseEnv =
  process.env.DATABASE_ENV === "development" ? "development" : "production";
const envFile = `.env.${databaseEnv}.local`;

if (existsSync(envFile)) {
  loadEnvFile(envFile);
} else if (databaseEnv === "production") {
  loadEnvFile(".env.local");
} else {
  throw new Error(`Create ${envFile} with a real dev DATABASE_URL first.`);
}

const databaseUrl =
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL ??
  "postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.mjs",
  },
  datasource: {
    url: databaseUrl,
  },
});
