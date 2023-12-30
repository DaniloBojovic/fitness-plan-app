import { Component } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { LoginResponse } from '../login-response';
import { Router } from '@angular/router';

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
    this.authService.login(this.username, this.password).subscribe(
      (response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        console.log(`RESPONSE : ${response.token}`);

        //Fetch the user profile
        this.authService.getProtectedData().subscribe(
          (data) => {
            debugger;
            console.log(data);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
        this.isError = true;
      }
    );
  }
}
