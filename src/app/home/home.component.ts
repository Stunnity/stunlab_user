import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { AppDataService } from "../services/app-data/app-data.service";
import { BookDataService } from "../services/book-data/book-data.service";
import { TransferDataService } from "../services/shared-data/transfer-data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Data, Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private appData: AppDataService,
    private bookData: BookDataService,
    private transferDataService: TransferDataService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}
  user_id: string;
  isNotConnected: boolean = true;
  isLoggedIn: boolean;
  gotBookResponse: boolean = false;
  mostViewedCategories: any[];
  number_books: number;
  number_readers: number;
  number_downloads: number;
  ngOnInit() {
    setTimeout(() => {
      this.getStats();
    }, 3000);

    this.getMostViewedCategories();

    this.isLoggedIn = this.transferDataService.isLoggedIn();
    // if (!this.isLoggedIn) {
    //   this.user_id = "";
    //   // this.getMostViewedCategories();
    //   this.jqueryPresets();
    //   const element: any = document.querySelector(".booknav > .active");
    //   const category: string = element.childNodes[0].innerHTML.trim();
    // }
  }

  getMostViewedCategories() {
    setTimeout(() => {
      this.mostViewedCategories = this.transferDataService.getMostViewedCategories();
      this.getCategoryBooks(this.mostViewedCategories[0]);
    }, 1000);
  }
  getCategoryBooks(category, event?) {
    this.gotBookResponse = false;
    this.bookData.getCategoryBooks(category).subscribe(
      (res) => {},
      (err) => {
        setTimeout(() => {
          this.gotBookResponse = true;
        }, 3000);
      }
    );
    setTimeout(() => {
      $(".navlist").on("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      });
    }, 1000);
  }

  likeBook(book) {
    if (!this.isLoggedIn) this._router.navigate(["/login"]);
    this.bookData.likeBook(this.user_id, book).subscribe(
      (res) => {},
      (err) => {}
    );
  }
  dislikeBook(book) {
    if (!this.isLoggedIn) this._router.navigate(["/login"]);

    this.bookData.dislikeBook(this.user_id, book).subscribe(
      (res) => {},
      (err) => {}
    );
  }
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }

  readBook(book) {
    if (!this.isLoggedIn) this._router.navigate(["/login"]);
    this.bookData.readBook(this.user_id, book).subscribe(
      (res) => {},
      (err) => {}
    );
  }
  bookmark(book, user) {
    if (!this.isLoggedIn) {
      this._router.navigate(["/login"], { queryParams: { logged_in: false } });
    }

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
    console.log(this.isNotConnected);
    this.appData.getStatistics().subscribe(
      (res) => {
        console.log(res);
      },
      (error: HttpErrorResponse) => {
        this.isNotConnected = false;
        this.number_books = 1000;
        this.number_downloads = 450;
        this.number_readers = 10300;
      }
    );
  }
  jqueryPresets() {
    $(document).ready(function () {
      $(".navlist").on("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      });
    });

    $(function () {
      $(document).scroll(function () {
        var $nav = $(".navbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
      });
    });

    setTimeout(() => {
      $(document).ready(function () {
        $(".navlist1").on("click", function () {
          $(this).siblings().removeClass("active");
          $(this).addClass("active");
        });
      });
    }, 3000);
  }
}
