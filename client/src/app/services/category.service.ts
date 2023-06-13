import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { PaginatedList } from '../models/paginatedList';
import { Category } from '../models/category';
import { CategoryDetail } from '../models/categoryDetail';
import { CreateCategory } from '../models/createCategory';
import { PaginationParams } from '../models/paginationParams';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = environment.apiUrl;
  private categories: Category[] = [];

  constructor(private http: HttpClient) {}

  getAllCategories(paginationParams: PaginationParams) {
    const str = Object.values(paginationParams).join('-');

    const params = { ...paginationParams };
    return this.http.get<PaginatedList<Category>>(
      `${this.baseUrl}/categories`,
      {
        params,
      }
    );
  }

  getCategoryById(id: number) {
    return this.http.get<CategoryDetail>(`${this.baseUrl}/categories/${id}`);
  }

  createCategory(category: CreateCategory) {
    return this.http
      .post<CategoryDetail>(`${this.baseUrl}/categories`, category)
      .pipe(
        map((result) => {
          return result;
        })
      );
  }

  updateCategory(id: number, category: Category) {
    return this.http.put<Category>(
      `${this.baseUrl}/categories/${id}`,
      category
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }
}
