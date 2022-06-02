import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: "legs", name: "Legs training", duration: 30, calories: 1823 },
    { id: "hands", name: "Hands training", duration: 120, calories: 1123 },
    { id: "chest", name: "Chest training", duration: 88, calories: 1423 },
    { id: "back", name: "Back training", duration: 3, calories: 1123 },
  ];

  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  private exercises: Exercise[] = [];

  getExercises() {
    return this.availableExercises.slice();
  }

  startExercise(exerciseId: string) {
    this.runningExercise = this.availableExercises.find((ex) => ex.id === exerciseId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.exercises.push({ ...this.runningExercise, date: new Date(), state: "completed" });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: "cancelled",
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getCompletedOrCanceledExercises() {
    return this.exercises.slice();
  }
}
