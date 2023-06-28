import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaginatedList } from '../models/paginatedList';
import { Category } from '../models/category';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateAuthorModel } from '../models/author/createAuthorModel';
import { Author } from '../models/author/author';
import { PaginationParams } from '../models/paginationParams';
import { map, of } from 'rxjs';
import { QueryParams } from '../models/queryParams';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  baseUrl = environment.apiUrl;
  authors = new Map<string, PaginatedList<Author>>();

  constructor(private http: HttpClient) {}

  getAllAuthors(queryParams: QueryParams) {
    let queryString = queryParams.getQueryString();
    let params = queryParams.getHttpParamsObject();

    console.log(queryString);
    const data = this.authors.get(queryString);
    if (data) {
      return of(data);
    }

    return this.http
      .get<PaginatedList<Author>>(`${this.baseUrl}/authors`, {
        params,
      })
      .pipe(
        map((response) => {
          this.authors.set(queryString, response);
          return response;
        })
      );
  }

  getAuthor(authorId: number) {
    return this.http.get<Author>(`${this.baseUrl}/authors/${authorId}`);
  }

  updateAuthor(authorId: number, createAuthorModel: CreateAuthorModel) {
    return this.http.put<Author>(
      `${this.baseUrl}/authors/${authorId}`,
      createAuthorModel
    );
  }

  createAuthor(createAuthorModel: CreateAuthorModel) {
    return this.http.post<Author>(`${this.baseUrl}/authors`, createAuthorModel);
  }

  deleteAuthor(id: number) {
    return this.http.delete(`${this.baseUrl}/authors/${id}`).pipe(
      map(() => {
        this.authors.forEach((value, key) => {
          value.items = value.items.filter((item) => item.id != id);
        });
      })
    );
  }
}
