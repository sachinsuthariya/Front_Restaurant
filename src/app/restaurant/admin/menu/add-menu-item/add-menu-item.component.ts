import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AdminServiceService } from '../../admin-service.service';
import { MenuService } from '../menu.service';
import { Subscription, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css']
})
export class AddMenuItemComponent implements OnInit, OnDestroy {
  category = [
    "Soup",
    "Starter",
    "Lunch",
    "Dinner"
  ];

  restaurantListSubsceiption: Subscription;
  RestaurantList = [];

  public imagePath;
  imgURL: any;
  public message: string;

  MenuForm: FormGroup;

  // filteredOptions;
  // control = new FormControl();
  // Restaurant;

  constructor(private formBuilder: FormBuilder,
    private menuService: MenuService,
    private adminService: AdminServiceService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService) { }

  ngOnInit() {

    //validations
    this.MenuForm = this.formBuilder.group({
      restaurantId: ["", Validators.required],
      item: ["", Validators.required],
      image: ["", Validators.required],
      price: ["", Validators.required],
      category: ["", Validators.required]
    });

    this.restaurantListSubsceiption = this.adminService.listRestaurant().subscribe(res => {

      this.RestaurantList = res["body"][0];
      console.log("restaurant detail lisr", res['body'][0]);
    });

    // this.filteredOptions = this.control.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => filterFn(value))
    //   );
  }

  // filterFn(value) {

  // }


  ngOnDestroy() {
    if (this.restaurantListSubsceiption) {
      this.restaurantListSubsceiption.unsubscribe();
    }
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      // console.log("image", this.imgURL);
      // console.log(this.MenuForm.controls.image.value);
    }
  }


  addMenu() {
    this.spinner.show();
    this.menuService.AddMenu(this.MenuForm.value)
      .subscribe(response => {
        let res = response;
        if (res["success"]) {
          this.notifier.notify("success", res["message"]);
        } else {
          this.notifier.notify("error", res["message"]);
        }
      }, err => {
        console.error(err);
      });
    this.spinner.hide();
  }


}
