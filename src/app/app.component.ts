import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';
import { AppDataService } from './services/data/app/app-data.service';
import { TransferDataService } from './services/data/shared/transfer-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appService: AppDataService,
    private transferService: TransferDataService
  ) { }

  title = 'stunlab';
  isOnline: boolean;
  categories: any[];
  mostViewedCategories: any[];
  mostViewedLevels: any[];
  userBooks: any[];
  windowWidth: number;

  isLoader: boolean;

  ngOnInit(): void {
    if ($(window).width() < 450) {
      this.mobileApp();
    }
    this.getCategories();
  }

  getCategories() {
    this.appService.getCategories().subscribe(
      (categories) => {
        this.transferService.setCategories((categories as any[]));
      },
    );
  }


  mobileApp() {
    this.document.location.href = 'https://stunlabmobile.herokuapp.com';
  }
}
