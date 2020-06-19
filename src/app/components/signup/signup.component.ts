import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/data/user/user-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { authenticate, scorePassword, setPassword } from '../../utils/common';
import { TransferDataService } from '../../services/data/shared/transfer-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { usernameExists, emailExists, checkPasswords } from '../../utils/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isNotConnected: boolean;
  isLoading: boolean;
  errorOccurred: boolean;
  signUpForm: FormGroup;
  errorMessage: string;
  constructor(private userService: UserDataService, private transferService: TransferDataService, private router: Router, private cookieService: CookieService) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5)],
        [usernameExists(this.userService)]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ], [emailExists(this.userService)],
      ),
      phone: new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(14),
      ]),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidation

      ]),
      c_password: new FormControl('', [
        Validators.required,
      ]),
    });
    this.signUpForm.setValidators(checkPasswords);
  }

  ngOnInit() {

  }

  getUsernameError() {
    const username = this.signUpForm.get('username');
    return username.hasError('minlength') ? 'Username too short'
      : username.hasError('exists') ? 'Username taken'
        : '';
  }

  getEmailError() {
    const email = this.signUpForm.get('email');
    return email.hasError('email') ? 'Invalid email'
      : email.hasError('exists') ? 'Email taken'
        : '';
  }

  getPasswordError() {
    const password = this.signUpForm.get('password');
    return password.hasError('weak') ? 'Weak'
      : '';
  }


  signUp(): void {
    this.toogleLoading(true);
    this.userService.signUp(this.signUpForm.value).subscribe(
      (res: any) => {
        const token = res.token;
        if (authenticate(this.cookieService, token, this.transferService)) {
          this.userService.authUser().subscribe((user) => {
            this.transferService.setUser(user);
            this.router.navigate(['/u']);
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = (error.status === 0) ? 'You aren"t connected to the Internet! 😓️😓' :
          (error.status === 401) ? 'Invalid Username and Password' : error.statusText;
        this.toogleLoading(false);
        this.errorOccurred = true;
      }
    );
  }


  passwordValidation(control: FormControl) {
    const password = control.value;
    const score = scorePassword(password);
    setPassword(password);
    if (score < 50) {
      return {
        weak: true,
      };
    }
    return null;
  }


  toogleLoading(value: boolean): void {
    const button = document.getElementById('button-text');
    this.isLoading = value;
    button.innerHTML = this.isLoading ? 'Creating Account' : 'Create Account';
  }

  hasClass(element: Element, className: string): boolean {
    return element.classList.contains(className);
  }

}
