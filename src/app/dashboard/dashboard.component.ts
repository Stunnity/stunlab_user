import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookDataService } from '../services/book-data/book-data.service';
import { TransferDataService } from '.././services/shared-data/transfer-data.service';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { empty, sanitize } from 'src/utils/common';
import { UserDataService } from '../services/user-data/user-data.service';
import { DomSanitizer } from '@angular/platform-browser';

declare const bookSwiper: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  total_books: number;
  user_id: string;
  recommendedBooks: any[];
  recentReads: any[];
  otherFeeds: any[];
  readLoading: any;
  likeLoading: boolean;
  dislikeLoading: boolean;

  constructor(
    private _router: Router,
    private bookData: BookDataService,
    private userService: UserDataService,
    private transferService: TransferDataService,
    private sanitizer: DomSanitizer
  ) { }

  books: any;
  number_books = 0;
  user: {};
  username: any;
  userTotalReads: number;
  gotBookResponse: boolean;
  gotRecommendationResponse: boolean;
  gotOtherUserReadsResponse: boolean;
  recommended_categories: any;


  ngOnInit() {
    this.getUser();
    this.getStatistic();
    this.transferService.getMostViewedCategories().subscribe(res => {
      this.recommended_categories = ['Science', 'Literature', 'Bussiness', 'Sports'];
    });
    this.recommendBooks();
    this.getOtherUserReads();
  }

  getUser() {
    this.transferService.getUser().subscribe(res => {
      if (empty(res))
        return;
      this.username = res["firstName"] || res["username"];
    })
  }
  sanitizeUrl(url: string) {
    return sanitize(this.sanitizer, url);
  }
  getRecentReads() {
    this.gotBookResponse = false;
    this.transferService.getIsUserRecentBooksSet().subscribe(res => {
      if (res === 0) {
        this.bookData.getRecentBooks().subscribe(
          (res) => {
            this.transferService.setUserRecentBooks(res);
          },
        );
      } else {
        this.transferService.getUserRecentBooks().subscribe(res => {
          if (empty(res))
            return;
          this.gotBookResponse = true;
          let array = [];
          for (const book of res["data"]) {
            array.push(book.book)
          }
          this.recentReads = array;
          bookSwiper();
        })
      }
    })
  }
  /**
   * Get Recent User Reads
   */
  getStatistic() {
    this.transferService.getUserStatisticsSet().subscribe(res => {
      const userStatisticsSet = res;
      if (userStatisticsSet === 0) {
        this.userService.userStatistics().subscribe(res => {
          this.transferService.setUserStatistics(res);
        }, err => {

        })
      }
      else {
        this.transferService.getUserStatistics().subscribe(res => {
          if (empty(res))
            return;
          this.userTotalReads = res["reads"];
          if (this.userTotalReads > 0)
            this.getRecentReads();
        })
      }
    })
  }


  getOtherUserReads() {
    this.gotOtherUserReadsResponse = false;

    this.transferService.getIsUserOtherFeed().subscribe(res => {
      if (res === 0) {
        this.bookData.getOtherSee().subscribe(
          (res) => {
            this.transferService.setUserOtherFeed(res);
          },
          (err) => {

          }
        );
      } else {
        this.transferService.getUserOtherFeed().subscribe(res => {
          if (empty(res))
            return;
          this.gotOtherUserReadsResponse = true;
          let array = [];
          for (const book of res["data"]) {
            array.push(book.book)
          }
          this.otherFeeds = array;
          bookSwiper();
        })
      }
    })
  }
  searchBook(search: string, fromCategory?: boolean) {
    if (!fromCategory) {
      this._router.navigate(['/search'], { queryParams: { q: search } });
    } else {
      this._router.navigate(['/search'], { queryParams: { category: search } });
    }
  }

  likeBook(book, event?) {
    const element: any = event.target.id;
    const dislikeId = element.replace("like", "dislike");
    const likeBtn = document.getElementById(event.target.id);
    likeBtn.style.pointerEvents = 'none';
    this.likeLoading = true;
    const button = event.target;

    this.bookData.likeBook(book).subscribe(
      (res) => {
        const dislikeBtn = document.getElementById(dislikeId);
        dislikeBtn.classList.remove('liked');

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
    const likeId = element.replace("dislike", "like");
    const button = event.target;
    this.bookData.likeBook(book).subscribe(
      (res) => {
        const likeBtn = document.getElementById(likeId);
        likeBtn.classList.remove('liked');
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
    this.transferService.getIsUserRecommendBooksSet().subscribe(res => {
      if (res === 0) {
        this.bookData.getRecentBooks().subscribe(
          (res) => {
            this.transferService.setUserRecommendBooks(res);
          },
          (err) => {

          }
        );
      } else {
        this.transferService.getUserRecommendBooks().subscribe(res => {
          if (empty(res))
            return;
          this.gotRecommendationResponse = true;
          let array = [];
          for (const book of res["data"]) {
            array.push(book.book)
          }
          this.recommendedBooks = array;
          bookSwiper();
          const section = document.getElementById('others_feed');
          section.style.marginTop = '35px';
          const sectionHeader = document.getElementById('others_feed_header');
          sectionHeader.style.marginTop = '0';
        })
      }
    })
  }


  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }
  bookmark(book, event?) {
    const button = event.target.id;
    const _button = document.getElementById(button);
    _button.innerHTML = '...';
    this.bookData.bookmarkBooks(book).subscribe(
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
    if (this.recommendedBooks.length == 1) {
      return;
    } else { this.recommendedBooks.splice(e, 1); }
  }
}
