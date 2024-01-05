import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FitnessPlan } from 'src/app/models/fitness-plan.model';
import { AuthService } from 'src/app/services/auth.service';
import { FitnessPlanService } from 'src/app/services/fitness-plan.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  fitnessPlans!: FitnessPlan[]; // Assuming you have this array of fitness plans
  faStar = faStar;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fitnessPlanService: FitnessPlanService
  ) {}

  ngOnInit() {
    debugger;
    this.fitnessPlanService.getFitnessPlans().subscribe((plans) => {
      this.fitnessPlans = plans;
    });
  }

  editPlan(plan: FitnessPlan) {
    // Navigate to the edit plan route with the plan id
    this.router.navigate(['/edit-plan', plan.id]);
  }

  newPlan() {
    // Navigate to the new plan route
    this.router.navigate(['/new-plan']);
  }

  logout() {
    this.authService.logout();
  }
}
