import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from './admin-service.service';
import { UserServiceService } from '../user/user-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Add_Rest = true;
  Add_Branch = false;
  Mng_Rest = false;
  list_Branch = false;

  Restaurant_Name: string;
  Restaurant_Id;

  constructor(private adminService: AdminServiceService,
    private userService: UserServiceService) {


  }

  ngOnInit() {
    let data = this.adminService.restaurantData;
    // console.log("data of restaurantr", data);
  }

  addRest() {
    // this.addRestaurant = true;
    // this.Restaurant_Name = "";
    this.Add_Rest = true;
    this.Add_Branch = false;
    this.Mng_Rest = false;
    this.list_Branch = false;
  }

  onRestaurantData() {
    this.Mng_Rest = true;
    this.Restaurant_Name = this.adminService.restaurantData["restName"];
    this.Restaurant_Id = this.adminService.restaurantData["rest_id"]
    // console.log("data of restaurantr", this.adminService.restaurantData);
    // this.addRestaurant = false;
    this.Add_Rest = false;
    this.Add_Branch = false;
    this.list_Branch = false;

  }

  addBranch(Restaurant_Name, Restaurant_Id) {
    console.log(Restaurant_Name, Restaurant_Id, "name and id of restauyramt");
    this.Add_Branch = true;
    this.Add_Rest = false;
    this.Mng_Rest = false
    this.list_Branch = false;
    this.userService.addBranchData(Restaurant_Name, Restaurant_Id);
    // this.Restaurant_Name = "";
  }

  editBranch(Restaurant_Name, Restaurant_Id) {
    console.log(Restaurant_Name, Restaurant_Id, "name and id of restauyramt");

    this.Add_Branch = false;
    this.Add_Rest = false;
    this.Mng_Rest = false
    this.list_Branch = true;

    this.userService.getBranchList(Restaurant_Name, Restaurant_Id);
  }

}
