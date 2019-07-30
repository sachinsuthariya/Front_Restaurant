import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Subscription } from 'rxjs';
import { AdminComponent } from '../../admin/admin.component';

@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.css']
})
export class ManageBranchComponent implements OnInit, OnDestroy {
  branchList: any;
  branchsubscription: Subscription;

  constructor(private userService: UserServiceService,
    private admin: AdminComponent) { }

  ngOnInit() {
    this.branchsubscription = this.userService.share_BranchList
      .subscribe(res => {
        this.branchList = res;
      });
  }

  ngOnDestroy() {
    if (this.branchsubscription) {
      this.branchsubscription.unsubscribe();
    } 
  }

}
