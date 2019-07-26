import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NotifierModule } from "angular-notifier";
import { NgxSpinnerModule } from "ngx-spinner";
import { RestaurantComponent } from './restaurant/restaurant.component';
import { UserComponent } from './restaurant/user/user.component';
import { AdminComponent } from './restaurant/admin/admin.component';
import { ListRestaurantComponent } from './restaurant/admin/list-restaurant/list-restaurant.component';
import { AddBarchComponent } from './restaurant/user/add-barch/add-barch.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    RestaurantComponent,
    UserComponent,
    AdminComponent,
    ListRestaurantComponent,
    AddBarchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
