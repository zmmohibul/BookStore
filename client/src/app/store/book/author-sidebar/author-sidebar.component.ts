import {Component, OnInit} from '@angular/core';
import {AuthorsService} from "../../../services/authors.service";

@Component({
  selector: 'app-author-sidebar',
  templateUrl: './author-sidebar.component.html',
  styleUrls: ['./author-sidebar.component.scss']
})
export class AuthorSidebarComponent implements OnInit {
  constructor(private authorsService: AuthorsService) {
  }

  ngOnInit(): void {

  }


}
