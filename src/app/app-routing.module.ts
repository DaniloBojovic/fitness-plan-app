import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth-guard.service';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { UserLoginComponent } from './auth/user-login/user-login.component';
import { HomeComponent } from './home/home.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // {
  //   path: 'admin-login',
  //   component: AdminLoginComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'admin-login',
    loadChildren: () =>
      import('./auth/admin-login/admin-login.module').then(
        (m) => m.AdminLoginModule
      ),
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'user-login',
  //   component: UserLoginComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'user-login',
    loadChildren: () =>
      import('./auth/user-login/user-login.module').then(
        (m) => m.UserLoginModule
      ),
    canActivate: [AuthGuard],
  },
  { path: 'profile-settings', component: ProfileSettingsComponent },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
