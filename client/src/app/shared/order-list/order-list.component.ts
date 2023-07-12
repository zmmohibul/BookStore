import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../models/order/order';
import { PageEvent } from '@angular/material/paginator';
import { OrderService } from '../../services/order.service';
import { OrderSummaryItem } from '../../models/order/orderSummaryItem';
import { QueryParams } from '../../models/queryParams';
import { PaginatedList } from '../../models/paginatedList';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  @Input() orderQueryParams: QueryParams | undefined = undefined;
  @Output() orderDetailsClick = new EventEmitter<number>();
  orders: PaginatedList<Order> = new PaginatedList<Order>();
  loading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    if (this.orderQueryParams) {
      this.loading = true;
      this.orderService.getAllOrder(this.orderQueryParams).subscribe({
        next: (response) => {
          this.orders = response;
          console.log(this.orders);
          this.loading = false;
        },
        error: (err) => {
          console.log(err.error.errorMessage);
          this.loading = false;
        },
      });
    }
  }

  loadNextOrderPage(event: PageEvent) {
    if (this.orderQueryParams) {
      this.orderQueryParams.pageNumber = event.pageIndex + 1;
      this.orderQueryParams.pageSize = event.pageSize;
      this.loadOrders();
    }
  }

  viewOrderDetails(id: number) {
    this.orderDetailsClick.emit(id);
  }
}
