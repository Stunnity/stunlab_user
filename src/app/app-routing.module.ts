import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from "../app/services/guards/auth-guard.service"
import { ReportComponent } from './components/report/report.component';
import { WebpageLayoutComponent } from './layouts/webpage-layout/webpage-layout.component';
import { WebappLayoutComponent } from './layouts/webapp-layout/webapp-layout.component';
import { GuestGuard } from './services/guards/guest.guard';
const ROUTES: Routes = [
  {
    path: '',
    component: WebpageLayoutComponent,
    canActivate: [GuestGuard],
    children: [
      {
        path: '',
        loadChildren:
          './layouts/webpage-layout/webpage-layout.module#WebpageLayoutModule',
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    component: WebappLayoutComponent,
    children: [
      {
        path: '',
        loadChildren:
          './layouts/webapp-layout/webapp-layout.module#WebappLayoutModule',
      },
    ],
  },


  {
    path: 'search',
    pathMatch: 'full',
    component: SearchComponent,
  },
  {
    path: 'report',
    pathMatch: 'full',
    component: ReportComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
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
