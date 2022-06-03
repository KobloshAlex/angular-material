import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean;

  constructor(private router: Router, private afa: AngularFireAuth) {}

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
    const { password, email } = authData;
    this.afa
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {})
      .catch(console.error);
  }

  login(authData: AuthData) {
    const { password, email } = authData;
    this.afa
      .signInWithEmailAndPassword(email, password)
      .then((result) => {})
      .catch(console.error);
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
