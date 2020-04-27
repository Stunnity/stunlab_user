import { Component, OnInit } from "@angular/core";
import { AppDataService } from "../services/app-data/app-data.service";
import { TransferDataService } from "../services/shared-data/transfer-data.service";
import { BookDataService } from "../services/book-data/book-data.service";
import * as $ from "jquery";

@Component({
  selector: "app-mostviewed",
  templateUrl: "./mostviewed.component.html",
  styleUrls: ["./mostviewed.component.css"],
})
export class MostviewedComponent implements OnInit {
  gotBookResponse: boolean;
  constructor(
    private appData: AppDataService,
    private bookData: BookDataService,
    private transferDataService: TransferDataService
  ) {}
  user_id: string = "";
  mostViewedLevels: any[];
  ngOnInit() {
    console.log(this.getTrendingLevels());
    const element: any = document.querySelector(".levels > .active");
    const level: string = element.childNodes[0].innerHTML.trim();

    this.bookData.getLevelBooks(level).subscribe(
      (res) => {},
      (err) => {}
    );
  }

  getTrendingLevels() {
    setTimeout(() => {
      this.mostViewedLevels = this.transferDataService.getMostViewedLevels();
      this.getLevelBooks(this.mostViewedLevels[0]);
    }, 1000);
  }
  getLevelBooks(level, event?) {
    this.gotBookResponse = false;
    this.bookData.getLevelBooks(level).subscribe(
      (res) => {},
      (err) => {
        setTimeout(() => {
          this.gotBookResponse = true;
        }, 1000);
      }
    );
    setTimeout(() => {
      $(".navlist1").on("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      });
    }, 1000);
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
}
