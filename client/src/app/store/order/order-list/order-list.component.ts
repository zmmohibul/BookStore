import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { PaginatedList } from '../../../models/paginatedList';
import { Order } from '../../../models/order/order';
import { OrderSummaryItem } from '../../../models/order/orderSummaryItem';
import { QueryParams } from '../../../models/queryParams';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: PaginatedList<Order> = new PaginatedList<Order>();
  orderQueryParams = new QueryParams();
  orderSummary: OrderSummaryItem[] = [];
  orderSummaryInViewId = 0;
  loading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderQueryParams.pageSize = 4;
    this.orderQueryParams.pageNumber = 1;
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getAllOrder(this.orderQueryParams).subscribe({
      next: (response) => {
        // this.orders = { ...this.orders };
        this.orders = response;
        // this.orders.items = [...this.orders.items, ...response.items];
        console.log(this.orders);
        this.loading = false;
      },
      error: (err) => {
        console.log(err.error.errorMessage);
        this.loading = false;
      },
    });
  }

  viewOrderDetails(id: number) {
    const order = this.orders.items.find((item) => item.id == id);
    if (order) {
      this.orderSummary = [];
      this.orderSummaryInViewId = order.id;

      for (let item of order.orderedBooks) {
        this.orderSummary.push({
          id: item.bookDetails.bookId,
          type: item.bookDetails.bookType,
          unitPrice: item.price,
          quantity: item.quantity,
          name: item.bookDetails.bookName,
          pictureUrl: item.bookDetails.pictureUrl,
        });
      }
    }
  }

  loadNextOrderPage(event: PageEvent) {
    this.orderQueryParams.pageNumber = event.pageIndex + 1;
    this.orderQueryParams.pageSize = event.pageSize;

    this.loadOrders();
  }
}
