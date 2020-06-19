import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDataService } from '../../../../services/data/book/book-data.service';
import * as _ from 'lodash';
import { sanitize, empty, sort, implementLikeAndDislike, toogleClass } from 'src/app/utils/common';
import { DomSanitizer } from '@angular/platform-browser';
import { TransferDataService } from '../../../../services/data/shared/transfer-data.service';
import { paginate } from 'src/app/utils/pagination';

@Component({
  selector: 'app-userbooks',
  templateUrl: './userbooks.component.html',
  styleUrls: ['./userbooks.component.css'],
})
export class UserbooksComponent implements OnInit, OnDestroy {

  isPending = false;
  likeLoading: boolean;
  readLoading: boolean;
  dislikeLoading: boolean;
  pagePending: boolean;
  isLoggedIn: boolean;
  possession = 'My';
  isNotConnected = false;
  results: number;
  subscribedPages: any[] = [];
  total: number;
  query: string;
  page = '';
  bookPage: number;
  books: any[];
  totalPages: number;
  pagesDataArray: any[] = [];
  visitedPagesArray: any[] = [];
  paramsValid: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private bookData: BookDataService,
    private transferService: TransferDataService
  ) { }

  setData(): void {
    if (this.page !== 'books') {
      const page = {
        page: this.page,
        visited: this.visitedPagesArray,
        data: this.pagesDataArray,
        totalBooks: this.total,
        totalPages: this.totalPages
      };
      const array = [];
      array.push(page);
      this.transferService.setUserBooksData(array);
    }
  }
  ngOnDestroy() {
    this.setData();
  }

  ngOnInit() {
    this.results = 2;
    this.bookPage = 1;
    this.route.queryParams.subscribe((params) => {
      const queryParams = params.page || params.favourites || params.reads;
      if (empty(params) || queryParams === undefined) {
        this.paramsValid = false;
        return;
      }
      if (!(queryParams === 'bookmarks' || queryParams === 'favourites' || queryParams === 'books' || queryParams === 'reads')) {
        this.paramsValid = false;
        return;
      }
      this.reset();
      this.page = params.page;
      this.isNotConnected = true;
      if (this.page === 'bookmarks') {
        this.getCache(this.page);
      }
      if (this.page === 'favourites') {
        this.getCache(this.page);
      }
      if (this.page === 'books') {
        this.possession = 'Our';
        this.getBooks();

      } else {
        this.possession = 'My';
      }
      if (this.page === 'reads') {
        this.getBooks('reads');
      }
    });

  }

  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url);
  }

  getCache(page) {
    this.transferService.getUserBooksDataSet().subscribe(isSet => {
      if (isSet === 0) {
        this.getBooks(page);
      } else {
        this.transferService.getUserBooksData().subscribe(data => {
          if (empty(data)) {
            return;
          }
          const response: any = data;
          const array = response.filter(obj => {
            return obj.page === page;
          });
          if (empty(array)) {
            this.getBooks(page);
            return;
          }
          this.visitedPagesArray = array[0].visited;
          this.pagesDataArray = array[0].data;
          this.total = array[0].totalBooks;
          this.totalPages = array[0].totalPages;
          this.getBooks(undefined, this.bookPage, true);
        });
      }
    });
  }


  filterBooks(event) {
    const key = event.target.id;
    if (key === 'bookName') {
      this.books = sort(this.books, key, true);
    } else {
      this.books = sort(this.books, key);
    }
  }

  bookNavigate() {
    this.router.navigate(['/books'], {
      queryParams: { page: 'books' },
    });
  }

  likeBook(book, event?) {
    const element = document.getElementById(event.target.id) as HTMLButtonElement;
    element.style.pointerEvents = 'none';
    this.likeLoading = true;
    this.bookData.likeBook(book).subscribe(
      (res) => {
        implementLikeAndDislike(event.target.id, element, 'liked');
        this.likeLoading = false;
        this.transferService.setUserBooksDataSet(0);
      }
    );
  }

  readBook(book) {
    if (this.readLoading) {
      return;
    }
    this.readLoading = true;
    this.bookData.readBook(book).subscribe(
      (res) => {
        this.readLoading = false;
        this.router.navigate(['/read/book'], { queryParams: { ISBN: book } });
      },
      (err) => { }
    );
  }

  dislikeBook(book, event?) {

    const element = document.getElementById(event.target.id) as HTMLButtonElement;
    element.style.pointerEvents = 'none';
    this.dislikeLoading = true;
    this.bookData.likeBook(book).subscribe(
      (res) => {
        implementLikeAndDislike(event.target.id, element, 'liked');
        this.dislikeLoading = false;
        this.transferService.setUserBooksDataSet(0);
      }
    );
  }


  bookmark(book, event?) {
    const element = document.getElementById(event.target.id) as HTMLButtonElement;
    element.disabled = true;
    element.innerHTML = '...';
    this.bookData.bookmarkBooks(book).subscribe(
      (res) => {
        element.disabled = false;
        toogleClass(element, 'bg-success', 'bg-danger');
        this.transferService.setUserBooksDataSet(0);

      },
      (err) => {

      }
    );
  }
  // tslint:disable-next-line: no-unnecessary-initializer
  getBooks(type = undefined, page = this.bookPage, fromService = false) {
    if (fromService) {
      if (empty(this.visitedPagesArray)) {
        return;
      }
    }
    if (this.visitedPagesArray.indexOf(this.bookPage) === -1) {
      this.visitedPagesArray.push(this.bookPage);
      if (this.isPending) {
        return;
      }

      this.isPending = true;
      this.results = 2;
      this.bookData.getUserBooks(type, page).subscribe((res: any) => {
        this.pagePending = false;

        this.isPending = false;
        this.isNotConnected = false;
        this.results = (res.total > 0) ? 1 : 0;

        if (this.results === 0) {
          return;
        }

        this.total = res.total;
        this.totalPages = Math.ceil(res.total / res.per_page);

        const array = [];
        for (const book of res.data) {
          array.push(book.book);
        }
        this.books = array;
        const pageData = {
          page: this.bookPage,
          books: this.books
        };
        if (this.pagesDataArray.indexOf(pageData) === -1) {
          this.pagesDataArray.push(pageData);
        }
      });
    } else {
      if (empty(this.pagesDataArray)) {
        return;
      }
      if (fromService) {
        this.results = 1;
        this.isNotConnected = false;
        this.isPending = false;

      }
      this.pagePending = false;
      this.isPending = false;

      const array = this.pagesDataArray.filter(obj => {
        return obj.page === page;
      });
      if (empty(array)) {
        return;
      }
      this.books = array[0].books;
    }

  }

  paginate(type) {
    if (this.pagePending) {
      return;
    }
    this.pagePending = true;
    this.bookPage = paginate(type, this.bookPage, this.totalPages);
    if (this.page === 'books') {
      this.getBooks();
    } else {
      this.getBooks(this.page);
    }

  }



  reset() {
    if (this.results !== 2 && !empty(this.page)) {

      const array = this.subscribedPages.filter(obj => {
        return obj.page === this.page;
      });

      if (empty(array)) {
        const page = {
          page: this.page,
          visited: this.visitedPagesArray,
          data: this.pagesDataArray,
          totalBooks: this.total,
          totalPages: this.totalPages
        };
        this.subscribedPages.push(page);
        this.transferService.setUserBooksData(this.subscribedPages);
      }
    }
    this.isPending = false;
    this.pagesDataArray = [];
    this.bookPage = 1;
    this.totalPages = 0;
    this.paramsValid = true;
    this.books = [];
    this.visitedPagesArray = [];
  }
}
