import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  branchList: [];
  listBranch = new BehaviorSubject(this.branchList);
  share_BranchList = this.listBranch.asObservable();



  RestaurantObj = {};
  constructor(private http: HttpClient,
    private router: Router) { }

  AddBranch(branchData: object) {
    return this.http.post(environment.API_URL + "restaurant/addBranch", branchData);
  }

  addBranchData(Restaurant_Name, Restaurant_Id) {
    console.log("in user sevice ad branch", Restaurant_Name, Restaurant_Id);

    return this.RestaurantObj = {
      RestaurantName: Restaurant_Name,
      RestaurantId: Restaurant_Id
    };

  }

  getBranchData() {
    return this.RestaurantObj;
  }

  getBranchList(RestaurantName, RestaurantId) {
    console.log("i ma branch list");
    let branchData = {
      RestaurantName: RestaurantName,
      RestaurantId: RestaurantId
    };
    this.http.post(environment.API_URL + "restaurant/getBranchList", branchData)
      .subscribe(response => {
        let res = response;
        this.branchList = res["body"];

        console.log("branch List", this.branchList);
        this.listBranch.next(this.branchList);
        // return res["body"];
      });
  }

  updateBranch(updateData: any) {
    return this.http.put(environment.API_URL + "restaurant/updateBranch", updateData);
  }

  // userEdit(data) {
  //   return data = true;
  // }

}
