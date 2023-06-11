import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { PaginatedList } from '../models/paginatedList';
import { Category } from '../models/category';
import { CategoryDetail } from '../models/categoryDetail';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<PaginatedList<Category>>(`${this.baseUrl}/categories`);
  }

  getCategoryById(id: number) {
    return this.http.get<CategoryDetail>(`${this.baseUrl}/categories/${id}`);
  }
}
