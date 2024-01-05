import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginRoutingModule } from './user-login-routing.module';
import { UserLoginComponent } from './user-login.component';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [UserLoginComponent],
  imports: [
    CommonModule,
    UserLoginRoutingModule,
    MatCardModule,
    FontAwesomeModule,
  ],
  exports: [UserLoginComponent],
})
export class UserLoginModule {
  constructor() {
    console.log('UserLoginModule loaded');
  }
}
