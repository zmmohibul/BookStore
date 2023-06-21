import {Component, OnInit} from '@angular/core';
import {AuthorsService} from "../../../../services/authors.service";
import {Author} from "../../../../models/author/author";
import {PaginatedList} from "../../../../models/paginatedList";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
  authors: PaginatedList<Author> | undefined;

  constructor(private authorService: AuthorsService) {
  }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAllAuthors().subscribe({
      next: (response) => {
        this.authors = response;
      }
    });
  }

  onPageChange(event: PageEvent) {

  }


}
