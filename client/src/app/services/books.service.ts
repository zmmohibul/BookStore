import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaginatedList } from '../models/paginatedList';
import { Author } from '../models/author/author';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../models/book/book';
import { CreateBookModel } from '../models/book/createBookModel';
import { PaginationParams } from '../models/paginationParams';
import { BehaviorSubject, map, of } from 'rxjs';
import { QueryParams } from '../models/queryParams';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = environment.apiUrl;
  books = new Map<string, PaginatedList<Book>>();

  constructor(private http: HttpClient) {}

  getAllBooks(queryParams: QueryParams) {
    let queryString = queryParams.getQueryString();
    let params = queryParams.getHttpParamsObject();

    const data = this.books.get(queryString);
    if (data) {
      return of(data);
    }

    return this.http
      .get<PaginatedList<Book>>(`${this.baseUrl}/books`, {
        params,
      })
      .pipe(
        map((response) => {
          this.books.set(queryString, response);
          return response;
        })
      );
  }

  getBookById(id: number) {
    return this.http.get<Book>(`${this.baseUrl}/books/${id}`);
  }

  createBook(createBookModel: CreateBookModel) {
    return this.http.post<Book>(`${this.baseUrl}/books`, createBookModel);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.baseUrl}/books/${id}`).pipe(
      map(() => {
        this.books.forEach((value, key) => {
          value.items = value.items.filter((item) => item.id != id);
        });
      })
    );
  }

  setMainPicture(bookId: number, pictureId: number) {
    return this.http.post(
      `${this.baseUrl}/books/${bookId}/set-main-picture/${pictureId}`,
      {}
    );
  }

  deletePicture(bookId: number, pictureId: number) {
    return this.http.delete(
      `${this.baseUrl}/books/${bookId}/delete-picture/${pictureId}`
    );
  }
}
