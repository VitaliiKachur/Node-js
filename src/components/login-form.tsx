"use client";

import { FormEvent, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/articles";
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    });
  }

  function handleGoogleSignIn() {
    signIn("google", { callbackUrl });
  }

  function handleGitHubSignIn() {
    signIn("github", { callbackUrl });
  }

  return (
    <div className="rounded-md border border-brand-line bg-white p-6 shadow-[var(--shadow-soft)]">
      <div className="space-y-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full rounded-md border border-brand-line bg-white px-4 py-2.5 text-sm font-bold text-brand-ink transition hover:bg-brand-surface"
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={handleGitHubSignIn}
          className="w-full rounded-md border border-brand-ink bg-brand-ink px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          Continue with GitHub
        </button>
      </div>

      <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase text-brand-muted">
        <span className="h-px flex-1 bg-brand-line" />
        <span>Email login</span>
        <span className="h-px flex-1 bg-brand-line" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-brand-ink"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 w-full rounded-md border border-brand-line px-3 py-2 text-brand-ink outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-brand-ink"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              className="mt-2 w-full rounded-md border border-brand-line px-3 py-2 text-brand-ink outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>

          {error ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-brand-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}
