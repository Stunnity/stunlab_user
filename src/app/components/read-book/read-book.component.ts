import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDataService } from 'src/app/services/data/book/book-data.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css'],
})
export class ReadBookComponent implements OnInit {
  ISBN: any;
  data: any;
  bookReady: boolean;
  validParam: boolean;
  fileNotFound: boolean;
  constructor(private route: ActivatedRoute, private bookData: BookDataService) {
    this.bookReady = false;

    this.route.queryParams.subscribe((params) => {
      if (!params.ISBN) {
        this.validParam = false;
        this.bookReady = true;
        return;
      }
      this.validParam = true;
      const ISBN = params.ISBN;
      this.getBook(ISBN);
    });
  }
  ngOnInit() {
  }

  getBook(ISBN: string) {
    this.bookData.getBook(ISBN).subscribe((res: any) => {
      this.bookReady = true;
      window.open(res.bookFile, '_self');
      this.fileNotFound = false;
    }, (err: HttpErrorResponse) => {
      this.bookReady = true;
      this.fileNotFound = true;
    });
  }
}
