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
  imgsrc = "https://www.google.com/imgres?imgurl=https%3A%2F%2F3s9u5fg129b3thr2z48fy1hv-wpengine.netdna-ssl.com%2Fwp-content%2Fuploads%2F2018%2F03%2Fstarr-restaurants-logo-blue.png&imgrefurl=https%3A%2F%2Fstarr-restaurants.com%2Fproduct%2Fclassic-gift-cards%2F&docid=Sf9Z4Y6gQ77cAM&tbnid=WNfMlS-YqQYT3M%3A&vet=10ahUKEwj4l-6J6-vjAhWUWX0KHWaVALcQMwjdAShXMFc..i&w=800&h=378&bih=981&biw=1853&q=restaurant%20logo%20png&ved=0ahUKEwj4l-6J6-vjAhWUWX0KHWaVALcQMwjdAShXMFc&iact=mrc&uact=8";

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
