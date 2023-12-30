import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import the HttpClient class
import { Observable } from 'rxjs';
import { LoginResponse } from '../login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      username,
      password,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getProtectedData() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get('http://localhost:3000/protected-endpoint', {
      headers,
    });
  }

  isAuthenticated(): boolean {
    debugger;
    const token = localStorage.getItem('token');
    // Check if token is set
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
