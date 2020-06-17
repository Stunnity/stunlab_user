import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDataService } from '../services/book-data/book-data.service';
import { TransferDataService } from '../services/shared-data/transfer-data.service';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { sanitize } from 'src/utils/common';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  isPending: boolean;
  total: string | number;
  isLoggedIn: boolean;
  user_id: string;
  gotResults: number = 2;
  bookPage: number;
  visitedPagesArray: any[] = [];
  totalPages: number;
  pagesDataArray: any[] = [];
  pagePending: any;
  dislikeLoading: boolean;
  likeLoading: boolean;
  transferService: any;
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
      console.log("after reste")
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
      this.searchBooks();
    });
  }
  searchBooks(page = this.bookPage) {
    this.isNotConnected = true;
    if (this.visitedPagesArray.indexOf(this.bookPage) === -1) {
      this.visitedPagesArray.push(this.bookPage);


      if (this.isPending)
        return;


      this.isPending = true;
      this.bookData.searchBooks(this.query, page).subscribe(
        (res: any) => {
          this.isPending = false;
          this.pagePending = false;
          this.gotResults = 1;
          let array = [];
          this.totalPages = Math.ceil(res["total"] / res["per_page"]);
          for (const book of res["data"]) {
            array.push(book.book)
          }
          this.books = array;
          this.total = res["total"];

          if (this.total === 0)
            this.gotResults = 0;
          this.isNotConnected = false;

          const pageData = {
            page: this.bookPage,
            books: this.books
          }
          this.pagesDataArray.push(pageData);
        }
      );
    }
    else {
      this.gotResults = 1;
      this.pagePending = false;
      let array = this.pagesDataArray.filter(obj => {
        return obj.page === page
      })
      this.books = array[0]["books"];
    }
  }
  filterBooks(event) {
    const key = event.target.id;
    if (key === 'bookName')
      this.books = this.sort(this.books, key, true);
    else
      this.books = this.sort(this.books, key);
  }
  sort(array, key, name = false) {
    if (name)
      return _.orderBy(array, [key], ['asc']);
    return _.orderBy(array, [key], ['desc']);
  }
  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url)
  }
  likeBook(book, event?) {
    this.transferDataService.setUserBooksDataSet(0);
    const element: any = event.target.id;
    const likeBtn = document.getElementById(event.target.id) as HTMLButtonElement;
    likeBtn.style.pointerEvents = 'none';
    this.likeLoading = true;
    const button = event.target;
    this.bookData.likeBook(book).subscribe(
      (res) => {

        $(`#${element}`).siblings().removeClass('liked');
        this.likeLoading = false;
        if (!this.hasClass(button, 'liked')) {
          button.classList.add('liked');
        } else {
          button.classList.remove('liked');
        }
        likeBtn.style.pointerEvents = 'initial';
      }
    );
  }
  dislikeBook(book, event?) {
    this.transferDataService.setUserBooksDataSet(0);

    const dislikeBtn = document.getElementById(event.target.id) as HTMLButtonElement;
    dislikeBtn.style.pointerEvents = 'none';
    const element: any = event.target.id;
    this.dislikeLoading = true;

    const button = event.target;
    this.bookData.likeBook(book).subscribe(
      (res) => {
        $(`#${element}`).siblings().removeClass('liked');
        this.dislikeLoading = false;
        if (!this.hasClass(button, 'liked')) {
          button.classList.add('liked');
        } else {
          button.classList.remove('liked');
        }
        dislikeBtn.style.pointerEvents = 'initial';

      }
    );
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
    this.transferDataService.setUserBooksDataSet(0);

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
    this.isPending = false;
    this.pagesDataArray = [];
    this.pagePending = false;
    this.bookPage = 1;
    this.totalPages = 0;

    this.visitedPagesArray = [];
  }

  paginate(type, event?) {
    console.log(this.pagePending)
    if (this.pagePending) {
      return;
    }
    this.pagePending = true;
    if (type === 'previous')
      this.previousPage();
    if (type === 'next')
      this.nextPage()
    if (type === 'first')
      this.firstPage()
    if (type === 'last')
      this.lastPage()
    this.pagePending = false;

  }

  previousPage() {
    if (this.bookPage === 1)
      return;
    this.bookPage -= 1;
    this.searchBooks();

  }

  nextPage() {
    if (this.bookPage === this.totalPages)
      return;
    this.bookPage += 1;
    this.searchBooks();

  }
  firstPage() {
    if (this.bookPage === 1)
      return;
    this.bookPage = 1;
    this.searchBooks();

  }
  lastPage() {
    if (this.bookPage === this.totalPages)
      return;
    this.bookPage = this.totalPages;
    this.searchBooks();


  }

}
