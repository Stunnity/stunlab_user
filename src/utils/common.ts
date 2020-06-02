import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from "jwt-decode";
import { TransferDataService } from 'src/app/services/shared-data/transfer-data.service';
import { DomSanitizer } from '@angular/platform-browser';


export function empty(object: object) {
    return _.isEmpty(object);
}
export function authenticate(cookieService: CookieService, token, transferDataService: TransferDataService) {
    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 20);
    cookieService.set('token', token, dateNow);
    return true;
}
export function decodeToken(token: string) {
    return jwt_decode(token);
}
export function sanitize(sanitizer: DomSanitizer, url: string) {
    return sanitizer.bypassSecurityTrustUrl(url);
}