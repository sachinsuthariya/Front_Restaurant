import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // form group
  loginForm: FormGroup;

  //variables
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    //form control validators
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required]
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

    this.loginForm.reset();

  }

}
