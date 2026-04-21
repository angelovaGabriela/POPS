import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { LiquidCardDirective } from '../../shared/directives/liquid-card.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LiquidCardDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
