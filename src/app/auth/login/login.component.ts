import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

import { NgxSpinnerService } from "ngx-spinner";
import { NotifierService } from "angular-notifier";

import { LoginService } from "./login.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // form group
  loginForm: FormGroup;

  //variables
  loginSubscription: Subscription;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
    private loginService: LoginService) { }

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
        console.log("success");

        this.notifier.notify("success", "Authenticatio successful");
      } else {
        this.loginForm.reset();
        console.log("successssssssssssssss");
        this.notifier.notify("error", "fail");
      }
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    })



  }

}
