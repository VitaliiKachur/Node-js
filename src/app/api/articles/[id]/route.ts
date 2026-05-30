import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type ArticleRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type UpdatePayload = {
  title?: unknown;
  slug?: unknown;
  body?: unknown;
  published?: unknown;
};

function parseId(id: string) {
  const articleId = Number(id);
  return Number.isInteger(articleId) && articleId > 0 ? articleId : null;
}

function readUpdatePayload(payload: UpdatePayload) {
  const data: {
    title?: string;
    slug?: string;
    body?: string;
    published?: boolean;
  } = {};

  if (typeof payload.title === "string" && payload.title.trim()) {
    data.title = payload.title.trim();
  }

  if (typeof payload.slug === "string" && payload.slug.trim()) {
    data.slug = payload.slug.trim();
  }

  if (typeof payload.body === "string" && payload.body.trim()) {
    data.body = payload.body.trim();
  }

  if (typeof payload.published === "boolean") {
    data.published = payload.published;
  }

  return Object.keys(data).length > 0 ? data : null;
}

export async function GET(_request: Request, context: ArticleRouteContext) {
  const { id } = await context.params;
  const articleId = parseId(id);

  if (!articleId) {
    return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
  }

  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: { comments: true },
  });

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json({ article });
}

export async function PATCH(request: Request, context: ArticleRouteContext) {
  const { id } = await context.params;
  const articleId = parseId(id);
  const payload = readUpdatePayload(await request.json());

  if (!articleId) {
    return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
  }

  if (!payload) {
    return NextResponse.json(
      { error: "At least one field is required" },
      { status: 400 },
    );
  }

  try {
    const article = await prisma.article.update({
      where: { id: articleId },
      data: payload,
    });

    return NextResponse.json({ article });
  } catch {
    return NextResponse.json(
      { error: "Article was not found or slug is already used" },
      { status: 404 },
    );
  }
}

export async function DELETE(_request: Request, context: ArticleRouteContext) {
  const { id } = await context.params;
  const articleId = parseId(id);

  if (!articleId) {
    return NextResponse.json({ error: "Invalid article id" }, { status: 400 });
  }

  try {
    await prisma.article.delete({
      where: { id: articleId },
    });

    return NextResponse.json({ deleted: true, id: articleId });
  } catch {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
}
