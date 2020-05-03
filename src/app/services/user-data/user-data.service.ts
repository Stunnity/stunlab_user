import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  constructor(private httpClient: HttpClient) {}
  private BASE_URL: string = environment.BASE_API;
  signUp(user: Object) {
    return this.httpClient.post(`${this.BASE_URL}/api/auth/register`, user);
  }
  usernameIsAvailable(username: String) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/user/exists/username/${username}`
    );
  }
  emailIsAvailbable(email: String) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/user/exists/email/${email}`
    );
  }
  login(user: Object) {
    return this.httpClient.post(`${this.BASE_URL}/api/auth/login`, user);
  }
  subscribeToNewsLetter(email) {
    return this.httpClient.post(`${this.BASE_URL}/api/auth/login`, email);
  }
  loggedIn() {
    return !!localStorage.getItem("token");
  }
  userAvatar(username: string) {
    return this.httpClient.get(`https://ui-avatars.com/api/?name=${username}`, {
      responseType: "blob",
    });
  }
}
