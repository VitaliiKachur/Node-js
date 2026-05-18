import { Suspense } from "react";
import { FavoriteArticle } from "./favorite-article";

const favoriteIds = [1, 4, 7];

export default function FavoriteArticlesPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-md border border-brand-line bg-white/90 p-6 shadow-[var(--shadow-soft)] tablet:p-8">
        <p className="text-sm font-semibold uppercase text-brand-accent">
          Saved collection
        </p>
        <h1 className="mt-3 text-4xl font-bold text-brand-ink tablet:text-5xl">
          Favorite articles
        </h1>
        <p className="mt-4 max-w-2xl text-brand-muted">
          Three independent article cards, each with its own loading state.
        </p>
      </section>

      <div className="grid gap-4 tablet:grid-cols-3">
        {favoriteIds.map((id) => (
          <Suspense key={id} fallback={<FavoriteArticleLoading id={id} />}>
            <FavoriteArticle id={id} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

function FavoriteArticleLoading({ id }: { id: number }) {
  return (
    <article className="rounded-md border border-brand-line bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-brand-primary">Article #{id}</p>
      <div className="mt-4 h-6 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-100" />
    </article>
  );
}
