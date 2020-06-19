import { Component, OnInit, Input, AfterContentInit, AfterViewInit } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
import { setTopOnline } from 'src/app/utils/common';
@Component({
  selector: 'app-is-online',
  templateUrl: './is-online.component.html',
  styleUrls: ['./is-online.component.css'],
})
export class IsOnlineComponent implements OnInit, AfterViewInit {
  @Input() top: string;
  isOnline: boolean;

  constructor() {
    this.createOnline$().subscribe((isOnline) => (this.isOnline = isOnline));
  }

  ngAfterViewInit(): void {
    setTopOnline('.isOnline-alert', this.top);
  }
  ngOnInit(): void {
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
}
