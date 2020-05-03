import { Component, OnInit } from "@angular/core";
import { AppDataService } from "../../services/app-data/app-data.service";
import { TransferDataService } from "../.././services/shared-data/transfer-data.service";
import { UserDataService } from "../../services/user-data/user-data.service";
import { Data, Router, ActivatedRoute, ParamMap } from "@angular/router";
import * as $ from "jquery";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(
    private appData: AppDataService,
    private userData: UserDataService,
    private transferService: TransferDataService,
    private _router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
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
      // this.userData.userAvatar("active user").subscribe((baseImage: any) => {
      //   let ObjectUrl = "data:image/jpeg;base64," + baseImage.image;
      //   this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(ObjectUrl);
      // });
    }
    this.fetchCategories();

    // this.route.queryParams.subscribe((params) => {
    //   this.name = params["name"];
    //   console.log(this.name);
    // });
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
