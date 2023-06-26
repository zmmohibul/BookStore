import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { TreeNode } from '../../../shared/tree/tree.component';
import { PaginationParams } from '../../../models/paginationParams';
import { Category } from '../../../models/category';
import { delay } from 'rxjs';

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

  allCategoryHeading: Node = { id: -1, name: 'All Categories' };
  list: Node[] = [this.allCategoryHeading];
  children: Node[] = [];

  listLoading = false;
  childLoading = false;
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
    this.categoryService
      .getAllCategories(this.paginationParam)
      .pipe(delay(1000))
      .subscribe({
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
        },
      });
  }

  onListItemClick(id: number) {
    if (id == -1) {
      this.children = [];
      this.loadCategories();
      return;
    }
    for (let item of this.list) {
      if (item.id == id) {
        this.list = [this.allCategoryHeading, item];
        this.childLoading = true;
        this.categoryService
          .getSubCategories(item.id)
          .pipe(delay(1000))
          .subscribe({
            next: (response) => {
              if (response) {
                this.children = response.subCategories.map(
                  (subCat: Category) => {
                    return {
                      id: subCat.id,
                      name: subCat.name,
                      childrenCount: subCat.subCategoryCount,
                    };
                  }
                );
                this.childLoading = false;
                console.log(this.children);
              }
            },
          });
        return;
      }
    }
  }

  onCategoryClick(id: number) {
    console.log(id);
    this.categoryService.getSubCategories(id).subscribe({
      next: (response) => {},
    });
    this.categoryClick.emit(id);
  }

  // findNode(id: number): TreeNode | undefined {
  //   if (this.categoryNode && this.childrenNode) {
  //     let stack = [];
  //     stack.push(this.categoryNode[0]);
  //
  //     while (stack.length > 0) {
  //       let node = stack.pop();
  //       if (node && node.id == id) {
  //         return node;
  //       }
  //
  //       if (node && node.children) {
  //         for (let child of node.children) {
  //           if (child.id == id) {
  //             return child;
  //           }
  //           stack.push(child);
  //         }
  //       }
  //     }
  //   }
  //
  //   return undefined;
  // }
}
