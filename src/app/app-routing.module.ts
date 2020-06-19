import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  PreloadAllModules,
} from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuardService } from './services/guards/auth/auth-guard.service';
import { ReportComponent } from './components/report/report.component';
import { WebpageLayoutComponent } from './layouts/webpage-layout/webpage-layout.component';
import { WebappLayoutComponent } from './layouts/webapp-layout/webapp-layout.component';
import { GuestGuard } from './services/guards/guard/guest.guard';
import { ReadBookComponent } from './components/read-book/read-book.component';

const ROUTES: Routes = [
  {
    path: '',
    canActivate: [GuestGuard],
    component: WebpageLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/webpage-layout/webpage-layout.module').then(module => module.WebpageLayoutModule),
      },
    ],
  },

  {
    path: 'u',
    canActivate: [AuthGuardService],
    component: WebappLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import(
          './layouts/webapp-layout/webapp-layout.module').then(module => module.WebappLayoutModule),
      },
    ],
  },

  {
    path: 'search',
    pathMatch: 'full',
    component: SearchComponent,
  },
  {
    canActivate: [AuthGuardService],
    path: 'read/book',
    pathMatch: 'full',
    component: ReadBookComponent,
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
