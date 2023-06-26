import { Component, OnInit } from '@angular/core';
import { Author } from '../../../../models/author/author';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from '../../../../services/authors.service';
import { Book } from '../../../../models/book/book';
import { BooksService } from '../../../../services/books.service';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent implements OnInit {
  book: Book | undefined;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookService
      .getBookById(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next: (response) => {
          this.book = response;
          this.loading = false;
        },
      });
  }
}
