import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class AppDataService {
  private BASE_URL: string = environment.BASE_API;
  constructor(private httpClient: HttpClient) {}
  getCategories() {
    return this.httpClient.get(`${this.BASE_URL}/api/getstats/category`);
  }

  // getTrendingCategories() {
  //   return this.httpClient.get(`${this.BASE_URL}/api/get/category`);
  // }
  getMostViewedLevels() {
    return this.httpClient.get(`${this.BASE_URL}/api/mostviewed/level`);
  }

  getStatistics() {
    return this.httpClient.get(`${this.BASE_URL}/api/get/statistics`);
  }
  getMostViewedCategories() {
    return this.httpClient.get(`${this.BASE_URL}/api/mostviewed/category`);
  }
}
