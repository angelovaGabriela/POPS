import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionItemComponent } from '../../shared/components/session-item/session-item.component';
import { LiquidCardDirective  } from '../../shared/directives/liquid-card.directive';
import { Session } from '../../shared/interfaces/session';
import { SessionService } from '../../core/services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sessions',
  imports: [RouterLink, SessionItemComponent, LiquidCardDirective, CommonModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent implements OnInit {

   sessions: Session[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.loadSessions().subscribe(data => {
       console.log('sessions:', data);
      this.sessions = data;
    });
  }
}
