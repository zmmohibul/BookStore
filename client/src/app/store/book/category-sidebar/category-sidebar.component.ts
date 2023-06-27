import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { PaginationParams } from '../../../models/paginationParams';
import { Category } from '../../../models/category';

interface Node {
  id: number;
  name: string;
  children?: Node[];

  childrenCount?: number;
}

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.scss'],
})
export class CategorySidebarComponent implements OnInit {
  @Output() categoryClick = new EventEmitter<number>();

  allCategoryHeading: Node = { id: 0, name: 'All Categories' };
  list: Node[] = [this.allCategoryHeading];
  children: Node[] = [];

  listLoading = false;
  childLoading = false;

  childFetched = false;
  paginationParam = new PaginationParams();

  constructor(private categoryService: CategoryService) {
    this.paginationParam.pageSize = 50;
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.listLoading = true;
    this.list = [this.allCategoryHeading];
    this.categoryService.getAllCategories(this.paginationParam).subscribe({
      next: (response) => {
        this.list = response.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            childrenCount: item.subCategoryCount,
          };
        });
        this.list.unshift(this.allCategoryHeading);
        this.listLoading = false;
        this.childFetched = false;
      },
    });
  }

  onListItemClick(id: number) {
    this.categoryClick.emit(id);

    if (id == 0) {
      this.children = [];
      this.loadCategories();
      return;
    }
    const newList = [];
    for (let item of this.list) {
      newList.push(item);
      if (item.id == id) {
        if (this.children.length == 0 && !this.childFetched) {
          this.list = [this.allCategoryHeading, item];
        } else {
          this.list = newList;
        }
        this.loadChildren(item.id);
        return;
      }
    }
  }

  onChildItemClick(id: number) {
    this.categoryClick.emit(id);

    for (let child of this.children) {
      if (child.id == id) {
        this.list.push(child);
        this.loadChildren(child.id);
        return;
      }
    }
  }

  loadChildren(id: number) {
    this.childLoading = true;
    this.categoryService.getSubCategories(id).subscribe({
      next: (response) => {
        if (response) {
          this.children = response.subCategories.map((subCat: Category) => {
            return {
              id: subCat.id,
              name: subCat.name,
              childrenCount: subCat.subCategoryCount,
            };
          });
          this.childLoading = false;
        }
        this.childFetched = true;
      },
    });
  }
}
