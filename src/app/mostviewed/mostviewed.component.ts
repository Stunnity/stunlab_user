import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../services/app-data/app-data.service';
import { TransferDataService } from '../services/shared-data/transfer-data.service';
import { BookDataService } from '../services/book-data/book-data.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { empty, sanitize } from 'src/utils/common';
import { DomSanitizer } from '@angular/platform-browser';


declare const bookSwiper: any;

@Component({
  selector: 'app-mostviewed',
  templateUrl: './mostviewed.component.html',
  styleUrls: ['./mostviewed.component.css'],
})
export class MostviewedComponent implements OnInit {
  gotBookResponse: boolean;
  isLoggedIn: any;
  isNotConnected: boolean;
  number_downloads: number;
  number_books: number;
  number_readers: number;
  level_books: any[];
  authUser: any;

  constructor(
    private appData: AppDataService,
    private bookData: BookDataService,
    private _router: Router,
    private sharedData: TransferDataService,
    private transferDataService: TransferDataService,
    private sanitizer: DomSanitizer
  ) { }

  mostViewedLevels: any;

  ngOnInit() {
    this.getTrendingLevels();
    setTimeout(() => {
      this.authUser = this.sharedData.getUser();
    }, 3000);
  }
  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url)
  }
  getTrendingLevels() {
    this.transferDataService.getMostViewedLevels().subscribe(res => {
      if (empty(res)) {
        return;
      }
      console.log(res);
      this.mostViewedLevels = res;
      this.getLevelBooks(this.mostViewedLevels[0]);

    });
  }
  getLevelBooks(level, event?) {
    if (event) {
      const element: any = event.target.id;
      if ($(`#${element}`).hasClass('active')) {
        return;
      }
      $(`#${element}`).siblings().removeClass('active');
      $(`#${element}`).addClass('active');
    }
    this.gotBookResponse = false;
    this.bookData.getLevelBooks(level).subscribe(
      (res: any) => {
        let array = [];
        for (const book of res["data"]) {
          array.push(book.book)
        }
        this.gotBookResponse = true;
        this.level_books = array;
        bookSwiper();

      },
    );
  }
  navigateLogin() {
    this._router.navigate(['/login'], { queryParams: { logged_in: false } });
  }
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }
}
