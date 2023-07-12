import { Component, Input } from '@angular/core';
import { OrderStatus } from '../../../models/order/orderStatus';
import { PaginatedList } from '../../../models/paginatedList';
import { Order } from '../../../models/order/order';
import { OrderSummaryItem } from '../../../models/order/orderSummaryItem';
import { QueryParams } from '../../../models/queryParams';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders-home',
  templateUrl: './orders-home.component.html',
  styleUrls: ['./orders-home.component.scss'],
})
export class OrdersHomeComponent {
  @Input() orderStatus: OrderStatus = OrderStatus.OrderPlaced;
  orders: PaginatedList<Order> = new PaginatedList<Order>();
  orderSummary: OrderSummaryItem[] = [];
  orderSummaryInViewId = 0;

  orderQueryParams = new QueryParams();
  loading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderQueryParams.pageSize = 4;
    this.orderQueryParams.pageNumber = 1;
  }

  viewOrderDetail(id: number) {
    this.orderService.getOrderById(id).subscribe({
      next: (order) => {
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
      },
    });
  }
}
