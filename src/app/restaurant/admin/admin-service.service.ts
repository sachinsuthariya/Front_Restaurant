import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  restaurantData = {};
  constructor(private http: HttpClient) {

  }

  listRestaurant() {
    return this.http.get(environment.API_URL + "restaurant/getRestaurant");
  }

  onRestaurant(restName, rest_id) {
    return this.restaurantData = {
      restName: restName,
      rest_id: rest_id
    };
    
  }
}
