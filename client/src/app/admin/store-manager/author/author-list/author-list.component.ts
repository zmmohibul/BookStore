import {Component, OnInit} from '@angular/core';
import {AuthorsService} from '../../../../services/authors.service';
import {Author} from '../../../../models/author/author';
import {PaginatedList} from '../../../../models/paginatedList';
import {PageEvent} from '@angular/material/paginator';
import {PaginationParams} from '../../../../models/paginationParams';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  authors: PaginatedList<Author> | undefined;
  paginationParams = new PaginationParams();

  constructor(private authorService: AuthorsService) {

  }

  ngOnInit(): void {
    this.paginationParams.pageSize = 2;
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAllAuthors(this.paginationParams).subscribe({
      next: (response) => {
        this.authors = response;
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.paginationParams.pageNumber = event.pageIndex + 1;
    this.paginationParams.pageSize = event.pageSize;
    this.loadAuthors();
  }
}
