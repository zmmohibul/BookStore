import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublishersService } from '../../../../services/publishers.service';
import { ToastrService } from 'ngx-toastr';
import { CreatePublisherModel } from '../../../../models/publisher/createPublisherModel';
import { Publisher } from '../../../../models/publisher/publisher';

@Component({
  selector: 'app-publisher-form',
  templateUrl: './publisher-form.component.html',
  styleUrls: ['./publisher-form.component.scss'],
})
export class PublisherFormComponent implements OnInit {
  @Input() publisher: Publisher | undefined;
  publisherForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private publisherService: PublishersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.publisherForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.publisherForm.valid) {
      return;
    }

    const createPublisherModel: CreatePublisherModel = {
      ...this.publisherForm.value,
    };

    if (!this.publisher) {
      this.publisherService.createPublisher(createPublisherModel).subscribe({
        next: (response) => {
          if (response) {
            this.toastr.success(`Publisher ${response.name} Added to List`);
          }
          this.publisherForm.setValue({ name: '' });
          this.publisherForm.reset();
        },
      });
    }
  }
}
