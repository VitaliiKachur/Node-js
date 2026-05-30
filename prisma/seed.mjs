import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { assertDatabaseUrl, loadDatabaseEnv } from "../scripts/env.mjs";

const { databaseEnv, envFile } = loadDatabaseEnv();
assertDatabaseUrl(envFile);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const users = [
  {
    email: "student@example.com",
    password: "password123",
    name: "Student User",
    provider: "credentials",
  },
];

const articles = [
  {
    title: "Environment variables in Next.js",
    slug: "environment-variables-nextjs",
    body: "Server-only and public variables are loaded from environment files.",
    published: true,
    comments: {
      create: [
        {
          author: "Olena",
          email: "olena@example.com",
          body: "Clear example for server variables.",
        },
      ],
    },
  },
  {
    title: "Static generation with App Router",
    slug: "static-generation-app-router",
    body: "Static pages can be generated at build time with generateStaticParams.",
    published: true,
    comments: {
      create: [
        {
          author: "Vitalii",
          email: "vitalii@example.com",
          body: "Good seed data for checking the database.",
        },
      ],
    },
  },
  {
    title: "Responsive design system",
    slug: "responsive-design-system",
    body: "Custom Tailwind colors and breakpoints help keep pages consistent.",
    published: false,
    comments: {
      create: [
        {
          author: "Iryna",
          email: "iryna@example.com",
          body: "The layout works well on different screens.",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Connecting to ${databaseEnv} database...`);
  await prisma.$connect();
  console.log("Database connection successful.");

  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        passwordHash,
        provider: user.provider,
      },
      create: {
        email: user.email,
        name: user.name,
        passwordHash,
        provider: user.provider,
      },
    });
  }

  for (const article of articles) {
    await prisma.article.create({ data: article });
  }

  const userCount = await prisma.user.count();
  const articleCount = await prisma.article.count();
  const commentCount = await prisma.comment.count();

  console.log("Seed completed successfully.");
  console.log(`Created or updated users: ${userCount}`);
  console.log(`Created articles: ${articleCount}`);
  console.log(`Created comments: ${commentCount}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
