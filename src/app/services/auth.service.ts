import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import the HttpClient class
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private user!: { role: string };
  private userName!: string;

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    //this.userName = username;
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          debugger;
          this.user = { role: response.role };
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('userName', username);
        })
      );
  }

  getUserName(): string {
    //return this.userName;
    return localStorage.getItem('userName') || '';
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  isAdmin(): boolean {
    return this.user && this.user.role === 'admin';
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
    const token = localStorage.getItem('token');
    // Check if token is set
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  getProfile(userId: string): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(
      `${this.apiUrl}/profile?userId=${userId}`
    );
  }

  updateProfile(
    userId: string,
    password: string,
    profile: UserProfile
  ): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/profile`, {
      userId,
      password,
      profile,
    });
  }
}
