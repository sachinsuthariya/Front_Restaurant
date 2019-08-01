import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { NgxSpinnerService } from "ngx-spinner";
import { NotifierService } from "angular-notifier";

import { LoginService } from "./login.service";
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // form group
  loginForm: FormGroup;

  //variables
  loginSubscription: Subscription;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private loginService: LoginService,
    private router: Router) {

    if (this.loginService.isLogin) {
      this.router.navigate(["/"])
    }

  }

  ngOnInit() {

    //form control validators
    // this.loginForm = this.formBuilder.group({
    //   email: ["", [Validators.email, Validators.required]],
    //   password: ["", Validators.required]
    // });

    this.loginForm = this.formBuilder.group({
      email: [""],
      password: [""]
    });
  }


  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  // convience getter to easy access form control
  get form() {
    return this.loginForm.controls;
  }

  // on Login
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    this.loginSubscription = this.loginService.onLogin(this.loginForm.value).subscribe(res => {
      console.log(res);
      let response = res;
      console.log(response);

      if (response["success"]) {

        if (response["body"][0]["isadmin"]) {
          this.router.navigate(["admin"]);
        } else {
          this.router.navigate(["user"]);
        }
        let token = response["body"][0]["token"];
        let auth_user = response["body"][0]["user"];
        console.log("auth user", auth_user, token);

        localStorage.setItem("token", token);
        localStorage.setItem("_id", auth_user._id);
        localStorage.setItem("username", auth_user.username);
        localStorage.setItem("restaurantName", auth_user.restaurantName);
        localStorage.setItem("ownerName", auth_user.ownerName);
        localStorage.setItem("city", auth_user.city);
        localStorage.setItem("address", auth_user.address);

        this.notifier.notify("success", response["message"]);
      } else {
        this.loginForm.reset();
        this.notifier.notify("error", response["message"]);
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

  }

}
