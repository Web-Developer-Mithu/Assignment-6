"use client";

import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planWorkouts, savedWorkouts } = useWorkout();
  const isWorkouts = pathname === "/" || pathname.startsWith("/workout");

  const isPlan = pathname === "/my-plan" || pathname === "/plan";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-[#08080a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo variant="diagonal" size={24} href="/" />

        {/* Middle: Navigation Pill */}
        <nav className="flex items-center gap-1 bg-zinc-900/70 p-1 rounded-full border border-zinc-800/60">
          <Link
            href="/"
            className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              isWorkouts
                ? "bg-[#1d3010] text-[#ccff00] border border-[#2f4d18]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              isPlan
                ? "bg-[#1d3010] text-[#ccff00] border border-[#2f4d18]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Counter Badges */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-zinc-300 hover:text-[#ccff00] transition-colors"
          >
            <span>Plan</span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ccff00] text-black text-[11px] sm:text-xs font-bold shadow-sm">
              {planWorkouts.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700/80 text-zinc-300 text-[11px] sm:text-xs font-medium">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
