import { Component, OnInit, OnDestroy } from '@angular/core';
import { scroll } from 'src/app/utils/common';
import { TransferDataService } from 'src/app/services/data/shared/transfer-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  constructor(private transferService: TransferDataService) { }
  homeText: string;
  ngOnInit() {
    this.transferService.setAboutPage(true);
    this.homeText = 'Stunlab is is one of the Rwandas l free learning platforms for education and book reading. It is a for-profit social enterprise dedicated to making it possible for anyone, to study anything, anywhere, at any time, for free online, at any subject level. Through our mission we are a catalyst for positive social change, creating opportunity, prosperity, and equality for everyone';
    scroll('.sticky');
  }

  ngOnDestroy() {
    this.transferService.setAboutPage(false);
  }

}
