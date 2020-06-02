import { Component, OnInit } from '@angular/core';
import { TransferDataService } from '../.././services/shared-data/transfer-data.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { empty } from 'src/utils/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  avatar: string;
  private avatarUrl: string = 'https://ui-avatars.com/api/?name=';
  constructor(
    private transferService: TransferDataService,
    private router: Router,
    private userData: UserDataService
  ) { }
  isLoggedIn: boolean;
  categoriesAvailable: boolean;
  thumbnail: any;
  categories: any;
  name: any;
  user: {};
  username: {}
  ngOnInit() {
    this.scroll();
    this.isLoggedIn = this.transferService.loggedIn();
    if (this.isLoggedIn) {
      this.getUser();
    }
    this.fetchCategories();
  }
  bookNavigate(bookmark: boolean) {
    if (!bookmark) {
      this.router.navigate(['/books'], { queryParams: { page: 'bookmarks' } });
    } else {
      this.router.navigate(['/books'], {
        queryParams: { page: 'favourites' },
      });
    }
  }
  fetchCategories() {
    this.transferService.getCategories().subscribe(res => {
      if (empty(res)) {
        return;
      }
      this.categories = res;
      this.categoriesAvailable = true;
    }, err => {
      this.categoriesAvailable = false;
    });

  }
  logout() {
    this.userData.logout().subscribe(res => {
      this.transferService.logoutUser();
    })
  }
  searchBook(search: string, fromCategory?: boolean) {
    if (!fromCategory) {
      this.router.navigate(['/search'], { queryParams: { q: search } });
    } else {
      this.router.navigate(['/search'], { queryParams: { category: search } });
    }
  }
  scroll() {
    $(document).scroll(function () {
      const $nav = $('.navbar');
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
  }
  getUser() {
    this.transferService.getUser().subscribe(res => {
      console.log(res);
      if (empty(res))
        return;
      console.log(res)
        ; this.user = res;
      this.username = this.user["username"];
      this.avatar = this.avatarUrl + this.username;
    })
  }
}
