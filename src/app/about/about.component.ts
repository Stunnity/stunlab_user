import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    $(function() {
      $(document).scroll(function() {
        const $nav = $('.sticky');
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
      });
    });
  }
}
