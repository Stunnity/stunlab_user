import { Component, OnInit } from "@angular/core";
import { UserModel } from "./user.model";
import { Data, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { UserDataService } from "../services/user-data/user-data.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  password: any;
  constructor(private _router: Router, private userData: UserDataService) {}
  user: UserModel = new UserModel();
  responseStatusCode: any;
  errorOccurred: boolean = false;
  isLoading = false;
  showTopAlert = false;
  error_message: string;

  ngOnInit() {}

  toogleLoading(value: boolean) {
    const button = document.getElementById("button-text");
    this.isLoading = value;

    button.innerHTML = this.isLoading ? "Signin In" : "Sign in";
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
    console.log(status);
    if (status == 0) {
      this.errorOccurred = true;
      this.error_message = "Address unreachable";
    }
  }
  login() {
    this.toogleLoading(true);
    const temp: any = document.getElementById("username");
    this.userData.login(this.user).subscribe(
      (res) => {
        let authToken: any = res;
        localStorage.setItem("token", authToken.body.token);
        this.isLoading = false;
        this._router.navigate(["/dashboard"]);
      },
      (error: HttpErrorResponse) => {
        this.toogleLoading(false);
        // if (error.error instanceof ErrorEvent)
        //   console.log("An error occurred:", error.error.message);
        //   this.isLoading = false;
        // } else {
        //   this.isLoading = false;
        //   this.responseStatusCode = error.status;
        //   console.log(error.status);
        //   this.responseStatusCode == 404
        //     ? (this.errorOccurred = true)
        //     : (this.errorOccurred = false);
        //   temp.focus();
        //   this.isLoading = false;
        // }
        this.errorHandler(error.status);
      }
    );
  }
}
