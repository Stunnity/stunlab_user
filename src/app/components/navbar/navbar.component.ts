import { Component, OnInit } from "@angular/core";
import { AppDataService } from "../../services/app-data/app-data.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private appData: AppDataService) {}
  isLoggenIn: boolean;
  ngOnInit() {
    this.isLoggenIn = true;
  }
}
