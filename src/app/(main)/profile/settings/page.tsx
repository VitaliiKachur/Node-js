import { EnvironmentPanel } from "@/components/environment-panel";
import { ProfileForm } from "@/components/profile-form";
import { getCurrentUser } from "@/lib/current-user";

export default async function ProfileSettingsPage() {
  const user = await getCurrentUser();
  const appName = process.env.LAB_APP_NAME ?? "Missing LAB_APP_NAME";
  const serverRegion =
    process.env.LAB_SERVER_REGION ?? "Missing LAB_SERVER_REGION";
  const publicMessage =
    process.env.NEXT_PUBLIC_LAB_MESSAGE ?? "Missing NEXT_PUBLIC_LAB_MESSAGE";

  console.log("Server environment variables:", {
    appName,
    serverRegion,
    publicMessage,
  });

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

      <div className="grid gap-4 tablet:grid-cols-[1.4fr_0.8fr]">
        <ProfileForm name={user.name} age={user.age} />

        <section className="rounded-md border border-brand-line bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-brand-ink">
            Account details
          </h2>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-sm font-semibold uppercase text-brand-muted">
                Email
              </dt>
              <dd className="mt-1 break-all font-semibold text-brand-ink">
                {user.email}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase text-brand-muted">
                Provider
              </dt>
              <dd className="mt-1 font-semibold capitalize text-brand-ink">
                {user.provider ?? "credentials"}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <EnvironmentPanel
        appName={appName}
        serverRegion={serverRegion}
        publicMessage={publicMessage}
      />
    </div>
  );
}
