import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { AppDataService } from "../services/app-data/app-data.service";
import { BookDataService } from "../services/book-data/book-data.service";
import { TransferDataService } from "../services/shared-data/transfer-data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Contact } from "./models/contact.model";
import { interval } from "rxjs";
declare const statisticsCounter: any;
declare const bookSwiper: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  invalidContactData: boolean;
  constructor(
    private appData: AppDataService,
    private bookData: BookDataService,
    private transferDataService: TransferDataService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  contact: Contact = new Contact();
  user_id: string;
  userdata: any;
  category_books: any[];
  isNotConnected: boolean = true;
  isLoggedIn: any;
  gotBookResponse: boolean = false;
  mostViewedCategories: any[];
  number_books: number;
  number_readers: number;
  number_downloads: number;

  ngOnInit() {
    this.isLoggedIn = this.transferDataService.getLoggedIn();
 

    this.getStats();
    this.getMostViewedCategories();
    interval(1000).subscribe((val) => this.disableContactBtn());
  }

  getMostViewedCategories() {
    setTimeout(() => {
      this.mostViewedCategories = this.transferDataService.getMostViewedCategories();
      this.getCategoryBooks(this.mostViewedCategories[0]);
     
    }, 1000);
  }

  getCategoryBooks(category, event?) {
    if (event) {
      const element: any = event.target.id;
      if ($(`#${element}`).hasClass("active")) {
        return;
      }

      $(`#${element}`).siblings().removeClass("active");
      $(`#${element}`).addClass("active");
    }
    this.gotBookResponse = false;
    this.bookData.getCategoryBooks(category).subscribe(
      (res) => {
        this.gotBookResponse = true;
      },
      (err) => {
        setTimeout(() => {
          this.gotBookResponse = true;
          this.category_books = [
            {
              ISBN: "124-3451-3453",
              title: "Mathematics S5",
              provider: "REB",
              publisher: "MK Publishers",
              file: "googledrive/fsdf",
              likes: 123,
              dislikes: 435,
              readers: 0,
            },
            {
              ISBN: "124-3451-3453",
              title: "Three Ways to Get Even",
              provider: "WDA",
              publisher: "Fountain",
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
      (res) => {
 
      },
      (error: HttpErrorResponse) => {
        this.isNotConnected = false;
        this.number_books = 1000;
        this.number_downloads = 450;
        this.number_readers = 10300;
        setTimeout(() => {
          statisticsCounter();
        }, 1000);
      }
    );
  }
  contactUs() {
    const name_element = document.getElementById(
      "contact-name"
    ) as HTMLInputElement;
    const email_element = document.getElementById(
      "contact-email"
    ) as HTMLInputElement;
    const textarea_element = document.getElementById(
      "contact-message"
    ) as HTMLInputElement;

    const button_element = document.getElementById(
      "submit-button"
    ) as HTMLButtonElement;
    button_element.innerHTML = "Contacting ";
    this.appData.contactUs(this.contact).subscribe(
      (res) => {},
      (err) => {
        setTimeout(() => {
          button_element.innerHTML = "Contact Us";
          textarea_element.value = "";
          email_element.value = "";
          name_element.value = "";
        }, 5000);
      }
    );
  }
  disableContactBtn() {
    if (Object.keys(this.contact).length == 0) {
      this.invalidContactData = true;
      return;
    } else {
      this.invalidContactData = false;
    }
  }
  report() {}
}
