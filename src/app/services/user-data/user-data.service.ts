import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private httpClient: HttpClient) { }
  private BASE_URL: string = environment.BASE_API;

  signUp(user) {
    return this.httpClient.post(`${this.BASE_URL}/api/user/register`, user);
  }
  usernameIsAvailable(username) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/user/exists/username/${username}`
    );
  }
  userStatistics() {
    return this.httpClient.get(`${this.BASE_URL}/api/user/statistics`)
  }
  emailIsAvailbable(email: string) {
    return this.httpClient.get(
      `${this.BASE_URL}/api/user/exists/email/${email}`
    );
  }
  login(user) {
    return this.httpClient.post(`${this.BASE_URL}/api/user/login`, user);
  }
  subscribeToNewsLetter(email) {
    return this.httpClient.post(`${this.BASE_URL}/api/subscribe`, email);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  userAvatar(username): Observable<Blob> {
    return this.httpClient.get(`https://ui-avatars.com/api/?name=${username}`, {
      responseType: 'blob',
    });
  }
  authUser() {
    return this.httpClient.get(`${this.BASE_URL}/api/user/me`);
  }
  logout() {
    return this.httpClient.post(`${this.BASE_URL}/api/user/logout`, {})
  }
  updateUser(user) {
    return this.httpClient.post(`${this.BASE_URL}/api/user/update/profile`, user)
  }
  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, { responseType: 'blob' });
  }
}
