import { Component, OnInit } from "@angular/core";
import { UserModel } from "./user.model";
import { UserDataService } from "../services/user-data/user-data.service";
import { interval } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  isNotConnected: boolean;
  user: UserModel = new UserModel();
  re_password: String;
  formValid: any;
  _recaptcha = false;
  isLoading = false;
  gotResponse: boolean;
  invalidData: boolean = true;
  errorOccurred: boolean;
  showErrorState: boolean = false;
  error_message: string;
  emailPass: boolean;

  constructor(private userData: UserDataService) {}

  ngOnInit() {
    this.user.email = "";
    this.user.phone = "";
    interval(100).subscribe((val) => this.disableSubmit());
  }

  signUp(): void {
    this.toogleLoading(true);
    this.userData.signUp(this.user).subscribe(
      (res) => {
        // this.toogleLoading(false);
      },
      (error: HttpErrorResponse) => {
        this.toogleLoading(false);
        this.errorHandler(error.status);
      }
    );
  }

  validateEmail(email): void {
    const _email = document.getElementById("email");
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
      _email.classList.add("is-valid");
      _email.classList.remove("is-invalid");
      let emailExists;
      this.userData.usernameIsAvailable(email).subscribe(
        (res: any) => {
          this.gotResponse = true;
          this.showErrorState = true;
          emailExists = res.exists;
          if (!emailExists) this.emailPass = true;
          else this.emailPass = false;
        },
        (err) => {
          this.gotResponse = false;
          this.showErrorState = true;
          this.isNotConnected = true;
        }
      );
    } else {
      _email.classList.remove("is-valid");
      _email.classList.add("is-invalid");
      return;
    }
  }

  validatePhone(phone: string): void {
    const _phone = document.getElementById("phone-number");
    const regex = /^([0-9 \(\)\/\+ \-]*)$/;
    if (regex.test(phone) && phone.length >= 10) {
      _phone.classList.remove("is-invalid");
      _phone.classList.add("is-valid");
    } else {
      _phone.classList.remove("is-valid");
      _phone.classList.add("is-invalid");
    }
  }

  validateUsername(username: String): void {
    let username_available;
    const id_username = document.getElementById("username");
    const available_status = document.getElementById("available-status");
    if (username.length > 5) {
      this.userData.usernameIsAvailable(username).subscribe((res: any) => {
        username_available = res.exists;
      });
      if (!username_available) {
        if (this.hasClass(id_username, "is-invalid")) {
          id_username.classList.remove("is-invalid");
          available_status.classList.add("text-danger");
        }
        id_username.classList.add("is-valid");
        available_status.classList.add("text-success");
        available_status.innerHTML = "Username is available";
      } else {
        if (this.hasClass(id_username, "is-valid")) {
          id_username.classList.remove("is-valid");
          available_status.classList.add("text-success");
        }
        id_username.classList.add("is-invalid");
        available_status.classList.add("text-danger");
        available_status.innerHTML = "Username already taken";
      }
    } else {
      id_username.classList.add("is-invalid");
      id_username.classList.remove("is-valid");
      available_status.classList.add("text-danger");
      available_status.innerHTML = "Username too short";
    }
  }

  checkPassStrength(password: string): void {
    const score = this.scorePassword(password);
    this.passwordMeter(score);
  }

  checkPassword(): void {
    const c_password = document.getElementById("confirm_password");
    if (this.user.c_password === this.user.password) {
      c_password.classList.add("is-valid");
      c_password.classList.remove("is-invalid");
    } else {
      c_password.classList.add("is-invalid");
      c_password.classList.remove("is-valid");
    }
  }

  isEmailPhoneNull(): boolean {
    if (this.user.email == "" && this.user.phone == "") return false;
    return true;
  }

  hasNull(object: Object): boolean {
    for (const key in object) {
      if (key == "email" || key == "phone") return false;
      if (object[key] == "") return true;
    }
    return false;
  }

  errorHandler(status: number): void {
    if (status == 0) {
      this.errorOccurred = true;
      this.error_message = "Address unreachable";
    }
  }
  toogleLoading(value: boolean): void {
    const button = document.getElementById("button-text");
    this.isLoading = value;
    button.innerHTML = this.isLoading ? "Creating Account" : "Create Account";
  }

  hasClass(element: Element, _class: string): boolean {
    return element.classList.contains(_class);
  }

  scorePassword(password): number {
    var score = 0;
    if (!password) return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i = 0; i < password.length; i++) {
      letters[password[i]] = (letters[password[i]] || 0) + 1;
      score += 5.0 / letters[password[i]];
    }

    // bonus points for mixing it up
    var variations = {
      digits: /\d/.test(password),
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      nonWords: /\W/.test(password),
    };

    let variationCount = 0;
    for (var check in variations) {
      variationCount += variations[check] == true ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return score;
  }

  passwordMeter(score: number): void {
    const element: Element = document.querySelector("#password_validation");
    const sibling: any = element.previousSibling;
    element.removeAttribute("class");
    if (score >= 80) {
      sibling.classList.remove("is-invalid");
      element.classList.add("text-success");
      element.innerHTML = "Strong";
    } else if (score >= 60) {
      sibling.classList.remove("is-invalid");
      element.classList.add("text-secondary");
      element.innerHTML = "Good";
    } else if (score > 40) {
      sibling.classList.remove("is-invalid");
      element.classList.add("text-warning");
      element.innerHTML = "Weak";
    } else if (score <= 40) {
      element.classList.add("text-danger");
      sibling.classList.add("is-invalid");
      element.innerHTML = "Too Weak";
    }
  }

  toogleDisable(value: boolean): boolean {
    value = !value;
    return value;
  }

  resolved(captchaResponse: string): void {
    if (grecaptcha.getResponse().length !== 0) {
      this._recaptcha = true;
    } else {
      this._recaptcha = false;
      this.invalidData = true;
    }
  }

  disableSubmit(): void {
    if (!this.emailPass || this.isNotConnected) {
      this.invalidData = true;
      return;
    }
    if (this.user.email == "") {
      const _email = document.getElementById("email");
      // const _phone = document.getElementById("phone-number");
      _email.classList.remove("is-invalid");
      // _phone.classList.remove("is-invalid");
    }
    if (this.user.phone == "") {
      const _phone = document.getElementById("phone-number");
      _phone.classList.remove("is-invalid");
    }
    const invalid_input = document.querySelector(".is-invalid");
    if (invalid_input) {
      this.invalidData = true;
      return;
    }
    if (!this.isEmailPhoneNull()) {
      this.invalidData = true;
      return;
    }
    if (Object.keys(this.user).length == 5) {
      this.invalidData = false;
      return;
    }
    if (!this.invalidData) {
      if (this.hasNull(this.user)) {
        this.invalidData = true;
        return;
      }
    }
  }
}
