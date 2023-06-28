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
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  list = [];
  books: PaginatedList<Book> | undefined;
  booksQueryParams = new QueryParams();
  booksLoading = false;

  authors: Author[] = [];
  authorQueryParams = new QueryParams();
  authorsLoading = false;
  allAuthorsLoaded = false;
  selectedAuthors: number[] = [];

  publishers: Publisher[] = [];
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
    this.authorQueryParams.pageSize = 1;
    this.booksQueryParams.pageSize = 2;
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadAuthors();
    this.loadPublishers();
  }

  loadBooks() {
    this.booksLoading = true;
    this.booksService.getAllBooks(this.booksQueryParams).subscribe({
      next: (response) => {
        this.books = { ...response };
      },
      complete: () => {
        this.booksLoading = false;
      },
    });
  }

  loadAuthors() {
    this.authorsLoading = true;
    this.authorsService.getAllAuthors(this.authorQueryParams).subscribe({
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
      .getAllPublishers(this.publisherQueryParams)
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
    this.authorQueryParams.pageNumber++;
    this.loadAuthors();
  }

  onLoadMorePublishersClick() {
    this.publisherQueryParams.pageNumber++;
    this.loadPublishers();
  }

  onAuthorItemClick(id: number) {
    this.updateSelectedFilter(this.selectedAuthors, id);

    this.booksQueryParams.authorsId = [...this.selectedAuthors];
    this.booksQueryParams.pageNumber = 1;

    this.publisherQueryParams.authorsId = [...this.selectedAuthors];
    this.publisherQueryParams.pageNumber = 1;

    this.loadBooks();
    this.loadPublishers();
  }

  onPublisherItemClick(id: number) {
    this.updateSelectedFilter(this.selectedPublishers, id);

    this.booksQueryParams.publishersId = [...this.selectedPublishers];

    this.authorQueryParams.publishersId = [...this.selectedPublishers];
    this.authors = [];

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
    this.booksQueryParams.pageNumber = 1;

    this.authorQueryParams.categoryId = id;
    this.authorQueryParams.pageNumber = 1;
    this.authors = [];

    this.publisherQueryParams.categoryId = id;
    this.publisherQueryParams.pageNumber = 1;
    this.publishers = [];

    this.loadBooks();
    this.loadAuthors();
    this.loadPublishers();
  }

  onBookPageChange(event: PageEvent) {
    this.booksQueryParams.pageNumber = event.pageIndex + 1;
    this.booksQueryParams.pageSize = event.pageSize;
    this.loadBooks();
  }
}
