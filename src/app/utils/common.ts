import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';
import * as $ from 'jquery';
import { TransferDataService } from 'src/app/services/data/shared/transfer-data.service';
import { DomSanitizer } from '@angular/platform-browser';


export function empty(object: any) {
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
export function sanitizeHTML(sanitizer: DomSanitizer, value: string) {
    return sanitizer.bypassSecurityTrustStyle(value);
}
export function toogleLoading(value, buttonText, login) {
    if (login) {
        buttonText = value ? 'Signing In' : 'Sign in';
    } else {
        buttonText = value && login ? 'Creating Account' : 'Create Account';
    }
    return { value, buttonText };
}

export function hasClass(element: Element, className: string): boolean {
    return element.classList.contains(className);
}

export function implementLikeAndDislike(id, element, className) {
    $(`#${id}`).siblings().removeClass(className);
    if (!hasClass(element, className)) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
    element.style.pointerEvents = 'initial';
}

export function toogleClass(element, class1, class2) {
    if (!hasClass(element, class1)) {
        element.innerHTML = 'Bookmarked';
        element.classList.add(class1);
        element.classList.remove(class2);
    } else {
        element.innerHTML = 'Bookmark';
        element.classList.remove(class1);
        element.classList.add(class2);
    }
}

export function toogleLikeActions(...args) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < args.length; i++) {
        const element = document.getElementById(args[i]) as HTMLButtonElement;
        if (element) {

            element.style.pointerEvents = 'none';
            const dislikeId = args[i].replace('like', 'dislike');
            const dislikeBtn = document.getElementById(dislikeId);
            dislikeBtn.classList.remove('liked');
            if (!hasClass(element, 'liked')) {
                element.classList.add('liked');
            } else {
                element.classList.remove('liked');
            }
            element.style.pointerEvents = 'initial';
        }
    }
}

export function toogledisLikeActions(...args) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < args.length; i++) {
        const element = document.getElementById(args[i]);
        if (element) {
            element.style.pointerEvents = 'none';
            const likeId = args[i].replace('dislike', 'like');
            const likeBtn = document.getElementById(likeId);
            likeBtn.classList.remove('liked');
            if (!hasClass(element, 'liked')) {
                element.classList.add('liked');
            } else {
                element.classList.remove('liked');
            }
            element.style.pointerEvents = 'initial';
        }
    }
}

export function findOthers(id: string) {
    if (id.includes('recent')) {
        return [id.replace('recent', 'recommend'), id.replace('recent', 'other')];
    }

    if (id.includes('recommend')) {
        return [id.replace('recommend', 'recent'), id.replace('recommend', 'other')];
    }

    if (id.includes('other')) {
        return [id.replace('other', 'recommend'), id.replace('other', 'recent')];
    }

}

export function sort(array, key, name = false) {
    if (name) {
        return _.orderBy(array, [key], ['asc']);
    }
    return _.orderBy(array, [key], ['desc']);
}
export function isElement(array: any[], element) {
    return (array.indexOf(element) === -1);
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
    return _.isEqual(object, object2);
}

export function scorePassword(password): number {
    let score = 0;
    if (!password) { return score; }

    // award every unique letter until 5 repetitions
    const letters = new Object();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < password.length; i++) {
        letters[password[i]] = (letters[password[i]] || 0) + 1;
        score += 5.0 / letters[password[i]];
    }

    // bonus points for mixing it up
    const variations = {
        digits: /\d/.test(password),
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        nonWords: /\W/.test(password),
    };

    let variationCount = 0;
    // tslint:disable-next-line: forin
    for (const check in variations) {
        variationCount += variations[check] === true ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return score;
}

export function checkPasswords(cPassword, password) {
    return (cPassword === password);
}

export function scroll(className: string) {
    $(document).scroll(function () {
        const $nav = $(className);
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
}

export function setTopOnline(className: string, value: string) {
    const online = document.querySelector(className) as HTMLDivElement;
    if (online) {
        online.style.top = `${value}px`;
    }
}
export function trimSpaces(word: string) {
    return word.replace(/\s+/g, '');
}

export function setToActive(id, className) {
    const element = id;
    if ($(`#${element}`).hasClass(className)) {
        return;
    }
    $(`#${element}`).siblings().removeClass(className);
    $(`#${element}`).addClass(className);
}
