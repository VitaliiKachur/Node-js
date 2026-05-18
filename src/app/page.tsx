export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 phone:px-6">
      <main className="w-full max-w-3xl rounded-md border border-brand-line bg-white/90 p-8 text-center shadow-[var(--shadow-soft)] tablet:p-12">
        <p className="text-sm font-semibold uppercase text-brand-accent">
          NextJS Lab
        </p>
        <h1 className="mt-4 text-4xl font-bold text-brand-ink tablet:text-6xl">
          Home page
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-brand-muted tablet:text-lg">
          A responsive article dashboard with nested layouts, static pages, and
          polished styling.
        </p>
      </main>
    </div>
  );
}
