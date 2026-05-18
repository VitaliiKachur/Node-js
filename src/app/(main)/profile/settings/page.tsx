export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-md border border-brand-line bg-white/95 p-6 shadow-[var(--shadow-soft)] tablet:p-8">
        <p className="text-sm font-semibold uppercase text-brand-accent">
          Profile
        </p>
        <h1 className="mt-3 text-4xl font-bold text-brand-ink tablet:text-5xl">
          Profile settings
        </h1>
        <p className="mt-4 max-w-2xl text-brand-muted">
          Manage public profile details and account preferences.
        </p>
      </section>

      <div className="grid gap-4 tablet:grid-cols-2">
        {["Display name", "Email preferences", "Language", "Timezone"].map(
          (item) => (
            <section
              key={item}
              className="rounded-md border border-brand-line bg-white p-5 shadow-sm"
            >
              <h2 className="text-xl font-bold text-brand-ink">{item}</h2>
              <p className="mt-2 text-brand-muted">
                Responsive settings card for {item.toLowerCase()}.
              </p>
            </section>
          ),
        )}
      </div>
    </div>
  );
}
