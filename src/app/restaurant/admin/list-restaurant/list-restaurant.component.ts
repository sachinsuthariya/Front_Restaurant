import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
// import { element } from 'protractor';

@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.css']
})
export class ListRestaurantComponent implements OnInit {

  restaurantList = [];
  restFilter = [];

  constructor(private adminService: AdminServiceService) {


  }

  // search_rest: string;
  search(event) {
    let search = event.srcElement.value;
    this.restaurantList = this.restFilter.filter(ele => ele.restaurantName.toLowerCase().includes(search.toLowerCase()));

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
        let response = res;
        this.restaurantList = response["body"][0];
        this.restFilter = this.restaurantList;

      });
  }


}
