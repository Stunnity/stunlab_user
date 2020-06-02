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
  likeBook(user: string, book: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/book/like/${user}/${book}`
    );
  }

  dislikeBook(user: string, book: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/book/dislike/${user}/${book}`
    );
  }

  readBook(user: string, book: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/book/read/${user}/${book}`
    );
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
  bookmarkBooks(book, user) {
    return this.httpClient.get(`${this.BASE_URL}/api/bookmark/${user}/${user}`);
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
  getRecentBooks(user) {
    return this.httpClient.get(`${this.BASE_URL}/api/bookmark/${user}`);
  }
}
