import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { PaginatedList } from '../../../models/paginatedList';
import { Book } from '../../../models/book/book';
import { PaginationParams } from '../../../models/paginationParams';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  loading = false;
  books: PaginatedList<Book> | undefined;
  categories: PaginatedList<Category> | undefined;
  paginationParams: PaginationParams = new PaginationParams();

  constructor(
    private booksService: BooksService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  loadBooks() {
    this.loading = true;
    this.booksService.getAllBooks(this.paginationParams).subscribe({
      next: (response) => {
        this.books = response;
        this.loading = false;
      },
    });
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
