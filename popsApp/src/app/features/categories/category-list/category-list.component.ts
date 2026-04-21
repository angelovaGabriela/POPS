import { Component } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { CategoryItemComponent } from '../../../shared/components/category-item/category-item.component';

@Component({
  selector: 'app-category-list',
  imports: [ CategoryItemComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {}
