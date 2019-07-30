import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { RegisterService } from 'src/app/auth/register/register.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { AdminComponent } from '../../admin/admin.component';

@Component({
  selector: 'app-add-barch',
  templateUrl: './add-barch.component.html',
  styleUrls: ['./add-barch.component.css']
})
export class AddBarchComponent implements OnInit, OnDestroy {

  //formgroup
  branchForm: FormGroup;

  //variables
  addBranchSubscription: Subscription;
  editbranchSubscription: Subscription;
  city = [
    "Ahmedabad",
    "Baroda",
    "Surat",
    "Rajkot",
    "Jamnagar"
  ];
  isSubmitted = false;
  getBranch = {};
  editbranch: any = {

  };

  constructor(private formBuilder: FormBuilder,
    private readonly notifier: NotifierService,
    private userService: UserServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private admin: AdminComponent) { }

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
    });

    this.getBranch = this.userService.getBranchData();
    console.log(this.admin.isedit, "observable in add branch");

    if (this.admin.isedit) {
      this.editbranchSubscription = this.admin.share_EditBranch.subscribe(res => {
        this.editbranch = res;
        console.log("edit branch in add branch", this.editbranch);
        if (this.editbranch) {
          this.edit();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.addBranchSubscription) {
      this.addBranchSubscription.unsubscribe();
    }

    if (this.editbranchSubscription) {
      this.editbranchSubscription.unsubscribe();
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

  edit() {
    // console.log(this.branchForm.value);
    this.branchForm.reset();
    this.admin.isedit=false;
    let data = {
      resName: this.editbranch.restaurantName,
      ownerName: this.editbranch.ownerName,
      mobile: this.editbranch.mobile,
      email: this.editbranch.email,
      city: this.editbranch.city,
      address: this.editbranch.address
    }
    // this.branchForm.controls.value = data;
    console.log(data, "resta");
    // this.branchForm.controls.resName.value = data.resName;
    // this.branchForm.controls.ownerName.value = data.ownerName;
    // this.branchForm.controls.mobile.value = data.mobile;
    // this.branchForm.controls.email.value = data.email;
    // this.branchForm.controls.city.value = data.city;
    // this.branchForm.controls.address.value = data.address;

    this.branchForm.controls['resName'].setValue(data.resName);
    this.branchForm.controls['ownerName'].setValue(data.ownerName);
    this.branchForm.controls['mobile'].setValue(data.mobile);
    this.branchForm.controls['email'].setValue(data.email);
    this.branchForm.controls['city'].setValue(data.city);

    // this.branchForm.controls.resName.value =  this.editbranch.restaurantName,
    // ownerName: this.editbranch.ownerName,
    //   mobile: this.editbranch.mobile,
    //     email: this.editbranch.email,
    //       city: this.editbranch.city,
    //         address: this.editbranch.address


  }


}
