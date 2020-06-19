import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../../components/about/about.component';
import { HomeComponent } from '../../components/home/home.component';
import { WebpageLayoutRoutes } from './webpage-layout-routing.module';
import { HomeModule } from 'src/app/components/home/home.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule.forChild(WebpageLayoutRoutes),
    CommonModule,
    HomeModule,
  ],
})
export class WebpageLayoutModule { }
