import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from '../../services/user-data/user-data.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  errorOccurred: boolean;
  error_message: string;
  constructor(private userData: UserDataService) {}
  validEmail = false;
  ngOnInit() {}
  sendEmail(email: string) {
    const _email: any = document.getElementById('subscribe_newsletter');
    this.userData.subscribeToNewsLetter(email).subscribe(
      (res) => {
        _email.value = '';
      },
      (error: HttpErrorResponse) => {
        this.errorHandler(error.status);
      }
    );
  }

  validateEmail(email): void {
    const _email = document.getElementById('subscribe_newsletter');
    const regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
      this.validEmail = true;
      _email.classList.remove('is-invalid');
      _email.classList.add('is-valid');
    } else {
      _email.classList.remove('is-valid');
      _email.classList.add('is-invalid');
    }
  }
  errorHandler(status: number): void {
    if (status == 0) {
      this.errorOccurred = true;
      this.error_message = 'Address unreachable';
    }
  }
}
