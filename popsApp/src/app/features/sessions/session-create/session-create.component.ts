import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Session,SessionData, SessionType, SessionGoal, Subcategory, Exercise } from '../../../shared/interfaces/session';
import { SessionService } from '../../../core/services/session.service';

interface ExerciseSlot {
  name: string;
}

@Component({
  selector: 'app-session-create',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './session-create.component.html',
  styleUrl: './session-create.component.css',
})
export class SessionCreateComponent implements OnInit, OnDestroy {
  
  private destroy$ = new Subject<void>();

  totalSteps = 7;
  currentStep = 1;
  get progressPercent(): number {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  form: Partial<Session> & { type?: SessionType; goal?: SessionGoal; subcategory?: Subcategory } = {
    name: '',
    description: '',
    detailedDescription: '',
    type: undefined,
    goal: undefined,
    subcategory: undefined,
    durationMinutes: undefined,
    musicUrl: '',
  };

 
  exerciseSlots: ExerciseSlot[] = [];
  exerciseOptions: string[] = [];

  musicError = '';
  musicIcon = '🎵';

  saving = false;
  saved = false;
  validationErrors: string[] = [];

  goals = [
    { value: 'strength'    as SessionGoal, label: 'Strength',    icon: '🔥', desc: 'Build power & endurance' },
    { value: 'flexibility' as SessionGoal, label: 'Flexibility', icon: '🌿', desc: 'Lengthen & open the body' },
    { value: 'recovery'    as SessionGoal, label: 'Recovery',    icon: '🌙', desc: 'Restore & rest deeply' },
  ];

  constructor(
    private sessionService: SessionService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  get currentSubcategories() {
    if (!this.form.type || !this.form.goal) return [];
    return this.sessionService.getSubcategories(this.form.type, this.form.goal);
  }

  get subcategoryLabel(): string {
    return this.currentSubcategories.find(s => s.value === this.form.subcategory)?.label
      ?? (this.form.subcategory ?? '');
  }

  get filledExercises(): number {
    return this.exerciseSlots.filter(s => s.name.trim()).length;
  }

  
  selectType(type: SessionType): void {
    this.form.type = type;
    // Reset downstream
    this.form.goal = undefined;
    this.form.subcategory = undefined;
    this.exerciseSlots = [];
    this.exerciseOptions = [];
  }


  selectGoal(goal: SessionGoal): void {
    this.form.goal = goal;
    this.form.subcategory = undefined;
    this.exerciseSlots = [];
    this.exerciseOptions = [];
  }

 
  selectSubcategory(sub: Subcategory): void {
    this.form.subcategory = sub;
    this.exerciseOptions = this.sessionService.getExerciseOptions(sub);
    this.rebuildExerciseSlots();
  }

  
  onDurationChange(value: number): void {
    this.form.durationMinutes = value;
    this.rebuildExerciseSlots();
  }

  private rebuildExerciseSlots(): void {
    const count = this.sessionService.getExerciseCount(this.form.durationMinutes ?? 0);
    const prev = [...this.exerciseSlots];
    this.exerciseSlots = Array.from({ length: count }, (_, i) => ({
      name: prev[i]?.name ?? '',
    }));
  }

  onMusicChange(url: string): void {
    this.form.musicUrl = url;
    if (!url) {
      this.musicError = '';
      this.musicIcon = '🎵';
      return;
    }

    const valid = this.sessionService.validateMusicUrl(url);
    this.musicError = valid ? '' : 'Please use a Spotify or YouTube URL.';
    if (url.includes('spotify')) this.musicIcon = '🎧';
    else if (url.includes('youtube') || url.includes('youtu.be')) this.musicIcon = '▶️';
    else this.musicIcon = '🎵';
  }

  isExerciseUsed(ex: string, currentIndex: number): boolean {
    return this.exerciseSlots.some((s, i) => i !== currentIndex && s.name === ex);
  }

  next(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.cdr.markForCheck();
    }
  }

  prev(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.cdr.markForCheck();
    }
  }

  save(): void {
    const session: Partial<Session> = {
      ...this.form,
      exercises: this.exerciseSlots.map((s, i) => ({
        id: `ex_${i}`,
        name: s.name,
        durationMinutes: 1,
      })),
    };

    this.validationErrors = this.sessionService.validateSession(session);
    if (this.validationErrors.length) {
      return;
    }

    this.saving = true;
    this.cdr.markForCheck();

   setTimeout(() => {
  this.sessionService.saveSession(session as SessionData).subscribe({
    next: () => {
      this.saving = false;
      this.saved = true;
      this.cdr.markForCheck();

    window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
    },
    error: (err) => {
      console.error('Create session failed:', err);
      this.saving = false;
      this.cdr.markForCheck();
    }
  });
}, 700);
  }

  resetForm(): void {
    this.form = { name: '', description: '', detailedDescription: '', musicUrl: '' };
    this.exerciseSlots = [];
    this.exerciseOptions = [];
    this.musicError = '';
    this.musicIcon = '🎵';
    this.validationErrors = [];
    this.saving = false;
    this.saved = false;
    this.currentStep = 1;
    this.cdr.markForCheck();
  }
}