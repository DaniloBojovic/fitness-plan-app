import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FitnessPlanService {
  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getFitnessPlans(): Observable<any> {
    // Replace with your actual API endpoint
    debugger;
    return this.httpClient.get(`${this.apiUrl}/fitness-plans`);
  }
}
