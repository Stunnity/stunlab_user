import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookDataService } from "../services/book-data/book-data.service";
import { TransferDataService } from "../services/shared-data/transfer-data.service";

import * as _ from "lodash";
@Component({
  selector: "app-userbooks",
  templateUrl: "./userbooks.component.html",
  styleUrls: ["./userbooks.component.css"],
})
export class UserbooksComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private bookData: BookDataService,
    private transferDataService: TransferDataService
  ) {}
  _book: string;
  total: string | number;
  isLoggedIn: boolean;
  possession: string = "My";
  user_id: string;
  _level: string;

  _category: string;
  isNotConnected: boolean = true;
  _provider: string;
  query: string = "";
  None: string = "No";
  page: string;
  books: any[];
  ngOnInit() {
    this.isLoggedIn = this.transferDataService.isLoggedIn();
    this.books = [
      {
        name: "A",
        provider: "REB",
        publisher: "Admin",
        readers: 500,
        downloads: 12,
      },
      {
        name: "B",
        provider: "TTC",
        publisher: "Divin",
        readers: 200,
        downloads: 20,
      },
      {
        name: "F",
        provider: "WDA",
        publisher: "Aim",
        readers: 1500,
        downloads: 312,
      },
      {
        name: "Z",
        provider: "REB",
        publisher: "Byose",
        readers: 500,
        downloads: 122,
      },
    ];
    this.route.queryParams.subscribe((params) => {
      this.isNotConnected = true;
      this.page = params["page"];
      if (this.page == "bookmarks") {
      }
      if (this.page == "likebook") {
      }
      if (this.page == "books") {
        this.possession = "Our";
      } else {
        this.possession = "My";
      }
      if (this.page == "reads") {
      }
      this.bookData.searchBooks(this.page).subscribe(
        (res) => {},
        (error) => {
          setTimeout(() => {
            this.isNotConnected = false;
          }, 5000);
        }
      );
    });
    this.total = this.books.length || this.None;
  }

  filterBooks(event, method) {
    const key = event.target.id;
    console.log(key);
    this.books = this.sort(this.books, key, method);
  }
  sort(array, key, method) {
    return _.orderBy(array, [key], ["desc"]);
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
  bookmark(book, user, event?) {
    if (!this.isLoggedIn) {
      this._router.navigate(["/login"], { queryParams: { logged_in: false } });
    }

    const button = event.target;
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
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }
}
