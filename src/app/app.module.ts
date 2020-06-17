import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../app/components/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from './services/interceptors/authorization/token-interceptor.service';
import { HttpCancelService } from "./services/interceptors/cancel-http/http-cancel-service.service";
import { ManageHttpInterceptor } from "./services/interceptors/cancel-http/manage-http-cancel.service";
import { ReportModalComponent } from './components/report-modal/report-modal.component';
import { AvatarModule } from 'ngx-avatar';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { ReportComponent } from './components/report/report.component';
import { WebpageLayoutComponent } from './layouts/webpage-layout/webpage-layout.component';
import { WebappLayoutComponent } from './layouts/webapp-layout/webapp-layout.component';
@NgModule({
  declarations: [
    AppComponent,
    WebpageLayoutComponent, WebappLayoutComponent,
    SearchComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    ReportModalComponent,
    ReportComponent,
  ],
  entryComponents: [WebpageLayoutComponent, WebappLayoutComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
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
