import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { RegisterService } from 'src/app/auth/register/register.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-add-barch',
  templateUrl: './add-barch.component.html',
  styleUrls: ['./add-barch.component.css']
})
export class AddBarchComponent implements OnInit {

  //formgroup
  branchForm: FormGroup;

  //variables
  addBranchSubscription: Subscription;
  city = [
    "Ahmedabad",
    "Baroda",
    "Surat",
    "Rajkot",
    "Jamnagar"
  ];
  isSubmitted = false;
  getBranch = {};

  constructor(private formBuilder: FormBuilder,
    private readonly notifier: NotifierService,
    private userService: UserServiceService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

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

    this.branchForm = this.formBuilder.group({
      ownerName: [""],
      resName: [""],
      city: [""],
      address: [""],
      email: [""],
      mobile: [""]
    })

    this.getBranch = this.userService.getBranchData();
    console.log("branch dataaaaaa", this.getBranch);

  }

  ngOnDestroy() {
    if (this.addBranchSubscription) {
      this.addBranchSubscription.unsubscribe();
    }
  }

  // convience getter to easy access form field
  get form() {
    return this.branchForm.controls;
  }

  //on Add Branch 
  onAddBranch() {
    this.isSubmitted = true;

    if (this.branchForm.invalid) {
      return;
    }

    console.log(this.branchForm.controls.ownerName.value);

    let data = {
      restaurantID: this.getBranch["RestaurantId"],
      Parent_Rest: this.getBranch["RestaurantName"],
      ownerName: this.branchForm.controls.ownerName.value,
      restaurantName: this.branchForm.controls.resName.value,
      city: this.branchForm.controls.city.value,
      address: this.branchForm.controls.address.value,
      email: this.branchForm.controls.email.value,
      mobile: this.branchForm.controls.mobile.value,

    }
    this.spinner.show();
    this.addBranchSubscription = this.userService.AddBranch(data)
      .subscribe(res => {
        console.log(res, "res");
        const response = res;
        if (response["success"]) {

          this.notifier.notify("success", response["message"]);
          this.branchForm.reset();
          // this.router.navigate(["login"]);
        } else {
          // if (response["error"]["message"]) {
          //   this.notifier.notify("error", response["error"]["message"]);
          // } else {
            this.notifier.notify("error", response["message"]);
          }
          // console.log(response["error"]["message"], "regisytrrersd");

          // this.signupForm.reset();
        // }
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });


    //add  branch controller ma error che... node side
    // this.userService.AddBranch(data)
    //   .subscribe(res => {
    //     console.log("sassssssssssss =====>");

    //     console.log(res, "addbranch respons");

    //   })
    // console.log("Add  branch funnctionss", data);

  }


}
