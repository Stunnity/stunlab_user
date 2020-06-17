import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserbooksComponent } from './components/userbooks/userbooks.component';
import { HomeDataResolverService } from './resolvers/home-data-resolver.service';
import { ReadBookComponent } from './components/read-book/read-book.component';
import { AuthGuardService } from "../app/services/guards/auth-guard.service"
import { ReportComponent } from './components/report/report.component';
const ROUTES: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'search',
    pathMatch: 'full',
    component: SearchComponent,
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
  },
  {
    path: 'report',
    pathMatch: 'full',
    component: ReportComponent,
  },
  {
    path: 'user',
    canActivate: [AuthGuardService],
    pathMatch: 'full',
    component: ProfileComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'books',
    canActivate: [AuthGuardService],
    pathMatch: 'full',
    component: UserbooksComponent,
  },
  {
    path: 'read/book',
    canActivate: [AuthGuardService],
    pathMatch: 'full',
    component: ReadBookComponent,
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
