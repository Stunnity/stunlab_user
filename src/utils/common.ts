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
export function toogleLoading(value, buttonText, login) {
    if (login) {
        buttonText = value ? 'Signing In' : 'Sign in';
    }
    else {
        buttonText = value && login ? 'Creating Account' : 'Create Account';
    }
    return { value, buttonText }
}

export function tooglePassword(element, icon) {
    if (element.type === 'password') {
        element.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        element.focus();
    } else {
        element.type = 'password';
        icon.classList.add('fa-eye');
        icon.classList.remove('fa-eye-slash');
        element.focus();
    }
}

export function setPassword(password) {
    return password;
}

export function equal(object, object2) {
    return _.isEqual(object, object2)
}

export function scorePassword(password): number {
    var score = 0;
    if (!password) return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i = 0; i < password.length; i++) {
        letters[password[i]] = (letters[password[i]] || 0) + 1;
        score += 5.0 / letters[password[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(password),
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        nonWords: /\W/.test(password),
    };

    let variationCount = 0;
    for (var check in variations) {
        variationCount += variations[check] == true ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return score;
}

export function checkPasswords(cPassword, password) {
    return (cPassword === password);
}