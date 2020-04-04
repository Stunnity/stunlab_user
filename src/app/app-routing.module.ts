import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent} from './about/about.component';
import { SearchComponent} from './search/search.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
   path: 'search/:query',
    pathMatch: 'full',
    component: SearchComponent
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
