import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../models/user';
import { Author } from '../../../../models/author/author';
import { Book } from '../../../../models/book/book';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { CreateBookModel } from '../../../../models/book/createBookModel';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  baseUrl = environment.apiUrl;
  user: User | undefined;
  @Input() book: Book | undefined;
  bookForm: FormGroup = new FormGroup({});

  createBookModel = new CreateBookModel();
  coAuthorCount = 0;
  loading = false;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authenticationService.currentUser$.pipe(take(1)).subscribe({
      next: (response) => {
        if (response) {
          this.user = response;
        }
      },
    });

    this.initializeUploader();
    this.initializeForm();
  }

  initializeForm() {
    this.bookForm = this.formBuilder.group({
      name: [this.book ? `${this.book.name}` : '', Validators.required],
      description: [
        this.book ? `${this.book.description}` : '',
        Validators.required,
      ],
    });
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}/books/${this.book?.id}/add-picture`,
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 30 * 1024 * 1024,
      queueLimit: 4,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
      }
    };
  }

  onSubmit() {}

  onAuthorSelect(data: any) {
    if (data.prevId) {
      this.createBookModel.authors = this.createBookModel.authors.filter(
        (id) => id != data.prevId
      );
    }
    this.createBookModel.authors.push(data.id);
    console.log(this.createBookModel.authors);
  }

  addCoAuthor() {
    this.coAuthorCount++;
  }

  closeCoAuthor(aid: number) {
    this.coAuthorCount--;

    this.createBookModel.authors = this.createBookModel.authors.filter(
      (id) => id != aid
    );

    console.log(this.createBookModel.authors);
  }
}
