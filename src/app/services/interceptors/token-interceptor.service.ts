import { Injectable, Injector } from '@angular/core';
import { TransferDataService } from "../shared-data/transfer-data.service";
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private _injector: Injector) { }
  intercept(req, next) {
    try {
      let authService = this._injector.get(TransferDataService);
      if (!authService.loggedIn())
        return next.handle(req);
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return next.handle(tokenizedReq);
    } catch (error) {

    }

  }
}
