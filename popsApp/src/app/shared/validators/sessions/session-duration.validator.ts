import { AbstractControl, ValidationErrors } from '@angular/forms';

export function sessionDurationValidator(control: AbstractControl): ValidationErrors | null {
  const value = Number(control.value);

  if (control.value === null || control.value === undefined || control.value === ''){
    return null; 
  }

  if(isNaN(value)) {
    return { invalidNumber: true };
  }

  if (value < 0) {
    return { negativeDuration: true };
  }

  if (value < 5) {
    return { tooShortDuration: true };
  }

  return null;
}