import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetInTouchComponent } from '../get-in-touch/get-in-touch.component';
import { MostviewedComponent } from '../mostviewed/mostviewed.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { OurCategoriesComponent } from '../our-categories/our-categories.component';
import { PatternersComponent } from '../patterners/patterners.component';
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
    RouterModule
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
