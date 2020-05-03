import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-read-book",
  templateUrl: "./read-book.component.html",
  styleUrls: ["./read-book.component.css"],
})
export class ReadBookComponent implements OnInit {
  ISBN: any;
  data: any;
  bookReady: boolean;
  constructor(private route: ActivatedRoute, private httpClient: HttpClient) {}
  // @ViewChild("pdfViewer", { static: false }) pdfViewer;
  @ViewChild("pdfViewerOnDemand", { static: false }) pdfViewerOnDemand;
  @ViewChild("pdfViewerAutoLoad", { static: false }) pdfViewerAutoLoad;
  ngOnInit() {
    this.bookReady = false;
    this.ISBN = this.route.snapshot.params.ISBN;
    setTimeout(() => {
      this.pdfViewerAutoLoad.pdfSrc = "Physics.pdf";
     
      this.pdfViewerAutoLoad.refresh();
      this.bookReady = true;
    }, 2000);
  }
}
