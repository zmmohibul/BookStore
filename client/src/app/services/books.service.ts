import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaginatedList } from '../models/paginatedList';
import { Author } from '../models/author/author';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book/book';
import { CreateBookModel } from '../models/book/createBookModel';
import { PaginationParams } from '../models/paginationParams';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = environment.apiUrl;
  books = new Map<string, PaginatedList<Book>>();

  constructor(private http: HttpClient) {}

  getAllBooks(paginationParams: PaginationParams) {
    let queryString = Object.values(paginationParams).join('-');
    const data = this.books.get(queryString);
    if (data) {
      return of(data);
    }

    return this.http
      .get<PaginatedList<Book>>(`${this.baseUrl}/books`, {
        params: { ...paginationParams },
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
}
