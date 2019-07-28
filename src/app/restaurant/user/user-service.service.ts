import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  RestaurantObj = {};
  constructor(private http: HttpClient) { }

  AddBranch(branchData: object) {
    // console.log(branchData, "bramdch data from serviece");

    return this.http.post(environment.API_URL + "restaurant/addBranch", branchData);
  }

  addBranchData(Restaurant_Name, Restaurant_Id) {
    return this.RestaurantObj = {
      RestaurantName: Restaurant_Name,
      RestaurantId: Restaurant_Id
    };

  }

  getBranchData() {
    return this.RestaurantObj;
  }
}
