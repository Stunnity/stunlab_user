import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AppDataService } from '../services/app-data/app-data.service';
import { BookDataService } from '../services/book-data/book-data.service';
import { TransferDataService } from '../services/shared-data/transfer-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from './models/contact.model';
import { interval } from 'rxjs';
import { empty, sanitize } from 'src/utils/common';
import { DomSanitizer } from '@angular/platform-browser';
declare const statisticsCounter: any;
declare const bookSwiper: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  invalidContactData: boolean;
  report_message: string;
  constructor(
    private appData: AppDataService,
    private bookData: BookDataService,
    private transferDataService: TransferDataService,
    private _router: Router,
    private sanitizer: DomSanitizer
  ) { }

  contact: Contact = new Contact();
  user_id: string;
  userdata: any;
  category_books: any[];
  isNotConnected = true;
  isLoggedIn: any;
  gotBookResponse = false; SMS
  mostViewedCategories: any[];
  number_books: number;
  number_readers: number;
  number_downloads: number;

  ngOnInit() {
    this.isLoggedIn = this.transferDataService.loggedIn();
    this.getStats();
    this.getMostViewedCategories();
    // interval(1000).subscribe((val) => this.disableContactBtn());
  }

  getMostViewedCategories() {
    this.transferDataService.getMostViewedCategories().subscribe(res => {
      if (empty(res)) {
        return;
      }
      console.log(res);
      this.mostViewedCategories = ['Literature', 'Language', 'Science', 'Humanity'];
      this.getCategoryBooks(this.mostViewedCategories[0]);

    });
  }

  getCategoryBooks(category, event?) {
    if (event) {
      const element: any = event.target.id;
      if ($(`#${element}`).hasClass('active')) {
        return;
      }
      $(`#${element}`).siblings().removeClass('active');
      $(`#${element}`).addClass('active');
    }
    this.gotBookResponse = false;
    this.bookData.getCategoryBooks(category).subscribe(
      (res: any[]) => {
        let array = [];
        for (const book of res["data"]) {
          array.push(book.book)
        }
        this.gotBookResponse = true;
        this.category_books = array;
        bookSwiper();
      },
      (err) => { }
    );
  }
  sanitizeUrl(url) {
    return sanitize(this.sanitizer, url)
  }
  sendToLogin() {
    this._router.navigate(['/login'], { queryParams: { logged_in: false } });
  }
  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }
  getStats() {
    this.appData.getStatistics().subscribe(
      (res: any) => {
        this.isNotConnected = false;
        this.number_books = res.books;
        this.number_downloads = res.downloads;
        this.number_readers = res.users;
        setTimeout(() => {
          statisticsCounter();
        }, 3000);
      },
      (error: HttpErrorResponse) => {
        this.isNotConnected = false;
      }
    );
  }
  contactUs() {
    const name_element = document.getElementById(
      'contact-name'
    ) as HTMLInputElement;
    const email_element = document.getElementById(
      'contact-email'
    ) as HTMLInputElement;
    const textarea_element = document.getElementById(
      'contact-message'
    ) as HTMLInputElement;

    const button_element = document.getElementById(
      'submit-button'
    ) as HTMLButtonElement;
    button_element.innerHTML = 'Contacting ';
    this.appData.contactUs(this.contact).subscribe((res) => {
      button_element.innerHTML = 'Contact Us';
      textarea_element.value = '';
      email_element.value = '';
      name_element.value = '';
    });
  }
  clearReport() {
    this.report_message = '';
  }
  disableContactBtn() {
    if (Object.keys(this.contact).length == 0) {
      this.invalidContactData = true;
      return;
    } else {
      this.invalidContactData = false;
    }
  }
  report() {
    this.appData.report(this.report_message).subscribe((res) => {
      this.report_message = '';
    });
  }
}
