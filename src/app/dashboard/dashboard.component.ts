import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FitnessPlanService } from '../services/fitness-plan.service';
import { FitnessPlan } from '../models/fitness-plan.model';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  fitnessPlans: FitnessPlan[] = [];
  faStar = faStar;
  // item = {
  //   imageUrl: ''
  // }

  constructor(
    private authService: AuthService,
    private fitnessPlanService: FitnessPlanService
  ) {}

  ngOnInit() {
    debugger;
    this.fitnessPlanService.getFitnessPlans().subscribe((plans) => {
      console.log(plans);
      this.fitnessPlans = plans;
    });
  }

  logout() {
    this.authService.logout();
  }
}
