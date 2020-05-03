import { Component, OnInit } from "@angular/core";
import { TransferDataService } from "../.././services/shared-data/transfer-data.service";
import { Router } from "@angular/router";
import * as $ from "jquery";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(
    private transferService: TransferDataService,
    private _router: Router
  ) {}
  isLoggedIn: boolean;
  categoriesAvailable: boolean;
  thumbnail: any;
  categories: any[];
  name: any;
  ngOnInit() {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
    this.isLoggedIn = this.transferService.getLoggedIn();
    if (this.isLoggedIn) {
    }
    this.fetchCategories();
  }
  bookNavigate(bookmark: boolean) {
    if (!bookmark)
      this._router.navigate(["/books"], { queryParams: { page: "bookmarks" } });
    else
      this._router.navigate(["/books"], {
        queryParams: { page: "favourites" },
      });
  }
  fetchCategories() {
    setTimeout(() => {
      this.categories = this.transferService.getCategories();
      this.categoriesAvailable = this.categories ? true : false;
    }, 1000);
  }
  searchBook(search: string, fromCategory?: boolean) {
    if (!fromCategory)
      this._router.navigate(["/search"], { queryParams: { q: search } });
    else
      this._router.navigate(["/search"], { queryParams: { category: search } });
  }
}
