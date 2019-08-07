import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  AddMenu(MenuItem) {
    return this.http.post(environment.API_URL + "restaurant/addMenu", MenuItem);
  }

  getMenuList() {
    return this.http.get(environment.API_URL + "restaurant/getMenu");
  }
}
