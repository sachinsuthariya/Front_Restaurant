import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-menu-item',
  templateUrl: './list-menu-item.component.html',
  styleUrls: ['./list-menu-item.component.css']
})
export class ListMenuItemComponent implements OnInit, OnDestroy {
  menuListSubscription: Subscription;

  MenuList = [];
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuListSubscription = this.menuService.getMenuList()
      .subscribe(response => {
        let res = response;
        this.MenuList = res["body"];
        console.log("get menu list", res);
      });
  }

  ngOnDestroy() {
    if (this.menuListSubscription) {
      this.menuListSubscription.unsubscribe();
    }
  }

}
