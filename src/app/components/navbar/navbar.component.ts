import { Component, OnInit } from "@angular/core";
import { AppDataService } from "../../services/app-data/app-data.service";
import { TransferDataService } from "../.././services/shared-data/transfer-data.service";
import { UserDataService } from "../../services/user-data/user-data.service";
import { Data, Router, ActivatedRoute, ParamMap } from "@angular/router";
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
    private route: ActivatedRoute
  ) {}
  isLoggedIn: boolean = true;
  categoriesAvailable: boolean;
  categories: any[];
  name: any;
  ngOnInit() {
    this.isLoggedIn = this.transferService.isLoggedIn();
    this.fetchCategories();
    console.log(this.userData.loggedIn());
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
      console.log(this.categories);
    }, 1000);
  }
  searchBook(search: string, fromCategory?: boolean) {
    if (!fromCategory)
      this._router.navigate(["/search"], { queryParams: { q: search } });
    else
      this._router.navigate(["/search"], { queryParams: { category: search } });
  }
}
