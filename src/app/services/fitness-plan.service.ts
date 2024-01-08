import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FitnessPlan } from '../models/fitness-plan.model';

@Injectable({
  providedIn: 'root',
})
export class FitnessPlanService {
  private apiUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getFitnessPlans(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/fitness-plans`);
  }

  searchFitnessPlans(term: string): Observable<FitnessPlan[]> {
    debugger;
    return this.httpClient.get<FitnessPlan[]>(
      `${this.apiUrl}/fitness-plans/search?name_like=${term}`
    );
  }
}
