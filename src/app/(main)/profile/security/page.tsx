import { PasswordForm } from "@/components/password-form";
import { getCurrentUser } from "@/lib/current-user";

export default async function ProfileSecurityPage() {
  const user = await getCurrentUser();

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

      <PasswordForm hasPassword={Boolean(user.passwordHash)} />
    </div>
  );
}
