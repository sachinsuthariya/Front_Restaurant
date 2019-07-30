import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.css']
})
export class ManageBranchComponent implements OnInit {
  branchList: any;
  branchsubscription: Subscription;

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.userService.share_BranchList
      .subscribe(res => {
        console.log("response of obs", res);
        this.branchList = res;
        console.log(this.branchList, "branch list in manage branch");
      });
  }


}
