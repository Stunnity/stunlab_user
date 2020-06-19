import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/data/app/app-data.service';
import { TransferDataService } from 'src/app/services/data/shared/transfer-data.service';

@Component({
  selector: 'app-webpage-layout',
  templateUrl: './webpage-layout.component.html',
  styleUrls: ['./webpage-layout.component.css']
})
export class WebpageLayoutComponent implements OnInit {
  loggedIn: boolean;
  constructor(private appService: AppDataService, private transferService: TransferDataService) { }

  ngOnInit() {
    this.getMostViewedCategories();
    this.getMostViewedLevels();
    this.getStats();

  }

  getMostViewedCategories() {
    this.appService.getMostViewedCategories().subscribe(
      (categories: any[]) => {
        this.transferService.setMostViewedCategories((categories as any[]).slice(0, 4));
      },
    );
  }
  getMostViewedLevels() {
    this.appService.getMostViewedLevels().subscribe(
      (levels: any[]) => {
        this.transferService.setMostViewedLevels((levels as any[]).slice(0, 4));
      },
    );
  }





  getStats() {
    this.appService.getStatistics().subscribe(
      (res: any) => {
        this.transferService.setStatistics(res);
      },
    );
  }
}
