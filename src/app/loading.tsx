export default function Loading() {
  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800/60 bg-[#0f1218]/80 p-8 sm:p-12 md:p-16 min-h-[380px] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-4 w-32 bg-zinc-800 rounded-full" />
            <div className="h-10 sm:h-14 w-3/4 bg-zinc-800 rounded-2xl" />
            <div className="h-4 w-full max-w-md bg-zinc-800/80 rounded" />
            <div className="h-4 w-2/3 max-w-md bg-zinc-800/80 rounded" />
            <div className="h-12 w-44 bg-zinc-800 rounded-xl mt-6" />
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-64 h-64 bg-zinc-800/50 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Library Section Skeleton */}
      <div className="mt-12 sm:mt-16">
        <div className="mb-6 sm:mb-8 space-y-2">
          <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
          <div className="h-4 w-64 bg-zinc-800/60 rounded" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800/60 bg-[#0f1218] p-5 space-y-4"
            >
              <div className="aspect-[16/10] w-full bg-zinc-800/70 rounded-xl" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-zinc-800 rounded-full" />
                <div className="h-5 w-16 bg-zinc-800 rounded-full" />
              </div>
              <div className="h-6 w-3/4 bg-zinc-800 rounded" />
              <div className="h-4 w-1/2 bg-zinc-800/60 rounded" />
              <div className="border-t border-zinc-800/60 pt-3 flex justify-between">
                <div className="h-4 w-16 bg-zinc-800/60 rounded" />
                <div className="h-4 w-16 bg-zinc-800/60 rounded" />
                <div className="h-4 w-12 bg-zinc-800/60 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
