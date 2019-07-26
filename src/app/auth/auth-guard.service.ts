import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.loginService.isLogin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
