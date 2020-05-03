import { Component, OnInit } from "@angular/core";
import { UserModel } from "./user.model";
import { Data, Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { UserDataService } from "../services/user-data/user-data.service";
import { TransferDataService } from "../services/shared-data/transfer-data.service";

import { interval } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private _router: Router,
    private userData: UserDataService,
    private route: ActivatedRoute,
    private transferDataService: TransferDataService
  ) {}

  user: UserModel = new UserModel();
  password: any;
  responseStatusCode: any;
  errorOccurred: boolean = false;
  isLoading = false;
  invalidData: boolean = true;
  showTopAlert = false;
  error_message: string;
  navigateKey: any;
  log_msg: string = "";

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.navigateKey = params["logged_in"] || null;
      if (this.navigateKey) {
        this.log_msg = "To Perform More";
      }
    });
    interval(1000).subscribe((val) => this.disableLogin());
  }
  login() {
    this.toogleLoading(true);
    this.userData.login(this.user).subscribe(
      (res: any) => {
        let authToken: string = res.accessToken;
        // this.transferDataService.setupUser(authToken);
        this._router.navigate(["/home"]);
      },
      (error: HttpErrorResponse) => {
        this.toogleLoading(false);
        this.transferDataService.isLoggedIn(true);
        this._router.navigate(["/home"]);
        this.errorHandler(error.status);
      }
    );
  }
  disableLogin(): void {
    if (Object.keys(this.user).length == 2) {
      this.invalidData = false;
      return;
    }
  }
  toogleLoading(value: boolean) {
    const button = document.getElementById("button-text");
    this.isLoading = value;
    button.innerHTML = this.isLoading ? "Signing In" : "Sign in";
  }

  tooglePassword() {
    var temp: any = document.getElementById("float-input-password");
    const icon = document.getElementById("icon");
    if (temp.type === "password") {
      temp.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
      temp.focus();
    } else {
      temp.type = "password";
      icon.classList.add("fa-eye");
      icon.classList.remove("fa-eye-slash");
      temp.focus();
    }
  }
  setToFalse() {
    this.errorOccurred = false;
  }
  errorHandler(status) {
  
    if (status == 0) {
      this.errorOccurred = true;
      this.navigateKey = false;
      this.error_message = "Address unreachable";
    } else if (status == 404) {
      this.errorOccurred = true;
      this.navigateKey = false;
      this.error_message = "Invalid Username and Password";
    }
  }
}
