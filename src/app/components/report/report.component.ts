import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/services/data/app/app-data.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportForm: FormGroup;
  sending: boolean;
  errorOccurred: boolean;
  errorMessage: string;
  constructor(private appService: AppDataService, private router: Router) {
    this.errorOccurred = false;
    this.reportForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      message: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit() {
    this.sending = false;
  }

  report() {
    this.sending = true;
    this.appService.report(this.reportForm.value).subscribe((res) => {
      this.reportForm.setValue({ name: '', message: '' });
      this.sending = false;
    }, (error: HttpErrorResponse) => {
      this.sending = false;
      this.errorOccurred = true;
      this.errorMessage = (error.status === 0) ? 'You aren"t connected to the Internet! 😓️😓' : error.statusText;
    });
  }
  clearReport() {
    this.reportForm.setValue({ name: '', message: '' });
  }
}
