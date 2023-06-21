import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaginatedList } from '../models/paginatedList';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { CreateAuthorModel } from '../models/author/createAuthorModel';
import { Author } from '../models/author/author';
import { PaginationParams } from '../models/paginationParams';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  baseUrl = environment.apiUrl;
  authors = new Map();

  constructor(private http: HttpClient) {}

  getAllAuthors(paginationParams: PaginationParams) {
    let queryString = Object.values(paginationParams).join('-');
    const data = this.authors.get(queryString);
    if (data) {
      return of(data);
    }

    return this.http
      .get<PaginatedList<Author>>(`${this.baseUrl}/authors`, {
        params: { ...paginationParams },
      })
      .pipe(
        map((response) => {
          this.authors.set(queryString, response);
          return response;
        })
      );
  }

  createAuthor(createAuthorModel: CreateAuthorModel) {
    return this.http.post<Author>(`${this.baseUrl}/authors`, createAuthorModel);
  }
}
