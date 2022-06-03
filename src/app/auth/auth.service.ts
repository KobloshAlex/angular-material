import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { UiService } from "../shared/ui.service";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(private router: Router, private afa: AngularFireAuth, private uiService: UiService) {}

  initAuthListener() {
    this.afa.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.navigate("training");
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.navigate("login");
      }
    });
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    const { password, email } = authData;
    this.afa
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    const { password, email } = authData;
    this.afa
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch((error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.afa.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private navigate(route: string) {
    this.router.navigate([`/${route}`]).catch(console.error);
  }
}
