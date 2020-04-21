import { Component, OnInit } from "@angular/core";
import { UserModel } from "./user.model";
import { UserDataService } from "../services/user-data/user-data.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  user: UserModel = new UserModel();
  re_password: String;
  formValid: any;
  _recaptcha = false;
  isLoading = false;

  constructor(private userData: UserDataService) {}
  ngOnInit() {}
  signUp() {
    this.toogleLoading(true);
    console.log(this.user);
    this.userData.signUp(this.user).subscribe(
      (res) => {
        // this.toogleLoading(false);
      },
      (err) => {
        // this.toogleLoading(false);
      }
    );
  }

  validateUsername(username: String) {
    if (username.length > 5) {
      const id_username = document.getElementById("username");
      const available_status = document.getElementById("available-status");
      if (this.userData.usernameIsAvailable(username)) {
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
    }
  }
  toogleLoading(value: boolean) {
    const button = document.getElementById("button-text");
    this.isLoading = value;
    if (this.isLoading) button.innerHTML = "Creating Account";
  }

  hasClass(element: Element, _class: string) {
    return element.classList.contains(_class);
  }
  checkPassword() {
    const c_password = document.getElementById("confirm_password");
    this.checkEmailOrPhoneNumber();
    if (this.re_password === this.user.password) {
      c_password.classList.add("is-valid");
      c_password.classList.remove("is-invalid");
    } else {
      c_password.classList.add("is-invalid");
      c_password.classList.remove("is-valid");
    }
  }

  checkEmailOrPhoneNumber() {
    const _email = document.getElementById("email");
    const _phone = document.getElementById("phone-number");
    if (!this.user.phone && !this.user.email) {
      _email.classList.add("is-invalid");
      _phone.classList.add("is-invalid");
    } else {
      _email.classList.remove("is-invalid");
      _phone.classList.remove("is-invalid");
    }
  }

  scorePassword(pass) {
    var score = 0;
    if (!pass) return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
    };

    let variationCount = 0;
    for (var check in variations) {
      variationCount += variations[check] == true ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return score;
  }

  checkPassStrength(pass) {
    console.log(pass);
    var score = this.scorePassword(pass);
    if (score > 80) return "strong";
    if (score > 60) return "good";
    if (score >= 30) return "weak";
    return "";
  }
  // resolved(captchaResponse: string) {
  //   if (grecaptcha.getResponse().length !== 0) {
  //     this._recaptcha = true;
  //     console.log("The captcha has been already solved");
  //   } else {
  //     this._recaptcha = false;
  //   }
  //   console.log(`Resolved captcha with response: ${captchaResponse}`);
  // }
}
