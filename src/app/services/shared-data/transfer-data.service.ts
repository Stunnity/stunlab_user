import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TransferDataService {
  private categories: any[];
  private auth_token: string;
  private mostViewedCategories: any[];
  private mostViewedLevels: any[];
  private userBooks: any[];

  private auth_user: Object;

  constructor() {}
  setCategories(data: any[]) {
    this.categories = data;
  }
  getCategories() {
    return this.categories;
  }
  unsetCategories() {
    this.categories = null;
  }

  setMostViewedCategories(data: any[]) {
    this.mostViewedCategories = data;
  }
  getMostViewedCategories() {
    return this.mostViewedCategories;
  }

  setMostViewedLevels(data: any[]) {
    this.mostViewedLevels = data;
  }
  getMostViewedLevels() {
    return this.mostViewedLevels;
  }

  setupUser(token: string) {
    this.auth_token = token;
    // this.auth_user = jwt.decode(this.auth_token);
  }
  getUser() {
    return this.auth_token, this.auth_user;
  }
  setUserBooks(data: any[]) {
    this.userBooks = data;
    console.log(this.userBooks);
  }
  getUserBooks() {
    return this.userBooks;
  }
  isLoggedIn() {
    return true;
  }
}
