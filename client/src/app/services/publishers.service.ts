import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatePublisherModel } from '../models/publisher/createPublisherModel';
import { environment } from '../../environments/environment';
import { Publisher } from '../models/publisher/publisher';

@Injectable({
  providedIn: 'root',
})
export class PublishersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createPublisher(createPublisherModel: CreatePublisherModel) {
    return this.http.post<Publisher>(
      `${this.baseUrl}/publishers`,
      createPublisherModel
    );
  }
}
