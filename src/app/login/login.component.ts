import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { tap, switchMap, catchError, delay, interval, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username!: string;
  password!: string;
  errorMessage: string = '';
  isError = false;
  role!: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login(this.username, this.password)
      .pipe(
        switchMap((response: LoginResponse) => {
          localStorage.setItem('token', response.token);
          this.role = response.role;
          console.log(`RESPONSE : ${response.token}`);
          return this.authService.getProtectedData();
        })
      )
      .subscribe({
        next: (data) => {
          const route = `/${this.role}-login`;
          this.router.navigate([route]);
        },
        error: (error) => {
          this.errorMessage = 'Invalid username or password';
          this.isError = true;
        },
      });
  }
}
