import { Component, OnInit } from "@angular/core";
import { Observable, Observer, fromEvent, merge } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-is-online",
  templateUrl: "./is-online.component.html",
  styleUrls: ["./is-online.component.css"],
})
export class IsOnlineComponent implements OnInit {
  constructor() {}

  isOnline: boolean;
  ngOnInit(): void {
    this.createOnline$().subscribe((isOnline) => (this.isOnline = isOnline));
    console.log(this.isOnline);
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, "offline").pipe(map(() => false)),
      fromEvent(window, "online").pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
}
