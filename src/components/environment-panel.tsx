"use client";

import { useEffect } from "react";

type EnvironmentPanelProps = {
  appName: string;
  serverRegion: string;
  publicMessage: string;
};

export function EnvironmentPanel({
  appName,
  serverRegion,
  publicMessage,
}: EnvironmentPanelProps) {
  useEffect(() => {
    console.log("Browser environment variables:", {
      appName,
      serverRegion,
      publicMessage: process.env.NEXT_PUBLIC_LAB_MESSAGE,
    });
  }, [appName, serverRegion]);

  return (
    <section className="rounded-md border border-brand-line bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-brand-ink">
        Environment variables
      </h2>
      <dl className="mt-4 grid gap-3 text-sm tablet:grid-cols-3">
        <div className="rounded-md bg-brand-surface p-3">
          <dt className="font-semibold text-brand-accent">LAB_APP_NAME</dt>
          <dd className="mt-1 text-brand-muted">{appName}</dd>
        </div>
        <div className="rounded-md bg-brand-surface p-3">
          <dt className="font-semibold text-brand-accent">LAB_SERVER_REGION</dt>
          <dd className="mt-1 text-brand-muted">{serverRegion}</dd>
        </div>
        <div className="rounded-md bg-brand-surface p-3">
          <dt className="font-semibold text-brand-accent">
            NEXT_PUBLIC_LAB_MESSAGE
          </dt>
          <dd className="mt-1 text-brand-muted">{publicMessage}</dd>
        </div>
      </dl>
    </section>
  );
}
