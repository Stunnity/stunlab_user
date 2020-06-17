
import { Routes } from '@angular/router';
import { UserbooksComponent } from 'src/app/components/userbooks/userbooks.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { ReadBookComponent } from 'src/app/components/read-book/read-book.component';


export const WebappLayoutRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'books', component: UserbooksComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'read/book', component: ReadBookComponent },

];

