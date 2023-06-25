import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {PaginatedList} from "../../../models/paginatedList";
import {Book} from "../../../models/book/book";
import {PaginationParams} from "../../../models/paginationParams";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: PaginatedList<Book> | undefined;
  paginationParams: PaginationParams = new PaginationParams();

  constructor(private booksService: BooksService) {
  }

  ngOnInit(): void {
    this.booksService.getAllBooks(this.paginationParams).subscribe({
      next: (response) => {
        this.books = response;
      }
    })
  }

}
