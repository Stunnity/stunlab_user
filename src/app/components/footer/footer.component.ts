import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data/user-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  subscriber: FormControl;
  constructor(private userData: UserDataService) {
    this.subscriber = new FormControl("", [Validators.required, Validators.email]);
  }
  ngOnInit() { }
  sendEmail(email: string) {
    const subscriber = {
      email: email
    }
    this.userData.subscribeToNewsLetter(subscriber).subscribe(
      (res) => {
        this.subscriber.setValue("");
      },
    );
  }

}
