import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
      $('.navlist').on('click', function() {
        $(this)
          .siblings()
          .removeClass('active');
        $(this).addClass('active');
      });
    });

    // tslint:disable-next-line:only-arrow-functions
    $(document).ready(function() {
      $('.navlist1').on('click', function() {
        $(this)
          .siblings()
          .removeClass('active');
        $(this).addClass('active');
      });
    });
    // tslint:disable-next-line:only-arrow-functions
    $(function() {
      $(document).scroll(function() {
        const $nav = $('.navbar');
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
      });
    });
  }

}
