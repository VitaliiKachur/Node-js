import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { assertDatabaseUrl, loadDatabaseEnv } from "./env.mjs";

const { databaseEnv, envFile } = loadDatabaseEnv();
assertDatabaseUrl(envFile);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Checking ${databaseEnv} database connection...`);
  await prisma.$connect();
  await prisma.$queryRaw`SELECT 1`;

  const articleCount = await prisma.article.count();
  const commentCount = await prisma.comment.count();

  console.log("Database connection successful.");
  console.log(`Articles in database: ${articleCount}`);
  console.log(`Comments in database: ${commentCount}`);
}

main()
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
