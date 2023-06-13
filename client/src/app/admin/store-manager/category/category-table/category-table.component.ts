import { Component } from '@angular/core';
import { PaginatedList } from '../../../../models/paginatedList';
import { Category } from '../../../../models/category';
import { FormControl, Validators } from '@angular/forms';
import { PaginationParams } from '../../../../models/paginationParams';
import { CategoryService } from '../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { CreateCategory } from '../../../../models/createCategory';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent {
  categories: PaginatedList<Category> = new PaginatedList<Category>();
  edit = { editMode: false, id: 0 };
  create = { createMode: false };
  newCategoryName = new FormControl('', Validators.required);
  paginationParams: PaginationParams = new PaginationParams();

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.paginationParams.pageSize = 48;
    this.categoryService.getAllCategories(this.paginationParams).subscribe({
      next: (result) => {
        this.categories = result;
        this.categories.pageSize = result.items.length;
      },
    });
  }

  editCategory(id: number) {
    this.openEditCategoryForm(id);
    if (this.categories) {
      this.categories.items = this.categories.items.map((item) => {
        if (item.id == id) {
          this.newCategoryName.setValue(item.name);
        }
        return item;
      });
    }
  }

  updateCategory(id: number) {
    if (this.newCategoryName.value) {
      const updatedCategory: Category = {
        id,
        name: this.newCategoryName.value,
      };
      this.categoryService.updateCategory(id, updatedCategory).subscribe({
        next: (result) => {
          if (this.categories) {
            this.categories.items = this.categories.items.map((item) => {
              if (item.id == result.id) {
                item.name = result.name;
              }
              return item;
            });
          }
        },
      });
      this.edit = { id, editMode: false };
    } else {
      return;
    }
  }

  createCategory() {
    if (this.newCategoryName.value) {
      const newCategory: CreateCategory = { name: this.newCategoryName.value };
      this.categoryService.createCategory(newCategory).subscribe({
        next: (response) => {
          const cat: Category = { ...response };
          this.categories.items.push(cat);
          this.categories.count += 1;
          this.create.createMode = false;
          this.toastr.success(
            `'${cat.name}' Added to Categories`,
            'Category Added'
          );
        },
        error: (err) => {
          this.newCategoryName.setErrors({ categoryNameTaken: true });
          console.log(err.error.errorMessage);
        },
      });
    } else {
      return;
    }
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categories.items = this.categories.items.filter((item) => {
          if (item.id != id) {
            return item;
          } else {
            this.toastr.error(
              `'${item.name}' Deleted from Categories`,
              'Category Deleted'
            );
            return null;
          }
        });
        this.categories.count -= 1;
      },
    });
  }

  openNewCategoryForm() {
    this.create = { createMode: true };
    this.edit = { editMode: false, id: 0 };
    this.newCategoryName.setValue('');
  }

  openEditCategoryForm(id: number) {
    this.edit = { editMode: true, id };
    this.create = { createMode: false };
  }

  onPageChange(event: PageEvent) {
    this.paginationParams.pageSize = event.pageSize;
    this.paginationParams.pageNumber = event.pageIndex + 1;
    this.getCategories();
  }
}