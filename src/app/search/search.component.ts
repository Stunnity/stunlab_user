import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDataService } from '../services/book-data/book-data.service';
import { TransferDataService } from '../services/shared-data/transfer-data.service';

import * as _ from 'lodash';
import { sanitize } from 'src/utils/common';
import { DomSanitizer } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  total: string | number;
  isLoggedIn: boolean;
  user_id: string;
  gotResults: number = 2;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private bookData: BookDataService,
    private transferDataService: TransferDataService,
    private sanitizer: DomSanitizer
  ) { }
  _book: string;
  _level: string;
  _category: string;
  isNotConnected: boolean
  _provider: string;
  query = '';
  None = 'No';
  searchKey: string;
  books: any[];

  ngOnInit() {
    this.isLoggedIn = this.transferDataService.loggedIn();
    this.route.queryParams.subscribe((params) => {
      this.reset();
      this.query = '';
      this.searchKey =
        params.q ||
        params.category ||
        params.level ||
        params.provider;
      for (const param in params) {
        this.query += param + '=' + params[param] + '&';
      }

      this.query = this.query.substring(0, this.query.length - 1);
      this.bookData.searchBooks(this.query).subscribe(
        (res: any) => {
          this.gotResults = 1;
          let array = [];
          for (const book of res["data"]) {
            array.push(book.book)
          }
          this.books = array;
          this.total = this.books.length;
          if (this.total === 0)
            this.gotResults = 0;
          this.isNotConnected = false;
        },
        (error) => {
        }
      );
    });
  }
  filterBooks(event) {
    const key = event.target.id;
    this.books = this.sort(this.books, key);
  }
  sort(array, key) {
    return _.orderBy(array, [key], ['desc']);
  }
  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url)
  }
  likeBook(book) {
    if (!this.isLoggedIn) {
      this._router.navigate(['/login'], { queryParams: { logged_in: false } });
    } else {
      this.bookData.likeBook(book).subscribe(
        (res) => { },
        (err) => { }
      );
    }
  }
  dislikeBook(book) {
    if (!this.isLoggedIn) {
      this._router.navigate(['/login'], { queryParams: { logged_in: false } });
    } else {
      this.bookData.dislikeBook(book).subscribe(
        (res) => { },
        (err) => { }
      );
    }
  }
  readBook(book) {
    if (!this.isLoggedIn) {
      this._router.navigate(['/login'], { queryParams: { logged_in: false } });
    } else {
      this._router.navigate(['/read/book'], { queryParams: { ISBN: book } });
      this.bookData.readBook(book).subscribe(
        (res) => { },
        (err) => { }
      );
    }
  }
  bookmark(book, event?) {
    if (!this.isLoggedIn) {
      this._router.navigate(['/login'], { queryParams: { logged_in: false } });
    } else {
      const button = event.target;
      button.innerHTML = '...';
      this.bookData.bookmarkBooks(book).subscribe(
        (res) => { },
        (err) => {
          setTimeout(() => {
            if (!this.hasClass(button, 'bg-success')) {
              button.innerHTML = 'Bookmarked';
              button.classList.add('bg-success');
              button.classList.remove('bg-danger');
            } else {
              button.innerHTML = 'Bookmark';
              button.classList.remove('bg-success');
              button.classList.add('bg-danger');
            }
          }, 4000);
        }
      );
    }
  }
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }
  reset() {
    this.isNotConnected = true;
    this.books = [];
    this.gotResults = 2;
  }
}
