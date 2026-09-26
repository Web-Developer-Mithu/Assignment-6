"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

type SortOption = "duration-asc" | "duration-desc" | "calories-desc" | "rating-desc" | "name-asc";

export default function PlanView() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "plan";

  const {
    planWorkouts,
    savedWorkouts,
    removeFromPlan,
    addToPlan,
    toggleSave,
    isSaved,
    isInPlan,
  } = useWorkout();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">(initialTab);
  const [sortBy, setSortBy] = useState<SortOption>("duration-desc");
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);

  // Sync tab with URL search parameter
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "plan") {
      setActiveTab("plan");
    }
  }, [searchParams]);

  const handleTabChange = (tab: "plan" | "saved") => {
    setActiveTab(tab);
    router.replace(`/plan?tab=${tab}`, { scroll: false });
  };

  const toggleComplete = (workoutId: number) => {
    setCompletedWorkouts((prev) =>
      prev.includes(workoutId)
        ? prev.filter((id) => id !== workoutId)
        : [...prev, workoutId]
    );
  };

  // Get current active list
  const currentList = activeTab === "plan" ? planWorkouts : savedWorkouts;

  // Calculate Metrics (from active tab or today's plan)
  const statsList = planWorkouts; // Metrics reflect Today's Plan as per design
  const totalExercises = statsList.length;
  const totalMinutes = statsList.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalCalories = statsList.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);

  // Sorted list for display
  const sortedWorkouts = useMemo(() => {
    const list = [...currentList];
    switch (sortBy) {
      case "duration-desc":
        return list.sort((a, b) => b.duration - a.duration);
      case "duration-asc":
        return list.sort((a, b) => a.duration - b.duration);
      case "calories-desc":
        return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
      case "rating-desc":
        return list.sort((a, b) => b.rating - a.rating);
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [currentList, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Header */}
      <div className="flex flex-col">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight">
          MY PLAN
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Card */}
      <div className="mt-8 rounded-2xl sm:rounded-3xl border border-zinc-800/80 bg-[#0f1218] p-6 sm:p-8 shadow-xl">
        <div className="grid grid-cols-3 divide-x divide-zinc-800/80">
          {/* Exercises */}
          <div className="flex flex-col pl-2 sm:pl-4 first:pl-0">
            <span className="text-xs sm:text-sm font-medium text-zinc-400">
              Exercises
            </span>
            <span className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black text-[#ccff00] tracking-tight">
              {totalExercises}
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col pl-4 sm:pl-8 md:pl-10">
            <span className="text-xs sm:text-sm font-medium text-zinc-400">
              Minutes
            </span>
            <span className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {totalMinutes}
            </span>
          </div>

          {/* Calories */}
          <div className="flex flex-col pl-4 sm:pl-8 md:pl-10">
            <span className="text-xs sm:text-sm font-medium text-zinc-400">
              Calories
            </span>
            <span className="mt-2 text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {totalCalories}
            </span>
          </div>
        </div>
      </div>

      {/* Controls Bar: Tabs (Left) & Sort (Right) */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="inline-flex items-center gap-1 bg-[#0b0e14] p-1.5 rounded-2xl border border-zinc-800/90 self-start">
          <button
            onClick={() => handleTabChange("plan")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === "plan"
                ? "bg-[#18202c] text-white border border-zinc-700/80 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => handleTabChange("saved")}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === "saved"
                ? "bg-[#18202c] text-white border border-zinc-700/80 shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs text-zinc-400 font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-[#0f1218] border border-zinc-800 text-xs sm:text-sm font-semibold text-zinc-200 rounded-xl px-4 py-2 pr-9 hover:border-zinc-700 focus:outline-none focus:border-[#ccff00] cursor-pointer transition-colors"
            >
              <option value="duration-desc">Duration (High to Low)</option>
              <option value="duration-asc">Duration (Low to High)</option>
              <option value="calories-desc">Calories (High to Low)</option>
              <option value="rating-desc">Rating (Top Rated)</option>
              <option value="name-asc">Name (A-Z)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {sortedWorkouts.length === 0 ? (
        /* Empty State */
        <div className="mt-6 rounded-2xl sm:rounded-3xl border border-dashed border-zinc-800/90 bg-[#0a0d13]/50 py-24 px-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
            NOTHING HERE YET
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-sm">
            {activeTab === "plan"
              ? "Browse the library and add a lift to get today moving."
              : "Save lifts from the library to build your routine."}
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ccff00] px-7 py-3 text-xs sm:text-sm font-black uppercase text-black tracking-wide transition-all duration-200 hover:bg-[#d8ff33] hover:shadow-[0_0_20px_rgba(204,255,0,0.35)] active:scale-95"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        /* Populated List - Horizontal Row Cards */
        <div className="mt-6 flex flex-col gap-4">
          {sortedWorkouts.map((workout) => {
            const isCompleted = completedWorkouts.includes(workout.id);
            const inPlan = isInPlan(workout.id);

            return (
              <div
                key={workout.id}
                className={`group relative flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 rounded-2xl border bg-[#0f1218] p-4 sm:p-5 transition-all duration-200 ${
                  isCompleted
                    ? "border-emerald-500/40 bg-[#0f141a]"
                    : "border-zinc-800/80 hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
                }`}
              >
                {/* Left Side: Thumbnail + Information */}
                <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  {/* Thumbnail */}
                  <Link
                    href={`/workout/${workout.id}`}
                    className="relative w-28 h-20 sm:w-36 sm:h-22 rounded-xl overflow-hidden bg-zinc-900 shrink-0 group/img"
                  >
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      sizes="150px"
                      className="object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col min-w-0 justify-center">
                    <Link href={`/workout/${workout.id}`}>
                      <h3 className="text-base sm:text-lg font-black uppercase tracking-wide text-white transition-colors hover:text-[#ccff00] truncate">
                        {workout.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {workout.equipment}
                    </p>

                    {/* Stats Row */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-3.5 sm:gap-4 text-xs text-zinc-400">
                      {/* Duration */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-zinc-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{workout.duration} min</span>
                      </div>

                      {/* Calories */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-[#ccff00]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z" />
                        </svg>
                        <span>{workout.caloriesBurned} kcal</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-zinc-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>{workout.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Action Controls */}
                <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-end md:self-center">
                  {/* View Details Button */}
                  <Link
                    href={`/workout/${workout.id}`}
                    className="px-5 py-2.5 rounded-full border border-zinc-700/80 bg-[#131922] text-zinc-200 hover:text-white hover:bg-zinc-800 text-xs sm:text-sm font-semibold transition-all shadow-sm"
                  >
                    View Details
                  </Link>

                  {/* Main Action Button */}
                  {activeTab === "plan" ? (
                    <button
                      onClick={() => toggleComplete(workout.id)}
                      className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                        isCompleted
                          ? "bg-zinc-800 text-[#ccff00] border border-[#ccff00]/40"
                          : "bg-[#ccff00] text-black hover:bg-[#d8ff33] hover:shadow-[0_0_20px_rgba(204,255,0,0.35)]"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {isCompleted ? "Completed" : "Mark as Done"}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (inPlan) {
                          removeFromPlan(workout.id);
                        } else {
                          addToPlan(workout);
                        }
                      }}
                      className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                        inPlan
                          ? "bg-zinc-800 text-[#ccff00] border border-[#ccff00]/40"
                          : "bg-[#ccff00] text-black hover:bg-[#d8ff33] hover:shadow-[0_0_20px_rgba(204,255,0,0.35)]"
                      }`}
                    >
                      {inPlan ? "In Today's Plan" : "Add to Today's Plan"}
                    </button>
                  )}

                  {/* Remove / Cross Button (✕) */}
                  <button
                    onClick={() => {
                      if (activeTab === "plan") {
                        removeFromPlan(workout.id);
                      } else {
                        toggleSave(workout);
                      }
                    }}
                    title={activeTab === "plan" ? "Remove from plan" : "Remove from saved"}
                    className="p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
