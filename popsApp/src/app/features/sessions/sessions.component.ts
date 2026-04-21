import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { SessionItemComponent } from '../../shared/components/session-item/session-item.component';
import { LiquidCardDirective  } from '../../shared/directives/liquid-card.directive';

@Component({
  selector: 'app-sessions',
  imports: [RouterLink, SessionItemComponent, LiquidCardDirective],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css',
})
export class SessionsComponent {}
