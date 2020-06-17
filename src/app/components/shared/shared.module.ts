import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IsOnlineComponent } from './is-online/is-online.component';

@NgModule({
  declarations: [
    ErrorComponent,
    FooterComponent,
    NavbarComponent,
    IsOnlineComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ErrorComponent,
    FooterComponent,
    NavbarComponent,
    IsOnlineComponent
  ]
})
export class SharedModule { }
