import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FitnessPlanService } from '../services/fitness-plan.service';
import { FitnessPlan } from '../models/fitness-plan.model';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';

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
}
