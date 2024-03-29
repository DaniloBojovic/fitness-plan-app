import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminLoginComponent } from './admin-login.component';
import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { StarRatingComponent } from 'src/app/shared/star-rating.component';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    AdminLoginRoutingModule,
    MatCardModule,
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [AdminLoginComponent],
})
export class AdminLoginModule {
  constructor() {
    console.log('AdminLoginModule loaded');
  }
}
