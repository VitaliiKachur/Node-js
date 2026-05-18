import Link from "next/link";

type Article = {
  id: number;
  title: string;
  body: string;
};

async function getArticles(): Promise<Article[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Failed to load articles");
  }

  return response.json();
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="space-y-8">
      <section className="rounded-md border border-brand-line bg-white/90 p-6 shadow-[var(--shadow-soft)] tablet:p-8">
        <p className="text-sm font-semibold uppercase text-brand-accent">
          Latest posts
        </p>
        <h1 className="mt-3 text-4xl font-bold text-brand-ink tablet:text-5xl">
          Articles
        </h1>
        <p className="mt-4 max-w-2xl text-brand-muted">
          Fresh JSONPlaceholder posts rendered through the App Router.
        </p>
      </section>

      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        {articles.slice(0, 10).map((article) => (
          <article
            key={article.id}
            className="flex min-h-64 flex-col rounded-md border border-brand-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-sm font-semibold text-brand-primary">
              Article #{article.id}
            </p>
            <h2 className="mt-3 text-xl font-bold text-brand-ink">
              {article.title}
            </h2>
            <p className="mt-3 flex-1 text-brand-muted">{article.body}</p>
            <Link
              href={`/articles/${article.id}`}
              className="mt-5 inline-flex items-center justify-center rounded-md bg-brand-ink px-4 py-2 text-sm font-semibold text-white no-underline transition hover:bg-brand-primary"
            >
              Open article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
