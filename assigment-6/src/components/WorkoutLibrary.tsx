import WorkoutCard, { Workout } from "./WorkoutCard";

async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch workouts: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error loading workouts:", error);
    return [];
  }
}

export default async function WorkoutLibrary() {
  const workouts = await getWorkouts();

  return (
    <section id="workouts" className="w-full mt-12 sm:mt-16">
      {/* Section Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
          THE LIBRARY
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Grid of Workouts */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
