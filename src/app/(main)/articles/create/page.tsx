import { LibraryNotice } from "@/components/library-notice";

export default function CreateArticlePage() {
  return (
    <div className="grid gap-6 laptop:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-md border border-brand-line bg-white/95 p-6 shadow-[var(--shadow-soft)] tablet:p-8">
        <p className="text-sm font-semibold uppercase text-brand-accent">
          Editor
        </p>
        <h1 className="mt-3 text-4xl font-bold text-brand-ink tablet:text-5xl">
          Create article
        </h1>
        <p className="mt-4 max-w-2xl text-brand-muted">
          A styled placeholder for the article creation flow.
        </p>
      </section>

      <aside className="space-y-5 rounded-md border border-brand-line bg-white p-5 shadow-sm">
      <LibraryNotice />
        <div>
          <h2 className="text-xl font-bold text-brand-ink">Draft quality</h2>
          <p className="mt-2 text-brand-muted">
            Keep title, summary, and body readable on phone, tablet, and desktop
            screens.
          </p>
        </div>
      </aside>
    </div>
  );
}
