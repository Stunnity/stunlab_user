import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  constructor(private httpClient: HttpClient) {}
  signUp(user: Object) {
    return this.httpClient.post(
      "https://quiet-escarpment-74371.herokuapp.com/api/auth/register",
      user
    );
  }
  usernameIsAvailable(username: String): Boolean {
    return false;
  }
  login(user: Object) {
    return this.httpClient.post(
      "https://quiet-escarpment-74371.herokuapp.com/api/auth/login",
      user
    );
  }
}
