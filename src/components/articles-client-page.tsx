"use client";

import { FormEvent, useMemo, useState } from "react";
import useSWR from "swr";

type Article = {
  id: number;
  title: string;
  slug: string;
  body: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    comments: number;
  };
};

type ArticlesResponse = {
  articles: Article[];
};

type ArticleMutationResponse = {
  article: Article;
};

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load API data");
  }

  return response.json();
};

export function ArticlesClientPage() {
  const { data, error, isLoading, mutate } = useSWR<ArticlesResponse>(
    "/api/articles",
    fetcher,
  );
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(true);
  const [message, setMessage] = useState("Ready");
  const [isSaving, setIsSaving] = useState(false);

  const articles = useMemo(() => data?.articles ?? [], [data?.articles]);
  const selectedArticle = useMemo(
    () => articles.find((article) => article.id === selectedId) ?? null,
    [articles, selectedId],
  );

  async function submitArticle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("Sending request...");

    const method = selectedArticle ? "PATCH" : "POST";
    const url = selectedArticle
      ? `/api/articles/${selectedArticle.id}`
      : "/api/articles";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, published }),
      });
      const payload = (await response.json()) as ArticleMutationResponse;

      if (!response.ok) {
        throw new Error("API request failed");
      }

      await mutate();
      setSelectedId(payload.article.id);
      setTitle(payload.article.title);
      setBody(payload.article.body);
      setPublished(payload.article.published);
      setMessage(`${method} /api/articles completed with ${response.status}`);
    } catch {
      setMessage("Request failed. Check the API response in DevTools.");
    } finally {
      setIsSaving(false);
    }
  }

  function selectArticle(article: Article) {
    setSelectedId(article.id);
    setTitle(article.title);
    setBody(article.body);
    setPublished(article.published);
    setMessage(`Selected article #${article.id}`);
  }

  function clearForm() {
    setSelectedId(null);
    setTitle("");
    setBody("");
    setPublished(true);
    setMessage("Creating a new article");
  }

  async function deleteArticle() {
    if (!selectedArticle) {
      setMessage("Select an article before deleting.");
      return;
    }

    setIsSaving(true);
    setMessage("Deleting article...");

    try {
      const response = await fetch(`/api/articles/${selectedArticle.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      await mutate();
      clearForm();
      setMessage(`DELETE /api/articles/${selectedArticle.id} completed`);
    } catch {
      setMessage("Delete failed. Check the API response in DevTools.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-md border border-brand-line bg-white/90 p-6 shadow-[var(--shadow-soft)] tablet:p-8">
        <p className="text-sm font-semibold uppercase text-brand-accent">
          SWR client
        </p>
        <div className="mt-3 flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-brand-ink tablet:text-5xl">
              Articles
            </h1>
            <p className="mt-4 max-w-2xl text-brand-muted">
              Manage articles through the local CRUD API with client-side SWR
              requests.
            </p>
          </div>
          <div className="rounded-md border border-brand-line bg-brand-surface px-4 py-3 text-sm font-semibold text-brand-ink">
            {isLoading ? "Loading..." : `${articles.length} articles`}
          </div>
        </div>
      </section>

      <section className="grid gap-5 laptop:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-md border border-brand-line bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase text-brand-accent">
                API data
              </p>
              <h2 className="mt-2 text-2xl font-bold text-brand-ink">
                Live article list
              </h2>
            </div>
            <button
              className="h-10 rounded-md border border-brand-line px-4 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:text-brand-primary"
              onClick={() => mutate()}
              type="button"
            >
              Refresh
            </button>
          </div>

          {error ? (
            <p className="mt-5 rounded-md bg-red-50 p-4 text-sm font-semibold text-red-700">
              Failed to load articles from /api/articles.
            </p>
          ) : null}

          <div className="mt-5 grid gap-3">
            {articles.map((article) => (
              <button
                key={article.id}
                className={`rounded-md border p-4 text-left transition ${
                  selectedId === article.id
                    ? "border-brand-primary bg-blue-50"
                    : "border-brand-line bg-white hover:border-brand-primary"
                }`}
                onClick={() => selectArticle(article)}
                type="button"
              >
                <div className="flex flex-col gap-2 tablet:flex-row tablet:items-start tablet:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-brand-primary">
                      Article #{article.id}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-brand-ink">
                      {article.title}
                    </h3>
                  </div>
                  <span className="rounded-md bg-brand-surface px-3 py-1 text-xs font-semibold text-brand-muted">
                    {article.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-brand-muted">
                  {article.body}
                </p>
              </button>
            ))}
          </div>
        </div>

        <form
          className="rounded-md border border-brand-line bg-white p-5 shadow-sm"
          onSubmit={submitArticle}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase text-brand-accent">
                Editor
              </p>
              <h2 className="mt-2 text-2xl font-bold text-brand-ink">
                {selectedArticle ? "Edit article" : "New article"}
              </h2>
            </div>
            <button
              className="h-10 rounded-md border border-brand-line px-4 text-sm font-semibold text-brand-ink transition hover:border-brand-primary hover:text-brand-primary"
              onClick={clearForm}
              type="button"
            >
              New
            </button>
          </div>

          <label className="mt-5 grid gap-2 text-sm font-semibold text-brand-ink">
            Title
            <input
              className="h-11 rounded-md border border-brand-line px-3 text-sm outline-none focus:border-brand-primary"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label className="mt-4 grid gap-2 text-sm font-semibold text-brand-ink">
            Body
            <textarea
              className="min-h-36 resize-y rounded-md border border-brand-line p-3 text-sm outline-none focus:border-brand-primary"
              required
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </label>

          <label className="mt-4 flex items-center gap-3 text-sm font-semibold text-brand-ink">
            <input
              checked={published}
              className="h-4 w-4"
              onChange={(event) => setPublished(event.target.checked)}
              type="checkbox"
            />
            Published
          </label>

          <div className="mt-5 grid gap-3 phone:grid-cols-2">
            <button
              className="h-11 rounded-md bg-brand-ink px-4 text-sm font-semibold text-white transition hover:bg-brand-primary disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
              type="submit"
            >
              {selectedArticle ? "Save changes" : "Create"}
            </button>
            <button
              className="h-11 rounded-md border border-red-200 px-4 text-sm font-semibold text-red-700 transition hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving || !selectedArticle}
              onClick={deleteArticle}
              type="button"
            >
              Delete
            </button>
          </div>

          <p className="mt-5 rounded-md bg-brand-surface p-3 text-sm font-semibold text-brand-muted">
            {message}
          </p>
        </form>
      </section>
    </div>
  );
}
