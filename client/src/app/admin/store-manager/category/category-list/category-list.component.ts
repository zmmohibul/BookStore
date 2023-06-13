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
import { ToastrService } from 'ngx-toastr';
import { Event } from '@angular/router';

interface subCategoryDict {
  heading: string;
  subCategories: Category[];
  parentId: number;
}
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: PaginatedList<Category> = new PaginatedList<Category>();
  paginationParams: PaginationParams = new PaginationParams();
  subCategories: subCategoryDict[] = [];

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

  onViewSubCategoryClick(item: Category) {
    this.categoryService.getSubCategories(item.id).subscribe({
      next: (result) => {
        if (result?.length == 0) {
          this.toastr.error('No Sub-Categories found');
          return;
        }
        this.subCategories = [
          ...this.subCategories,
          {
            heading: `Sub-Categories of ${item.name}`,
            subCategories: result?.subCategories,
            parentId: result?.id,
          },
        ];
      },
    });
  }

  closeSubCategory(heading: string) {
    this.subCategories = this.subCategories.filter(
      (item) => item.heading !== heading
    );
  }
}
