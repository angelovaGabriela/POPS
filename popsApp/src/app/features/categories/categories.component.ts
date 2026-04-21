import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { LiquidCardDirective } from '../../shared/directives/liquid-card.directive';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, LiquidCardDirective],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {}
