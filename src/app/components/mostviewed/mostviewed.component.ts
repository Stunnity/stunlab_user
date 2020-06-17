import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppDataService } from '../../services/app-data/app-data.service';
import { TransferDataService } from '../../services/shared-data/transfer-data.service';
import { BookDataService } from '../../services/book-data/book-data.service';
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
export class MostviewedComponent implements OnInit, OnDestroy {
  gotBookResponse: boolean;
  isLoggedIn: any;
  isNotConnected: boolean;
  number_downloads: number;
  number_books: number;
  number_readers: number;
  level_books: any[];
  authUser: any;
  levelBooks: any[] = [];
  visitedLevels: any[] = [];

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
  }
  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url)
  }
  getTrendingLevels() {
    this.transferDataService.getMostViewedLevels().subscribe(res => {
      if (empty(res)) {
        return;
      }
      this.mostViewedLevels = res;
      this.getLevelBooks(this.mostViewedLevels[0]);
    });
  }
  ngOnDestroy() {
    this.transferDataService.setGotLevels(this.visitedLevels);
    this.transferDataService.setGotLevelBooks(this.levelBooks);
  }
  returnBooks(level, cache) {
    if (!cache) {
      this.gotBookResponse = false;
      this.bookData.getLevelBooks(level).subscribe(
        (res: any[]) => {
          let array = [];
          for (const book of res["data"]) {
            array.push(book.book)
          }
          this.gotBookResponse = true;
          this.level_books = array;
          const levelBook = {
            level: level,
            data: res["data"]
          }
          this.levelBooks.push(levelBook);
          bookSwiper();
        },
        (err) => {

        }
      );
    } else {
      this.gotBookResponse = false;
      this.bookData.getLevelBooks(level).subscribe(
        (res: any[]) => {
          let array = [];
          for (const book of res["data"]) {
            array.push(book.book)
          }
          this.gotBookResponse = true;
          this.level_books = array;
          const levelBook = {
            level: level,
            data: res["data"]
          }

          this.transferDataService.getGotLevels().subscribe(res => {
            this.visitedLevels = res as any;
            if (this.visitedLevels.indexOf(level) === -1)
              this.visitedLevels.push(level);
            this.transferDataService.getGotLevelBooks().subscribe(res => {
              this.levelBooks = res as any;
              if (this.levelBooks.indexOf(levelBook) === -1)
                this.levelBooks.push(levelBook);
            }
            )
          })
          bookSwiper();
        },
        (err) => {

        }
      );
    }
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
    this.transferDataService.getMostViewedLevelNavigation().subscribe(res => {
      const thisNavigation = res;
      if (thisNavigation !== 0) {
        this.transferDataService.getGotLevelBooks().subscribe(res => {
          let response: any = res;
          let filterArray = response.filter(obj => {
            return obj.level === level
          });
          if (empty(filterArray)) {
            this.returnBooks(level, true);
            return
          }
          else {
            filterArray = filterArray[0]["data"];
            let array = [];
            for (const book of filterArray) {
              array.push(book.book)
            }
            this.level_books = array;

            this.gotBookResponse = true;
            bookSwiper();
          }
        })

      } else {
        if (this.visitedLevels.indexOf(level) === -1) {
          this.visitedLevels.push(level);

          this.gotBookResponse = false;
          this.returnBooks(level, false);
        }
        else {
          let filterArray = this.levelBooks.filter(obj => {
            return obj.level === level
          })
          filterArray = filterArray[0]["data"];
          let array = [];
          for (const book of filterArray) {
            array.push(book.book)
          }
          this.level_books = array;
          bookSwiper();
        }
      }
    })

  }
  navigateLogin() {
    this._router.navigate(['/login'], { queryParams: { logged_in: false } });
  }
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }
}
