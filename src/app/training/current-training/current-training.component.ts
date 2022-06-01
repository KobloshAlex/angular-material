import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { StopTrainingDialogComponent } from "./stop-training-dialog/stop-training-dialog.component";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    this.dialog
      .open(StopTrainingDialogComponent, {
        data: {
          progress: this.progress,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.trainingExit.emit();
        } else {
          this.startOrResumeTimer();
        }
      });
  }
}
