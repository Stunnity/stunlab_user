import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor() { }
  homeText: string;
  ngOnInit() {
    this.homeText = "Stunlab is is one of the Rwandas l free learning platforms for education and book reading. It is a for-profit social enterprise dedicated to making it possible for anyone, to study anything, anywhere, at any time, for free online, at any subject level. Through our mission we are a catalyst for positive social change, creating opportunity, prosperity, and equality for everyone";
    $(function () {
      $(document).scroll(function () {
        const $nav = $('.sticky');
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
      });
    });
  }

}
