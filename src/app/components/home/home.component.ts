import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookDataService } from '../../services/data/book/book-data.service';
import { TransferDataService } from '../../services/data/shared/transfer-data.service';
import { Router } from '@angular/router';
import { empty, sanitize, trimSpaces, setToActive } from '../../utils/common';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare const bookSwiper: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private bookData: BookDataService,
    private transferDataService: TransferDataService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }
  invalidContactData: boolean;
  booksPending: boolean;
  private readonly onDestroy = new Subject<void>();
  gotBookResponse: boolean;
  mostViewedCategories: any;
  incomingCategoryRequests: any[] = [];
  pendingCategoryBooks: boolean;
  visitedCategories: any[] = [];
  categoryBooks: any[] = [];

  ngOnDestroy(): void {
    this.transferDataService.setGotCategories(this.visitedCategories);
    this.transferDataService.setGotCategoryBooks(this.categoryBooks);
    this.onDestroy.next();

    return;
  }

  ngOnInit() {
    this.gotBookResponse = false;
    this.pendingCategoryBooks = false;
    this.getMostViewedCategories();
  }

  getMostViewedCategories() {
    this.transferDataService.getMostViewedCategories().subscribe(res => {
      if (empty(res)) {
        return;
      }
      this.mostViewedCategories = res;
      this.getCategoryBooks(this.mostViewedCategories[0].category);
    });
  }

  trim(word) {
    return trimSpaces(word);
  }

  getCategoryBooks(category, event?) {
    if (this.booksPending) {
      return;
    }
    this.booksPending = true;
    if (event) {
      setToActive(event.target.id, 'active');
    }
    this.transferDataService.getHomeNavigation().subscribe(set => {
      const homeNavigation = set;
      if (homeNavigation !== 0) {
        this.transferDataService.getGotCategoryBooks().pipe(takeUntil(this.onDestroy)).subscribe(books => {
          const response: any = books;
          let filterArray = response.filter(obj => {
            return obj.category === category;
          });
          if (empty(filterArray)) {
            this.returnBooks(category, true);
            return;
          } else {
            filterArray = filterArray[0].data;
            const array = [];
            for (const book of filterArray) {
              array.push(book.book);
            }
            this.categoryBooks = array;
            this.gotBookResponse = true;
            this.booksPending = false;
          }
        });

      } else {
        if (this.visitedCategories.indexOf(category) === -1) {
          this.visitedCategories.push(category);

          this.gotBookResponse = false;
          this.returnBooks(category, false);
        } else {
          let filterArray = this.categoryBooks.filter(obj => {
            return obj.category === category;
          });
          filterArray = filterArray[0].data;
          const array = [];
          for (const book of filterArray) {
            array.push(book.book);
          }
          this.categoryBooks = array;
          this.booksPending = false;

        }
      }
    });

  }
  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url);
  }

  returnBooks(category, cache) {
    if (!cache) {
      this.gotBookResponse = false;
      this.bookData.getCategoryBooks(category).pipe(takeUntil(this.onDestroy)).subscribe(
        (res: any) => {
          const array = [];
          for (const book of res.data) {
            array.push(book.book);
          }
          this.gotBookResponse = true;
          this.categoryBooks = array;
          const categoryBook = {
            category,
            data: res.data
          };
          this.categoryBooks.push(categoryBook);
          this.booksPending = false;
          bookSwiper();
        },
        (err) => {
          this.pendingCategoryBooks = false;
        }
      );
    } else {
      this.gotBookResponse = false;
      this.bookData.getCategoryBooks(category).pipe(takeUntil(this.onDestroy)).subscribe(
        (res: any) => {
          const array = [];
          for (const book of res.data) {
            array.push(book.book);
          }
          this.gotBookResponse = true;
          this.categoryBooks = array;
          this.booksPending = false;

          const categoryBook = {
            category,
            data: res.data
          };
          bookSwiper();
          this.transferDataService.getGotCategories().pipe(takeUntil(this.onDestroy)).subscribe(categories => {
            this.visitedCategories = categories as any;
            if (this.visitedCategories.indexOf(category) === -1) {
              this.visitedCategories.push(category);
            }
            this.transferDataService.getGotCategoryBooks().subscribe(books => {
              this.categoryBooks = books as any;
              if (this.categoryBooks.indexOf(categoryBook) === -1) {
                this.categoryBooks.push(categoryBook);
              }
            }
            );
          });
        },
        (err) => {
          this.pendingCategoryBooks = false;
        }
      );
    }
  }

  sendToLogin() {
    this.router.navigate(['/login'], { queryParams: { logged_in: false } });
  }

}
