import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetInTouchComponent } from './components/get-in-touch/get-in-touch.component';
import { MostviewedComponent } from './components/mostviewed/mostviewed.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { OurCategoriesComponent } from './components/our-categories/our-categories.component';
import { PatternersComponent } from './components/patterners/patterners.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    GetInTouchComponent,
    MostviewedComponent,
    StatisticsComponent,
    OurCategoriesComponent,
    PatternersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    GetInTouchComponent,
    MostviewedComponent,
    StatisticsComponent,
    OurCategoriesComponent,
    PatternersComponent
  ]
})
export class HomeModule { }
