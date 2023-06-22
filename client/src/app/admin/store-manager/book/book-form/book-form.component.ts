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
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  @Input() book: Book | undefined;
  bookForm: FormGroup = new FormGroup({});

  baseUrl = environment.apiUrl;
  user: User | undefined;

  createBookModel = new CreateBookModel();
  coAuthorCount = 0;
  parentCategories: string[] = [];

  loading = false;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
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
      this.createBookModel.authorsId = this.createBookModel.authorsId.filter(
        (id) => id != data.prevId
      );
    }
    this.createBookModel.authorsId.push(data.id);
    console.log(this.createBookModel.authorsId);
  }

  onCategorySelect(data: any) {
    if (data.prevId) {
      this.createBookModel.categoriesId =
        this.createBookModel.categoriesId.filter((id) => id != data.prevId);
    }

    this.createBookModel.categoriesId.push(data.id);
    this.categoryService.getSubCategories(data.id).subscribe({
      next: (response) => {
        if (response && response.subCategories.length) {
          this.parentCategories.push(
            `${this.baseUrl}/categories/${data.id}/sub-categories`
          );
        }
      },
    });

    console.log(this.createBookModel.categoriesId);
  }

  addCoAuthor() {
    this.coAuthorCount++;
  }

  closeCoAuthor(aid: number) {
    this.coAuthorCount--;

    this.createBookModel.authorsId = this.createBookModel.authorsId.filter(
      (id) => id != aid
    );

    console.log(this.createBookModel.authorsId);
  }
}
