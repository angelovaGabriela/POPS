import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { ExerciseItemComponent } from '../../../shared/components/exercise-item/exercise-item.component';

@Component({
  selector: 'app-session-details',
  imports: [RouterLink, RouterLinkActive, ExerciseItemComponent],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.css',
})
export class SessionDetailsComponent {}
