import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { PaginatedList } from '../../../models/paginatedList';
import { Book } from '../../../models/book/book';
import { PaginationParams } from '../../../models/paginationParams';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { QueryParams } from '../../../models/queryParams';
import { AuthorsService } from '../../../services/authors.service';
import { Author } from '../../../models/author/author';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: PaginatedList<Book> | undefined;
  booksPaginationParams: PaginationParams = new PaginationParams();
  booksQueryParams = new QueryParams();
  booksLoading = false;

  categories: PaginatedList<Category> | undefined;

  authors: Author[] = [];
  authorPaginationParams: PaginationParams = new PaginationParams();
  authorQueryParams = new QueryParams();
  authorsLoading = false;
  allAuthorsLoaded = false;
  selectedAuthors: number[] = [];

  constructor(
    private booksService: BooksService,
    private categoryService: CategoryService,
    private authorsService: AuthorsService,
    private toastr: ToastrService
  ) {
    this.authorPaginationParams.pageSize = 1;
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
    this.loadAuthors();
  }

  loadBooks() {
    console.log(this.booksQueryParams);
    
    this.booksLoading = true;
    this.booksService
      .getAllBooks(this.booksPaginationParams, this.booksQueryParams)
      .subscribe({
        next: (response) => {
          this.books = response;
          this.booksLoading = false;
        },
      });
  }

  loadAuthors() {
    this.authorsLoading = true;
    this.authorsService
      .getAllAuthors(this.authorPaginationParams, this.authorQueryParams)
      .subscribe({
        next: (response) => {
          if (response.items.length == 0) {
            this.allAuthorsLoaded = true;
          } else {
            this.allAuthorsLoaded = false;
          }
          this.authors = [...this.authors, ...response.items];
          this.authorsLoading = false;
        },
      });
  }

  onLoadMoreAuthorsClick() {
    this.authorPaginationParams.pageNumber++;
    this.loadAuthors();
  }

  onAuthorItemClick(id: number) {
    if (this.selectedAuthors.includes(id)) {
      this.selectedAuthors.splice(this.selectedAuthors.indexOf(id), 1);
    } else {
      this.selectedAuthors.push(id);
    }
    this.booksQueryParams.authorsId = [...this.selectedAuthors];
    console.log(this.booksQueryParams);
    this.loadBooks();
    console.log(this.selectedAuthors);
  }

  onCategoryClick(id: number) {
    this.booksQueryParams.categoryId = id;
    this.booksPaginationParams.pageNumber = 1;

    this.authorQueryParams.categoryId = id;
    this.authorPaginationParams.pageNumber = 1;
    this.authors = [];

    this.loadAuthors();
    this.loadBooks();
  }

  loadCategories() {
    this.categoryService.getAllCategories(new PaginationParams()).subscribe({
      next: (response) => {
        this.categories = response;
        console.log(this.categories);
      },
    });
  }
}
