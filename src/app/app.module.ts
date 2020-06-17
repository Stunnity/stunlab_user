import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MostviewedComponent } from './mostviewed/mostviewed.component';
import { SearchComponent } from './search/search.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IsOnlineComponent } from './components/is-online/is-online.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserbooksComponent } from './userbooks/userbooks.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { CookieService } from 'ngx-cookie-service';
import { ReadBookComponent } from './read-book/read-book.component';
import { TokenInterceptorService } from './services/interceptors/authorization/token-interceptor.service';
import { HttpCancelService } from "./services/interceptors/cancel-http/http-cancel-service.service";
import { ManageHttpInterceptor } from "./services/interceptors/cancel-http/manage-http-cancel.service";
import { ErrorComponent } from './components/error/error.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { OurCategoriesComponent } from './components/our-categories/our-categories.component';
import { PatternersComponent } from './components/patterners/patterners.component';
import { GetInTouchComponent } from './components/get-in-touch/get-in-touch.component';
import { ReportModalComponent } from './components/report-modal/report-modal.component';
import { AvatarModule } from 'ngx-avatar';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { ReportComponent } from './components/report/report.component';
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
    SignupComponent,
    FooterComponent,
    NavbarComponent,
    IsOnlineComponent,
    DashboardComponent,
    UserbooksComponent,
    ReadBookComponent,
    ErrorComponent,
    StatisticsComponent,
    OurCategoriesComponent,
    PatternersComponent,
    GetInTouchComponent,
    ReportModalComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    PdfJsViewerModule,
    BrowserAnimationsModule,
    RecaptchaModule.forRoot(),
    ReactiveFormsModule,
    AvatarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    CookieService,
    AuthGuardService,
    // HttpCancelService,
    // { provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
