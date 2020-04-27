import { Component, OnInit } from "@angular/core";
import { Data, Router, ActivatedRoute, ParamMap } from "@angular/router";
import { TransferDataService } from ".././services/shared-data/transfer-data.service";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  total_books: number;
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private transferService: TransferDataService
  ) {}

  books: any[];
  ngOnInit() {
    setTimeout(() => {
      this.books = this.transferService.getUserBooks();
      console.log(this.books);
      if (this.books) this.total_books = this.books.length;
      else this.total_books = 0;
      console.log(this.total_books);
    }, 2000);
  }
  bookNavigate(allbooks: boolean) {
    if (!allbooks)
      this._router.navigate(["/books"], { queryParams: { page: "reads" } });
    else
      this._router.navigate(["/books"], {
        queryParams: { page: "books" },
      });
  }
}
