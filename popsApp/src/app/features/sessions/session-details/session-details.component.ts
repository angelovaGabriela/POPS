import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseItemComponent } from '../../../shared/components/exercise-item/exercise-item.component';
import { SessionService } from '../../../core/services/session.service';
import { Session } from '../../../shared/interfaces/session';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-session-details',
  imports: [ExerciseItemComponent, CommonModule],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.css',
})
export class SessionDetailsComponent implements OnInit{
  session: Session | null = null;

  constructor( private route: ActivatedRoute, private sessionService: SessionService ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
   console.log('id from route:', id);  // check id is correct
  if (id) {
    this.sessionService.getSessionById(id).subscribe(data => {
      this.session = data;
    });
  }
}
}
