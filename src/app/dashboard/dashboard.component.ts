import { Component, OnInit } from '@angular/core';
import { Data, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BookDataService } from '../services/book-data/book-data.service';
import { TransferDataService } from '.././services/shared-data/transfer-data.service';
import * as _ from 'lodash';
import { empty } from 'src/utils/common';

declare const bookSwiper: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  total_books: number;
  user_id: string;
  recommended_books: {
    ISBN: string;
    title: string;
    provider: string;
    publisher: string;
    file: string;
    likes: number;
    dislikes: number;
    readers: number;
  }[];

  recent_reads: {
    ISBN: string;
    title: string;
    provider: string;
    publisher: string;
    file: string;
    likes: number;
    dislikes: number;
    readers: number;
  }[];
  others_feeds: {
    ISBN: string;
    title: string;
    provider: string;
    publisher: string;
    file: string;
    likes: number;
    dislikes: number;
    readers: number;
  }[];
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private bookData: BookDataService,
    private transferService: TransferDataService
  ) { }

  books: any[];
  number_books = 0;
  user: {};
  username: any;
  gotBookResponse: boolean;
  gotRecommendationResponse: boolean;
  gotOtherUserReadsResponse: boolean;
  recommended_categories: any[];
  ngOnInit() {
    this.getUser();
    setTimeout(() => {
      this.recommended_categories = this.transferService.getMostViewedCategories();
      this.books = this.transferService.getUserBooks();
      if (this.books) { this.total_books = this.books.length; } else { this.total_books = 0; }
    }, 100);

    this.recommendBooks();
    this.getRecentReads();
    this.getOtherUserReads();
  }
  /**
   * Get Recent User Reads
   */
  getUser() {
    this.transferService.getUser().subscribe(res => {
      if (empty(res))
        return;
      this.user = res;
      this.username = this.user["username"];
    })
  }
  getRecentReads() {
    this.gotBookResponse = false;
    this.bookData.getRecentBooks({}).subscribe(
      (res) => { },
      (err) => {
        setTimeout(() => {
          this.gotBookResponse = true;
          this.recent_reads = [
            {
              ISBN: '124-3451-3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-3451-3452',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-3451-3',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-3451-53',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-345-453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-51-3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-31-3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '1-3451-3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-3451-3',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '1-3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
          ];
          this.number_books = this.recent_reads.length;
          bookSwiper();
        }, 5000);
      }
    );
  }
  /**
   * Get Recent User Reads
   */
  getOtherUserReads() {
    this.gotOtherUserReadsResponse = false;
    this.bookData.getRecentBooks({}).subscribe(
      (res) => { },
      (err) => {
        setTimeout(() => {
          this.gotOtherUserReadsResponse = true;
          this.others_feeds = [
            {
              ISBN: '124-34453',
              title: 'Mathematics',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-3543451-3452',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-3453451-3',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '122534-3af451-53',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-534af5345-453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-55fd3421-3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-52134531-3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '1-34522521-3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-2343451-3',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-a3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '1-345fds3',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
          ];
          bookSwiper();
        }, 5000);
      }
    );
  }
  searchBook(search: string, fromCategory?: boolean) {
    if (!fromCategory) {
      this._router.navigate(['/search'], { queryParams: { q: search } });
    } else {
      this._router.navigate(['/search'], { queryParams: { category: search } });
    }
  }
  likeBook(book) {
    this.bookData.dislikeBook(this.user_id, book).subscribe(
      (res) => { },
      (err) => { }
    );
  }
  dislikeBook(book) {
    this.bookData.dislikeBook(this.user_id, book).subscribe(
      (res) => { },
      (err) => { }
    );
  }
  bookNavigate(allbooks: boolean) {
    if (!allbooks) {
      this._router.navigate(['/books'], { queryParams: { page: 'reads' } });
    } else {
      this._router.navigate(['/books'], {
        queryParams: { page: 'books' },
      });
    }
  }
  recommendBooks() {
    this.gotRecommendationResponse = false;
    this.bookData.getRecommendedBooks(this.user).subscribe(
      (res) => { },
      (err) => {
        setTimeout(() => {
          this.gotRecommendationResponse = true;
          this.recommended_books = [
            {
              ISBN: '124-3451-3453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-3451-342313',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: '124-3451-3123453',
              title: 'Book',
              provider: 'MINEDUC',
              publisher: 'REB',
              file: 'googledrive/fsdf',
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
          ];
          const section = document.getElementById('others_feed');
          section.style.marginTop = '35px';
          const sectionHeader = document.getElementById('others_feed_header');
          sectionHeader.style.marginTop = '0';
        }, 5000);
      }
    );
  }

  readBook(book) {
    this._router.navigate(['/read/book'], { queryParams: { ISBN: book } });
    this.bookData.readBook(this.user_id, book).subscribe(
      (res) => { },
      (err) => { }
    );
  }
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }
  bookmark(book, event?) {
    const button = event.target.id;
    const _button = document.getElementById(button);
    _button.innerHTML = '...';
    this.bookData.bookmarkBooks(book, {}).subscribe(
      (res) => { },
      (err) => {
        setTimeout(() => {
          if (!this.hasClass(_button, 'bg-success')) {
            _button.innerHTML = 'Bookmarked';
            _button.classList.add('bg-success');
            _button.classList.remove('bg-danger');
          } else {
            _button.innerHTML = 'Bookmark';
            _button.classList.remove('bg-success');
            _button.classList.add('bg-danger');
          }
        }, 4000);
      }
    );
  }
  hideBook(event) {
    const e = event.target.id;
    if (this.recommended_books.length == 1) {
      return;
    } else { this.recommended_books.splice(e, 1); }
  }
}
