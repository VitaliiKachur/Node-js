import { MainNavigation } from "./main-navigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen text-brand-ink">
      <header className="sticky top-0 z-10 border-b border-brand-line/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 phone:px-6 tablet:flex-row tablet:items-center tablet:justify-between">
          <p className="text-lg font-bold tracking-normal text-brand-ink">
            Article Space
          </p>
          <MainNavigation />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 phone:px-6 tablet:py-12">
        {children}
      </main>
    </div>
  );
}
