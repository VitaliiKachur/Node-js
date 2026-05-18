type FavoriteArticleProps = {
  id: number;
};

type Article = {
  id: number;
  title: string;
  body: string;
};

async function getArticle(id: number): Promise<Article> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to load article ${id}`);
  }

  return response.json();
}

export async function FavoriteArticle({ id }: FavoriteArticleProps) {
  const article = await getArticle(id);

  return (
    <article className="rounded-md border border-brand-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm font-semibold text-brand-primary">
        Favorite #{article.id}
      </p>
      <h2 className="mt-3 text-xl font-bold text-brand-ink">{article.title}</h2>
      <p className="mt-3 text-brand-muted">{article.body}</p>
    </article>
  );
}
