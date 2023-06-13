import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { PaginatedList } from '../../../../models/paginatedList';
import { Category } from '../../../../models/category';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CreateCategory } from '../../../../models/createCategory';
import { PageEvent } from '@angular/material/paginator';
import { PaginationParams } from '../../../../models/paginationParams';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: PaginatedList<Category> | null = null;
  edit = { editMode: false, id: 0 };
  create = { createMode: false };
  newCategoryName = new FormControl('', Validators.required);
  paginationParams: PaginationParams = new PaginationParams();

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories(this.paginationParams).subscribe({
      next: (result) => {
        this.categories = result;
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
          this.categories?.items.push(cat);
          this.create.createMode = false;
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
        if (this.categories) {
          this.categories.items = this.categories.items.filter(
            (item) => item.id != id
          );
        }
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
    console.log(event.pageIndex);
    this.paginationParams.pageSize = event.pageSize;
    this.paginationParams.pageNumber = event.pageIndex + 1;
    this.getCategories();
  }
}
