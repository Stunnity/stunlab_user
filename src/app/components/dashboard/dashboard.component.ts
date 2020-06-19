import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { BookDataService } from '../../services/data/book/book-data.service';
import { TransferDataService } from '../../services/data/shared/transfer-data.service';
import * as _ from 'lodash';
import {
  empty, sanitize, implementLikeAndDislike,
  toogleLikeActions, findOthers, toogledisLikeActions, toogleClass
} from 'src/app/utils/common';
import { DomSanitizer } from '@angular/platform-browser';
import { setIndex, copyArray, removeElement, addElement } from 'src/app/utils/filter-books';

declare const bookSwiper: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})


export class DashboardComponent implements OnInit {

  recommendedBooks: any[] = [];
  recentReads: any[] = [];
  otherFeeds: any[] = [];
  readLoading: any;
  likeLoading: boolean;
  dislikeLoading: boolean;
  unfiltered: any[];
  books: any;
  username: any;
  userTotalReads: number;
  gotBookResponse: boolean;
  gotRecommendationResponse: boolean;
  gotOtherUserReadsResponse: boolean;
  recommendedCategories: any[] = [];

  constructor(
    private router: Router,
    private bookData: BookDataService,
    private transferService: TransferDataService,
    private sanitizer: DomSanitizer
  ) { }


  ngOnInit() {
    this.getUser();
    this.getStatistic();
    this.transferService.getRecommendedCategories().subscribe((res: []) => {
      if (empty(res)) {
        return;
      }
      this.recommendedCategories = res;
    });
    this.recommendBooks();
    this.getOtherUserReads();
    this.getRecommendedCategories();
  }

  getRecommendedCategories() {
    this.transferService.getRecommendedCategoriesSet().subscribe(isSet => {
      if (isSet === 0) {
        this.bookData.getRecommendedCategories().subscribe(categories => {
          this.transferService.setRecommendedCategories((categories as any[]).slice(0, 4));
        });
      } else {
        this.transferService.getRecommendedCategories().subscribe((categories: []) => {
          if (empty(categories)) {
            return;
          }
          this.recommendedCategories = categories;
        });
      }
    });
  }
  getUser() {
    this.transferService.getUser().subscribe((res: any) => {
      if (empty(res)) {
        return;
      }
      this.username = res.firstName || res.username;
    });
  }
  sanitizeUrl(url: string) {
    return sanitize(this.sanitizer, url);
  }
  getRecentReads() {
    this.gotBookResponse = false;
    this.transferService.getIsUserRecentBooksSet().subscribe(set => {
      if (set === 0) {
        this.bookData.getRecentBooks().subscribe(
          (recentBooks) => {
            this.transferService.setUserRecentBooks(recentBooks);
          },
        );
      } else {
        this.transferService.getUserRecentBooks().subscribe((books: any) => {
          if (empty(books)) {
            return;
          }
          this.gotBookResponse = true;
          const array = [];
          for (const book of books.data) {
            array.push(book.book);
          }
          this.recentReads = array;
          bookSwiper();
        });
      }
    });
  }


  getStatistic() {
    this.transferService.getUserStatisticsSet().subscribe(set => {
      if (set === 1) {
        this.transferService.getUserStatistics().subscribe((stats: any) => {
          if (empty(stats)) {
            return;
          }
          this.userTotalReads = stats.reads;
          if (this.userTotalReads > 0) {
            this.getRecentReads();
          }
        });
      }
    });
  }


  getOtherUserReads() {
    this.gotOtherUserReadsResponse = false;

    this.transferService.getIsUserOtherFeed().subscribe(res => {
      if (res === 0) {
        this.bookData.getOtherSee().subscribe(
          (otherBooks) => {
            this.transferService.setUserOtherFeed(otherBooks);
          },
        );
      } else {
        this.transferService.getUserOtherFeed().subscribe((books: any) => {
          if (empty(books)) {
            return;
          }
          this.gotOtherUserReadsResponse = true;
          const array = [];
          for (const book of books.data) {
            array.push(book.book);
          }
          this.otherFeeds = array;
          bookSwiper();
        });
      }
    });
  }
  searchBook(search: string, fromCategory?: boolean) {
    if (!fromCategory) {
      this.router.navigate(['/search'], { queryParams: { q: search } });
    } else {
      this.router.navigate(['/search'], { queryParams: { category: search } });
    }
  }

  likeBook(book, event?) {
    const element = document.getElementById(event.target.id);
    element.style.pointerEvents = 'none';
    this.likeLoading = true;
    this.bookData.likeBook(book).subscribe(
      (res) => {
        document.getElementById(event.target.id.replace('like', 'dislike')).classList.remove('liked');
        this.likeLoading = false;
        implementLikeAndDislike(event.target.id, element, 'liked');
        const [elem1, elem2] = findOthers(event.target.id);
        toogleLikeActions(elem1, elem2);
        this.transferService.setUserBooksDataSet(0);
      }
    );
  }


  dislikeBook(book, event?) {
    const element = document.getElementById(event.target.id) as HTMLButtonElement;
    element.style.pointerEvents = 'none';
    this.dislikeLoading = true;
    this.bookData.likeBook(book).subscribe(
      (res) => {
        const likeBtn = document.getElementById(event.target.id.replace('dislike', 'like')).classList.remove('liked');
        this.dislikeLoading = false;
        implementLikeAndDislike(event.target.id, element, 'liked');
        const [elem1, elem2] = findOthers(event.target.id);
        toogledisLikeActions(elem1, elem2);
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
      }
    );
  }


  bookNavigate(allbooks: boolean) {
    if (!allbooks) {
      this.router.navigate(['/u/books'], { queryParams: { page: 'reads' } });
    } else {
      this.router.navigate(['/u/books'], {
        queryParams: { page: 'books' },
      });
    }
  }
  recommendBooks() {
    this.transferService.getIsUserRecommendBooksSet().subscribe(set => {
      if (set === 0) {
        this.bookData.newArrivals().subscribe(
          (newArrivals) => {
            this.transferService.setUserRecommendBooks(newArrivals);
          },
        );
      } else {
        this.transferService.getUserRecommendBooks().subscribe((books: any) => {
          if (empty(books)) {
            return;
          }
          this.gotRecommendationResponse = true;
          const array = [];
          for (const book of books.data) {
            array.push(book.book);
          }
          const mapped = setIndex(array);
          const [filtered, unfiltered] = copyArray(mapped);
          const final = [];
          for (const book of filtered) {
            final.push(book.book);
          }
          this.recommendedBooks = final;
          this.unfiltered = unfiltered;
          bookSwiper();
          const section = document.getElementById('others_feed');
          if (section) {
            section.style.marginTop = '35px';
            const sectionHeader = document.getElementById('others_feed_header');
            if (sectionHeader) {
              sectionHeader.style.marginTop = '0';
            }
          }
        });
      }
    });
  }

  bookmark(book, event?) {
    const button = document.getElementById(event.target.id);
    button.innerHTML = '...';
    this.bookData.bookmarkBooks(book).subscribe(
      (res) => {
        toogleClass(button, 'bg-success', 'bg-danger');
        this.transferService.setUserBooksDataSet(0);
      }
    );
  }

  hideBook(event) {
    if (this.recommendedBooks.length === 2) {
      return;
    }
    const e = event.target.id;
    removeElement(e, this.recommendedBooks);
    if (this.unfiltered.length === 0) {
      return;
    }
    addElement(this.recommendedBooks, this.unfiltered);
  }
}
