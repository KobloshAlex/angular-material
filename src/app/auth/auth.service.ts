import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: authData.email,
    };
    this.authChange.next(true);
    this.navigate("training");
  }

  login(authData: AuthData) {
    this.user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: authData.email,
    };
    this.authChange.next(true);
    this.navigate("training");
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.navigate("login");
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    // return this.user != null;
    return true
  }

  private navigate(route: string) {
    this.router.navigate([`/${route}`]).catch(console.error);
  }
}
