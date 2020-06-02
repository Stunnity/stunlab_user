import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class TransferDataService {
  private authToken: string;
  private mostViewedCategories = new BehaviorSubject({});
  private mostViewedLevels = new BehaviorSubject({});
  private userBooks = new BehaviorSubject({});
  private User = new BehaviorSubject({});
  private categories = new BehaviorSubject({});

  constructor(private cookieService: CookieService, private router: Router) { }
  setCategories(data: any[]) {
    this.categories.next(data);
  }
  getCategories() {
    return this.categories.asObservable();
  }
  unsetCategories() {
    this.categories = null;
  }

  setMostViewedCategories(data: any[]) {
    this.mostViewedCategories.next(data);
  }
  getMostViewedCategories() {
    return this.mostViewedCategories.asObservable();
  }

  setMostViewedLevels(data: any[]) {
    this.mostViewedLevels.next(data);
  }
  getMostViewedLevels() {
    return this.mostViewedLevels.asObservable();
  }
  setUserBooks(data: any[]) {
    this.userBooks.next(data);
  }
  getUserBooks() {
    return this.userBooks.asObservable();
  }
  loggedIn() {
    const token = this.cookieService.get(`token`);
    if (!!token) {
      try {
        const user = jwt_decode(token);
        return true
      } catch (error) {
        return false;
      }
    }
    else
      return false;
  }
  getToken() {
    return this.cookieService.get("token");
  }
  logoutUser() {
    this.cookieService.delete(`token`);
    this.router.navigate(['/login']);
  }
  setUser(user) {
    this.User.next(user);
  }
  getUser() {
    console.log(this.User);
    return this.User.asObservable();
  }
}
