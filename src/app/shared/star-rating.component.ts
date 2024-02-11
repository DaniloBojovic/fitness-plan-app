// star-rating.component.ts
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  Validator,
} from '@angular/forms';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faStarSolid, faStarRegular);

@Component({
  selector: 'app-star-rating',
  template: `
    <fa-icon
      *ngFor="let star of stars; let i = index"
      [icon]="star ? faStarSolid : faStarRegular"
      (click)="onStarClick(i)"
    ></fa-icon>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true,
    },
  ],
})
export class StarRatingComponent implements ControlValueAccessor, Validator {
  @Input() stars: boolean[] = Array(5).fill(false);
  onChange: any = () => {};
  onTouch: any = () => {};
  faStarSolid = faStarSolid;
  faStarRegular = faStarRegular;

  onStarClick(index: number) {
    this.stars.fill(false);
    this.stars.fill(true, 0, index + 1);
    this.onChange(index + 1);
    this.onTouch();
  }

  writeValue(value: any): void {
    this.stars.fill(false);
    this.stars.fill(true, 0, value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  validate(_: FormControl) {
    return null;
  }
}
