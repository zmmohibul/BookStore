import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaginatedList } from '../models/paginatedList';
import { Author } from '../models/author/author';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book/book';
import { CreateBookModel } from '../models/book/createBookModel';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  baseUrl = environment.apiUrl;
  books = new Map<string, PaginatedList<Book>>();

  constructor(private http: HttpClient) {}

  createBook(createBookModel: CreateBookModel) {
    return this.http.post<Book>(`${this.baseUrl}/books`, createBookModel);
  }
}
