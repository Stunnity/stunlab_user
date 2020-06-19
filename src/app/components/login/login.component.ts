import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../services/data/user/user-data.service';
import { TransferDataService } from '../../services/data/shared/transfer-data.service';
import { CookieService } from 'ngx-cookie-service';
import { authenticate, toogleLoading, tooglePassword } from 'src/app/utils/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: string;

  constructor(
    private router: Router,
    private userData: UserDataService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private transferDataService: TransferDataService
  ) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }
  loginFormGroup: FormGroup;
  errorOccurred = false;
  isLoading = false;
  returnUrl: string;
  buttonText = 'Sign in';
  logMessage: string;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const navigateKey = params.logged_in || null;
      if (navigateKey) {
        this.logMessage = 'To Perform More';
      }
    });
  }
  login() {
    this.toogleLoading(true);
    this.userData.login(this.loginFormGroup.value).subscribe(
      (res: any) => {
        if (authenticate(this.cookieService, res.token, this.transferDataService)) {
          this.userData.authUser().subscribe((user) => {
            this.transferDataService.setUser(user);
            this.router.navigate(['/u']);
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.errorOccurred = true;
        this.errorMessage = (error.status === 0) ? 'You aren"t connected to the Internet! 😓️😓' :
          (error.status === 401) ? 'Invalid Username and Password' : error.statusText;
        this.toogleLoading(false);
      }
    );
  }
  toogleLoading(value: boolean) {
    const object = toogleLoading(value, this.buttonText, true);

    this.buttonText = object.buttonText;

    this.isLoading = object.value;
  }

  tooglePassword() {
    const temp: any = document.getElementById('float-input-password');
    const icon = document.getElementById('icon');
    tooglePassword(temp, icon);
  }
}
