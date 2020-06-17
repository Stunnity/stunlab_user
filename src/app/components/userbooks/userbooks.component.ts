import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDataService } from '../../services/book-data/book-data.service';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { sanitize, empty } from 'src/utils/common';
import { DomSanitizer } from '@angular/platform-browser';
import { TransferDataService } from '../../services/shared-data/transfer-data.service';

@Component({
  selector: 'app-userbooks',
  templateUrl: './userbooks.component.html',
  styleUrls: ['./userbooks.component.css'],
})
export class UserbooksComponent implements OnInit, OnDestroy {
  isPending: boolean = false;
  likeLoading: boolean;
  readLoading: boolean;
  dislikeLoading: boolean;
  onload: number;
  pagePending: boolean;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
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
      let array = [];
      array.push(page)
      this.transferService.setUserBooksData(array);
    }
  }
  _book: string;
  isLoggedIn: boolean;
  possession = 'My';
  user_id: string;
  _level: string;
  _category: string;
  isNotConnected: boolean = false;
  _provider: string;
  results: number;
  subscribedPages: any[] = [];
  total: number;
  query = '';
  None = 'No';
  page: string = '';
  bookPage: number;
  books: any[];
  totalPages: number;
  paginationLoader: boolean = false;
  pagesDataArray: any[] = [];
  visitedPagesArray: any[] = [];
  queryParamsList: any[] = [];

  ngOnDestroy() {

  }
  ngOnInit() {
    this.results = 2;
    this.bookPage = 1;
    this.route.queryParams.subscribe((params) => {
      this.reset();
      this.page = params.page;

      // this.transferService.setUserBooksDataSet(0);
      this.isNotConnected = true;

      if (this.page == 'bookmarks') {
        this.getCache(this.page);
      }
      if (this.page == 'favourites') {
        this.getCache(this.page);
      }
      if (this.page == 'books') {
        this.possession = 'Our';
        this.getBooks();

      } else {
        this.possession = 'My';
      }
      if (this.page == 'reads') {
        this.getBooks('reads');
      }
    });

  }
  getUserBookData() {
    this.transferService.getUserBooksData().subscribe(res => {

      if (empty(res))
        return;
      const response: any = res;
      const array = response.filter(obj => {
        return obj.page === this.page
      });

    })
  }

  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url);
  }

  getCache(page) {
    this.transferService.getUserBooksDataSet().subscribe(isSet => {
      if (isSet === 0) {
        this.getBooks(page);
      }
      else {
        this.transferService.getUserBooksData().subscribe(data => {
          if (empty(data))
            return;
          const response: any = data;
          const array = response.filter(obj => {
            return obj.page === page
          });
          if (empty(array)) {
            this.getBooks(page);
            return;
          }
          this.visitedPagesArray = array[0]["visited"];
          this.pagesDataArray = array[0]['data'];
          this.total = array[0]['totalBooks'];
          this.totalPages = array[0]['totalPages'];
          this.getBooks(undefined, this.bookPage, true);
        })
      }
    })
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
  bookNavigate() {
    this._router.navigate(['/books'], {
      queryParams: { page: 'books' },
    });
  }

  likeBook(book, event?) {
    this.transferService.setUserBooksDataSet(0);

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
  readBook(book) {
    if (this.readLoading)
      return;
    this.readLoading = true;
    this.bookData.readBook(book).subscribe(
      (res) => {
        this.readLoading = false;
        this._router.navigate(['/read/book'], { queryParams: { ISBN: book } });
      },
      (err) => { }
    );
  }
  dislikeBook(book, event?) {
    this.transferService.setUserBooksDataSet(0);

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
  bookmark(book, event?) {
    this.transferService.setUserBooksDataSet(0);

    const bookmarkBtn = document.getElementById(event.target) as HTMLButtonElement;
    bookmarkBtn.disabled = true;
    const button = event.target;
    button.innerHTML = '...';
    this.bookData.bookmarkBooks(book).subscribe(
      (res) => {
        bookmarkBtn.disabled = false;
        if (!this.hasClass(button, 'bg-success')) {
          button.innerHTML = 'Bookmarked';
          button.classList.add('bg-success');
          button.classList.remove('bg-danger');
        } else {
          button.innerHTML = 'Bookmark';
          button.classList.remove('bg-success');
          button.classList.add('bg-danger');
        }
      },
      (err) => {

      }
    );
  }
  getBooks(type = undefined, page = this.bookPage, fromService = false) {
    if (fromService) {
      if (empty(this.visitedPagesArray))
        return;
    }
    if (this.visitedPagesArray.indexOf(this.bookPage) === -1) {
      this.visitedPagesArray.push(this.bookPage);
      if (this.isPending)
        return;

      this.isPending = true;
      this.results = 2;
      this.bookData.getUserBooks(type, page).subscribe(res => {
        this.pagePending = false;

        this.isPending = false;
        this.isNotConnected = false;
        this.results = (res["total"] > 0) ? 1 : 0;

        if (this.results === 0)
          return;

        this.total = res["data"].length;
        this.totalPages = Math.ceil(res["total"] / res["per_page"]);

        let array = [];
        for (const book of res["data"]) {
          array.push(book.book)
        }
        this.books = array;
        const pageData = {
          page: this.bookPage,
          books: this.books
        }
        if (this.pagesDataArray.indexOf(pageData) === -1)
          this.pagesDataArray.push(pageData);
      });
    }
    else {
      if (empty(this.pagesDataArray))
        return;
      if (fromService) {
        this.results = 1;
        this.isNotConnected = false;
        this.isPending = false;

      }
      this.pagePending = false;

      let array = this.pagesDataArray.filter(obj => {
        return obj.page === page
      })
      this.books = array[0]["books"];
    }

  }

  paginate(type, event?) {
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
    this.getBooks(this.page);

  }

  nextPage() {

    if (this.bookPage === this.totalPages)
      return;
    this.bookPage += 1;

    this.getBooks(this.page);

  }
  firstPage() {

    if (this.bookPage === 1)
      return;
    this.bookPage = 1;
    this.getBooks(this.page);
  }
  lastPage() {

    if (this.bookPage === this.totalPages)
      return;
    this.bookPage = this.totalPages;
    this.getBooks(this.page);


  }
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }

  reset() {
    if (this.results !== 2 && !empty(this.page)) {

      let array = this.subscribedPages.filter(obj => {
        return obj.page === this.page
      })

      if (empty(array)) {
        const page = {
          page: this.page,
          visited: this.visitedPagesArray,
          data: this.pagesDataArray,
          totalBooks: this.total,
          totalPages: this.totalPages
        };
        this.subscribedPages.push(page);
        // this.transferService.setVisitedUserPages(this.page);
        this.transferService.setUserBooksData(this.subscribedPages);
      }
    }
    this.isPending = false;
    this.pagesDataArray = [];
    this.bookPage = 1;
    this.totalPages = 0;
    this.books = [];
    this.visitedPagesArray = [];
  }
}
