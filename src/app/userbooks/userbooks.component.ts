import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDataService } from '../services/book-data/book-data.service';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { sanitize } from 'src/utils/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-userbooks',
  templateUrl: './userbooks.component.html',
  styleUrls: ['./userbooks.component.css'],
})
export class UserbooksComponent implements OnInit {
  isPending: boolean = false;
  likeLoading: boolean;
  readLoading: boolean;
  dislikeLoading: boolean;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer,
    private bookData: BookDataService,
  ) { }
  _book: string;

  isLoggedIn: boolean;
  possession = 'My';
  user_id: string;
  _level: string;
  _category: string;
  isNotConnected: boolean = false;
  _provider: string;
  results: number;
  total: number;
  query = '';
  None = 'No';
  page: string;
  bookPage: number;
  books: any[];
  totalPages: number;
  paginationLoader: boolean = false;
  pagesDataArray: any[] = [];
  visitedPagesArray: any[] = [];

  ngOnInit() {
    this.bookPage = 1;
    this.route.queryParams.subscribe((params) => {
      this.reset();
      this.isNotConnected = true;
      this.page = params.page;
      if (this.page == 'bookmarks') {
        this.getBooks('bookmarks');
      }
      if (this.page == 'favourites') {
        this.getBooks('favourites');
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
  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url);
  }
  filterBooks(event) {
    const key = event.target.id;
    this.books = this.sort(this.books, key);
  }
  sort(array, key) {
    return _.orderBy(array, [key], ['desc']);
  }
  bookNavigate() {
    this._router.navigate(['/books'], {
      queryParams: { page: 'books' },
    });
  }

  likeBook(book, event?) {
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
  getBooks(type: string = undefined, page = this.bookPage) {
    console.log(this.visitedPagesArray)
    if (this.visitedPagesArray.indexOf(this.bookPage) === -1) {
      this.visitedPagesArray.push(this.bookPage);
      if (this.isPending)
        return;
      this.results = 2;
      this.isPending = true;
      this.bookData.getUserBooks(type, page).subscribe(res => {
        this.isPending = false;
        this.isNotConnected = false;
        this.results = (res["data"].length > 0) ? 1 : 0;

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
        this.pagesDataArray.push(pageData);

      })
    }
    else {
      let array = this.pagesDataArray.filter(obj => {
        return obj.page === page
      })
      this.books = array[0]["books"];
    }
  }

  paginate(type, event?) {
    if (type === 'previous')
      this.previousPage();
    if (type === 'next')
      this.nextPage()
    if (type === 'first')
      this.firstPage()
    if (type === 'last')
      this.lastPage()

  }

  previousPage() {
    if (this.bookPage === 1)
      return;
    this.bookPage -= 1;

    this.getBooks();
  }

  nextPage() {
    if (this.bookPage === this.totalPages)
      return;
    this.bookPage += 1;

    this.getBooks();
  }
  firstPage() {
    if (this.bookPage === 1)
      return;
    this.bookPage = 1;
    this.getBooks();
  }
  lastPage() {
    if (this.bookPage === this.totalPages)
      return;
    this.bookPage = this.totalPages;
    this.getBooks();

  }
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }

  reset() {
    this.isPending = false;
    this.pagesDataArray = [];
    this.bookPage = 1;
    this.totalPages = 0;
    this.books = [];
    this.visitedPagesArray = [];
  }
}
