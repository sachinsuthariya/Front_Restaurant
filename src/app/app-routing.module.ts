import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './restaurant/admin/admin.component';
import { UserComponent } from './restaurant/user/user.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AddBarchComponent } from './restaurant/user/add-barch/add-barch.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuardService] },
  { path: "user", component: UserComponent, canActivate: [AuthGuardService] },
  { path: "addBranch", component: AddBarchComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
