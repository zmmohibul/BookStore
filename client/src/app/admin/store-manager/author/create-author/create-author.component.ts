import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss'],
})
export class CreateAuthorComponent implements OnInit {
  createAuthorForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.createAuthorForm = this.formBuilder.group({
      name: ['Alu Bhai', Validators.required],
      bio: ['', Validators.required],
    });
  }

  onButtonClick() {
    console.log(this.createAuthorForm.value);
  }
}
