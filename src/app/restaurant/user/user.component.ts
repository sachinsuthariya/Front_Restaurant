import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminServiceService } from '../admin/admin-service.service';
import { UserServiceService } from './user-service.service';
import { LoginService } from 'src/app/auth/login/login.service';
import { AdminComponent } from '../admin/admin.component';
import { AddBarchComponent } from './add-barch/add-barch.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  Add_Branch = true;
  Mng_Branch = false;
  editData = {};
  edit_Branch = new BehaviorSubject(this.editData);
  share_EditBranch = this.edit_Branch.asObservable();

  Restaurant_Name: string;
  Restaurant_Id;


  constructor(private adminService: AdminServiceService,
    private userService: UserServiceService,
    private loginService: LoginService,
    private admin: AdminComponent
  ) { }


  ngOnInit() {
    let data = this.loginService.getLocalStorageData();
    // if (this.Mng_Branch) {
    //   this.Mng_Branch = true;
    //   this.Add_Branch = false
    // }
  }

  // addBranch(Restaurant_Name, Restaurant_Id) {
  //   console.log(Restaurant_Name, Restaurant_Id, "name and id of restauyramt add");
  //   this.Add_Branch = true;
  //   this.Add_Rest = false;
  //   this.Mng_Rest = false
  //   this.list_Branch = false;
  //   console.log(Restaurant_Name, Restaurant_Id, "name and id of restauyramt add");
  //   this.userService.addBranchData(Restaurant_Name, Restaurant_Id);
  //   // this.Restaurant_Name = "";
  //   console.log("after user servide call on Add ");

  // }

  // editBranch(Restaurant_Name, Restaurant_Id) {

  //   this.Add_Branch = false;
  //   this.Add_Rest = false;
  //   this.Mng_Rest = false
  //   this.list_Branch = true;
  //   console.log(Restaurant_Name, Restaurant_Id, "name and id of restauyramt editr");

  //   this.userService.getBranchList(Restaurant_Name, Restaurant_Id);
  //   console.log("after user servide call on edoit ");

  // }


  // isedit = false;

  // editBranchData(branch) {
  //   this.editData = branch;
  //   this.isedit = true;
  //   this.edit_Branch.next(this.editData);

  //   this.Add_Branch = true;
  //   this.list_Branch = false;
  //   this.Mng_Rest = false;
  //   this.Add_Rest = false;
  // }

  BranchName: string;
  BranchDetail: object;
  onBranchclick(branch) {
    console.log(branch, "from user branch");
    this.BranchDetail = branch;
    this.BranchName = branch.restaurantName;
    this.Add_Branch = false;
    this.Mng_Branch = true;
    // this.Add_Branch = true;
  }

  onEdit(branch) {
    this.Add_Branch = true;
    this.Mng_Branch = false;
    this.admin.editBranchData(branch);
  }

}
