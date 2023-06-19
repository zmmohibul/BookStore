import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, delay, map, of } from 'rxjs';
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
  private categories: PaginatedList<Category> = new PaginatedList<Category>();
  categoryCache = new Map();
  subCategories = new Map();

  constructor(private http: HttpClient) {}

  getAllCategories(paginationParams: PaginationParams) {
    const queryStr = Object.values(paginationParams).join('-');
    const response = this.categoryCache.get(queryStr);
    if (response) {
      return of(response);
    }

    const params = { ...paginationParams };
    return this.http
      .get<PaginatedList<Category>>(`${this.baseUrl}/categories`, {
        params,
      })
      .pipe(
        delay(1000),
        map((result) => {
          this.categoryCache.set(queryStr, result);
          return result;
        })
      );
  }

  getCategoryById(id: number) {
    const response = this.subCategories.get(id);
    if (response) {
      return of(response);
    }

    return this.http
      .get<CategoryDetail>(`${this.baseUrl}/categories/${id}`)
      .pipe(
        map((result) => {
          this.subCategories.set(result.parentId, result.subCategories);
        })
      );
  }

  getSubCategories(parentId: number) {
    const response = this.subCategories.get(parentId);
    if (response) {
      return of(response);
    }

    return this.http
      .get<CategoryDetail>(`${this.baseUrl}/categories/${parentId}`)
      .pipe(
        map((result) => {
          this.subCategories.set(result.parentId, result);
          return result;
        })
      );
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
