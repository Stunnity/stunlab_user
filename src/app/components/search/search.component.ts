import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDataService } from '../../services/data/book/book-data.service';
import { TransferDataService } from '../../services/data/shared/transfer-data.service';
import * as _ from 'lodash';
import { sanitize, isElement, empty, sort, implementLikeAndDislike, toogleClass } from '../../utils/common';
import { DomSanitizer } from '@angular/platform-browser';
import { paginate } from 'src/app/utils/pagination';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  isPending: boolean;
  total: string | number;
  isLoggedIn: boolean;
  gotResults: number;
  bookPage: number;
  visitedPagesArray: any[] = [];
  totalPages: number;
  pagesDataArray: any[] = [];
  pagePending: any;
  dislikeLoading: boolean;
  likeLoading: boolean;
  isNotConnected: boolean;
  query: string;
  searchKey: string;
  books: any[];
  paramsValid: boolean;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookData: BookDataService,
    private transferDataService: TransferDataService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.transferDataService.loggedIn();
    this.route.queryParams.subscribe((params) => {
      this.searchKey =
        params.q ||
        params.category ||
        params.level ||
        params.provider;

      if (empty(params) || (this.searchKey) === undefined) {
        this.paramsValid = false;
        return;
      }

      this.reset();
      this.searchKey =
        params.q ||
        params.category ||
        params.level ||
        params.provider;
      // tslint:disable-next-line: forin
      for (const param in params) {
        this.query += param + '=' + params[param] + '&';
      }
      this.query = this.query.substring(0, this.query.length - 1);
      this.searchBooks();
    });
  }
  searchBooks(page = this.bookPage) {
    if (this.isPending) {
      return;
    }
    this.isPending = true;
    this.isNotConnected = true;

    if (isElement(this.visitedPagesArray, this.bookPage)) {
      this.visitedPagesArray.push(this.bookPage);

      this.bookData.searchBooks(this.query, page).subscribe(
        (res: any) => {
          this.isPending = false;
          this.pagePending = false;
          this.gotResults = 1;
          const array = [];
          this.total = res.total;
          if (this.total === 0) {
            this.gotResults = 0;
          }

          this.totalPages = Math.ceil(res.total / res.per_page);
          for (const book of res.data) {
            array.push(book.book);
          }
          this.books = array;

          const pageData = {
            page: this.bookPage,
            books: this.books
          };
          this.pagesDataArray.push(pageData);
          this.isNotConnected = false;
        }
      );
    } else {
      this.isPending = false;
      this.pagePending = false;
      if (empty(this.pagesDataArray)) {
        return;
      }

      const array = this.pagesDataArray.filter(obj => {
        return obj.page === page;
      });

      if (empty(array)) {
        return;
      }

      this.pagePending = false;
      this.books = array[0].books;
      this.gotResults = 1;
    }
  }


  filterBooks(event) {
    const key = event.target.id;
    if (key === 'bookName') {
      this.books = sort(this.books, key, true);
    } else {
      this.books = sort(this.books, key);
    }
  }


  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url);
  }

  likeBook(book, event?) {
    if (!this.isLoggedIn) {
      this.sendToLogin();
    }

    const element = document.getElementById(event.target.id) as HTMLButtonElement;
    element.style.pointerEvents = 'none';
    this.likeLoading = true;
    this.bookData.likeBook(book).subscribe(
      (res) => {
        implementLikeAndDislike(event.target.id, element, 'liked');
        this.likeLoading = false;
        this.transferDataService.setUserBooksDataSet(0);
      }
    );
  }



  dislikeBook(book, event?) {
    if (!this.isLoggedIn) {
      this.sendToLogin();
    }

    const element = document.getElementById(event.target.id) as HTMLButtonElement;
    element.style.pointerEvents = 'none';
    this.dislikeLoading = true;
    this.bookData.likeBook(book).subscribe(
      (res) => {
        implementLikeAndDislike(event.target.id, element, 'liked');
        this.dislikeLoading = false;
        this.transferDataService.setUserBooksDataSet(0);
      }
    );
  }

  sendToLogin() {
    this.router.navigate(['/login'], { queryParams: { logged_in: false } });
    return;
  }
  readBook(book) {
    this.bookData.readBook(book).subscribe(
      (res) => {
        this.router.navigate(['/read/book'], { queryParams: { ISBN: book } });
      },
    );
  }

  bookmark(book, event?) {

    if (!this.isLoggedIn) {
      this.router.navigate(['/login'], { queryParams: { logged_in: false } });
    } else {
      const button = event.target;
      button.innerHTML = '...';
      this.bookData.bookmarkBooks(book).subscribe(
        (res) => {
          toogleClass(button, 'bg-success', 'bg-danger');
        },
      );
    }
  }

  reset() {
    this.isNotConnected = true;
    this.books = [];
    this.gotResults = 2;
    this.paramsValid = true;
    this.query = '';
    this.searchKey = '';
    this.isPending = false;
    this.pagesDataArray = [];
    this.pagePending = false;
    this.bookPage = 1;
    this.totalPages = 10;
    this.visitedPagesArray = [];
  }
  paginate(type) {
    if (this.pagePending) {
      return;
    }
    this.pagePending = true;
    this.bookPage = paginate(type, this.bookPage, this.totalPages);
    this.searchBooks();

  }

}
