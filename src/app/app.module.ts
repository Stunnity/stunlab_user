import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { MostviewedComponent } from "./mostviewed/mostviewed.component";
import { SearchComponent } from "./search/search.component";
import { AboutComponent } from "./about/about.component";
import { ProfileComponent } from "./profile/profile.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MostviewedComponent,
    SearchComponent,

    AboutComponent,
    ProfileComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
