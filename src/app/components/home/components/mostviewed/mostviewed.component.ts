import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppDataService } from '../../../../services/data/app/app-data.service';
import { TransferDataService } from '../../../../services/data/shared/transfer-data.service';
import { BookDataService } from '../../../../services/data/book/book-data.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { empty, sanitize, trimSpaces } from 'src/app/utils/common';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


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
  authUser: any;
  levelBooks: any[] = [];
  visitedLevels: any[] = [];
  bookPending: boolean;
  private readonly onDestroy = new Subject<void>();


  constructor(
    private bookData: BookDataService,
    private router: Router,
    private transferDataService: TransferDataService,
    private sanitizer: DomSanitizer
  ) { }

  mostViewedLevels: any[];

  ngOnInit() {
    this.getTrendingLevels();
  }
  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url);
  }
  getTrendingLevels() {
    this.transferDataService.getMostViewedLevels().subscribe(res => {
      if (empty(res)) {
        return;
      }
      this.mostViewedLevels = res as any[];
      this.getLevelBooks(this.mostViewedLevels[0].level);
    });
  }
  ngOnDestroy() {
    this.transferDataService.setGotLevels(this.visitedLevels);
    this.transferDataService.setGotLevelBooks(this.levelBooks);
    this.onDestroy.next();
  }
  returnBooks(level, cache) {
    if (!cache) {
      this.gotBookResponse = false;
      this.bookData.getLevelBooks(level).pipe(takeUntil(this.onDestroy)).subscribe(
        (res: any) => {
          this.gotBookResponse = true;
          const array = [];
          for (const book of res.data) {
            array.push(book.book);
          }
          this.levelBooks = array;
          const levelBook = {
            level,
            data: res.data
          };
          this.levelBooks.push(levelBook);
          this.bookPending = false;

          bookSwiper();
        },
        (err) => {

        }
      );
    } else {
      this.gotBookResponse = false;
      this.bookData.getLevelBooks(level).pipe(takeUntil(this.onDestroy)).subscribe(
        (res: any) => {
          const array = [];
          for (const book of res.data) {
            array.push(book.book);
          }
          this.gotBookResponse = true;
          this.levelBooks = array;
          this.bookPending = false;

          const levelBook = {
            level,
            data: res.data
          };
          this.transferDataService.getGotLevels().pipe(takeUntil(this.onDestroy)).subscribe(levels => {
            this.visitedLevels = levels as any;
            if (this.visitedLevels.indexOf(level) === -1) {
              this.visitedLevels.push(level);
            }
            this.transferDataService.getGotLevelBooks().pipe(takeUntil(this.onDestroy)).subscribe(books => {
              this.levelBooks = books as any;
              if (this.levelBooks.indexOf(levelBook) === -1) {
                this.levelBooks.push(levelBook);
              }
            }
            );
          });
          bookSwiper();
        },
      );
    }
  }
  trim(word) {
    return trimSpaces(word);
  }
  getLevelBooks(level, event?) {
    if (this.bookPending) {
      return;
    }
    this.bookPending = true;
    if (event) {
      const element: any = event.target.id;
      if ($(`#${element}`).hasClass('active')) {
        return;
      }
      $(`#${element}`).siblings().removeClass('active');
      $(`#${element}`).addClass('active');
    }
    this.transferDataService.getMostViewedLevelNavigation().pipe(takeUntil(this.onDestroy)).subscribe(set => {
      const thisNavigation = set;
      if (thisNavigation !== 0) {
        this.transferDataService.getGotLevelBooks().pipe(takeUntil(this.onDestroy)).subscribe(books => {
          const response: any = books;
          let filterArray = response.filter(obj => {
            return obj.level === level;
          });
          if (empty(filterArray)) {
            this.returnBooks(level, true);
            return;
          } else {
            filterArray = filterArray[0].data;
            const array = [];
            for (const book of filterArray) {
              array.push(book.book);
            }
            this.levelBooks = array;
            this.bookPending = false;

            this.gotBookResponse = true;
            bookSwiper();
          }
        });

      } else {
        if (this.visitedLevels.indexOf(level) === -1) {
          this.visitedLevels.push(level);

          this.gotBookResponse = false;
          this.returnBooks(level, false);
        } else {
          let filterArray = this.levelBooks.filter(obj => {
            return obj.level === level;
          });
          filterArray = filterArray[0].data;
          const array = [];
          for (const book of filterArray) {
            array.push(book.book);
          }
          this.levelBooks = array;
          this.bookPending = false;

          bookSwiper();
        }
      }
    });

  }
  navigateLogin() {
    this.router.navigate(['/login'], { queryParams: { logged_in: false } });
  }
}
