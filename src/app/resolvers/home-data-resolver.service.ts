import { Injectable } from "@angular/core";
import { AppDataService } from "../services/app-data/app-data.service";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HomeDataResolverService implements Resolve<Observable<any>> {
  constructor(private appData: AppDataService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.appData.getCategories().pipe(
      take(1),
      map((userdata) => userdata)
    );
  }
}
