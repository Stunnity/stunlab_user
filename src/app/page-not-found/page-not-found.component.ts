import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }
// isMobile() {
//     if ($(window).width() > 991) {
//         return false;
//     }
//     return true;
// }
  isMobile() {
    return false;
  }
}
