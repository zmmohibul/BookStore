import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {TreeNode} from '../../../shared/tree/tree.component';
import {PaginationParams} from '../../../models/paginationParams';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.scss'],
})
export class CategorySidebarComponent implements OnInit {
  categoryNode: TreeNode[] | undefined;
  childrenNode: TreeNode[] | undefined;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories(new PaginationParams()).subscribe({
      next: (response) => {
        this.childrenNode = response.items.map((category) => {
          return {id: category.id, name: category.name, children: []};
        });

        this.categoryNode = [
          {id: 0, name: 'Categories', children: this.childrenNode},
        ];
      },
    });
  }

  onCategoryClick(id: number) {
    console.log(id);
  }
}
