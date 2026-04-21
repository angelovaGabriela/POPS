import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Exercise } from '../../interfaces/session';
@Component({
  selector: 'app-exercise-item',
  imports: [],
  templateUrl: './exercise-item.component.html',
  styleUrl: './exercise-item.component.css',
})
export class ExerciseItemComponent {
 
@Input() exercise!: Exercise;
  
}
