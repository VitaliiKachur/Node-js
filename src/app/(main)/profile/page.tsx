import Image from "next/image";
import { ProfileForm } from "@/components/profile-form";
import { getCurrentUser } from "@/lib/current-user";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <section className="rounded-md border border-brand-line bg-white/95 p-6 shadow-[var(--shadow-soft)] tablet:p-8">
        <p className="text-sm font-semibold uppercase text-brand-accent">
          Profile
        </p>
        <div className="mt-4 flex flex-col gap-5 tablet:flex-row tablet:items-center">
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={88}
              height={88}
              className="rounded-full border border-brand-line"
            />
          ) : (
            <div className="flex size-22 items-center justify-center rounded-full border border-brand-line bg-brand-surface text-3xl font-bold text-brand-primary">
              {(user.name ?? user.email).slice(0, 1).toUpperCase()}
            </div>
          )}

          <div>
            <h1 className="text-4xl font-bold text-brand-ink tablet:text-5xl">
              {user.name ?? "User profile"}
            </h1>
            <p className="mt-3 text-brand-muted">{user.email}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 tablet:grid-cols-3">
        <section className="rounded-md border border-brand-line bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase text-brand-muted">
            Provider
          </h2>
          <p className="mt-2 text-xl font-bold capitalize text-brand-ink">
            {user.provider ?? "credentials"}
          </p>
        </section>

        <section className="rounded-md border border-brand-line bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase text-brand-muted">
            Age
          </h2>
          <p className="mt-2 text-xl font-bold text-brand-ink">
            {user.age ?? "Not set"}
          </p>
        </section>

        <section className="rounded-md border border-brand-line bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase text-brand-muted">
            Password
          </h2>
          <p className="mt-2 text-xl font-bold text-brand-ink">
            {user.passwordHash ? "Enabled" : "Not set"}
          </p>
        </section>
      </div>

      <ProfileForm name={user.name} age={user.age} />
    </div>
  );
}
