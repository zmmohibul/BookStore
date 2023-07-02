import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateOrderModel } from '../models/order/createOrderModel';
import { Order } from '../models/order/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createOrder(createOrderModel: CreateOrderModel) {
    return this.http.post<Order>(`${this.baseUrl}/orders`, createOrderModel);
  }
}
