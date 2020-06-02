import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { AppDataService } from './services/app-data/app-data.service';
import { TransferDataService } from './services/shared-data/transfer-data.service';
import { UserDataService } from './services/user-data/user-data.service';
import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _router: Router,
    private appService: AppDataService,
    private transferService: TransferDataService,
    private userService: UserDataService
  ) { }

  title = 'stunlab';
  isOnline: boolean;
  categories: any[];
  mostViewedCategories: any[];
  mostViewedLevels: any[];
  userBooks: any[];
  windowWidth: number;

  isLoader: boolean;

  ngOnInit(): void {
    if ($(window).width() < 450) {
      this.mobileApp();
    }
    this.getCategories();
    this.getMostViewedCategories();

    const isAuthentificated: boolean = this.transferService.loggedIn();

    if (isAuthentificated) {
      this.getUserBooks();
      this.authUser();
      this.getUserState();
    } else {
      this.getMostViewedLevels();
    }
  }

  mobileApp() {
    this.document.location.href = 'https://stunlabmobile.herokuapp.com';
  }
  authUser() {
    this.userService.authUser().subscribe((res) => {
      console.log(res);
      this.transferService.setUser(res);
      this._router.navigate(['/home']);
    });
  } routerEvents() {
    this._router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoader = true;
          break;
        }
        case event instanceof NavigationEnd: {
          this.isLoader = false;
          break;
        }
      }
    });
  }

  getCategories() {
    this.appService.getCategories().subscribe(
      (res: any[]) => {
        this.transferService.setCategories(res);
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  getMostViewedCategories() {
    this.appService.getMostViewedCategories().subscribe(
      (res: any[]) => {
        if (res.length < 3) {
          this.mostViewedCategories = [
            'Science',
            'Language',
            'Ict',
            'Humanity',
          ];
          this.transferService.setMostViewedCategories(
            this.mostViewedCategories
          );
        } else { this.transferService.setMostViewedCategories(res); }
      },
      (err) => {
        // this.mostViewedCategories = this.transferService.getCategories() || [
        //   'Science',
        //   'Language',
        //   'Ict',
        //   'Humanity',
        // ];
        this.transferService.setMostViewedCategories(this.mostViewedCategories);
      }
    );
  }
  getMostViewedLevels() {
    this.appService.getMostViewedLevels().subscribe(
      (res: any[]) => {
        console.log(res)
        this.mostViewedLevels = ['A level', 'Primary', 'Secondary', 'All'];
        this.transferService.setMostViewedLevels(this.mostViewedLevels);
      },
    );
  }

  getUserBooks() {
    this.appService.getCategories().subscribe(
      (res: any[]) => {
        this.userBooks = res;
      },
      (err) => {
        this.userBooks = ['Science', 'Language', 'ICT', 'Humanity'];
      }
    );
    setTimeout(() => {
      this.transferService.setUserBooks(this.userBooks);
    }, 1000);
  }
  getUserState() {
    this.userService.loggedIn();
  }
}
