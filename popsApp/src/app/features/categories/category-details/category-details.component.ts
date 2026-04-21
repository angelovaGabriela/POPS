import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { ExerciseItemComponent } from '../../../shared/components/exercise-item/exercise-item.component';

@Component({
  selector: 'app-category-details',
  imports: [RouterLink, ExerciseItemComponent],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent {}
