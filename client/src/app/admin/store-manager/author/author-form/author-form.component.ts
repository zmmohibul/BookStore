import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorsService } from '../../../../services/authors.service';
import { CreateAuthorModel } from '../../../../models/author/createAuthorModel';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../../models/user';
import { AuthenticationService } from '../../../../services/authentication.service';
import { take } from 'rxjs';
import { Author } from '../../../../models/author/author';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
})
export class AuthorFormComponent implements OnInit {
  @Input() authorForm: FormGroup = new FormGroup({});

  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  user: User | undefined;
  author: Author | undefined;

  uploadedPictureUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private authorService: AuthorsService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        }
      },
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeUploader();
  }

  initializeForm() {
    this.authorForm = this.formBuilder.group({
      name: ['Alu Bhai', Validators.required],
      bio: ['', Validators.required],
    });
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: `${this.baseUrl}/authors/${this.author?.id}/add-picture`,
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 30 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.uploadedPictureUrl = photo.url;
      }
    };
  }

  onSubmit() {
    console.log(this.authorForm.value);
    if (this.authorForm.valid) {
      const authorModel: CreateAuthorModel = { ...this.authorForm.value };
      this.authorService.createAuthor(authorModel).subscribe({
        next: (res) => {
          console.log(res);
          this.author = res;
          this.uploader?.setOptions({
            url: `${this.baseUrl}/authors/${this.author?.id}/add-picture`,
          });
          this.uploader?.uploadAll();
        },
      });
    }
  }
}
