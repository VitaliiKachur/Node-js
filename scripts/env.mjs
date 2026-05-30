import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

export function getDatabaseEnvironment() {
  return process.env.DATABASE_ENV === "development" ? "development" : "production";
}

export function loadDatabaseEnv() {
  const databaseEnv = getDatabaseEnvironment();
  const envFile = `.env.${databaseEnv}.local`;

  if (existsSync(envFile)) {
    loadEnvFile(envFile);
    return { databaseEnv, envFile };
  }

  if (databaseEnv === "production") {
    loadEnvFile(".env.local");
    return { databaseEnv, envFile: ".env.local" };
  }

  return { databaseEnv, envFile };
}

export function assertDatabaseUrl(envFile) {
  if (
    !process.env.DATABASE_URL ||
    process.env.DATABASE_URL.includes("USER:PASSWORD@HOST:PORT")
  ) {
    throw new Error(`Set a real DATABASE_URL in ${envFile} first.`);
  }
}
