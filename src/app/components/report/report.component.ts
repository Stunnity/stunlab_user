import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { AppDataService } from 'src/app/services/app-data/app-data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reportForm: FormGroup;
  sending: boolean;
  constructor(private appService: AppDataService) {
    this.reportForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      message: new FormControl("", [Validators.required, Validators.minLength(5)]),
    })
  }

  ngOnInit() {
    this.sending = false;
  }

  report() {
    this.sending = true;
    this.appService.report(this.reportForm.value).subscribe((res) => {
      this.reportForm.setValue({ name: "", message: "" });
      this.sending = false;
    });
  }
  clearReport() {
    this.reportForm.setValue({ name: "", message: "" })
  }
}
