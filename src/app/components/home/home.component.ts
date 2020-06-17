import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { AppDataService } from '../../services/app-data/app-data.service';
import { BookDataService } from '../../services/book-data/book-data.service';
import { TransferDataService } from '../../services/shared-data/transfer-data.service';
import { Router } from '@angular/router';
import { empty, sanitize } from 'src/utils/common';
import { DomSanitizer } from '@angular/platform-browser';
declare const bookSwiper: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  invalidContactData: boolean;
  report_message: string;

  constructor(
    private appData: AppDataService,
    private bookData: BookDataService,
    private transferDataService: TransferDataService,
    private _router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnDestroy(): void {
    this.transferDataService.setGotCategories(this.visitedCategories);
    this.transferDataService.setGotCategoryBooks(this.categoryBooks);
    return;
  }

  user_id: string;
  userdata: any;
  category_books: any[];
  isLoggedIn: any;
  gotBookResponse = false;
  mostViewedCategories: any[];
  incomingCategoryRequests = [];
  pendingCategoryBooks: boolean = false;
  visitedCategories: any[] = [];
  categoryBooks: any[] = [];

  ngOnInit() {
    this.isLoggedIn = this.transferDataService.loggedIn();

    this.getMostViewedCategories();
    // interval(1000).subscribe((val) => this.disableContactBtn());
  }

  getMostViewedCategories() {
    this.transferDataService.getMostViewedCategories().subscribe(res => {
      if (empty(res)) {
        return;
      }
      this.mostViewedCategories = ['Literature', 'Language', 'Science', 'Humanity'];
      this.getCategoryBooks(this.mostViewedCategories[0]);

    });
  }

  getCategoryBooks(category, event?) {
    if (event) {
      const element: any = event.target.id;
      if ($(`#${element}`).hasClass('active')) {
        return;
      }
      $(`#${element}`).siblings().removeClass('active');
      $(`#${element}`).addClass('active');
    }
    this.transferDataService.getHomeNavigation().subscribe(res => {
      const homeNavigation = res;
      if (homeNavigation !== 0) {
        this.transferDataService.getGotCategoryBooks().subscribe(res => {
          let response: any = res;
          let filterArray = response.filter(obj => {
            return obj.category === category
          });
          if (empty(filterArray)) {
            this.returnBooks(category, true);
            return
          }
          else {
            filterArray = filterArray[0]["data"];
            let array = [];
            for (const book of filterArray) {
              array.push(book.book)
            }
            this.category_books = array;

            this.gotBookResponse = true;
          }
        })

      } else {
        if (this.visitedCategories.indexOf(category) === -1) {
          this.visitedCategories.push(category);

          this.gotBookResponse = false;
          this.returnBooks(category, false);
        }
        else {
          let filterArray = this.categoryBooks.filter(obj => {
            return obj.category === category
          })
          filterArray = filterArray[0]["data"];
          let array = [];
          for (const book of filterArray) {
            array.push(book.book)
          }
          this.category_books = array;
        }
      }
    })

  }
  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url)
  }

  returnBooks(category, cache) {
    if (!cache) {
      this.gotBookResponse = false;
      this.bookData.getCategoryBooks(category).subscribe(
        (res: any[]) => {
          let array = [];
          for (const book of res["data"]) {
            array.push(book.book)
          }
          this.gotBookResponse = true;
          this.category_books = array;
          const categoryBook = {
            category: category,
            data: res["data"]
          }
          this.categoryBooks.push(categoryBook);
          bookSwiper();
        },
        (err) => {
          this.pendingCategoryBooks = false;
        }
      );
    } else {
      this.gotBookResponse = false;
      this.bookData.getCategoryBooks(category).subscribe(
        (res: any[]) => {
          let array = [];
          for (const book of res["data"]) {
            array.push(book.book)
          }
          this.gotBookResponse = true;
          this.category_books = array;
          const categoryBook = {
            category: category,
            data: res["data"]
          }
          bookSwiper();
          this.transferDataService.getGotCategories().subscribe(res => {
            this.visitedCategories = res as any;
            if (this.visitedCategories.indexOf(category) === -1)
              this.visitedCategories.push(category);
            this.transferDataService.getGotCategoryBooks().subscribe(res => {
              this.categoryBooks = res as any;
              if (this.categoryBooks.indexOf(categoryBook) === -1)
                this.categoryBooks.push(categoryBook);
            }

            )
          })
        },
        (err) => {
          this.pendingCategoryBooks = false;
        }
      );
    }
  }
  sendToLogin() {
    this._router.navigate(['/login'], { queryParams: { logged_in: false } });
  }
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }


}
