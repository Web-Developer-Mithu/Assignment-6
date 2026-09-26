"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout } from "@/components/WorkoutCard";

interface WorkoutContextType {
  planWorkouts: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (workoutId: number) => void;
  toggleSave: (workout: Workout) => void;
  isSaved: (workoutId: number) => boolean;
  isInPlan: (workoutId: number) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [planWorkouts, setPlanWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem("fitlog_plan");
      if (savedPlan) setPlanWorkouts(JSON.parse(savedPlan));

      const savedList = localStorage.getItem("fitlog_saved");
      if (savedList) setSavedWorkouts(JSON.parse(savedList));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("fitlog_plan", JSON.stringify(planWorkouts));
    } catch (e) {
      console.error(e);
    }
  }, [planWorkouts]);

  useEffect(() => {
    try {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
    } catch (e) {
      console.error(e);
    }
  }, [savedWorkouts]);

  const addToPlan = (workout: Workout) => {
    setPlanWorkouts((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  };

  const removeFromPlan = (workoutId: number) => {
    setPlanWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
  };

  const toggleSave = (workout: Workout) => {
    setSavedWorkouts((prev) => {
      if (prev.some((w) => w.id === workout.id)) {
        return prev.filter((w) => w.id !== workout.id);
      }
      return [...prev, workout];
    });
  };

  const isSaved = (workoutId: number) => {
    return savedWorkouts.some((w) => w.id === workoutId);
  };

  const isInPlan = (workoutId: number) => {
    return planWorkouts.some((w) => w.id === workoutId);
  };

  return (
    <WorkoutContext.Provider
      value={{
        planWorkouts,
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        toggleSave,
        isSaved,
        isInPlan,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}
