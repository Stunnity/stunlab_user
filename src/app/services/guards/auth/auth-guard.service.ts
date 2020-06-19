import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TransferDataService } from '../../data/shared/transfer-data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: TransferDataService) { }
  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
