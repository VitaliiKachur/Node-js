export default function ProfileSecurityPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-md border border-brand-line bg-white/95 p-6 shadow-[var(--shadow-soft)] tablet:p-8">
        <p className="text-sm font-semibold uppercase text-brand-accent">
          Security
        </p>
        <h1 className="mt-3 text-4xl font-bold text-brand-ink tablet:text-5xl">
          Profile security
        </h1>
        <p className="mt-4 max-w-2xl text-brand-muted">
          Review password, sessions, and verification settings.
        </p>
      </section>

      <div className="grid gap-4 tablet:grid-cols-3">
        {["Password", "Two-factor auth", "Active sessions"].map((item) => (
          <section
            key={item}
            className="rounded-md border border-brand-line bg-white p-5 shadow-sm"
          >
            <h2 className="text-xl font-bold text-brand-ink">{item}</h2>
            <p className="mt-2 text-brand-muted">
              Secure and responsive account control.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
