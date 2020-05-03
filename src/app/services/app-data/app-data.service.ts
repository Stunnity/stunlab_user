import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
  getMostViewedLevels() {
    return this.httpClient.get(`${this.BASE_URL}/api/mostviewed/level`);
  }

  getStatistics() {
    return this.httpClient.get(`${this.BASE_URL}/api/get/statistics`);
  }
  getMostViewedCategories() {
    return this.httpClient.get(`${this.BASE_URL}/api/mostviewed/category`);
  }
  contactUs(details: Object) {
    return this.httpClient.post(
      `${this.BASE_URL}/api/mostviewed/level`,
      details
    );
  }
}
