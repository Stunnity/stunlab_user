import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookDataService {
  private BASE_URL = 'https://stunlabapis.herokuapp.com';
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

  getAllBooks() {
    return this.httpClient.get(`${this.BASE_URL}/api/books`);
  }

  getUserBooks(type, page = 1) {
    if (typeof type === 'undefined')
      return this.httpClient.get(`${this.BASE_URL}/api/books?page=${page}`);
    return this.httpClient.get(`${this.BASE_URL}/api/user/books/${type}?page=${page}`);
  }
  readBook(book: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/books/read/${book}`
    );
  }

  getOtherSee() {
    return this.httpClient.get(`${this.BASE_URL}/api/books/others`);
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

  searchBooks(query: string) {
    return this.httpClient.get(`${this.BASE_URL}/api/search/query?${query}`);
  }
  bookmarkBooks(book) {
    return this.httpClient.get(`${this.BASE_URL}/api/books/bookmark/${book}`);
  }

  getRecommendedBooks(user) {
    return this.httpClient.get(`${this.BASE_URL}/api/bookmark/${user}`);
  }
  getItems() {
    setTimeout(() => {
      return [1, 2, 3, 4, 5, 6];
    }, 6000);
    // return this.httpClient.get(`${this.BASE_URL}/api/bookmark/${user}`);
  }
  getRecentBooks() {
    return this.httpClient.get(`${this.BASE_URL}/api/user/books/reads`);
  }
}
