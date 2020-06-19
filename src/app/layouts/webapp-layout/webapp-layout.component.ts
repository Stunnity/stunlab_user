import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/data/app/app-data.service';
import { TransferDataService } from 'src/app/services/data/shared/transfer-data.service';
import { UserDataService } from 'src/app/services/data/user/user-data.service';

@Component({
  selector: 'app-webapp-layout',
  templateUrl: './webapp-layout.component.html',
  styleUrls: ['./webapp-layout.component.css']
})
export class WebappLayoutComponent implements OnInit {

  constructor(
    private transferService: TransferDataService,
    private userService: UserDataService) { }

  ngOnInit() {
    this.getUser();
    this.getStatistics();
  }


  getUser() {
    this.userService.authUser().subscribe((user) => {
      this.transferService.setUser(user);
    });
  }

  getStatistics() {
    this.userService.userStatistics().subscribe(stats => {
      this.transferService.setUserStatistics(stats);
    });
  }

}
