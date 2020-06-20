import { Component, OnInit } from '@angular/core';
import { TransferDataService } from '../../../services/data/shared/transfer-data.service';
import { AppDataService } from 'src/app/services/data/app/app-data.service';
import { FormControl, Validators } from '@angular/forms';
import { empty, scroll } from 'src/app/utils/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  avatar: string;
  about: boolean;
  email: FormControl;
  avatarAvailable: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  categoriesAvailable: boolean;
  categories: any;
  username: string;

  private avatarUrl = 'https://ui-avatars.com/api/?name=';

  constructor(
    private transferService: TransferDataService,
    private router: Router,
    private appService: AppDataService
  ) {
    this.transferService.getAboutPage().subscribe(set => {
      this.about = set;
    });
    scroll('.navbar');
    this.isLoggedIn = this.transferService.loggedIn();

    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.isLoading = false;
    this.avatarAvailable = false;
  }


  ngOnInit() {
    this.getCategories();
    this.getUser();
  }
  bookNavigate(bookmark: boolean) {
    if (!bookmark) {
      this.router.navigate(['/u/books'], { queryParams: { page: 'bookmarks' } });
    } else {
      this.router.navigate(['/u/books'], {
        queryParams: { page: 'favourites' },
      });
    }
  }
  logout() {
    this.transferService.logoutUser();
  }
  searchBook(search: string, fromCategory?: boolean) {
    if (!fromCategory) {
      this.router.navigate(['/search'], { queryParams: { q: search } });
    } else {
      this.router.navigate(['/search'], { queryParams: { category: search } });
    }
  }

  invitation() {
    this.isLoading = true;
    this.appService.invite(this.email.value).subscribe(res => {
      this.isLoading = false;
      this.email.setValue('');
    });
  }

  getCategories() {
    this.transferService.getIsCategoriesSet().subscribe(set => {
      if (set === 1) {
        this.transferService.getCategories().subscribe(categories => {
          if (empty(categories)) {
            return;
          }
          this.categories = categories;
          this.categoriesAvailable = true;

        });
      }
    });
  }


  getUser() {
    this.transferService.getUserIsSet().subscribe(set => {
      if (set === 1) {
        this.transferService.getUser().subscribe((user: any) => {
          if (empty(user)) {
            return;
          }
          this.username = user.username;
          this.avatar = this.avatarUrl + this.username;
          this.avatarAvailable = true;
        });
      }
    });
  }

}
