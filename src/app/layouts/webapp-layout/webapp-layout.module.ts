import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserbooksComponent } from 'src/app/components/dashboard/components/userbooks/userbooks.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/components/dashboard/components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { WebappLayoutRoutes } from './webapp-layout-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserbooksComponent,
    DashboardComponent,
    ProfileComponent,
  ],
  imports: [
    RouterModule.forChild(WebappLayoutRoutes),
    CommonModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class WebappLayoutModule { }
