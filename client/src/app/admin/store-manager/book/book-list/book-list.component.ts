import { Component } from '@angular/core';
import { PaginatedList } from '../../../../models/paginatedList';
import { Author } from '../../../../models/author/author';
import { PaginationParams } from '../../../../models/paginationParams';
import { AuthorsService } from '../../../../services/authors.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { BooksService } from '../../../../services/books.service';
import { Book } from '../../../../models/book/book';
import { QueryParams } from '../../../../models/queryParams';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  authors: PaginatedList<Author> | undefined;
  books: PaginatedList<Book> | undefined;
  queryParams = new QueryParams();
  loading = false;

  constructor(
    private authorService: AuthorsService,
    private booksService: BooksService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.queryParams.pageSize = 5;
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.booksService.getAllBooks(this.queryParams).subscribe({
      next: (response) => {
        this.books = { ...response };
        this.loading = false;
      },
    });
  }

  deleteBook(book: Book) {
    this.loading = true;
    this.booksService.deleteBook(book.id).subscribe({
      next: () => {
        this.toastr.success(`${book.name} deleted from Books`);
        if (this.books) {
          this.books.items = this.books.items.filter(
            (item) => item.id != book.id
          );
        }
        this.loading = false;
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.queryParams.pageNumber = event.pageIndex + 1;
    this.queryParams.pageSize = event.pageSize;
    this.loadBooks();
  }
}
