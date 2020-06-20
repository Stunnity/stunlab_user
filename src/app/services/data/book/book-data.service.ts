import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BookDataService {
  BASE_URL = environment.BASE_API;
  constructor(private httpClient: HttpClient) { }
  likeBook(book: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/books/like/${book}`
    );
  }

  dislikeBook(book: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/books/dislike/${book}`
    );
  }

  getBook(ISBN: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/book/${ISBN}`
    );
  }
  getAllBooks() {
    return this.httpClient.get(`${this.BASE_URL}/api/books`);
  }

  getUserBooks(type, page = 1) {

    if (typeof type === 'undefined') {
      return this.httpClient.get(`${this.BASE_URL}/api/books?page=${page}`);
    }
    return this.httpClient.get(`${this.BASE_URL}/api/user/books/${type}?page=${page}&pp=3`);
  }
  readBook(book: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/books/read/${book}`
    );
  }

  getOtherSee() {
    return this.httpClient.get(`${this.BASE_URL}/api/books/others`);
  }

  getRecommendedCategories() {
    return this.httpClient.get(`${this.BASE_URL}/api/category/recommended`);
  }
  getCategoryBooks(category: string) {
    return this.httpClient.get(`${this.BASE_URL}/api/category/${category}`);
  }
  getMostViewed(value, type) {
    const queryParam = type;
    return this.httpClient.get(
      `${this.BASE_URL}/api/mostviewed?${queryParam}=${value}`
    );
  }

  getLevelBooks(level: string) {
    return this.httpClient.get(`${this.BASE_URL}/api/level/${level}`);
  }

  searchBooks(query: string, page = 1) {
    return this.httpClient.get(`${this.BASE_URL}/api/search/query?${query}&page=${page}&pp=3`);
  }
  bookmarkBooks(book) {
    return this.httpClient.get(`${this.BASE_URL}/api/books/bookmark/${book}`);
  }

  getRecommendedBooks(user) {
    return this.httpClient.get(`${this.BASE_URL}/api/bookmark/${user}`);
  }

  getRecentBooks() {
    return this.httpClient.get(`${this.BASE_URL}/api/user/books/reads`);
  }

  newArrivals() {
    return this.httpClient.get(`${this.BASE_URL}/api/books/new`);
  }
}
