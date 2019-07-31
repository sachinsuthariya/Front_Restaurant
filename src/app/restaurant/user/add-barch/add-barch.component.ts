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
  editbranchDataSubscription: Subscription;
  editBranchSubscription: Subscription;

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
  formTitle = "Add Branch";
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
      this.editbranchDataSubscription = this.admin.share_EditBranch.subscribe(res => {
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

    if (this.editbranchDataSubscription) {
      this.editbranchDataSubscription.unsubscribe();
    }

    if (this.editBranchSubscription) {
      this.editBranchSubscription.unsubscribe();
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
    // return console.log("add branch");

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
          this.notifier.notify("error", response["message"]);
        }

        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });

  }

  edit() {

    this.branchForm.reset();
    this.admin.isedit = false;

    this.formTitle = "Edit Branch";

    let data = {
      resName: this.editbranch.restaurantName,
      ownerName: this.editbranch.ownerName,
      mobile: this.editbranch.mobile,
      email: this.editbranch.email,
      city: this.editbranch.city,
      address: this.editbranch.address
    }

    this.branchForm.controls['resName'].setValue(data.resName);
    this.branchForm.controls['ownerName'].setValue(data.ownerName);
    this.branchForm.controls['address'].setValue(data.mobile);
    this.branchForm.controls['mobile'].setValue(data.mobile);
    this.branchForm.controls['email'].setValue(data.email);
    this.branchForm.controls['city'].setValue(data.city);

  }

  onEditBranch() {
    // console.log("edit function ");

    this.isSubmitted = true;

    if (this.branchForm.invalid) {
      return;
    }
    if (this.branchForm.pristine) {
      return this.notifier.notify("warning", "No change detect");
    }
    else {
      let data = {
        ID: this.editbranch._id,
        restaurantID: this.editbranch.restaurantID,
        Parent_Rest: this.editbranch.Parent_Rest,
        ownerName: this.branchForm.controls.ownerName.value,
        restaurantName: this.branchForm.controls.resName.value,
        city: this.branchForm.controls.city.value,
        address: this.branchForm.controls.address.value,
        email: this.branchForm.controls.email.value,
        mobile: this.branchForm.controls.mobile.value,
      }

      this.spinner.show();
      this.editBranchSubscription = this.userService.updateBranch(data)
        .subscribe(res => {
          const response = res;
          console.log("response of ", res);

          if (response["success"]) {

            this.notifier.notify("success", response["message"]);

          } else {
            this.notifier.notify("error", response["message"]);
          }

          this.spinner.hide();
        }, err => {
          this.spinner.hide();
        });

    }
  }

}
