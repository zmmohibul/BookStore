import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorsService } from '../../../../services/authors.service';
import { CreateAuthorModel } from '../../../../models/author/createAuthorModel';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
})
export class AuthorFormComponent implements OnInit {
  @Input() authorForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.authorForm = this.formBuilder.group({
      name: ['Alu Bhai', Validators.required],
      bio: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.authorForm.value);
    if (this.authorForm.valid) {
      const authorModel: CreateAuthorModel = { ...this.authorForm.value };
      this.authorService.createAuthor(authorModel).subscribe({
        next: (res) => {
          console.log(res);
        },
      });
    }
  }
}
