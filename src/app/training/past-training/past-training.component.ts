import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Exercise } from "../exercise.model";
import { TrainingService } from "../training.service";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-past-training",
  templateUrl: "./past-training.component.html",
  styleUrls: ["./past-training.component.css"],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ["date", "name", "duration", "calories", "state"];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.finishedExercisesChanged.subscribe((exercises) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCanceledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
