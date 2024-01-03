import { Component } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
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

  constructor(
    private authService: AuthService,
    private fitnessPlanService: FitnessPlanService
  ) {}

  ngOnInit() {
    this.fitnessPlanService.getFitnessPlans().subscribe((plans) => {
      console.log(plans);
      this.fitnessPlans = plans;
    });
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

  logout() {
    this.authService.logout();
  }
}
