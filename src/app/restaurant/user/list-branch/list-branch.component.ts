import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { LoginService } from 'src/app/auth/login/login.service';
import { Subscription } from 'rxjs';
import { AdminComponent } from '../../admin/admin.component';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.css']
})
export class ListBranchComponent implements OnInit, OnDestroy {

  branchListSubscription: Subscription;
  branchList: any = [];
  branchFilter: any = [];
  constructor(private userService: UserServiceService,
    private loginService: LoginService,
    private user: UserComponent) { }

  ngOnInit() {
    let data = this.loginService.getLocalStorageData();
    this.userService.getBranchList(data.restaurantName, data._id);

    this.branchListSubscription = this.userService.listBranch
      .subscribe(res => {
        this.branchList = res;
        this.branchFilter = res;
        // console.log("branch lisr in list branch", this.branchList);
      });
  }

  ngOnDestroy() {
    if (this.branchListSubscription) {
      this.branchListSubscription.unsubscribe();
    }
  }

  // search_rest: string;
  search(event) {
    let search = event.srcElement.value;
    this.branchList = this.branchFilter.filter(ele => ele.restaurantName.toLowerCase().includes(search.toLowerCase()));
  }

  branch(event) {
    console.log(event.srcElement.value);
    let restaurantFilter = event.srcElement.value;
  }
}
