import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreatePublisherModel } from '../models/publisher/createPublisherModel';
import { environment } from '../../environments/environment';
import { Publisher } from '../models/publisher/publisher';
import { PaginationParams } from '../models/paginationParams';
import { map, of } from 'rxjs';
import { PaginatedList } from '../models/paginatedList';
import { Author } from '../models/author/author';
import { QueryParams } from '../models/queryParams';

@Injectable({
  providedIn: 'root',
})
export class PublishersService {
  baseUrl = environment.apiUrl;
  publishers = new Map<string, PaginatedList<Publisher>>();

  constructor(private http: HttpClient) {}

  getAllPublishers(queryParams: QueryParams) {
    let queryString = queryParams.getQueryString();
    let params = queryParams.getHttpParamsObject();

    const data = this.publishers.get(queryString);
    if (data) {
      return of(data);
    }

    return this.http
      .get<PaginatedList<Publisher>>(`${this.baseUrl}/publishers`, {
        params,
      })
      .pipe(
        map((response) => {
          this.publishers.set(queryString, response);
          return response;
        })
      );
  }

  createPublisher(createPublisherModel: CreatePublisherModel) {
    return this.http.post<Publisher>(
      `${this.baseUrl}/publishers`,
      createPublisherModel
    );
  }

  deletePublisher(id: number) {
    return this.http.delete(`${this.baseUrl}/publishers/${id}`);
  }
}
