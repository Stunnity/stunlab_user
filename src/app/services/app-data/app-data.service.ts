import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AppDataService {
  constructor(private httpClient: HttpClient) {}
  getCategories() {
    return this.httpClient.get(
      "https://quiet-escarpment-74371.herokuapp.com/api/get/category"
    );
  }
}
