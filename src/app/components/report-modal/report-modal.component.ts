import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data/app-data.service';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent implements OnInit {

  constructor(private appDataService: AppDataService) { }

  ngOnInit() {
  }


}
