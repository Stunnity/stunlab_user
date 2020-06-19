import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TransferDataService } from '../../data/shared/transfer-data.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private authService: TransferDataService) {
  }
  canActivate() {
    if (!this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/u']);
    return false;
  }
}

