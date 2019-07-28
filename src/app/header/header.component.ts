import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: boolean;
  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.loginService.Logout();
    this.router.navigate(["/login"]);
  }

}
