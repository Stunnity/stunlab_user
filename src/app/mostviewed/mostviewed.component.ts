import { Component, OnInit } from "@angular/core";
import { AppDataService } from "../services/app-data/app-data.service";
import { TransferDataService } from "../services/shared-data/transfer-data.service";
import { BookDataService } from "../services/book-data/book-data.service";
import * as $ from "jquery";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

declare const bookSwiper: any;

@Component({
  selector: "app-mostviewed",
  templateUrl: "./mostviewed.component.html",
  styleUrls: ["./mostviewed.component.css"],
})
export class MostviewedComponent implements OnInit {
  gotBookResponse: boolean;
  category_books: {
    ISBN: string;
    title: string;
    provider: string;
    publisher: string;
    file: string;
    likes: number;
    dislikes: number;
    readers: number;
  }[];
  isLoggedIn: any;
  isNotConnected: boolean;
  number_downloads: number;
  number_books: number;
  number_readers: number;
  constructor(
    private appData: AppDataService,
    private bookData: BookDataService,
    private _router: Router,
    private transferDataService: TransferDataService
  ) {}
  user_id: string = "";
  mostViewedLevels: any[];
  ngOnInit() {
    this.isLoggedIn = this.transferDataService.getLoggedIn();
    this.getTrendingLevels();
  }

  getTrendingLevels() {
    setTimeout(() => {
      this.mostViewedLevels = this.transferDataService.getMostViewedLevels();

      this.getLevelBooks(this.mostViewedLevels[0]);
    }, 1000);
  }
  getLevelBooks(level, event?) {
    if (event) {
      const element: any = event.target.id;
      if ($(`#${element}`).hasClass("active")) {
        return;
      }
      $(`#${element}`).siblings().removeClass("active");
      $(`#${element}`).addClass("active");
    }
    this.gotBookResponse = false;
    this.bookData.getLevelBooks(level).subscribe(
      (res) => {
        this.gotBookResponse = true;
      },
      (err) => {
        setTimeout(() => {
          this.gotBookResponse = true;
          this.category_books = [
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Book",
              provider: "MINEDUC",
              publisher: "REB",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
          ];
          bookSwiper();
        }, 1000);
      }
    );
  }

  likeBook(book) {
    this.bookData.likeBook(this.user_id, book).subscribe(
      (res) => {},
      (err) => {}
    );
  }
  dislikeBook(book) {
    this.bookData.dislikeBook(this.user_id, book).subscribe(
      (res) => {},
      (err) => {}
    );
  }
  readBook(book) {
    this.bookData.readBook(this.user_id, book).subscribe(
      (res) => {},
      (err) => {}
    );
  }
  bookmark(book, event) {
    if (!this.isLoggedIn) {
      this._router.navigate(["/login"], { queryParams: { logged_in: false } });
    }
    const user = {};
    const button: Element = document.getElementById("pop");
    button.innerHTML = "...";
    this.bookData.bookmarkBooks(book, user).subscribe(
      (res) => {},
      (err) => {
        setTimeout(() => {
          if (!this.hasClass(button, "bg-success")) {
            button.innerHTML = "Bookmarked";
            button.classList.add("bg-success");
            button.classList.remove("bg-danger");
          } else {
            button.innerHTML = "Bookmark";
            button.classList.remove("bg-success");
            button.classList.add("bg-danger");
          }
        }, 4000);
      }
    );
  }
  getStats() {
    this.appData.getStatistics().subscribe(
      (res) => {},
      (error: HttpErrorResponse) => {
        this.isNotConnected = false;
        this.number_books = 1000;
        this.number_downloads = 450;
        this.number_readers = 10300;
      }
    );
  }
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }
}
