import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { LoginResponse } from '../login-response';
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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // this.authService.login(this.username, this.password).subscribe(
    //   (response: LoginResponse) => {
    //     localStorage.setItem('token', response.token);
    //     console.log(`RESPONSE : ${response.token}`);

    //     this.authService.getProtectedData().subscribe(
    //       (data) => {
    //         debugger;
    //         console.log(data);
    //         this.router.navigate(['/dashboard']);
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    //   },
    //   (error) => {
    //     this.errorMessage = 'Invalid username or password';
    //     this.isError = true;
    //   }
    // );

    this.authService
      .login(this.username, this.password)
      .pipe(
        switchMap((response: LoginResponse) => {
          localStorage.setItem('token', response.token);
          console.log(`RESPONSE : ${response.token}`);
          return this.authService.getProtectedData();
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'Invalid username or password';
          this.isError = true;
        },
      });
  }
}
