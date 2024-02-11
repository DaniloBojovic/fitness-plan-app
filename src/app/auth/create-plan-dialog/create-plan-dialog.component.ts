import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-plan-dialog',
  templateUrl: './create-plan-dialog.component.html',
  styleUrls: ['./create-plan-dialog.component.css'],
})
export class CreatePlanDialogComponent {
  createPlanForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createPlanForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      level: ['', Validators.required],
      // add other fields as necessary
    });
  }

  onSubmit() {
    if (this.createPlanForm.valid) {
      console.log(`Value: ${this.createPlanForm.value}`);
      // call the service to save the new plan
    }
  }
}
