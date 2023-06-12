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

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: PaginatedList<Category> | null = null;
  edit = { editMode: false, id: 0 };
  create = { createMode: false };
  updatedCategory: Category = { id: 0, name: '' };
  newCategoryName = new FormControl('', Validators.required);

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
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
    this.updatedCategory = { id, name: this.newCategoryName.value! };
    this.categoryService.updateCategory(id, this.updatedCategory).subscribe({
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
  }

  openNewCategoryForm() {
    this.create = { createMode: true };
    this.edit = { editMode: false, id: 0 };
  }

  openEditCategoryForm(id: number) {
    this.edit = { editMode: true, id };
    this.create = { createMode: false };
  }
}
