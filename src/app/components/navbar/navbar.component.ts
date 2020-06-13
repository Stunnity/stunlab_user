import { Component, OnInit } from '@angular/core';
import { TransferDataService } from '../.././services/shared-data/transfer-data.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { UserDataService } from 'src/app/services/user-data/user-data.service';
import { empty } from 'src/utils/common';
import { AppDataService } from 'src/app/services/app-data/app-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  avatar: string = "";
  private avatarUrl: string = 'https://ui-avatars.com/api/?name=';
  constructor(
    private transferService: TransferDataService,
    private router: Router,
    private userData: UserDataService,
    private appService: AppDataService
  ) { }
  isLoggedIn: boolean;
  categoriesAvailable: boolean;
  categories: any;
  user: {};
  username: '';

  ngOnInit() {
    this.getCategories();
    this.scroll();
    this.isLoggedIn = this.transferService.loggedIn();
    if (this.isLoggedIn) {
      this.getUser();
    }
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
  getCategories() {
    this.transferService.getIsCategoriesSet().subscribe(res => {
      if (res === 0) {
        this.appService.getCategories().subscribe(
          (res: any[]) => {
            this.transferService.setCategories(res);
          },
        );
      }
      else {
        this.transferService.getCategories().subscribe(res => {
          this.categories = res;
          this.categoriesAvailable = true;
        })
      }
    })

  }

  getUser() {
    this.transferService.getUserIsSet().subscribe(res => {
      const userSet = res;
      if (userSet === 0) {
        this.userData.authUser().subscribe((res) => {
          this.transferService.setUser(res);
          this.username = res["username"];
          this.avatar = this.avatarUrl + this.username;
        });
      }
      else {
        this.transferService.getUser().subscribe(res => {
          this.username = res["username"];
          this.avatar = this.avatarUrl + this.username;
        })
      }
    })

  }
}
