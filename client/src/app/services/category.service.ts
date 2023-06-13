import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
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

  constructor(private http: HttpClient) {}

  getAllCategories(paginationParams: PaginationParams) {
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
    return this.http.post<CategoryDetail>(
      `${this.baseUrl}/categories`,
      category
    );
  }

  updateCategory(id: number, category: Category) {
    return this.http.put<Category>(
      `${this.baseUrl}/categories/${id}`,
      category
    );
  }
}
