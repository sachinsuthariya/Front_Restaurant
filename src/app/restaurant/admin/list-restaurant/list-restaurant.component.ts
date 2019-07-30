import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { element } from 'protractor';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.css']
})
export class ListRestaurantComponent implements OnInit {

  restaurantList = [];
  // search;
  // resName;
  constructor(private adminService: AdminServiceService) {


  }

  // search_rest: string;
  search(event) {
    console.log(event.srcElement.value, "evnt of searchh");
    // let search = event.srcElement.value;
    // this.restaurantList = this.restaurantList.filter(element => element === search);



  }

  restaurant(event) {
    console.log(event.srcElement.value);
    let restaurantFilter = event.srcElement.value;
  }
  ngOnInit() {
    this.getRestaurant();
  }

  getRestaurant() {
    this.adminService.listRestaurant()
      .subscribe(res => {
        console.log(res, "list restaurant ");
        let response = res;
        this.restaurantList = response["body"][0];

        // console.log(this.restaurantList);

      });
  }

  // onRestaurant(resId, resName) {
  //   console.log("onRestaurant click", resId, resName);

  // }

}
