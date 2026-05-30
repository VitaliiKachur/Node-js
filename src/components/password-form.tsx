import { changePassword } from "@/app/(main)/profile/actions";

type PasswordFormProps = {
  hasPassword: boolean;
};

export function PasswordForm({ hasPassword }: PasswordFormProps) {
  return (
    <form
      action={changePassword}
      className="rounded-md border border-brand-line bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-brand-ink">Change password</h2>

      <div className="mt-5 space-y-4">
        {hasPassword ? (
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-semibold text-brand-ink"
            >
              Current password
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-md border border-brand-line px-3 py-2 text-brand-ink outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>
        ) : null}

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-semibold text-brand-ink"
          >
            New password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            className="mt-2 w-full rounded-md border border-brand-line px-3 py-2 text-brand-ink outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 rounded-md bg-brand-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        Update password
      </button>
    </form>
  );
}
