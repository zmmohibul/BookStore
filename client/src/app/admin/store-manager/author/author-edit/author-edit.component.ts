import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorsService } from '../../../../services/authors.service';
import { Author } from '../../../../models/author/author';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss'],
})
export class AuthorEditComponent implements OnInit {
  author: Author | undefined;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authorService
      .getAuthor(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe({
        next: (response) => {
          this.author = response;
        },
      });
  }
}
