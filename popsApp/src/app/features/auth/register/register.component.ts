import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { noDisposableEmailValidator } from '../../../shared/validators/email/fake-email.validator';
import { passwordMatchValidator } from '../../../shared/validators/passwords/confirm-pasword-match.validator';
import { strongPasswordValidator } from '../../../shared/validators/passwords/strong-password-validator';
import { ReactiveFormsModule } from '@angular/forms';
import { InputErrorDirective } from '../../../shared/directives/input-error.directive';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, InputErrorDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  registerForm = this.formBuilder.nonNullable.group({
    firstName: ["", [Validators.required]],
    lastName: [""],
    email: ["", [Validators.required, Validators.email, noDisposableEmailValidator]],
    age: [0, [Validators.required, Validators.min(15), Validators.max(110)]],
    passwords: this.formBuilder.nonNullable.group({
      password: ["", [Validators.required, strongPasswordValidator]],
      rePassword: ["", [Validators.required]]
    }, { validators: passwordMatchValidator })
  });

  isLoading = false;
  errorMessage = '';

  get passwordsGroup(): FormGroup {
    return this.registerForm.get('passwords') as FormGroup;
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';



    const formValue = this.registerForm.getRawValue();

    const userData = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      age: formValue.age,
      password: formValue.passwords.password
    };

    this.authService.register(userData).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.authService.setSession(user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

}
