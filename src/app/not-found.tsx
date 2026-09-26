import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
      <div className="relative mb-6">
        <span className="text-8xl sm:text-9xl font-black text-zinc-900 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <Logo variant="diagonal" size={32} />
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight">
        PAGE NOT FOUND
      </h1>
      <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-md">
        Looks like you wandered off the workout routine. The page you are looking for does not exist or has been moved.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#ccff00] px-7 py-3 text-xs sm:text-sm font-black uppercase tracking-wide text-black transition-all duration-200 hover:bg-[#d8ff33] hover:shadow-[0_0_20px_rgba(204,255,0,0.35)] active:scale-95"
        >
          Back to Workouts
        </Link>
        <Link
          href="/my-plan"
          className="inline-flex items-center justify-center rounded-full border border-zinc-700/80 bg-[#121820] px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wide text-zinc-300 transition-all duration-200 hover:bg-zinc-800 hover:text-white"
        >
          View My Plan
        </Link>
      </div>
    </main>
  );
}
