import { Injectable, Injector } from '@angular/core';
import { TransferDataService } from '../../data/shared/transfer-data.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector: Injector) { }
  intercept(req, next) {
    try {
      const authService = this.injector.get(TransferDataService);
      if (!authService.loggedIn()) {
        return next.handle(req);
      }
      const tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return next.handle(tokenizedReq);
    } catch (error) {

    }

  }
}
