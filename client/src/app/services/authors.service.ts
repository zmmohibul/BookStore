import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaginatedList } from '../models/paginatedList';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { CreateAuthorModel } from '../models/author/createAuthorModel';
import { Author } from '../models/author/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createAuthor(createAuthorModel: CreateAuthorModel) {
    return this.http.post<Author>(`${this.baseUrl}/authors`, createAuthorModel);
  }
}
