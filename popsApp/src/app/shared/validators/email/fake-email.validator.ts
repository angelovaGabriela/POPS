import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noDisposableEmailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const blockedDomains = ['tempmail.com', '10minutemail.com', 'mailinator.com'];

  const domain = value.split('@')[1];
  if (blockedDomains.includes(domain)) {
    return { disposableEmail: true };
  }

  return null;
}