import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  onLogin(loginData: object) {
    return this.http.post(environment.API_URL + "restaurant/login", loginData);
  }

  isLogin() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getLocalStorageData() {
    return {
      _id: localStorage.getItem("_id"),
      restaurantName: localStorage.getItem("restaurantName"),
      username: localStorage.getItem("username"),
      ownerName: localStorage.getItem("ownerName"),
      city: localStorage.getItem("city"),
      address: localStorage.getItem("address")
    };
  }

  Logout() {
    return localStorage.clear();
  }
}
