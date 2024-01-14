import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  of,
  tap,
  catchError,
} from 'rxjs';
import { FitnessPlan } from 'src/app/models/fitness-plan.model';
import { AuthService } from 'src/app/services/auth.service';
import { FitnessPlanService } from 'src/app/services/fitness-plan.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  fitnessPlans: FitnessPlan[] = [];
  faStar = faStar;
  searchControl = new FormControl();
  loading = false;
  allFitnessPlans: FitnessPlan[] = [];
  pageSize: number = 10;

  constructor(
    private authService: AuthService,
    private fitnessPlanService: FitnessPlanService
  ) {}

  ngOnInit() {
    this.fitnessPlanService
      .getFitnessPlans()
      .pipe(
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      )
      .subscribe((plans) => {
        console.log(plans);
        this.allFitnessPlans = plans;
        this.fitnessPlans = plans.slice(0, this.pageSize);
      });

    this.searchControl.valueChanges
      .pipe(
        tap(() => (this.loading = true)),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((term) =>
          term
            ? this.fitnessPlanService.searchFitnessPlans(term)
            : this.fitnessPlanService.getFitnessPlans()
        ),
        tap(() => (this.loading = false))
      )
      .subscribe((plans) => (this.fitnessPlans = plans));
  }

  generatePdf(plan: FitnessPlan) {
    const doc = new jsPDF();
    const lineHeight = 7;
    const pageWidth = doc.internal.pageSize.width;
    const textMargin = 10;
    const maxLineWidth = pageWidth - 2 * textMargin;

    const titleLines = doc.splitTextToSize(plan.name, maxLineWidth);
    const descriptionLines = doc.splitTextToSize(
      plan.description,
      maxLineWidth
    );

    let yPosition = 10;

    titleLines.forEach((line: string | string[]) => {
      doc.text(line, textMargin, yPosition);
      yPosition += lineHeight;
    });

    yPosition += lineHeight;

    descriptionLines.forEach((line: string | string[]) => {
      doc.text(line, textMargin, yPosition);
      yPosition += lineHeight;
    });

    doc.save(`${plan.name}.pdf`);
  }

  handlePageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.fitnessPlans = this.allFitnessPlans.slice(startIndex, endIndex);
  }

  logout() {
    this.authService.logout();
  }
}
