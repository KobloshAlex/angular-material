import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: "legs", name: "Legs training", duration: 30, calories: 1823 },
    { id: "hands", name: "Hands training", duration: 120, calories: 1123 },
    { id: "chest", name: "Chest training", duration: 88, calories: 1423 },
    { id: "back", name: "Back training", duration: 10, calories: 1123 },
  ];

  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();

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
}
