import { Component, OnInit } from '@angular/core';
import { TransferDataService } from 'src/app/services/data/shared/transfer-data.service';
import { empty } from 'src/app/utils/common';
import { AppDataService } from 'src/app/services/data/app/app-data.service';

declare const statisticsCounter: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  isNotConnected = true;
  books: number;
  downloads: number;
  readers: number;

  constructor(private transferService: TransferDataService, private appService: AppDataService) { }

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.transferService.getIsAppStatisticsSet().subscribe(set => {
      if (set === 1) {
        this.transferService.getStatistics().subscribe((stats: any) => {
          if (empty(stats)) {
            return;
          }
          this.isNotConnected = false;
          this.books = stats.books;
          this.downloads = stats.downloads;
          this.readers = stats.users;
          setTimeout(() => {
            statisticsCounter();
          }, 1000);
        });
      }
    });

  }
}
