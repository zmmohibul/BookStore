import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { PaginatedList } from '../../../../models/paginatedList';
import { Category } from '../../../../models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: PaginatedList<Category> | null = null;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (result) => {
        this.categories = result;
      },
    });
  }
}
