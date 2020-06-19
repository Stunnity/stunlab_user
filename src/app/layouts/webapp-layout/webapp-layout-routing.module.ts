
import { Routes } from '@angular/router';
import { UserbooksComponent } from 'src/app/components/dashboard/components/userbooks/userbooks.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/components/dashboard/components/profile/profile.component';



export const WebappLayoutRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'books', component: UserbooksComponent },
  { path: 'profile', component: ProfileComponent },

];

