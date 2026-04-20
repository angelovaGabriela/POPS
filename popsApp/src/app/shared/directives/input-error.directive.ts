import {
  Directive, DestroyRef, HostBinding,inject, OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl, FormGroupDirective } from '@angular/forms';
import { merge, of } from 'rxjs';

@Directive({
  selector: '[appInputError]',
  standalone: true,
})
export class InputErrorDirective implements OnInit {
  private readonly control = inject(NgControl, { optional: true });
  private readonly destroyRef = inject(DestroyRef);

  // detect form submission to show all errors at once
  private readonly formGroup = inject(FormGroupDirective, { optional: true });

  private showError = false;

  @HostBinding('class.input-error')
  get hasError(): boolean {
    return this.showError && (this.control?.invalid ?? false);
  }

  @HostBinding('attr.aria-invalid')
  get ariaInvalid(): string | null {
    return this.hasError ? 'true' : null;
  }

  ngOnInit(): void {
    if (!this.control) return;

    const streams = [
      this.control.statusChanges ?? of(),
      this.control.valueChanges ?? of(),
      ...(this.formGroup ? [this.formGroup.ngSubmit] : []),
    ];

    merge(...streams)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateErrorState());
  }

  private updateErrorState(): void {
    const isTouchedOrDirty =
      this.control?.touched || this.control?.dirty || false;

    const isSubmitted = this.formGroup?.submitted ?? false;

    this.showError = isTouchedOrDirty || isSubmitted;
  }
}