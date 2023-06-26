import { Component } from '@angular/core';
import { PaginatedList } from '../../../../models/paginatedList';
import { Author } from '../../../../models/author/author';
import { PaginationParams } from '../../../../models/paginationParams';
import { AuthorsService } from '../../../../services/authors.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { BooksService } from '../../../../services/books.service';
import { Book } from '../../../../models/book/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  authors: PaginatedList<Author> | undefined;
  books: PaginatedList<Book> | undefined;
  paginationParams = new PaginationParams();
  loading = false;

  constructor(
    private authorService: AuthorsService,
    private booksService: BooksService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.paginationParams.pageSize = 5;
    this.loadAuthors();
  }

  loadAuthors() {
    this.loading = true;
    this.booksService.getAllBooks(this.paginationParams).subscribe({
      next: (response) => {
        this.books = response;
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
    this.paginationParams.pageNumber = event.pageIndex + 1;
    this.paginationParams.pageSize = event.pageSize;
    this.loadAuthors();
  }
}
