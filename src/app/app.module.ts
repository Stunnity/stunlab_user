import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../app/components/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptorService } from './services/interceptors/authorization/token-interceptor.service';
import { AuthGuardService } from './services/guards/auth/auth-guard.service';
import { ReportComponent } from './components/report/report.component';
import { WebpageLayoutComponent } from './layouts/webpage-layout/webpage-layout.component';
import { WebappLayoutComponent } from './layouts/webapp-layout/webapp-layout.component';
import { ReadBookComponent } from './components/read-book/read-book.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    WebpageLayoutComponent, WebappLayoutComponent,
    SearchComponent,
    PageNotFoundComponent,
    LoginComponent,
    SignupComponent,
    ReadBookComponent,
    ReportComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    CookieService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
