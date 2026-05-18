export default function ArticlesLoading() {
  return (
    <div className="space-y-4">
      <div className="h-32 animate-pulse rounded-md border border-brand-line bg-white/80" />
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-md border border-brand-line bg-white p-5"
          >
            <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />
            <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
