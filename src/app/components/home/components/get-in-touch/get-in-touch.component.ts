import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/data/app/app-data.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.css']
})
export class GetInTouchComponent implements OnInit {

  getInTouchForm: FormGroup;
  contacting: boolean;
  constructor(private appService: AppDataService) {
    this.getInTouchForm = new FormGroup({
      fullnames: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ])
    });
  }

  ngOnInit() {

  }

  contactUs() {
    this.contacting = true;
    this.appService.contactUs(this.getInTouchForm.value).subscribe((res) => {
      this.contacting = false;
      this.getInTouchForm.setValue({ fullnames: '', email: '', message: '' });
    });
  }
}
