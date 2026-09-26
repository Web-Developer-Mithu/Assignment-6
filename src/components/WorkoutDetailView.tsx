"use client";

import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/components/WorkoutCard";
import { useWorkout } from "@/context/WorkoutContext";

interface WorkoutDetailViewProps {
  workout: Workout;
}

export default function WorkoutDetailView({ workout }: WorkoutDetailViewProps) {
  const { addToPlan, removeFromPlan, toggleSave, isSaved, isInPlan } = useWorkout();

  const saved = isSaved(workout.id);
  const inPlan = isInPlan(workout.id);

  const handlePlanClick = () => {
    if (inPlan) {
      removeFromPlan(workout.id);
    } else {
      addToPlan(workout);
    }
  };

  const handleSaveClick = () => {
    toggleSave(workout);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-[#ccff00] transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Workouts
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Big Image */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div className="relative aspect-square w-full max-w-[540px] rounded-3xl overflow-hidden border border-zinc-800/80 bg-[#0f1218] shadow-2xl">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 540px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Column: Workout Info */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black uppercase text-white tracking-tight leading-tight">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
            {workout.description}
          </p>

          {/* Muscle Group Badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#ccff00] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-black shadow-sm"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Specs Table */}
          <div className="mt-6 rounded-2xl border border-zinc-800/80 bg-[#0f1218] overflow-hidden divide-y divide-zinc-800/60 shadow-lg">
            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                EQUIPMENT
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {workout.equipment}
              </span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                DIFFICULTY
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {workout.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                SETS
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {workout.sets}
              </span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                REPS
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {workout.reps}
              </span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                DURATION
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {workout.duration} min
              </span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                CALORIES
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {workout.caloriesBurned} kcal
              </span>
            </div>

            <div className="flex items-center justify-between px-5 py-3.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400">
                RATING
              </span>
              <span className="text-xs sm:text-sm font-semibold text-white">
                {workout.rating}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-sm sm:text-base font-black uppercase text-white tracking-wider mb-3">
              INSTRUCTIONS
            </h2>
            <ol className="space-y-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed list-none">
              {workout.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-bold text-zinc-400 shrink-0 select-none">
                    {idx + 1}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            {/* Add to today's plan */}
            <button
              onClick={handlePlanClick}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-extrabold transition-all duration-200 shadow-md active:scale-95 ${
                inPlan
                  ? "bg-zinc-800 text-[#ccff00] border border-[#ccff00]/40"
                  : "bg-[#ccff00] text-black hover:bg-[#d8ff33] hover:shadow-[0_0_20px_rgba(204,255,0,0.35)]"
              }`}
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
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="12" y1="14" x2="12" y2="18" />
                <line x1="10" y1="16" x2="14" y2="16" />
              </svg>
              {inPlan ? "Remove from today's plan" : "Add to today's plan"}
            </button>

            {/* Save for later */}
            <button
              onClick={handleSaveClick}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-bold border transition-all duration-200 active:scale-95 ${
                saved
                  ? "bg-[#1c2e12] border-[#2f4d18] text-[#ccff00]"
                  : "bg-[#10141c] border-zinc-700/80 text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill={saved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
