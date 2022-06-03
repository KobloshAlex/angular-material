import { Exercise } from "./exercise.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { UiService } from "../shared/ui.service";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<any>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;

  constructor(private db: AngularFirestore, private uiService: UiService) {}

  fetchExercises(): void {
    this.db
      .collection("availableExercises")
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((action) => {
            const data = action.payload.doc.data() as Exercise;
            data.id = action.payload.doc.id;

            return data;
          });
        })
      )
      .subscribe(
        (exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        },
        (error) => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.showSnackBar("Was not able to fetch past trainings", null, 3000);
        }
      );
  }

  startExercise(exerciseId: string) {
    this.runningExercise = this.availableExercises.find((ex) => ex.id === exerciseId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: "completed" });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: "cancelled",
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchCompletedOrCanceledExercises() {
    this.db
      .collection("finishedExercises")
      .valueChanges()
      .subscribe((exercises) => {
        this.finishedExercisesChanged.next(exercises);
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection("finishedExercises").add(exercise);
  }
}
