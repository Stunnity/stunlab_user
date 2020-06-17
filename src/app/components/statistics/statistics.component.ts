import { Component, OnInit } from '@angular/core';
import { TransferDataService } from 'src/app/services/shared-data/transfer-data.service';
import { empty } from 'src/app/utils/common';
import { AppDataService } from 'src/app/services/app-data/app-data.service';

declare const statisticsCounter: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  isNotConnected: boolean = true;
  books: number;
  downloads: number;
  readers: number;

  constructor(private transferService: TransferDataService, private appService: AppDataService) { }

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.transferService.getIsAppStatisticsSet().subscribe(res => {
      if (res === 0) {
        this.appService.getStatistics().subscribe(
          (res: any) => {
            this.transferService.setStatistics(res);
          },
        );
      }
      else {
        this.transferService.getStatistics().subscribe(res => {
          if (empty(res))
            return;
          this.isNotConnected = false;
          this.books = res["books"];
          this.downloads = res["downloads"];
          this.readers = res["users"];
          setTimeout(() => {
            statisticsCounter();
          }, 1000);
        });
      }
    })

  }
}
