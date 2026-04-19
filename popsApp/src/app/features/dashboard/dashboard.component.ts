import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { CategoryItemComponent } from '../../shared/components/category-item/category-item.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterLinkActive, CategoryItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
