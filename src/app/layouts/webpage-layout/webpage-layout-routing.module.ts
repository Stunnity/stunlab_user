


import { AboutComponent } from 'src/app/components/about/about.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { Routes } from '@angular/router';


export const WebpageLayoutRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];
