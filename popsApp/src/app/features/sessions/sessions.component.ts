import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { SessionItemComponent } from '../../shared/components/session-item/session-item.component';

@Component({
  selector: 'app-sessions',
  imports: [RouterLink, RouterLinkActive, SessionItemComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent {}
