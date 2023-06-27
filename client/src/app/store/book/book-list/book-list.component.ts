import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { PaginatedList } from '../../../models/paginatedList';
import { Book } from '../../../models/book/book';
import { PaginationParams } from '../../../models/paginationParams';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service';
import { QueryParams } from '../../../models/queryParams';
import { AuthorsService } from '../../../services/authors.service';
import { Author } from '../../../models/author/author';
import { Publisher } from '../../../models/publisher/publisher';
import { PublishersService } from '../../../services/publishers.service';

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

  authors: Author[] = [];
  authorPaginationParams: PaginationParams = new PaginationParams();
  authorQueryParams = new QueryParams();
  authorsLoading = false;
  allAuthorsLoaded = false;
  selectedAuthors: number[] = [];

  publishers: Publisher[] = [];
  publisherPaginationParams: PaginationParams = new PaginationParams();
  publisherQueryParams = new QueryParams();
  publishersLoading = false;
  allPublishersLoaded = false;
  selectedPublishers: number[] = [];

  constructor(
    private booksService: BooksService,
    private categoryService: CategoryService,
    private authorsService: AuthorsService,
    private publishersService: PublishersService,
    private toastr: ToastrService
  ) {
    this.authorPaginationParams.pageSize = 1;
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
    this.loadPublishers();
  }

  loadBooks() {
    this.booksLoading = true;
    this.booksService
      .getAllBooks(this.booksPaginationParams, this.booksQueryParams)
      .subscribe({
        next: (response) => {
          this.books = response;
        },
        complete: () => {
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
          this.allAuthorsLoaded = response.items.length == 0;
          this.authors = [...this.authors, ...response.items];
        },
        complete: () => {
          this.authorsLoading = false;
        },
      });
  }

  loadPublishers() {
    this.publishersLoading = true;
    this.publishersService
      .getAllPublishers(this.publisherPaginationParams)
      .subscribe({
        next: (response) => {
          this.allPublishersLoaded = response.items.length == 0;
          this.publishers = [...this.publishers, ...response.items];
        },
        complete: () => {
          this.publishersLoading = false;
        },
      });
  }

  onLoadMoreAuthorsClick() {
    this.authorPaginationParams.pageNumber++;
    this.loadAuthors();
  }

  onLoadMorePublishersClick() {
    this.publisherPaginationParams.pageNumber++;
    this.loadPublishers();
  }

  onAuthorItemClick(id: number) {
    this.updateSelectedFilter(this.selectedAuthors, id);

    this.booksQueryParams.authorsId = [...this.selectedAuthors];
    this.publisherQueryParams.authorsId = [...this.selectedAuthors];

    this.loadBooks();
    this.loadPublishers();
  }

  onPublisherItemClick(id: number) {
    this.updateSelectedFilter(this.selectedPublishers, id);

    this.booksQueryParams.publishersId = [...this.selectedPublishers];
    this.authorQueryParams.publishersId = [...this.selectedPublishers];

    this.loadBooks();
    this.loadAuthors();
  }

  updateSelectedFilter(selectedFilter: number[], id: number) {
    if (selectedFilter.includes(id)) {
      selectedFilter.splice(selectedFilter.indexOf(id), 1);
    } else {
      selectedFilter.push(id);
    }
  }

  onCategoryClick(id: number) {
    this.booksQueryParams.categoryId = id;
    this.booksPaginationParams.pageNumber = 1;

    this.authorQueryParams.categoryId = id;
    this.authorPaginationParams.pageNumber = 1;
    this.authors = [];

    this.publisherQueryParams.categoryId = id;
    this.publisherPaginationParams.pageNumber = 1;
    this.publishers = [];

    this.loadBooks();
    this.loadAuthors();
    this.loadPublishers();
  }
}
