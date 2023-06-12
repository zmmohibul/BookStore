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
  updatedCategory: Category = { id: 0, name: '' };

  editedCategoryName = new FormControl('', Validators.required);
  categoryForm: FormGroup = new FormGroup({});

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.categoryService.getAllCategories().subscribe({
      next: (result) => {
        this.categories = result;
      },
    });
  }

  initializeForm() {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
    });
  }

  updateCategory(id: number) {
    this.updatedCategory = { id, name: this.editedCategoryName.value! };
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
    this.edit = { id, editMode: !this.edit.editMode };
  }

  editCategory(id: number) {
    this.edit = { id, editMode: !this.edit.editMode };
    if (this.categories) {
      this.categories.items = this.categories.items.map((item) => {
        if (item.id == id) {
          this.editedCategoryName.setValue(item.name);
        }
        return item;
      });
    }
  }
}
