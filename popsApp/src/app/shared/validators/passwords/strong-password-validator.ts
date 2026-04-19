import { AbstractControl, ValidationErrors } from '@angular/forms';

export function strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return null; // let required validator handle empty

  const hasMinLength = value.length >= 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const valid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  if (!valid) {
    return {
      strongPassword: {
        hasMinLength,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecialChar
      }
    };
  }

  return null;
}