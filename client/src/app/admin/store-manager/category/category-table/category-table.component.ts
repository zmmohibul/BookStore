import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../models/category';
import { FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { CreateCategory } from '../../../../models/createCategory';
import { CategoryDetail } from '../../../../models/categoryDetail';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent {
  @Output() viewSubCategory = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() categories: Category[] = [];
  @Input() heading: string = '';
  @Input() parentId: number = 0;

  edit = { editMode: false, id: 0 };
  create = { createMode: false };
  newCategoryName = new FormControl('', Validators.required);
  @Input() loading = false;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  editCategory(id: number) {
    this.openEditCategoryForm(id);
    if (this.categories) {
      this.categories = this.categories.map((item) => {
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
            this.categories = this.categories.map((item) => {
              if (item.id == result.id) {
                item.name = result.name;
              }
              return item;
            });
          }
        },
        error: (err) => {
          this.toastr.error(err.error.errorMessage);
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
      if (this.parentId) {
        newCategory.parentId = this.parentId;
      }

      this.categoryService.createCategory(newCategory).subscribe({
        next: (response) => {
          const cat: Category = { ...response };
          this.categories.push(response);
          this.create.createMode = false;
          this.toastr.success(
            `'${cat.name}' Added to Categories`,
            'Category Added'
          );
        },
        error: (err) => {
          this.newCategoryName.setErrors({ categoryNameTaken: true });
        },
      });
    } else {
      return;
    }
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter((item) => {
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
      },
      error: (err) => {
        this.toastr.error(err.error.errorMessage);
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

  onViewSubCategoryClick(item: Category) {
    this.viewSubCategory.emit(item);
  }

  closeCategory() {
    this.close.emit(this.heading);
  }
}
