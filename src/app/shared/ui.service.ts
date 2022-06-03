import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class UiService {
  loadingStateChanged = new Subject<boolean>();
  constructor() {}
}
