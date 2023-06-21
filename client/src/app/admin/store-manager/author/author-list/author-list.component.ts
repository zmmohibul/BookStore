import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../../../services/authors.service';
import { Author } from '../../../../models/author/author';
import { PaginatedList } from '../../../../models/paginatedList';
import { PageEvent } from '@angular/material/paginator';
import { PaginationParams } from '../../../../models/paginationParams';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  authors: PaginatedList<Author> | undefined;
  paginationParams = new PaginationParams();

  constructor(
    private authorService: AuthorsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.paginationParams.pageSize = 5;
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAllAuthors(this.paginationParams).subscribe({
      next: (response) => {
        this.authors = response;
      },
    });
  }

  deleteAuthor(author: Author) {
    this.authorService.deleteAuthor(author.id).subscribe({
      next: () => {
        this.toastr.success(
          `'${author.name}' deleted from Authors`,
          'Author Deleted'
        );
        if (this.authors) {
          this.authors.items = this.authors.items.filter(
            (item) => item.id != author.id
          );
        }
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.paginationParams.pageNumber = event.pageIndex + 1;
    this.paginationParams.pageSize = event.pageSize;
    this.loadAuthors();
  }
}
