import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl("", { validators: [Validators.required, Validators.email] }),
      password: new FormControl("", { validators: [Validators.required] }),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.loginForm);
  }
}