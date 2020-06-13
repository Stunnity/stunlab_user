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
  private userIsSet = new BehaviorSubject(0);

  private gotCategoryBooks = new BehaviorSubject({});
  private gotCategories = new BehaviorSubject({});
  private navigateHome = new BehaviorSubject(0);

  private gotLevelBooks = new BehaviorSubject({});
  private gotLevels = new BehaviorSubject({});
  private navigateMostViewed = new BehaviorSubject(0);

  private statistics = new BehaviorSubject({});
  private isAppStatisticsset = new BehaviorSubject(0);

  private userStatistics = new BehaviorSubject({});
  private userStatisticsSet = new BehaviorSubject(0);

  private userRecentBooks = new BehaviorSubject({});
  private isUserRecentBooksSet = new BehaviorSubject(0);

  private userRecommendBooks = new BehaviorSubject({});
  private isUserRecommendBooksSet = new BehaviorSubject(0);

  private otherFeeds = new BehaviorSubject({});
  private isUserOtherFeedSet = new BehaviorSubject(0);

  private isCategoriesSet = new BehaviorSubject(0);

  constructor(private cookieService: CookieService, private router: Router) { }
  setCategories(data: any[]) {
    this.isCategoriesSet.next(1);
    this.categories.next(data);
  }
  getCategories() {
    return this.categories.asObservable();
  }

  getIsCategoriesSet() {
    return this.isCategoriesSet.asObservable();
  }

  unsetCategories() {
    this.categories = null;
  }

  setStatistics(stats) {
    this.isAppStatisticsset.next(1);
    this.statistics.next(stats);
  }
  getStatistics() {
    return this.statistics.asObservable()
  }

  getIsAppStatisticsSet() {
    return this.isAppStatisticsset.asObservable();
  }

  setMostViewedCategories(data: any[]) {
    this.mostViewedCategories.next(data);
  }
  getMostViewedCategories() {
    return this.mostViewedCategories.asObservable();
  }
  setGotCategoryBooks(books) {
    this.gotCategoryBooks.next(books);
    this.setHomeNavigation(1);
  }
  setHomeNavigation(value) {
    this.navigateHome.next(value);
  }
  getHomeNavigation() {
    return this.navigateHome.asObservable();
  }
  getGotCategoryBooks() {
    return this.gotCategoryBooks.asObservable();
  }
  setGotCategories(categories) {
    this.gotCategories.next(categories);
  }
  getGotCategories() {
    return this.gotCategories.asObservable();
  }

  getUserIsSet() {
    return this.userIsSet.asObservable();
  }

  setGotLevelBooks(books) {
    this.gotLevelBooks.next(books);
    this.setMostViewedLevelNavigation(1);
  }
  setMostViewedLevelNavigation(value) {
    this.navigateMostViewed.next(value);
  }
  getMostViewedLevelNavigation() {
    return this.navigateMostViewed.asObservable();
  }
  getGotLevelBooks() {
    return this.gotLevelBooks.asObservable();
  }
  setGotLevels(levels) {
    this.gotLevels.next(levels);
  }
  getGotLevels() {
    return this.gotLevels.asObservable();
  }


  setMostViewedLevels(data: any[]) {
    return this.mostViewedLevels.next(data);
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
    this.userIsSet.next(1);
    this.User.next(user);
  }
  getUser() {
    return this.User.asObservable();
  }
  setUserStatistics(statistics) {
    this.userStatisticsSet.next(1);
    this.userStatistics.next(statistics);
  }

  getUserStatistics() {
    return this.userStatistics.asObservable();

  }
  getUserStatisticsSet() {
    return this.userStatisticsSet.asObservable();
  }
  setUserRecentBooks(books) {
    this.isUserRecentBooksSet.next(1);
    this.userRecentBooks.next(books);
  }
  getUserRecentBooks() {
    return this.userRecentBooks.asObservable();
  }

  getIsUserRecentBooksSet() {
    return this.isUserRecentBooksSet.asObservable();
  }

  setUserRecommendBooks(books) {
    this.isUserRecommendBooksSet.next(1);
    this.userRecommendBooks.next(books);
  }
  getUserRecommendBooks() {
    return this.userRecommendBooks.asObservable();
  }

  getIsUserRecommendBooksSet() {
    return this.isUserRecommendBooksSet.asObservable();
  }


  setUserOtherFeed(books) {
    this.isUserOtherFeedSet.next(1);
    this.otherFeeds.next(books);
  }
  getUserOtherFeed() {
    return this.otherFeeds.asObservable();
  }

  getIsUserOtherFeed() {
    return this.isUserOtherFeedSet.asObservable();
  }
}
