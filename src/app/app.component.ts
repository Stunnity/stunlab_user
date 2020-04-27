import { Component, OnInit } from "@angular/core";
import { AppDataService } from "./services/app-data/app-data.service";
import { TransferDataService } from "./services/shared-data/transfer-data.service";
import { UserDataService } from "./services/user-data/user-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "stunlab";
  isOnline: boolean;
  categories: any[];
  mostViewedCategories: any[];
  mostViewedLevels: any[];
  userBooks: any[];
  ngOnInit(): void {
    this.getCategories();
    this.getMostViewedCategories();

    const isAuthentificated: boolean = this.transferService.isLoggedIn();
    if (isAuthentificated) {
      this.getUserBooks();
      this.getUserState();
    } else {
      this.getMostViewedLevels();
    }
  }

  constructor(
    private appService: AppDataService,
    private transferService: TransferDataService,
    private userService: UserDataService
  ) {}
  getMostViewedCategories() {
    this.appService.getMostViewedCategories().subscribe(
      (res: any[]) => {
        if (!res)
          this.mostViewedCategories = ["Science", "Language", "ICT", "Fiction"];
        else this.mostViewedCategories = res;
      },
      (err) => {
        this.mostViewedCategories = ["Science", "Language", "ICT", "Fiction"];
      }
    );
    setTimeout(() => {
      this.transferService.setMostViewedCategories(this.mostViewedCategories);
    }, 1000);
  }
  getMostViewedLevels() {
    this.appService.getMostViewedLevels().subscribe(
      (res: any[]) => {
        if (!res)
          this.mostViewedLevels = ["Nursery", "Primary", "Secondary", "Others"];
        else this.mostViewedLevels = res;
      },
      (err) => {
        this.mostViewedLevels = ["Nursery", "Primary", "Secondary", "Others"];
      }
    );
    setTimeout(() => {
      this.transferService.setMostViewedLevels(this.mostViewedLevels);
    }, 1000);
  }
  getCategories() {
    this.appService.getCategories().subscribe(
      (res: any[]) => {
        this.categories = res;
      },
      (err) => {
        this.categories = ["Science", "Language", "ICT", "Fiction"];
      }
    );
    setTimeout(() => {
      this.transferService.setCategories(this.categories);
    }, 1000);
  }

  getUserBooks() {
    this.appService.getCategories().subscribe(
      (res: any[]) => {
        this.userBooks = res;
      },
      (err) => {
        this.userBooks = ["Science", "Language", "ICT", "Fiction"];
      }
    );
    setTimeout(() => {
      this.transferService.setUserBooks(this.userBooks);
    }, 1000);
  }
  getUserState() {
    console.log(this.userService.loggedIn());
  }
}
