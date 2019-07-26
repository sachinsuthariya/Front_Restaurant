import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: boolean;
  constructor(private loinServie: LoginService) { }

  ngOnInit() {
    this.user = this.loinServie.isLogin();
    console.log(this.user);

  }



}
