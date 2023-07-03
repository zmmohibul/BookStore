import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateOrderModel } from '../models/order/createOrderModel';
import { Order } from '../models/order/order';
import { PaginatedList } from '../models/paginatedList';
import { Book } from '../models/book/book';
import { map, of } from 'rxjs';
import { QueryParams } from '../models/queryParams';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = environment.apiUrl;
  orders = new Map<string, PaginatedList<Order>>();

  constructor(private http: HttpClient) {}

  getAllOrder(queryParams: QueryParams) {
    let queryString = queryParams.getQueryString();
    let params = queryParams.getHttpParamsObject();

    const data = this.orders.get(queryString);
    if (data) {
      return of(data);
    }

    return this.http
      .get<PaginatedList<Order>>(`${this.baseUrl}/orders`, { params })
      .pipe(
        map((response) => {
          this.orders.set(queryString, response);
          return response;
        })
      );
  }

  createOrder(createOrderModel: CreateOrderModel) {
    return this.http.post<Order>(`${this.baseUrl}/orders`, createOrderModel);
  }
}
