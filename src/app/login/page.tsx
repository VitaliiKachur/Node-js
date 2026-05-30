import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-surface px-4 py-12 phone:px-6">
      <section className="w-full max-w-md">
        <p className="text-sm font-semibold uppercase text-brand-accent">
          Article Space
        </p>
        <h1 className="mt-3 text-4xl font-bold text-brand-ink">Sign in</h1>
        <p className="mt-3 text-brand-muted">
          Use your email and password to continue.
        </p>

        <div className="mt-6">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
