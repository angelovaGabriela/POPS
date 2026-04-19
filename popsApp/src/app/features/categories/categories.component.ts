import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {}
