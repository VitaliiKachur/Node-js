import { ArticlesNavigation } from "./articles-navigation";

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="space-y-6">
      <ArticlesNavigation />
      {children}
    </section>
  );
}
