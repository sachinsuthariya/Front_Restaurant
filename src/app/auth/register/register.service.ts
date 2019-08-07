import { OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../../environments/environment";
@Injectable({
    providedIn: "root"
})
export class RegisterService implements OnInit {
    constructor(private http: HttpClient) {

    }

    registerRestaurant(restaurantData: object) {
        return this.http.post(environment.API_URL + "restaurant/register", restaurantData);
    }


    ngOnInit() {

    }
}