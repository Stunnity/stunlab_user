import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services/user-data/user-data.service';
import { TransferDataService } from '../services/shared-data/transfer-data.service';
import { CookieService } from 'ngx-cookie-service';
import { authenticate, toogleLoading, tooglePassword } from 'src/utils/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private userData: UserDataService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private transferDataService: TransferDataService
  ) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl("", [
        Validators.required,
      ]),
      password: new FormControl("", [
        Validators.required,
      ]),
    });
  }
  loginFormGroup: FormGroup;
  errorOccurred = false;
  isLoading = false;
  buttonText: string = 'Sign in';
  logMessage: string;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      let navigateKey = params.logged_in || null;
      if (navigateKey) {
        this.logMessage = 'To Perform More';
      }
    });
  }
  login() {
    this.toogleLoading(true);
    this.userData.login(this.loginFormGroup.value).subscribe(
      (res: any) => {
        if (authenticate(this.cookieService, res['token'], this.transferDataService)) {
          this.userData.authUser().subscribe((res) => {
            this.transferDataService.setUser(res);
            this._router.navigate(['/home']);
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.errorOccurred = true;
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
    tooglePassword(temp, icon)
  }
}
