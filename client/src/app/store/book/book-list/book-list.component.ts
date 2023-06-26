import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { PaginatedList } from '../../../models/paginatedList';
import { Book } from '../../../models/book/book';
import { PaginationParams } from '../../../models/paginationParams';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  loading = false;
  books: PaginatedList<Book> | undefined;
  paginationParams: PaginationParams = new PaginationParams();

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.booksService
      .getAllBooks(this.paginationParams)
      .pipe(delay(1000))
      .subscribe({
        next: (response) => {
          this.books = response;
          this.loading = false;
        },
      });
  }
}
