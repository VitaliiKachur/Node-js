# Lab 1

Next.js project for the lab tasks.

## Stack

- Next.js App Router
- TypeScript
- ESLint
- TailwindCSS
- React Bootstrap

## Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

The project uses `.env.local`:

```env
LAB_APP_NAME=Next Lab Environment
LAB_SERVER_REGION=Ukraine
NEXT_PUBLIC_LAB_MESSAGE=Public browser variable
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

`NEXT_PUBLIC_LAB_MESSAGE` is available in the browser.

## Production Database

The project uses PostgreSQL with Prisma ORM.

Database files:

- `prisma/schema.prisma` - database schema
- `prisma/seed.mjs` - seed file with initial data
- `scripts/check-db.mjs` - database connection check
- `src/lib/db.ts` - Prisma client helper

Before running database commands, create a production PostgreSQL database, for example in Vercel Postgres or Neon, and paste the connection string into `.env.local` as `DATABASE_URL`.

Generate Prisma Client:

```bash
npm run db:generate
```

Create tables in the database:

```bash
npm run db:push
```

Seed initial data:

```bash
npm run db:seed
```

Check database connection:

```bash
npm run db:check
```

Screenshots to make for this task:

1. Production database dashboard with the created PostgreSQL database.
2. Terminal after `npm run db:push` with successful table creation logs.
3. Terminal after `npm run db:seed` with successful seed logs.
4. Terminal after `npm run db:check` with successful connection logs.



## Checks

```bash
npm run lint
npm run build
npm run build:static
```
