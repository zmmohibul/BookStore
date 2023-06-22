import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePublisherModel } from '../../../../models/publisher/createPublisherModel';
import { PublishersService } from '../../../../services/publishers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-publisher',
  templateUrl: './create-publisher.component.html',
  styleUrls: ['./create-publisher.component.scss'],
})
export class CreatePublisherComponent implements OnInit {
  ngOnInit(): void {}
}
