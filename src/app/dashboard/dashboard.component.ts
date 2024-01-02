import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  isAdmin(): boolean {
    const isAdmin = this.authService.isAdmin();
    console.log('DashboardComponent.isAdmin:', isAdmin);
    return isAdmin;
  }
}
