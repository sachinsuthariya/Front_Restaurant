import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NotifierService } from "angular-notifier";
import { NgxSpinnerService } from "ngx-spinner";

import { RegisterService } from "./register.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  //formgroup
  signupForm: FormGroup;

  //variables
  registerSubscription: Subscription;
  city = [
    "Ahmedabad",
    "Baroda",
    "Surat",
    "Rajkot",
    "Jamnagar"
  ];
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
    private readonly notifier: NotifierService,
    private registerService: RegisterService,
    private spinner: NgxSpinnerService) {


  }

  ngOnInit() {

    //validators
    // this.signupForm = this.formBuilder.group({
    //   ownerName: [""],
    //   resName: [""],
    //   city: [""],
    //   address: [""],
    //   email: ["", [Validators.required, Validators.email]],
    //   mobile: [""]
    // })

    this.signupForm = this.formBuilder.group({
      ownerName: [""],
      resName: [""],
      city: [""],
      address: [""],
      email: [""],
      mobile: [""]
    })

  }

  ngOnDestroy() {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  // convience getter to easy access form field
  get form() {
    return this.signupForm.controls;
  }

  //on register 
  onSubmit() {
    this.isSubmitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.spinner.show();
    this.registerSubscription = this.registerService.registerRestaurant(this.signupForm.value)
      .subscribe(res => {
        console.log(res, "res");
        const response = res;
        if (response["success"]) {
          this.notifier.notify("success", response["message"]);
          this.signupForm.reset();
        } else {
          this.notifier.notify("error", response["error"]["message"]);
          console.log(response["error"]["message"], "regisytrrersd");

          // this.signupForm.reset();
        }
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
  }





}