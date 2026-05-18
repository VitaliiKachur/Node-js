type ArticlePageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Article = {
  id: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, index) => ({
    id: String(index + 1),
  }));
}

async function getArticle(id: string): Promise<Article> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to load article ${id}`);
  }

  return response.json();
}

async function getComments(): Promise<Comment[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1/comments",
  );

  if (!response.ok) {
    throw new Error("Failed to load comments");
  }

  return response.json();
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const [article, comments] = await Promise.all([
    getArticle(id),
    getComments(),
  ]);

  return (
    <div className="space-y-8">
      <article className="rounded-md border border-brand-line bg-white/95 p-6 shadow-[var(--shadow-soft)] tablet:p-8">
        <p className="text-sm font-semibold uppercase text-brand-accent">
          Article #{article.id}
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold text-brand-ink tablet:text-5xl">
          {article.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-brand-muted">
          {article.body}
        </p>
      </article>

      <section>
        <h2 className="text-2xl font-bold text-brand-ink">Comments</h2>
        <div className="mt-4 grid gap-4 tablet:grid-cols-2">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-md border border-brand-line bg-white p-5 shadow-sm"
            >
              <h3 className="font-bold text-brand-ink">{comment.name}</h3>
              <p className="mt-1 text-sm font-medium text-brand-primary">
                {comment.email}
              </p>
              <p className="mt-3 text-brand-muted">{comment.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
