import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserbooksComponent } from 'src/app/components/userbooks/userbooks.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { WebappLayoutRoutes } from './webapp-layout-routing.module';
import { ReadBookComponent } from 'src/app/components/read-book/read-book.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@NgModule({
  declarations: [
    UserbooksComponent,
    DashboardComponent,
    ProfileComponent,
    ReadBookComponent
  ],
  imports: [
    RouterModule.forChild(WebappLayoutRoutes),
    CommonModule,
    ReactiveFormsModule, FormsModule,
    PdfJsViewerModule
  ]
})
export class WebappLayoutModule { }
