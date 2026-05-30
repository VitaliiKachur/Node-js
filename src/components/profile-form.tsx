import { updateProfile } from "@/app/(main)/profile/actions";

type ProfileFormProps = {
  name: string | null;
  age: number | null;
};

export function ProfileForm({ name, age }: ProfileFormProps) {
  return (
    <form
      action={updateProfile}
      className="rounded-md border border-brand-line bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-brand-ink">Edit profile</h2>

      <div className="mt-5 grid gap-4 tablet:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-brand-ink"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={name ?? ""}
            required
            className="mt-2 w-full rounded-md border border-brand-line px-3 py-2 text-brand-ink outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-semibold text-brand-ink"
          >
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min="1"
            max="120"
            defaultValue={age ?? ""}
            className="mt-2 w-full rounded-md border border-brand-line px-3 py-2 text-brand-ink outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 rounded-md bg-brand-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        Save profile
      </button>
    </form>
  );
}
