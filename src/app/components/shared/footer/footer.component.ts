import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../services/data/user/user-data.service';
import { FormControl, Validators } from '@angular/forms';
import { TransferDataService } from 'src/app/services/data/shared/transfer-data.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  subscriber: FormControl;
  loggedIn: boolean;
  subscribing: boolean;
  constructor(private userData: UserDataService, private transferService: TransferDataService) {
    this.subscriber = new FormControl('', [Validators.required, Validators.email]);

  }
  ngOnInit() {
    this.loggedIn = this.transferService.loggedIn();

  }
  sendEmail(email: string) {
    this.subscribing = true;
    const subscriber = {
      email
    };
    this.userData.subscribeToNewsLetter(subscriber).subscribe(
      (res) => {
        this.subscribing = false;
        this.subscriber.setValue('');
      },
    );
  }

}
