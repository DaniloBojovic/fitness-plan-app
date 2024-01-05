import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { UserLoginModule } from '../auth/user-login/user-login.module';
import { AdminLoginModule } from '../auth/admin-login/admin-login.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, UserLoginModule, AdminLoginModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
