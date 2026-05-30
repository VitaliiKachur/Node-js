"use client";

import { useState } from "react";

type ApiResult = {
  method: string;
  status: number;
  body: unknown;
};

export function ApiArticlesPanel() {
  const [articleId, setArticleId] = useState("1");
  const [result, setResult] = useState<ApiResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function requestApi(method: string) {
    setIsLoading(true);

    const requestInit: RequestInit = { method };
    let url = "/api/articles";

    if (method === "POST") {
      requestInit.headers = { "Content-Type": "application/json" };
      requestInit.body = JSON.stringify({
        title: "Article created from frontend",
        body: "This article was created through the local API endpoint.",
        published: true,
      });
    }

    if (method === "PATCH") {
      url = `/api/articles/${articleId}`;
      requestInit.headers = { "Content-Type": "application/json" };
      requestInit.body = JSON.stringify({
        title: `Updated article ${articleId}`,
        published: true,
      });
    }

    if (method === "DELETE") {
      url = `/api/articles/${articleId}`;
    }

    try {
      const response = await fetch(url, requestInit);
      const body = await response.json();

      if (method === "POST" && body.article?.id) {
        setArticleId(String(body.article.id));
      }

      setResult({ method, status: response.status, body });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-md border border-brand-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-brand-accent">
            Local API
          </p>
          <h2 className="mt-2 text-2xl font-bold text-brand-ink">
            Articles CRUD
          </h2>
        </div>
        <label className="grid gap-2 text-sm font-semibold text-brand-ink">
          Article ID
          <input
            className="h-10 w-32 rounded-md border border-brand-line px-3 font-mono text-sm outline-none focus:border-brand-primary"
            value={articleId}
            onChange={(event) => setArticleId(event.target.value)}
          />
        </label>
      </div>

      <div className="mt-5 grid gap-3 phone:grid-cols-2 tablet:grid-cols-4">
        {["GET", "POST", "PATCH", "DELETE"].map((method) => (
          <button
            key={method}
            className="h-11 rounded-md bg-brand-ink px-4 text-sm font-semibold text-white transition hover:bg-brand-primary disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isLoading}
            onClick={() => requestApi(method)}
            type="button"
          >
            {method}
          </button>
        ))}
      </div>

      <pre className="mt-5 max-h-96 overflow-auto rounded-md bg-brand-surface p-4 text-left text-xs leading-6 text-brand-ink">
        {result
          ? JSON.stringify(result, null, 2)
          : "Run a request to see the API response here."}
      </pre>
    </section>
  );
}
