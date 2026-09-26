import { Workout } from "@/components/WorkoutCard";
import WorkoutDetailView from "@/components/WorkoutDetailView";
import { notFound } from "next/navigation";

interface WorkoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const workouts: Workout[] = await res.json();
    return workouts.find((w) => w.id === parseInt(id, 10)) || null;
  } catch (error) {
    console.error("Error fetching workout:", error);
    return null;
  }
}

export async function generateMetadata({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) return { title: "Workout Not Found — FitLog" };
  return {
    title: `${workout.name} — FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetailView workout={workout} />;
}
