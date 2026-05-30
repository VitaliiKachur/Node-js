import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type ArticlePayload = {
  title?: unknown;
  slug?: unknown;
  body?: unknown;
  published?: unknown;
};

function readArticlePayload(payload: ArticlePayload) {
  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  const slug = typeof payload.slug === "string" ? payload.slug.trim() : "";
  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  const published =
    typeof payload.published === "boolean" ? payload.published : false;

  if (!title || !body) {
    return null;
  }

  return {
    title,
    slug: slug || `api-created-${crypto.randomUUID()}`,
    body,
    published,
  };
}

export async function GET() {
  const articles = await prisma.article.findMany({
    include: {
      _count: {
        select: { comments: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const payload = readArticlePayload(await request.json());

  if (!payload) {
    return NextResponse.json(
      { error: "title and body are required" },
      { status: 400 },
    );
  }

  try {
    const article = await prisma.article.create({
      data: payload,
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Article with this slug already exists" },
      { status: 409 },
    );
  }
}
