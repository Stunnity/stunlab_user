import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data/app-data.service';

@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.css']
})
export class GetInTouchComponent implements OnInit {

  constructor(private appDataService: AppDataService) { }

  ngOnInit() {
  }

  contactUs() {
    const name_element = document.getElementById(
      'contact-name'
    ) as HTMLInputElement;
    const email_element = document.getElementById(
      'contact-email'
    ) as HTMLInputElement;
    const textarea_element = document.getElementById(
      'contact-message'
    ) as HTMLInputElement;
    const button_element = document.getElementById(
      'submit-button'
    ) as HTMLButtonElement;
    const contactDetails = {
      name: name_element.value,
      email: email_element.value,
      message: textarea_element.value
    }
    button_element.innerHTML = 'Contacting ';
    this.appDataService.contactUs(contactDetails).subscribe((res) => {
      button_element.innerHTML = 'Contact Us';
      textarea_element.value = '';
      email_element.value = '';
      name_element.value = '';
    }, err => {
      button_element.innerHTML = 'Contact Us';

    });
  }
}
