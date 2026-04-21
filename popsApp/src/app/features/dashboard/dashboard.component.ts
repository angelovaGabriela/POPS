import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { CategoryItemComponent } from '../../shared/components/category-item/category-item.component';
import { LiquidCardDirective } from '../../shared/directives/liquid-card.directive';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, CategoryItemComponent, LiquidCardDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
