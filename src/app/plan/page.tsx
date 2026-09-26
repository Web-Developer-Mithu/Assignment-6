import { Suspense } from "react";
import PlanView from "@/components/PlanView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Plan — FitLog",
  description: "Track your daily workout plan and saved lifts.",
};

export default function PlanPage() {
  return (
    <main className="flex-1 w-full">
      <Suspense
        fallback={
          <div className="w-full max-w-7xl mx-auto px-4 py-16 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-[#ccff00]" />
          </div>
        }
      >
        <PlanView />
      </Suspense>
    </main>
  );
}
